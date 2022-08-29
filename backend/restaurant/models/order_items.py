from django.utils import timezone
from accounts.models import User
from base.models.base import BaseEntity
from base.utils import AddressType, OrderStatus
from django.db import models
from django.db.models.signals import post_save
from restaurant.models.inventory import Inventory
from restaurant.models.restaurants import BrandingCustomer
from restaurant.models.outlets import Location, Outlet


class OrderItem(BaseEntity):
    outlet = models.ForeignKey(
        Outlet, on_delete=models.CASCADE, related_name="order_item", null=True, blank=True
    )
    customer = models.ForeignKey(BrandingCustomer, on_delete=models.CASCADE, related_name="order_item",
                                 null=True, blank=True)
    item = models.ForeignKey(
        Inventory, on_delete=models.CASCADE, related_name="order_item"
    )
    quantity = models.IntegerField(default=1)
    ordered = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.quantity} of {self.item.title}"

    def get_total_item_price(self):
        return self.quantity * self.item.price

    def get_total_discount_item_price(self):
        return self.quantity * self.item.discount_price

    def get_amount_saved(self):
        return self.get_total_item_price() - self.get_total_discount_item_price()

    def get_final_price(self):
        if self.item.discount_price:
            return self.get_total_discount_item_price()
        return self.get_total_item_price()


class Order(models.Model):
    outlet = models.ForeignKey(
        Outlet, on_delete=models.CASCADE, related_name="order", null=True, blank=True
    )
    customer = models.ForeignKey(
        BrandingCustomer, on_delete=models.CASCADE, related_name="order", null=True, blank=True
    )
    location = models.ForeignKey(
        Location, on_delete=models.CASCADE, related_name="order"
    )
    ref_code = models.CharField(max_length=20, null=True, blank=True)
    items = models.ManyToManyField(OrderItem, related_name="order", blank=True)
    start_date = models.DateTimeField(auto_now_add=True)
    ordered_date = models.DateTimeField(auto_now_add=True)
    ordered = models.BooleanField(default=False)
    billing_address = models.ForeignKey(
        "Address",
        related_name="billing_address",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    shipping_address = models.ForeignKey(
        "Address",
        related_name="shipping_address",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )
    payment = models.ForeignKey(
        "Payment", on_delete=models.SET_NULL, blank=True, null=True
    )
    coupon = models.ForeignKey(
        "Coupon", on_delete=models.SET_NULL, blank=True, null=True
    )
    being_delivered = models.BooleanField(default=False)
    received = models.BooleanField(default=False)
    order_date = models.DateField(auto_now_add=True)
    order_time = models.TimeField(auto_now_add=True)
    order_status = models.CharField(
        max_length=31,
        choices=OrderStatus.choices,
        default=OrderStatus.ORDER_CREATED,
    )
    total_payment = models.FloatField(default=0)

    def __str__(self):
        return str(self.customer)

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_final_price()
        if self.coupon:
            total -= self.coupon.amount
        return total


class Address(models.Model):
    customer = models.OneToOneField(
        BrandingCustomer, on_delete=models.CASCADE, related_name="address", null=True, blank=True
    )
    name = models.CharField(max_length=100)
    email = models.EmailField()
    address = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    postcode = models.CharField(max_length=100)
    address_type = models.CharField(max_length=50, choices=AddressType.choices, default=AddressType.SHIPPING)
    default = models.BooleanField(default=False)
    country = models.CharField(max_length=100)

    def __str__(self):
        return str(self.customer)

    class Meta:
        verbose_name_plural = "Addresses"


class Payment(models.Model):
    pay_charge_id = models.CharField(max_length=50)
    customer = models.ForeignKey(
        BrandingCustomer, on_delete=models.CASCADE, related_name="payment", null=True, blank=True
    )
    amount = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.customer)


class Coupon(models.Model):
    code = models.CharField(max_length=15)
    amount = models.FloatField()

    def __str__(self):
        return self.code
