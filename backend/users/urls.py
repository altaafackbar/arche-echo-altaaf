from django.urls import path, include
from rest_framework import routers
from .viewsets import UserViewSet
from . import views

# app_name = 'users'

router = routers.DefaultRouter()
router.register(r'accounts', UserViewSet, basename='accounts')
# router.register('profiles', ProfileViewSet)
urlpatterns = [
    path('', include(router.urls)),
    path('overview/', views.APIOverview, name='api-overview')
]