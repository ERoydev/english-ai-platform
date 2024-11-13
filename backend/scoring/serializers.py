from rest_framework import serializers
from .views import GenericScore
from backend.core.mixins import GradeMixin


class GenericScoreSerializer(serializers.ModelSerializer, GradeMixin):
    class Meta:
        model = GenericScore
        fields = ["id", "user", "total_score", "max_score", "time_duration"]

    def to_representation(self, instance):
        # Get the initial serialized data
        data = super().to_representation(instance)

        # Add grade information using GradeMixin's method
        grade_info = self.get_grade_description(total_score=self.instance.total_score, max_score=instance.max_score)
        data['grade_info'] = grade_info

        return data