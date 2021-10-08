from django.shortcuts import render

from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/api/',
            'method': 'GET',
            'body': None,
            'description': 'api check'
        },
        {
            'Endpoint': '/auth/users',
            'method': 'POST',
            'body': None,
            'description': 'create user account'
        },
    ]
    return Response(routes)