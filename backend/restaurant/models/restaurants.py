from accounts.models import User
from base.models.base import BaseEntity
from base.utils import DiscountType
from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.db.models.signals import post_save

import datetime


class Company(models.Model):
    owner = models.OneToOneField(
        User, on_delete=models.CASCADE, null=True, related_name="company"
    )
    name = models.CharField(max_length=100)
    is_allow = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Branding(models.Model):
    company = models.ForeignKey(
        Company, on_delete=models.CASCADE, related_name="company_branding"
    )
    name = models.CharField(max_length=120)
    sub_domain = models.CharField(max_length=180, blank=True, null=True)
    logo = models.ImageField(upload_to="branding_logo", blank=True, null=True)
    managers = models.ManyToManyField(User, related_name="brandings", blank=True)

    def __str__(self):
        return self.name


class BrandingCustomer(models.Model):
    phone_number = models.CharField(
        _("phone number"), max_length=20, unique=True, blank=True, null=True
    )
    branding = models.ManyToManyField(
        Branding, related_name="branding_customer", blank=True
    )
    is_verify = models.BooleanField(default=False)
    otp_code = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return f"{self.phone_number}"


days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]


class Day(BaseEntity):
    name = models.CharField(max_length=100)
    is_open = models.BooleanField(default=True)
    start_time = models.TimeField(default=datetime.time(11, 00))
    end_time = models.TimeField(default=datetime.time(23, 00))
    branding = models.ForeignKey(
        Branding, on_delete=models.CASCADE, related_name="branding_opening_day"
    )

    def __str__(self):
        return self.name


class MarketingBrand(models.Model):
    base_color = models.CharField(max_length=100, null=True, blank=True)
    text_color = models.CharField(max_length=100, null=True, blank=True)
    cover_photo = models.ImageField(
        upload_to="company_brand_avatar", blank=True, null=True
    )
    branding = models.OneToOneField(
        Branding, on_delete=models.CASCADE, null=True, related_name="marketing_brand"
    )

    def __str__(self):
        return str(self.branding)


def marketing_brand_receiver(sender, instance, created, *args, **kwargs):
    if created:
        MarketingBrand.objects.create(branding=instance)


post_save.connect(marketing_brand_receiver, sender=Branding)


class CompanyDiscount(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name="company_discount",
                                null=True, blank=True)
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=100)
    type = models.CharField(max_length=20, choices=DiscountType.choices, default=DiscountType.PERCENTAGE)
    amount = models.IntegerField(default=0)
    minimum_order_value = models.IntegerField(default=0)
    maximum_discount = models.IntegerField(default=0)
    number_of_uses = models.IntegerField(default=0)
    start_date = models.DateField(null=True, blank=True)
    start_time = models.TimeField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)

    def __str__(self):
        return self.name
