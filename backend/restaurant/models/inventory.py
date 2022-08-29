from base.models.base import BaseEntity
from django.db import models

from base.utils import ModifierType, InventoryType, PlatformChoice
from restaurant.models.restaurants import Branding


class Inventory(BaseEntity):
    branding = models.ForeignKey(Branding, on_delete=models.CASCADE, related_name='branding_inventory')
    title = models.CharField(max_length=120)
    slug = models.SlugField(null=True, blank=True)
    description = models.TextField()
    feature = models.CharField(max_length=180, blank=True, null=True)
    price = models.IntegerField(default=0)
    discount_price = models.FloatField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    avatar = models.ImageField(upload_to='inventory_avatar', null=True, blank=True)
    item_type = models.CharField(max_length=10, choices=InventoryType.choices, default=InventoryType.ITEM)

    def __str__(self):
        return self.title


class Menus(BaseEntity):
    branding = models.ForeignKey(Branding, on_delete=models.CASCADE, related_name='branding_menu', blank=True,
                                 null=True)
    name = models.CharField(max_length=120)
    platform = models.CharField(max_length=10, choices=PlatformChoice.choices, default=PlatformChoice.ONNO)
    notes = models.CharField(max_length=400)
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=120)
    menus = models.ForeignKey(Menus, on_delete=models.CASCADE, related_name='category')
    items = models.ManyToManyField(Inventory, blank=True, related_name='category')

    def __str__(self):
        return self.name


class Modifier(BaseEntity):
    branding = models.ForeignKey(Branding, on_delete=models.CASCADE, related_name='branding_modifier', blank=True,
                                 null=True)
    name = models.CharField(max_length=200)
    display_name = models.CharField(max_length=200)
    min = models.IntegerField(default=0)
    max = models.IntegerField(default=0)
    modifier_type = models.CharField(max_length=10, choices=ModifierType.choices, default=ModifierType.SINGLE)
    items = models.ManyToManyField(Inventory, blank=True, related_name='modifier')

    def __str__(self):
        return self.name
