from rest_framework import serializers
from restaurant.models.restaurants import Branding
from restaurant.models.order_items import (
    Address,
    Coupon,
    Order,
    OrderItem,
    Payment,
)
from restaurant.serializers.inventory_serializer import InventorySerializer

import string
import random


# from accounts.serializers import UserSerializer


class CouponSerializer(serializers.ModelSerializer):
    class Meta:
        model = Coupon
        fields = ("id", "code", "amount")


class OrderItemSerializer(serializers.ModelSerializer):
    item = serializers.SerializerMethodField()
    final_price = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = ("id", "item", "quantity", "final_price")

    def get_item(self, obj):
        return InventorySerializer(obj.item).data

    def get_final_price(self, obj):
        return obj.get_final_price()


class BrandingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branding
        fields = ("id", "name")


class OrderSerializer(serializers.ModelSerializer):
    order_items = serializers.SerializerMethodField()
    total = serializers.SerializerMethodField()
    coupon = serializers.SerializerMethodField()
    branding = BrandingSerializer(read_only=True)

    customer_phone = serializers.SerializerMethodField()
    location_name = serializers.SerializerMethodField()
    outlet_name = serializers.SerializerMethodField()
    brand_name = serializers.SerializerMethodField()
    payment_method = serializers.SerializerMethodField()
    customer_address = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = (
            "id",
            "order_items",
            "total",
            "total_payment",
            "coupon",
            "customer",
            "ref_code",
            "items",
            "start_date",
            "ordered_date",
            "ordered",
            "order_date",
            "order_time",
            "order_status",
            "branding",
            "customer_phone",
            "location_name",
            "outlet_name",
            "payment_method",
            "brand_name",
            "customer_address",
        )

    def get_order_items(self, obj):
        return OrderItemSerializer(obj.items.all(), many=True).data

    def get_total(self, obj):
        return obj.get_total()

    def get_coupon(self, obj):
        if obj.coupon is not None:
            return CouponSerializer(obj.coupon).data
        return None

    def get_customer_phone(self, obj):
        if obj.customer:
            return obj.customer.phone_number
        return None

    def get_location_name(self, obj):
        if obj.location:
            return obj.location.name
        return None

    def get_outlet_name(self, obj):
        if obj.outlet:
            return obj.outlet.name
        return None

    def get_payment_method(self, obj):
        if obj.outlet:
            return obj.outlet.payment_method
        return None

    def get_brand_name(self, obj):
        if obj.outlet and obj.outlet.branding:
            return obj.outlet.branding.name
        return None

    def get_customer_address(self, obj):
        if obj.customer:
            return AddressSerializer(obj.customer.address).data
        return None


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = "__all__"


class CustomerPaymentInformationSerializer(serializers.ModelSerializer):
    store_id = serializers.SerializerMethodField()
    tran_id = serializers.SerializerMethodField()
    signature_key = serializers.SerializerMethodField()
    currency = serializers.SerializerMethodField()
    cus_name = serializers.SerializerMethodField()
    cus_email = serializers.SerializerMethodField()
    cus_add1 = serializers.SerializerMethodField()
    cus_add2 = serializers.SerializerMethodField()
    cus_city = serializers.SerializerMethodField()
    cus_state = serializers.SerializerMethodField()
    cus_postcode = serializers.SerializerMethodField()
    cus_country = serializers.SerializerMethodField()
    cus_phone = serializers.SerializerMethodField()

    class Meta:
        model = Address
        fields = (
            "store_id",
            "tran_id",
            "signature_key",
            "currency",
            "cus_name",
            "cus_email",
            "cus_add1",
            "cus_add2",
            "cus_city",
            "cus_state",
            "cus_postcode",
            "cus_country",
            "cus_phone",
        )

    def get_store_id(self, obj):
        store_id = "aamarpaytest"
        return store_id

    def get_tran_id(self, obj):
        tran_id = "".join(random.choices(string.ascii_uppercase + string.digits, k=7))
        return tran_id

    def get_signature_key(self, obj):
        signature_key = "dbb74894e82415a2f7ff0ec3a97e4183"
        return signature_key

    def get_currency(self, obj):
        currency = "BDT"
        return currency

    def get_cus_name(self, obj):
        return obj.name

    def get_cus_email(self, obj):
        return obj.email

    def get_cus_add1(self, obj):
        return obj.address

    def get_cus_add2(self, obj):
        return obj.address

    def get_cus_city(self, obj):
        return obj.city

    def get_cus_state(self, obj):
        return obj.state

    def get_cus_postcode(self, obj):
        return obj.postcode

    def get_cus_country(self, obj):
        return obj.country

    def get_cus_phone(self, obj):
        return obj.customer.phone_number


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ("id", "amount", "timestamp")
