import random
import string
import json
import requests

# import logging

from django_filters import rest_framework as filters
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db.models import Q
from rest_framework.generics import (
    CreateAPIView,
    DestroyAPIView,
    ListAPIView,
    RetrieveAPIView,
    UpdateAPIView,
)
from rest_framework.decorators import action
from rest_framework import viewsets, mixins, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework import filters as drf_filters
from rest_framework.viewsets import ModelViewSet

from base.pagination import DefaultPagination
from base.utils import OrderStatus
from accounts.models import UserProfile
from restaurant.models.restaurants import Branding, BrandingCustomer, Company
from restaurant.models.outlets import Location, Outlet
from restaurant.models.inventory import Inventory
from restaurant.models.order_items import (
    Address,
    Coupon,
    Order,
    OrderItem,
    Payment,
)
from restaurant.serializers.inventory_serializer import InventorySerializer
from restaurant.serializers.order_item_serializer import (
    AddressSerializer,
    OrderSerializer,
    PaymentSerializer,
    CustomerPaymentInformationSerializer
)


def create_ref_code():
    return "".join(random.choices(string.ascii_lowercase + string.digits, k=20))


class UserIDView(APIView):
    def get(self, request, *args, **kwargs):
        return Response({"userID": request.user.id}, status=HTTP_200_OK)


class InventoryListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = InventorySerializer
    queryset = Inventory.objects.all()


class InventoryDetailView(RetrieveAPIView):
    permission_classes = (AllowAny,)
    serializer_class = InventorySerializer
    queryset = Inventory.objects.all()


class OrderItemDeleteView(DestroyAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = OrderItem.objects.all()


class RemoveFalseOrder(APIView):
    def post(self, request, *args, **kwargs):
        phone_number = request.data.get("phone_number", None)
        if phone_number is None:
            return Response({"message": "Invalid data"}, status=HTTP_400_BAD_REQUEST)
        customer = get_object_or_404(BrandingCustomer, phone_number=phone_number)
        order_qs = Order.objects.filter(customer=customer, ordered=False)
        if order_qs.exists():
            for order in order_qs:
                for order_item in order.items.all():
                    order_item.delete()
                order.delete()
            return Response(
                {"message": "Successfully removed false order."},
                status=HTTP_200_OK,
            )
        else:
            return Response(
                {"message": "You do not have an false order."},
                status=HTTP_200_OK,
            )


class RemoveFromCartView(APIView):
    def post(self, request, *args, **kwargs):
        itemID = request.data.get("itemID", None)
        outletID = request.data.get("outletID", None)
        phone_number = request.data.get("phone_number", None)
        if itemID is None or outletID is None or phone_number is None:
            return Response({"message": "Invalid data"}, status=HTTP_400_BAD_REQUEST)
        item = get_object_or_404(Inventory, id=itemID)
        outlet = get_object_or_404(Outlet, id=outletID)
        customer = get_object_or_404(BrandingCustomer, phone_number=phone_number)
        order_qs = Order.objects.filter(outlet=outlet, customer=customer, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            # check if the order item is in the order
            if order.items.filter(item__slug=item.slug).exists():
                order_item = OrderItem.objects.filter(
                    outlet=outlet, item=item, customer=customer, ordered=False
                )[0]
                if order_item.quantity > 1:
                    order_item.quantity -= 1
                    order_item.save()
                else:
                    order.items.remove(order_item)
                return Response(status=HTTP_200_OK)
            else:
                # add a message saying that order does not contain the item
                return Response(
                    {"message": "This item was not in your cart."},
                    status=HTTP_400_BAD_REQUEST,
                )
        else:
            # add a message saying the user doesn't have an order
            return Response(
                {"message": "You do not have an active order."},
                status=HTTP_400_BAD_REQUEST,
            )


class AddToCartView(APIView):
    def post(self, request, *args, **kwargs):
        itemID = request.data.get("itemID", None)
        outletID = request.data.get("outletID", None)
        locationID = request.data.get("locationID", None)
        phone_number = request.data.get("phone_number", None)
        if (
            outletID is None
            or itemID is None
            or locationID is None
            or phone_number is None
        ):
            return Response({"message": "Invalid request"}, status=HTTP_400_BAD_REQUEST)
        item = get_object_or_404(Inventory, id=itemID)
        outlet = get_object_or_404(Outlet, id=outletID)
        location = get_object_or_404(Location, id=locationID)
        customer = get_object_or_404(BrandingCustomer, phone_number=phone_number)

        order_item_qs = OrderItem.objects.filter(
            outlet=outlet, item=item, customer=customer, ordered=False
        )

        if order_item_qs.exists():
            order_item = order_item_qs.first()
            order_item.quantity += 1
            order_item.save()
        else:
            order_item = OrderItem.objects.create(
                outlet=outlet, item=item, customer=customer, ordered=False
            )

        order_qs = Order.objects.filter(outlet=outlet, customer=customer, ordered=False)
        if order_qs.exists():
            order = order_qs[0]
            # check if the order item is in the order
            if not order.items.filter(item__id=order_item.id).exists():
                order.items.add(order_item)
            return Response(status=HTTP_200_OK)
        else:
            ordered_date = timezone.now()
            order = Order.objects.create(
                outlet=outlet,
                customer=customer,
                location=location,
                ordered_date=ordered_date,
            )
            order.items.add(order_item)
            return Response(status=HTTP_200_OK)


class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer

    def get_object(self):
        phone_number = self.request.GET['phone_number']
        try:
            customer = BrandingCustomer.objects.get(phone_number=phone_number)
            order = Order.objects.get(customer=customer, ordered=False)
            return order
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")
            # return Response({"message": "You do not have an active order"}, status=HTTP_400_BAD_REQUEST)


class OrderUpdateView(UpdateAPIView):
    serializer_class = OrderSerializer
    permission_classes = (AllowAny,)

    def get_object(self):
        orderID = self.kwargs.get('id')
        import logging
        logging.getLogger().critical(self.request.data)
        total_payment = self.request.data.get('total_payment')
        try:
            order = Order.objects.get(id=orderID)
            for order_item in order.items.all():
                order_item.ordered = True
                order_item.save()
            order.ordered = True
            order.total_payment = total_payment
            order.save()
            return order
        except ObjectDoesNotExist:
            raise Http404("You do not have an active order")


class PaymentView(APIView):
    def post(self, request, *args, **kwargs):
        _ = Order.objects.get(user=self.request.user, ordered=False)
        _ = UserProfile.objects.get(user=self.request.user)
        _ = request.data.get("amarPayToken")
        billing_address_id = request.data.get("selectedBillingAddress")
        shipping_address_id = request.data.get("selectedShippingAddress")

        _ = Address.objects.get(id=billing_address_id)
        _ = Address.objects.get(id=shipping_address_id)

        # if userprofile.amar_pay_customer_id != '' and userprofile.amar_pay_customer_id is not None:
        #     customer = stripe.Customer.retrieve(
        #         userprofile.stripe_customer_id)
        #     customer.sources.create(source=token)
        #
        # else:
        #     customer = stripe.Customer.create(
        #         email=self.request.user.email,
        #     )
        #     customer.sources.create(source=token)
        #     userprofile.stripe_customer_id = customer['id']
        #     userprofile.one_click_purchasing = True
        #     userprofile.save()
        #
        # amount = int(order.get_total() * 100)

        # try:
        #     # we cannot charge the token more than once
        #     charge = stripe.Charge.create(
        #         amount=amount,  # cents
        #         currency="usd",
        #         customer=userprofile.stripe_customer_id
        #     )

        # # charge once off on the token
        # charge = stripe.Charge.create(
        #     amount=amount,  # cents
        #     currency="usd",
        #     source=token
        # )

        # create the payment
        #     payment = Payment()
        #     payment.stripe_charge_id = charge['id']
        #     payment.user = self.request.user
        #     payment.amount = order.get_total()
        #     payment.save()
        #
        #     # assign the payment to the order
        #
        #     order_items = order.items.all()
        #     order_items.update(ordered=True)
        #     for item in order_items:
        #         item.save()
        #
        #     order.ordered = True
        #     order.payment = payment
        #     order.billing_address = billing_address
        #     order.shipping_address = shipping_address
        #     # order.ref_code = create_ref_code()
        #     order.save()
        #
        #     return Response(status=HTTP_200_OK)
        #
        # except stripe.error.CardError as e:
        #     body = e.json_body
        #     err = body.get('error', {})
        #     return Response({"message": f"{err.get('message')}"}, status=HTTP_400_BAD_REQUEST)
        #
        # except stripe.error.RateLimitError as e:
        #     # Too many requests made to the API too quickly
        #     return Response({"message": "Rate limit error"}, status=HTTP_400_BAD_REQUEST)
        #
        # except stripe.error.InvalidRequestError as e:
        #     # Invalid parameters were supplied to Stripe's API
        #     return Response({"message": "Invalid parameters"}, status=HTTP_400_BAD_REQUEST)
        #
        # except stripe.error.AuthenticationError as e:
        #     # Authentication with Stripe's API failed
        #     # (maybe you changed API keys recently)
        #     return Response({"message": "Not authenticated"}, status=HTTP_400_BAD_REQUEST)
        #
        # except stripe.error.APIConnectionError as e:
        #     # Network communication with Stripe failed
        #     return Response({"message": "Network error"}, status=HTTP_400_BAD_REQUEST)
        #
        # except stripe.error.StripeError as e:
        #     # Display a very generic error to the user, and maybe send
        #     # yourself an email
        #     return Response({"message": "Something went wrong. You were not charged. Please try again."},
        #                     status=HTTP_400_BAD_REQUEST)
        #
        # except Exception as e:
        #     # send an email to ourselves
        #     return Response({"message": "A serious error occurred. We have been notifed."},
        # status=HTTP_400_BAD_REQUEST)
        #
        # return Response({"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST)


class AddCouponView(APIView):
    def post(self, request, *args, **kwargs):
        code = request.data.get("code", None)
        if code is None:
            return Response(
                {"message": "Invalid data received"}, status=HTTP_400_BAD_REQUEST
            )
        order = Order.objects.get(user=self.request.user, ordered=False)
        coupon = get_object_or_404(Coupon, code=code)
        order.coupon = coupon
        order.save()
        return Response(status=HTTP_200_OK)


class AddressViewSet(ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class PaymentListView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PaymentSerializer

    def get_queryset(self):
        return Payment.objects.filter(user=self.request.user)


class BrandingWiseOrderList(ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def get_queryset(self):
        subdomain = self.kwargs["subdomain"]
        if subdomain == "all":
            company = Company.objects.get(owner=self.request.user)
            orders = Order.objects.filter(outlet__branding__company=company)
        else:
            branding = Branding.objects.get(sub_domain=subdomain)
            orders = Order.objects.filter(outlet__branding=branding)
        return orders


class OrderHistoryListView(ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [
        IsAuthenticated,
    ]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_owner:
            orders = Order.objects.filter(outlet__branding__company=user.company)
            return orders
        elif user.is_authenticated and user.is_superuser:
            orders = Order.objects.all()
            return orders


class CustomerAPIView(APIView):
    def get(self, request, user):
        queryset = Order.objects.get(user=user)
        serializer = OrderSerializer(queryset, many=True)
        return Response(serializer.data)


class CustomerPaymentInformationAPIView(APIView):
    def post(self, request):
        domain_url = request.data.get("domain_url", None)
        addressID = request.data.get("addressID", None)
        amount = request.data.get("amount", None)
        desc = request.data.get("desc", None)
        orderID = request.data.get("orderID", None)

        if (
            domain_url is None
            or addressID is None
            or amount is None
            or desc is None
            or orderID is None
        ):
            return Response({"message": "Invalid request"}, status=HTTP_400_BAD_REQUEST)

        address = Address.objects.get(id=addressID)
        serializer = CustomerPaymentInformationSerializer(address)
        update_data = {
            'success_url': '{}?success=True&order={}'.format(domain_url, orderID),
            'fail_url': '{}?fail=True&order={}'.format(domain_url, orderID),
            'cancel_url': '{}?cancel=True&order={}'.format(domain_url, orderID),
            'amount': amount,
            'desc': desc,
            'type': 'json',
        }
        response = serializer.data
        response.update(update_data)

        amar_pay_test_url = 'https://sandbox.aamarpay.com/jsonpost.php'
        headers = {'Content-type': 'application/json'}
        amar_pay_res = requests.post(url=amar_pay_test_url, data=json.dumps(response), headers=headers)
        return Response(amar_pay_res)


class OrderFilter(filters.FilterSet):
    order_status = filters.CharFilter(method="filter_order_status")
    by_id = filters.CharFilter(field_name="id")
    phone_number = filters.CharFilter(field_name="customer__phone_number")
    start_date_from = filters.CharFilter(field_name="start_date", lookup_expr="gte")
    start_date_to = filters.CharFilter(field_name="start_date", lookup_expr="lte")

    def filter_order_status(self, queryset, name, value):
        if value is None:
            return queryset
        try:
            if OrderStatus.ORDER_PLACED == value:
                return queryset.exclude(
                    Q(order_status=OrderStatus.ORDER_CREATED)
                    | Q(order_status=OrderStatus.ORDER_CANCELLED)
                )
            return queryset.filter(order_status=value)
        except Exception:
            return queryset.none()

    class Meta:
        model = Order
        fields = [
            "order_status",
            "by_id",
            "phone_number",
            "start_date_from",
            "start_date_to",
        ]


class OrderViewSet(
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    permission_classes = [IsAuthenticated]
    serializer_class = OrderSerializer
    queryset = Order.objects.filter()
    filterset_class = OrderFilter
    filter_backends = [filters.DjangoFilterBackend, drf_filters.SearchFilter]
    pagination_class = DefaultPagination
    # search_fields = ("name",)

    def get_queryset(self):
        return Order.objects.filter(
            outlet__branding__company__owner=self.request.user
        ).exclude(order_status=OrderStatus.ORDER_CANCELLED)

    # def get_queryset(self):
    #     params = self.request.GET
    #     if params["subdomain"] == "all":
    #         return Order.objects.filter(
    #             outlet__branding__company__owner=self.request.user
    #         ).exclude(order_status=OrderStatus.ORDER_CANCELLED)
    #     else:
    #         self.get_queryset().none()

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def meta(self, *args, **kwargs):
        params = self.request.GET
        if params["subdomain"] == "all":
            queryset = Order.objects.filter(
                outlet__branding__company__owner=self.request.user
            )
        else:
            queryset = Order.objects.none()
        data = [
            {
                "status": s,
                "label": label,
                "total": queryset.filter(order_status=s).count(),
            }
            for s, label in OrderStatus.choices
        ]
        return Response(status=status.HTTP_200_OK, data=data)
