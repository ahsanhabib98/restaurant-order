from rest_framework.viewsets import ModelViewSet
from restaurant.models.outlets import Location, Outlet
from restaurant.models.restaurants import Branding
from restaurant.serializers.outlet_serializer import (
    LocationSerializer,
    OutletSerializer,
)

from ..permissions import IsOutletOwnerOrReadOnly


class LocationViewSet(ModelViewSet):
    queryset = Location.objects.filter(parent=None)
    serializer_class = LocationSerializer

    def get_queryset(self):
        params = self.request.GET
        subdomain = params["subdomain"]
        if subdomain == "all":
            location = Location.objects.filter(parent=None)
        else:
            branding = Branding.objects.get(sub_domain=subdomain)
            location = Location.objects.filter(delivery_outlet__branding=branding)
        return location


class OutletViewSet(ModelViewSet):
    permission_classes = (IsOutletOwnerOrReadOnly,)
    queryset = Outlet.objects.all()
    serializer_class = OutletSerializer

    def get_queryset(self):
        subdomain = self.request.GET["subdomain"]
        if subdomain == "all":
            outlet = Outlet.objects.all()
        else:
            branding = Branding.objects.get(sub_domain=subdomain)
            outlet = Outlet.objects.filter(branding=branding)
        return outlet
