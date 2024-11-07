from rest_framework import serializers
from .models import VocabQuestion


class VocabQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VocabQuestion
        fields = ['id', 'category', 'question_text', 'choices', 'answer', 'difficulty']