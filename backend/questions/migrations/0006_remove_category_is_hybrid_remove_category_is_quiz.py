# Generated by Django 5.1 on 2024-11-12 14:30

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0005_category_is_hybrid_category_is_quiz_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='category',
            name='is_hybrid',
        ),
        migrations.RemoveField(
            model_name='category',
            name='is_quiz',
        ),
    ]
