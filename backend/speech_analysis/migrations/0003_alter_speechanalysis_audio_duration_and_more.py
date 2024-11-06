# Generated by Django 5.1 on 2024-11-06 08:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('speech_analysis', '0002_alter_speechanalysis_audio_duration'),
    ]

    operations = [
        migrations.AlterField(
            model_name='speechanalysis',
            name='audio_duration',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='speechanalysis',
            name='grammar_score',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='speechanalysis',
            name='readability_score',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='speechanalysis',
            name='sentence_count',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='speechanalysis',
            name='sentence_structure_score',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='speechanalysis',
            name='total_score',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='speechanalysis',
            name='unique_words',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='speechanalysis',
            name='vocab_score',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='speechanalysis',
            name='word_count',
            field=models.FloatField(),
        ),
    ]
