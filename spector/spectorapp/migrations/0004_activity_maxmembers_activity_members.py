# Generated by Django 4.0.2 on 2022-03-06 19:39

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('spectorapp', '0003_sports_activity'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='maxMembers',
            field=models.IntegerField(null=True),
        ),
        migrations.AddField(
            model_name='activity',
            name='members',
            field=models.ManyToManyField(related_name='activities', to=settings.AUTH_USER_MODEL),
        ),
    ]