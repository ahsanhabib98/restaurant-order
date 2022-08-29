from accounts.serializers import UserSerializer
from rest_framework import serializers
from restaurant.models.order_items import Order
from restaurant.models.restaurants import (
    Company,
    CompanyDiscount,
    Branding,
    BrandingCustomer,
    MarketingBrand,
    Day
)
from django.utils.text import slugify

from restaurant.serializers.order_item_serializer import AddressSerializer, OrderSerializer


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Day
        fields = "__all__"


class BrandingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branding
        fields = '__all__'

    def validate(self, attrs):
        if attrs.get("sub_domain"):
            subdomain = slugify(attrs.get("sub_domain"))
            if Branding.objects.filter(sub_domain=subdomain).exists():
                raise serializers.ValidationError(
                    {"sub_domain": "This domain already taken."}
                )
        return attrs


class BrandingCustomerSerializer(serializers.ModelSerializer):
    address = serializers.SerializerMethodField()
    orders = serializers.SerializerMethodField()

    class Meta:
        model = BrandingCustomer
        fields = '__all__'

    def get_address(self, obj):
        try:
            return AddressSerializer(obj.address).data
        except:
            return None

    def get_orders(self, obj):
        return OrderSerializer(obj.order.all(), many=True).data


class CompanySerializer(serializers.ModelSerializer):
    branding = serializers.SerializerMethodField(required=False)
    discount = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = ("id", "name", "is_allow", "branding", "discount")

    def get_branding(self, obj):
        return BrandingSerializer(obj.company_branding.all(), many=True).data

    def get_discount(self, obj):
        try:
            return CompanyDiscountSerializer(obj.company_discount.all()[len(obj.company_discount.all())-1]).data
        except:
            return None


class CompanyOwnerSerializer(serializers.ModelSerializer):
    email = serializers.SerializerMethodField()
    phone_number = serializers.SerializerMethodField()
    user_id = serializers.SerializerMethodField()

    class Meta:
        model = Company
        fields = ("id", "name", "email", "phone_number", "user_id")

    def get_email(self, obj):
        return obj.owner.email

    def get_phone_number(self, obj):
        return obj.owner.phone_number

    def get_user_id(self, obj):
        return obj.owner.id


class CompanyDiscountSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyDiscount
        fields = '__all__'


class RestaurantSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)

    class Meta:
        model = Branding
        fields = ("id", "name", "owner", "sub_domain", "avatar")
        read_only_fields = ["owner"]

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response["owner"] = UserSerializer(instance.owner).data
        return response


class RestaurantOrderListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["customer", "order"]


class MarketingBrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = MarketingBrand
        fields = '__all__'
