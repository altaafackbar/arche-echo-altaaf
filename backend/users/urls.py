from rest_framework import routers
from .viewsets import UserViewSet

# app_name = 'users'

router = routers.DefaultRouter()
router.register(r'accounts', UserViewSet, basename='accounts')
# router.register('profiles', ProfileViewSet)
urlpatterns = router.urls