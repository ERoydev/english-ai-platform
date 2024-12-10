from rest_framework import serializers
from .models import Testimonials


class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonials
        fields = '__all__'
