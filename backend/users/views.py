from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
def APIOverview(request):
    content = {
        "create user": "POST api/accounts/",
        "user details": "GET api/accounts/{user_id}",
        "user login/get jwt token": "POST api/auth/token",
        "user refresh token": "POST api/auth/token"
    }
    return Response(content)
    