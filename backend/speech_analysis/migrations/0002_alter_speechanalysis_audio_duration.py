# Generated by Django 5.1 on 2024-11-06 08:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('speech_analysis', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='speechanalysis',
            name='audio_duration',
            field=models.CharField(max_length=10),
        ),
    ]
