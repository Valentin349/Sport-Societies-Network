# Generated by Django 4.0.2 on 2022-03-12 02:36

import datetime
from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('spectorapp', '0011_activity_datetime'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='activity',
            name='dateTime',
        ),
        migrations.AddField(
            model_name='activity',
            name='creationTime',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Time of Creation'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='activity',
            name='duration',
            field=models.DurationField(default=datetime.timedelta),
        ),
        migrations.AddField(
            model_name='activity',
            name='startTime',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='Start Time'),
        ),
    ]