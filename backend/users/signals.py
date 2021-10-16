from .models import CustomUser
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from .models import Profile

@receiver(post_save, sender=CustomUser)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)