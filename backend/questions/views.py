from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models.section import Section
from .serializers import SectionSerializer

class SectionView(APIView):
    def get(self, request, *args, **kwargs):
        all_sections = Section.objects.all()
        serializer = SectionSerializer(all_sections, many=True, context={'request': request})
        return Response(serializer.data)


class SubtopicsView(APIView):
    pass