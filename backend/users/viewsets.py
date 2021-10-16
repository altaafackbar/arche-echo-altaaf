from django.contrib.auth.models import User
from rest_framework.decorators import action, permission_classes
from .models import CustomUser, Profile
from rest_framework import viewsets
from .serializers import UserSerializer
from .permissions import CheckUserPermission
from rest_framework.response import Response
from rest_framework import status

from users import serializers



class UserViewSet(viewsets.ModelViewSet):
    permission_classes = [CheckUserPermission]
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer


    def list(self, request):
        try:
            users = CustomUser.objects.all().order_by('id')
            serializer = UserSerializer(users, many=True)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # @action(detail=True, methods=['post'], permission_classes=[CheckUserPermission])
    # POST crate user 
    def create(self, request):
        try:
            # permission_classes = [CheckUserPermission]
            queryset = CustomUser.objects.all()
            serializer = UserSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message": "User Created"}, status=status.HTTP_201_CREATED)
            return Response({"message": "email alrealdy exists, "})
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # GET user's info
    def retrieve(self, request, pk=None):
        try:
            user = CustomUser.objects.get(id=pk)
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    # def update(self, request, pk=None):
    #     try:
    #         user = CustomUser.objects.get(id=pk)
    #         serializer = UserSerializer(instance=user, )
    #         return Response(serializer.data)
    #     except:
    #         return Response(status=status.HTTP_404_NOT_FOUND)


# class ProfileViewSet(viewsets.ModelViewSet):
#     queryset = Profile.objects.all()
#     serializer_class = ProfileSerializer
