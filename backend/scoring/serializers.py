from rest_framework import serializers
from .views import GenericScore

class GenericScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenericScore
        fields = ["id", "user", "total_score", "max_score", "time_duration"]