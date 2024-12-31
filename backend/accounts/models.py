import os
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django_resized import ResizedImageField


class Profile(models.Model):
    owner = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="profile")
    created = models.DateTimeField(auto_now_add=True)
    bio = models.TextField(max_length=400, blank=True)
    avatar = ResizedImageField(
        upload_to="avatars/",
        size=[300, 300],
        crop=["middle", "center"],
        force_format="JPEG",
        default="avatars/default_avatar.jpg"
    )

    def __str__(self):
        return f"{self.owner}'s profile"

    # Saves then deletes old avatar
    def save(self, *args, **kwargs):
        if self.pk:
            old_avatar = Profile.objects.filter(pk=self.pk).first().avatar
            if old_avatar and old_avatar != self.avatar and old_avatar.name != "avatars/default_avatar.jpg":
                if os.path.isfile(old_avatar.path):
                    os.remove(old_avatar.path)
        super().save(*args, **kwargs)


def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(owner=instance)


post_save.connect(create_profile, sender=User)
