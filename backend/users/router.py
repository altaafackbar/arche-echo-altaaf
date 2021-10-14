from rest_framework import routers
from .viewsets import userViewSet

app_name = 'users'

router = routers.DefaultRouter()
router.register('users', userViewSet)