# Generated by Django 5.1 on 2024-11-09 03:17

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0002_subtopic'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='category',
            unique_together=set(),
        ),
        migrations.CreateModel(
            name='SubtopicCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('exercise_name', models.CharField(max_length=100)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='questions.category')),
                ('subtopic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='questions.subtopic')),
            ],
            options={
                'unique_together': {('subtopic', 'category')},
            },
        ),
        migrations.AddField(
            model_name='category',
            name='subtopic',
            field=models.ManyToManyField(related_name='categories_for_subtopic', through='questions.SubtopicCategory', to='questions.subtopic'),
        ),
        migrations.AddField(
            model_name='subtopic',
            name='categories',
            field=models.ManyToManyField(related_name='subtopics', through='questions.SubtopicCategory', to='questions.category'),
        ),
        migrations.RemoveField(
            model_name='category',
            name='section',
        ),
    ]
