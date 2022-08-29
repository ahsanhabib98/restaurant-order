from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from restaurant.models.outlets import Location, Outlet

class LocationChildSerializer(ModelSerializer):
    class Meta:
        model = Location
        fields = ("id", "name")


class LocationSerializer(ModelSerializer):
    child = serializers.SerializerMethodField()

    class Meta:
        model = Location
        fields = ("id", "name", "parent", "child")
        extra_kwargs = {"parent": {"write_only": True}}

    def get_child(self, obj):
        return LocationChildSerializer(
            Location.objects.filter(parent=obj), many=True
        ).data


class OutletSerializer(ModelSerializer):
    class Meta:
        model = Outlet
        fields = "__all__"
