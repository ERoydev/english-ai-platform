# Generated by Django 5.1 on 2024-11-06 21:41

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0001_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Question',
        ),
        migrations.DeleteModel(
            name='UserQuizScore',
        ),
    ]
