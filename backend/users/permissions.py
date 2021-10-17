from rest_framework import permissions

# Custom Permission Class
class CheckUserPermission(permissions.BasePermission):
    """
    Custom Permissions for UserViewSet to only allow user to edit their profile, otherwise GET and POST only.
    """
    # Give everyone permission to a POST request, in case a guest user wanted to create an account
    def has_permission(self, request, view):

        return True

    # User can edit iff user is the object owner
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if not request.user.is_anonymous:
            return request.user == obj

        return False