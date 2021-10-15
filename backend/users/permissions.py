from rest_framework import permissions

class CheckUserPermission(permissions.BasePermission):
    """
    Custom Permissions for UserViewSet to only allow user to edit their profile, otherwise GET and POST only.
    """

    def has_permission(self, request, view):

        return True

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if not request.user.is_anonymous:
            return request.user == obj

        return False