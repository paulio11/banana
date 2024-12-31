from rest_framework import serializers
from dj_rest_auth.serializers import UserDetailsSerializer
from .models import Profile


class CurrentUserSerializer(UserDetailsSerializer):
    avatar = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source="profile.id")
    bio = serializers.ReadOnlyField(source="profile.bio")
    is_staff = serializers.SerializerMethodField()

    def get_is_staff(self, obj):
        return obj.is_staff

    def get_avatar(self, obj):
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.profile.avatar.url)
        else:
            return f"http://localhost:8000{obj.profile.avatar.url}"

    class Meta(UserDetailsSerializer.Meta):
        fields = tuple(
            field for field in UserDetailsSerializer.Meta.fields
            # excluded fields
            if field not in ("email", "first_name", "last_name")
        ) + ("avatar", "profile_id", "is_staff", "bio")


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Profile
        fields = "__all__"
