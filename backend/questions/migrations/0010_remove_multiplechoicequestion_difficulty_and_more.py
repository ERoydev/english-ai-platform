# Generated by Django 5.1 on 2024-11-26 08:26

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0009_remove_multiplechoicequestion_time_duration'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='multiplechoicequestion',
            name='difficulty',
        ),
        migrations.RemoveField(
            model_name='openendedquestion',
            name='difficulty',
        ),
    ]
