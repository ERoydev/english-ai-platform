from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models.section import Section
from .models.subtopics import Subtopic
from .serializers import SectionSerializer, SubtopicSerializer
from .serializers import PolymorphicQuestionSerializer
from itertools import chain

class SectionView(APIView):
    def get(self, request, *args, **kwargs):
        all_sections = Section.objects.all()
        serializer = SectionSerializer(all_sections, many=True, context={'request': request})
        return Response(serializer.data)


class SubtopicsView(APIView):
    def get(self, request, section_id, *args, **kwargs):
        all_topics = Subtopic.objects.filter(section_id=section_id) # Pick subtopics that have this id
        serializer = SubtopicSerializer(all_topics, many=True, context={'request': request})
        return Response(serializer.data)


class QuestionsView(APIView):
    def get(self, request, topic_id, *args, **kwargs):
        selected_subtopic = Subtopic.objects.filter(pk=topic_id)[0]
        question_categories = selected_subtopic.categories_for_subtopic.all()

        all_questions = []
        for question in question_categories:
            all_questions.append(question.get_all_questions_for_category())

        all_questions = list(chain.from_iterable(all_questions)) # Flat into one list

        serializer = PolymorphicQuestionSerializer(all_questions, many=True)
        serializer_data = serializer.data
        print(serializer_data)
        return Response(serializer.data)