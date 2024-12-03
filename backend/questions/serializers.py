from rest_framework import serializers
# Models
from .models import Section, Subtopic
from .models.question_types.MultipleChoiceQuestion import MultipleChoiceQuestion
from .models.question_types.OpenEndedQuestion import OpenEndedQuestion


class SectionSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        # Construct the full URL using request.build_absolute_uri
        request = self.context.get('request')
        if obj.image_url and request:
            return request.build_absolute_uri(f'/static/{obj.image_url}')
        return None

    class Meta:
        model = Section
        fields = ['id', 'name', 'description', 'image_url']


class SubtopicSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    def get_image_url(self, obj):
        # Construct the full URL using request.build_absolute_uri
        request = self.context.get('request')
        if obj.image_url and request:
            return request.build_absolute_uri(f'/static/{obj.image_url}')
        return None

    class Meta:
        model = Subtopic
        fields = ['id', 'name', 'image_url']


# QUESTION SERIALIZERS

class QuestionSerializer(serializers.ModelSerializer):
    """That's Base Serializer for Question"""
    class Meta:
        model = None  # No direct model since `Question` is abstract
        fields = "__all__"


class MultipleChoiceQuestionSerializer(QuestionSerializer):
    class Meta:
        model = MultipleChoiceQuestion
        fields = QuestionSerializer.Meta.fields


class OpenEndedQuestionSerializer(QuestionSerializer):
    class Meta:
        model = OpenEndedQuestion
        fields = QuestionSerializer.Meta.fields


class PolymorphicQuestionSerializer(serializers.Serializer):
    """Used to select the serializer"""
    serializer_registry = {
        MultipleChoiceQuestion: MultipleChoiceQuestionSerializer,
        OpenEndedQuestion: OpenEndedQuestionSerializer,
        # Add more question types as needed
    }

    def to_representation(self, instance):
        # If instance is a list, handle each item individually
        if isinstance(instance, list):
            return [self.to_representation(item) for item in instance]

        # Find the correct serializer for the instance type
        serializer_class = self.serializer_registry.get(type(instance), QuestionSerializer)
        serializer = serializer_class(instance)
        return serializer.data