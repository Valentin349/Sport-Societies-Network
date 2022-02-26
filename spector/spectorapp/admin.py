from django.contrib import admin

# Register your models here.
from .models import UserData, Sports, Activity

class UserAdmin(admin.ModelAdmin):
    list_display = ("name","bio","age")

admin.site.register(UserData, UserAdmin)
admin.site.register(Sports)
admin.site.register(Activity)