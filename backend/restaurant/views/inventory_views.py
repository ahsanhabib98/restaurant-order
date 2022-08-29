from rest_framework.viewsets import ModelViewSet

from restaurant.models.restaurants import Branding
from restaurant.models.inventory import Inventory, Menus, Category
from restaurant.serializers.inventory_serializer import *


class InventoryViewSet(ModelViewSet):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer

    def get_queryset(self):
        params = self.request.GET
        subdomain = params["subdomain"]
        if subdomain == "all":
            inventory = Inventory.objects.all()
        else:
            branding = Branding.objects.get(sub_domain=subdomain)
            inventory = Inventory.objects.filter(branding=branding)
        return inventory


class MenuViewSet(ModelViewSet):
    queryset = Menus.objects.all()
    serializer_class = MenuSerializer

    def get_queryset(self):
        params = self.request.GET
        subdomain = params["subdomain"]
        if subdomain == "all":
            menus = Menus.objects.all()
        else:
            branding = Branding.objects.get(sub_domain=subdomain)
            menus = Menus.objects.filter(branding=branding)
        return menus


class CateogryViewSet(ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ModifierViewSet(ModelViewSet):
    queryset = Modifier.objects.all()
    serializer_class = ModifierSerializer

    def get_queryset(self):
        params = self.request.GET
        subdomain = params["subdomain"]
        if subdomain == "all":
            modifiers = Modifier.objects.all()
        else:
            branding = Branding.objects.get(sub_domain=subdomain)
            modifiers = Modifier.objects.filter(branding=branding)
        return modifiers
