from django.shortcuts import get_object_or_404
from dj_rest_auth.views import UserDetailsView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from main.permissions import IsOwnerOrReadOnly
from .serializers import CurrentUserSerializer, ProfileSerializer
from .models import Profile


class CustomUserDetailsView(UserDetailsView):
    serializer_class = CurrentUserSerializer


class ProfileList(generics.ListAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [AllowAny]


class ProfileDetail(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    permission_classes = [IsOwnerOrReadOnly]
    lookup_field = "owner__username"
    lookup_url_kwarg = "username"

    def get_object(self):
        queryset = self.get_queryset()
        filter_kwargs = {
            self.lookup_field: self.kwargs.get(self.lookup_url_kwarg)}
        return get_object_or_404(queryset, **filter_kwargs)


class DeleteAccount(APIView):
    def delete(self, request, *args, **kwargs):
        user = request.user
        user.delete()
        return Response({"detail:" "Account deleted successfully."})
