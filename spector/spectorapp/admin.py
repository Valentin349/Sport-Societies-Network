from django.contrib import admin

# Register your models here.
from .models import Profile, Sports, Activity

class UserAdmin(admin.ModelAdmin):
    list_display = ("name","bio","age")

admin.site.register(Profile, UserAdmin)
admin.site.register(Sports)
admin.site.register(Activity)