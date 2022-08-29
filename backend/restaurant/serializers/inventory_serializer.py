from rest_framework import serializers
from restaurant.models.inventory import Inventory, Menus, Category, Modifier


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = [
            'id', 'title', 'is_active', 'price', 'discount_price', 'description', 'feature', 'branding',
            'avatar', 'item_type', 'created_at'
        ]


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menus
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    menus = MenuSerializer()
    items = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = (
            'id', 'name', 'menus', 'items'
        )

    def get_items(self, instance):
        return InventorySerializer(instance.items.all(), many=True).data


class ModifierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modifier
        fields = (
            'id', 'branding', 'name', 'display_name', 'min', 'max', 'modifier_type', 'items', 'created_at'
        )
        depth = 1
