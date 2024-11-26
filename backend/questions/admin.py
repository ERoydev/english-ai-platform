from django.contrib import admin

from .models import Section, Category, MultipleChoiceQuestion, OpenEndedQuestion


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    list_filter = ['name']
    search_fields = ['name', 'description']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name',]
    list_filter = ['name', 'subtopic']
    search_fields = ['name', 'subtopic', 'description']


@admin.register(MultipleChoiceQuestion)
class MultipleChoiceQuestionAdmin(admin.ModelAdmin):
    list_display = ['question_text', 'category']
    list_filter = ['category',]
    search_fields = ['question_text', 'category']


@admin.register(OpenEndedQuestion)
class OpenEndedQuestionAdmin(admin.ModelAdmin):
    list_display = ['question_text', 'category']
    list_filter = ['category', ]
    search_fields = ['question_text', 'category']
