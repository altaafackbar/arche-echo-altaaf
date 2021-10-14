from django.db import models
import os
# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils import timezone
from django.db.models.deletion import CASCADE
from django.utils.deconstruct import deconstructible


class CustomUserManager(BaseUserManager):

    def create_user(self, email, first_name, last_name, password=None, **other_fields):
        if not email:
            raise ValueError('Users must have an email address.')

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, first_name, last_name, password=None, **other_fields):
        user = self.create_user(email, first_name, last_name, password=password)
        user.is_admin = True
        user.is_superuser = True
        user.save()
        return user




class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    start_date = models.DateTimeField(default=timezone.now)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']


    def __str__(self):
        return self.email

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin


@deconstructible
class GenerateProfileImagePath(object):
    def __init__(self):
        pass

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        path = f'media/accounts/{instance.user.id}/images/'
        name = f'profile_image.{ext}'
        return os.path.join(path, name)

user_profile_image_path = GenerateProfileImagePath()

class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=CASCADE)
    image = models.FileField(upload_to=user_profile_image_path, blank=True, null=True)

    def __str__(self):
        return self.user.email