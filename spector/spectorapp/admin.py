from django.contrib import admin

# Register your models here.
from .models import userData

class userAdmin(admin.ModelAdmin):
    list_display = ("name","bio","age")
admin.site.register(userData, userAdmin)