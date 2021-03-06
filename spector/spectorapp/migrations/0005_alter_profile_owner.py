# Generated by Django 4.0.2 on 2022-03-07 13:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('spectorapp', '0004_profile_delete_userdata'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userprofile', to=settings.AUTH_USER_MODEL, unique=True),
        ),
    ]
