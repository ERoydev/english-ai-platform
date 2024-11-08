from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import VocabQuestion
from .serializers import VocabQuestionSerializer

class VocabularyView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    LIMIT = 15 # Questions number

    def get_random_questions(self, category, difficulty=None):

        # Filter question by category
        questions_query = VocabQuestion.objects.filter(category=category)

        # Apply difficulty filter if provided
        if difficulty:
            questions_query = questions_query.filter(difficulty=difficulty)

        # Randomly sample question and limit the number
        # the "?" order in random sequence
        questions = list(questions_query.order_by('?')[:self.LIMIT])

        return questions

    def get(self, request, *args, **kwargs):
        """
           Handle GET request to serve random vocabulary question by category.
           Expects a 'category' parameter and optional 'difficulty' parameter.
        """
        category = request.query_params.get('category')
        difficulty = request.query_params.get('difficulty', None)

        if not category:
            return Response({'error': 'Category is required'}, status=400)

        # Retrieve question for the specified category
        try:
            questions = self.get_random_questions(category, difficulty)
            serializer = VocabQuestionSerializer(questions, many=True)
            return Response(serializer.data, status=200)
        except VocabQuestion.DoesNotExist:
            return Response({'error': 'No question available for the selected category'}, status=404)


