from django.contrib import admin

from .models import Section, Category, MultipleChoiceQuestion, OpenEndedQuestion


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    pass


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    pass


@admin.register(MultipleChoiceQuestion)
class MultipleChoiceQuestionAdmin(admin.ModelAdmin):
    list_display = ['question_text', 'category']
    list_filter = ['category']
    search_fields = ['question_text', 'category']


@admin.register(OpenEndedQuestion)
class OpenEndedQuestionAdmin(admin.ModelAdmin):
    pass