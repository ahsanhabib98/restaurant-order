import requests
from rest_framework import permissions
from rest_framework import status, mixins, viewsets
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import (
    CreateAPIView,
    UpdateAPIView,
    RetrieveAPIView,
    DestroyAPIView,
)
from rest_framework_simplejwt.views import TokenObtainPairView
from restaurant.permissions import IsBrandOwnerOrReadOnly

from .models import User, UserInvitation
from .serializers import (
    ChangePasswordSerializer,
    CustomJwtLoginSerializer,
    UserInvitationSerializer,
    UserSerializer,
    UserUpdateSerializer,
    UserOtpCodeSerializer,
)
import logging

logger = logging.getLogger(__name__)


class CreateUserView(CreateAPIView):
    model = User
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer


class UpdateUserView(UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserUpdateSerializer

    # def get_queryset(self):
    #     return User.objects.filter(id=self.request.user.id)


class DetailUserView(RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)


class DeleteUserView(DestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)


class UserLoginView(TokenObtainPairView):
    serializer_class = CustomJwtLoginSerializer


class ChangePasswordView(UpdateAPIView):
    lookup_field = "pk"
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = ChangePasswordSerializer

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)


class UserOtpCodeUpdateView(UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserOtpCodeSerializer
    lookup_field = "phone_number"


class UserOtpCodeDetailView(RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserOtpCodeSerializer
    lookup_field = "phone_number"


class VerifyUserView(UpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = UserOtpCodeSerializer
    lookup_field = "phone_number"


class SMSGetWayView(APIView):
    def get(self, *args, **kwargs):
        phone_number = self.kwargs["phone_number"]
        otp_code = self.kwargs["otp_code"]
        sms_url = (
            "http://alphasms.biz/index.php?app=ws&u=OnnowPayment&h=f9ea0babc2ce2908e900a1f70c09ecab&op=pv&to={"
            "}&msg=Your otp code is {}".format(phone_number, otp_code)
        )

        headers = {"Content-type": "application/json"}
        _ = requests.get(url=sms_url, headers=headers)

        return Response(
            {"message": "Successfully otp message sent"},
            status=status.HTTP_202_ACCEPTED,
        )


class UserInvitationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    permission_classes = (permissions.IsAuthenticated, IsBrandOwnerOrReadOnly)
    queryset = UserInvitation.objects.all()
    serializer_class = UserInvitationSerializer
    lookup_field = "token"

    def get_queryset(self):
        return UserInvitation.objects.filter(is_used=False)

    @action(
        detail=True,
        methods=["post"],
        permission_classes=[
            permissions.AllowAny,
        ],
    )
    def create_user(self, *args, **kwargs):
        """
        {
            "password": "",
            "confirm_password": ""
        }
        """
        password = self.request.data.get("password", None)
        confirm_password = self.request.data.get("confirm_password", None)
        if not password or not confirm_password or password != confirm_password:
            return Response(
                {"message": "Invalid data."}, status=status.HTTP_400_BAD_REQUEST
            )

        invites_obj = self.get_object()
        try:
            user = User.objects.create_user(
                email=invites_obj.email,
                password=password,
                is_manager=True,
                is_verified=True,
            )
            branding = invites_obj.branding
            branding.managers.add(user)
            invites_obj.is_used = True
            invites_obj.save()
        except Exception as e:
            logger.critical(e)
            return Response(
                {"message": "Invalid data."}, status=status.HTTP_400_BAD_REQUEST
            )
        return Response(
            {"message": "User created successfully"},
            status=status.HTTP_202_ACCEPTED,
        )
