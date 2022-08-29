from base.models.base import BaseEntity
from django.db import models

from base.utils import TaxStatus, PaymentMethod
from restaurant.models.restaurants import Branding


class Location(BaseEntity):
    name = models.CharField(max_length=120)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='child')

    def __str__(self):
        return self.name


class Outlet(models.Model):
    branding = models.ForeignKey(Branding, on_delete=models.CASCADE, related_name='branding_outlet')
    name = models.CharField(max_length=120)
    avatar = models.ImageField(upload_to='outlet_avatar', blank=True, null=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    address = models.CharField(max_length=200)
    delivery_time_min = models.IntegerField(default=0)
    delivery_time_max = models.IntegerField(default=0)
    delivery_fee = models.IntegerField(default=0)
    tax_rate = models.IntegerField(default=0)
    tax_status = models.CharField(max_length=20, choices=TaxStatus.choices, default=TaxStatus.EXCLUSIVE)
    delivery_area = models.ManyToManyField(Location, related_name='delivery_outlet')
    payment_method = models.CharField(max_length=20, choices=PaymentMethod.choices, default=PaymentMethod.CASH)
    description = models.TextField()
    tag_line = models.CharField(max_length=100)
    is_cash_pay = models.BooleanField(default=False)
    is_card_pay = models.BooleanField(default=False)

    def __str__(self):
        return self.name
