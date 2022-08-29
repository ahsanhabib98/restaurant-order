from django.db import models
from django.utils.translation import gettext_lazy as _
from enum import IntEnum


class UserStatus(models.TextChoices):
    CUSTOMER = "CUSTOMER", _("CUSTOMER")
    MANAGER = "MANAGER", _("MANAGER")


class TaxStatus(models.TextChoices):
    INCLUSIVE = "INCLUSIVE", _("INCLUSIVE")
    EXCLUSIVE = "EXCLUSIVE", _("EXCLUSIVE")


class PaymentMethod(models.TextChoices):
    CARD = "CARD", _("Card")
    CASH = "CASH", _("Cash")


class AddressType(models.TextChoices):
    BILLING = "BILLING", _("Billing")
    SHIPPING = "SHIPPING", _("Shipping")


class InventoryType(models.TextChoices):
    ITEM = "ITEM", _("Item")
    MODIFIER = "MODIFIER", _("Modifier")


class ModifierType(models.TextChoices):
    SINGLE = "SINGLE", _("Single")
    Multiple = "Multiple", _("MULTIPLE")


class PlatformChoice(models.TextChoices):
    ONNO = "ONNO", _("Onno")


class OrderStatus(models.TextChoices):
    ORDER_CREATED = "ORDER_CREATED", _("Order Created")
    ORDER_PLACED = "ORDER_PLACED", _("Order Placed")
    CUSTOMER_CONFIRMED = "CUSTOMER_CONFIRMED", _("Customer Confirmed")
    RIDER_CONFIRMED = "RIDER_CONFIRMED", _("Rider Confirmed")
    PREPARING = "PREPARING", _("Preparing")
    WAITING = "WAITING", _("Waitting")
    DISPATCHED = "DISPATCHED", _("Dispatched")
    DELIVERY = "DELIVERY", _("Delivery")
    ORDER_CANCELLED = "ORDER_CANCELLED", _("Order Cancelled")


class DiscountType(models.TextChoices):
    PERCENTAGE = "PERCENTAGE_VALUE", _("Percentage Value")
    FIXED_VALUE = "FIXED_VALUE", _("Fixed Value")
