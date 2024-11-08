from rest_framework import serializers
from .models.section import Section


# serializers.py
from rest_framework import serializers
from .models import Section

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
