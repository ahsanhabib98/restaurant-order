from __future__ import unicode_literals

from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.db.models.signals import post_save
from django.utils.translation import ugettext_lazy as _
import uuid

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(_("username"), max_length=30, blank=True)
    email = models.EmailField(_("email address"), unique=True)
    phone_number = models.CharField(
        _("phone number"), max_length=20, unique=True, blank=True, null=True
    )
    first_name = models.CharField(_("first name"), max_length=30, blank=True, null=True)
    last_name = models.CharField(_("last name"), max_length=30, blank=True, null=True)
    date_joined = models.DateTimeField(_("date joined"), auto_now_add=True)
    is_active = models.BooleanField(_("active"), default=True)
    is_owner = models.BooleanField(_("Is owner"), default=False)
    is_manager = models.BooleanField(_("Is Manager"), default=False)
    is_staff = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    otp_code = models.CharField(max_length=10, null=True, blank=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def __str__(self):
        if self.first_name and self.last_name:
            return f"{self.first_name} {self.last_name}"
        elif self.first_name:
            return self.first_name
        return self.email


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    pay_customer_id = models.CharField(max_length=50, null=True, blank=True)
    one_click_purchasing = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user)


class UserInvitation(models.Model):
    token = models.UUIDField(default=uuid.uuid4, unique=True)
    branding = models.ForeignKey(
        "restaurant.Branding",
        related_name="user_invitations",
        on_delete=models.CASCADE,
        null=True,
    )
    email = models.EmailField(_("email address"))
    is_used = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.email


def userprofile_receiver(sender, instance, created, *args, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)


post_save.connect(userprofile_receiver, sender=User)
