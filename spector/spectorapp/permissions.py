from rest_framework import permissions

class AdminAuthor_elseReadonly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return True
    
    def has_object_permission(self, request, view, obj):
        if request.user.is_superuser:
            return True
        if request.user.is_authenticated and request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user
        
