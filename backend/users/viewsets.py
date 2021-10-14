from .models import CustomUser
from rest_framework import viewsets
from .serializers import UserSerializer
from .permissions import CheckUserPermission


class userViewSet(viewsets.ModelViewSet):
    permission_classes = [CheckUserPermission]
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer