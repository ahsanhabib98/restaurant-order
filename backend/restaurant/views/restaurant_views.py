import random
import string
import logging

from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status  # , viewsets, mixins

from django.utils.text import slugify

from accounts.serializers import UserSerializer
from ..permissions import IsBrandOwnerOrReadOnly, IsCompanyOwnerOrReadOnly

from restaurant.models.order_items import Order
from restaurant.models.restaurants import (
    Company,
    CompanyDiscount,
    Branding,
    BrandingCustomer,
    MarketingBrand,
    Day,
)
from restaurant.models.inventory import Inventory
from restaurant.serializers.restaurant_serializer import (
    CompanySerializer,
    CompanyOwnerSerializer,
    CompanyDiscountSerializer,
    RestaurantOrderListSerializer,
    BrandingSerializer,
    BrandingCustomerSerializer,
    DaySerializer,
    MarketingBrandSerializer,
)

log = logging.getLogger().critical


class CompanyViewSet(ModelViewSet):
    permission_classes = (IsCompanyOwnerOrReadOnly,)
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    def perform_create(self, serializer):
        company = serializer.save(owner=self.request.user)
        company.save()

    def perform_update(self, serializer):
        company = serializer.save(owner=self.request.user)
        company.save()

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_owner:
            return Company.objects.filter(owner_id=self.request.user.id)
        return super().get_queryset()


class CompanyDiscountViewSet(ModelViewSet):
    queryset = CompanyDiscount.objects.all()
    serializer_class = CompanyDiscountSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_owner:
            return CompanyDiscount.objects.filter(company=self.request.user.company)
        return super().get_queryset()


class MarketingBrandViewSet(ModelViewSet):
    queryset = MarketingBrand.objects.all()
    serializer_class = MarketingBrandSerializer

    def get_queryset(self):
        params = self.request.GET
        if params["subdomain"] == "all":
            company = Company.objects.get(owner=self.request.user)
            branding = MarketingBrand.objects.filter(branding__company=company)
        else:
            branding = MarketingBrand.objects.filter(
                branding__sub_domain=params["subdomain"]
            )
        return branding


class BrandingViewSet(ModelViewSet):
    permission_classes = (IsBrandOwnerOrReadOnly,)
    queryset = Branding.objects.all()
    serializer_class = BrandingSerializer

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated:
            if user.is_owner:
                return Branding.objects.filter(company__owner_id=self.request.user.id)
            elif user.is_manager:
                return Branding.objects.filter(managers__id=self.request.user.id)
        return super().get_queryset()


class BrandingWiseCompany(APIView):
    def get(self, request, *args, **kwargs):
        subdomain = self.kwargs["subdomain"]
        if subdomain is None:
            return Response(
                {"message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST
            )
        branding_company = Branding.objects.get(sub_domain=subdomain).company
        serializer = CompanySerializer(branding_company)
        return Response(serializer.data)


class CompanyBrandingManager(APIView):
    def get(self, request, *args, **kwargs):
        companyID = self.kwargs["id"]
        if companyID is None:
            return Response(
                {"message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST
            )
        company = Company.objects.get(id=companyID)
        brandings = Branding.objects.filter(company=company)
        managers = []
        for branding in brandings:
            managers += branding.managers.all()
        serializer = UserSerializer(managers, many=True)
        return Response(serializer.data)

    # def perform_create(self, serializer):
    #     branding = serializer.save(company=self.request.user.company)
    #     name = serializer.validated_data["name"]
    #     subdomain = slugify(name)
    #     if Branding.objects.filter(sub_domain=subdomain).exists():
    #         subdomain = (
    #             subdomain
    #             + "-"
    #             + "".join(random.choices(string.ascii_lowercase + string.digits, k=4))
    #         )
    #         branding.sub_domain = subdomain
    #         branding.save()
    #     else:
    #         branding.sub_domain = subdomain
    #         branding.save()

    # def perform_update(self, serializer):
    #     branding = serializer.save(company=self.request.user.company)
    #     name = serializer.validated_data["name"]
    #     subdomain = slugify(name)
    #     if Branding.objects.filter(sub_domain=subdomain).exists():
    #         subdomain = (
    #                 subdomain
    #                 + "-"
    #                 + "".join(random.choices(string.ascii_lowercase + string.digits, k=4))
    #         )
    #         branding.sub_domain = subdomain
    #         branding.save()
    #     else:
    #         branding.sub_domain = subdomain
    #         branding.save()


# class PublicBrandingViewSet(
#     mixins.ListModelMixin, mixins.RetrieveModelMixin, viewsets.GenericViewSet
# ):
#     permission_classes = (AllowAny,)
#     queryset = Branding.objects.all()
#     serializer_class = BrandingSerializer


class DayViewSet(ModelViewSet):
    queryset = Day.objects.all()
    serializer_class = DaySerializer


class BrandingCustomerViewSet(ModelViewSet):
    queryset = BrandingCustomer.objects.all()
    serializer_class = BrandingCustomerSerializer
    permission_classes = (AllowAny,)
    lookup_field = "phone_number"

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and user.is_owner:
            branding_list = self.request.user.company.company_branding.all()
            customer_list = []
            for branding in branding_list:
                customer_list += branding.branding_customer.all()
            return customer_list
        elif user.is_authenticated and user.is_superuser:
            return BrandingCustomer.objects.all()
        return super().get_queryset()


class RestaurantOrderList(ListAPIView):
    serializer_class = RestaurantOrderListSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)


# class BrandingUserViewSet(ModelViewSet):
#     queryset = BrandingUser.objects.all()
#     serializer_class = BrandingUserSerializer


class CompanyRequestOwners(APIView):
    def get(self, *args, **kwargs):
        owners = Company.objects.filter(owner__is_active=False, owner__is_owner=True)
        response = CompanyOwnerSerializer(owners, many=True).data
        return Response(response, status=status.HTTP_202_ACCEPTED)


# class AddUserToRestaurant(APIView):
#     def get(self, *args, **kwargs):
#         subdomain = self.kwargs["subdomain"]
#         restaurant = Branding.objects.get(sub_domain=subdomain)
#         user = self.request.user
#         BrandingUser.objects.create(user=user, restaurant=restaurant)
#         return Response(
#             {"message": "Successfully added user"}, status=status.HTTP_202_ACCEPTED
#         )


class RestaurantInventoryDiscount(APIView):
    def post(self, request, *args, **kwargs):
        subdomain = self.kwargs["subdomain"]
        discount = request.data.get("discount", None)
        if subdomain is None:
            return Response(
                {"message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST
            )
        restaurant = Branding.objects.get(sub_domain=subdomain)
        items = Inventory.objects.filter(outlet__restaurant=restaurant)
        for item in items:
            item.discount_price = discount
            item.save()
        return Response(
            {"message": "Successfully added discount"}, status=status.HTTP_202_ACCEPTED
        )

    def get(self, request, *args, **kwargs):
        subdomain = self.kwargs["subdomain"]
        if subdomain is None:
            return Response(
                {"message": "Invalid request"}, status=status.HTTP_400_BAD_REQUEST
            )
        restaurant = Branding.objects.get(sub_domain=subdomain)
        item = Inventory.objects.filter(outlet__restaurant=restaurant).first()
        data = {}
        if item:
            data["discount"] = item.discount_price
        return Response(
            data=data,
            status=status.HTTP_202_ACCEPTED,
        )


class DashboardWiseCustomerOrder(APIView):
    def get(self, *args, **kwargs):
        user = self.request.user
        customer_list = []
        if user.is_authenticated and user.is_owner:
            branding_list = self.request.user.company.company_branding.all()
            customer_list = []
            for branding in branding_list:
                customer_list += branding.branding_customer.all()
            customer_list = list(dict.fromkeys(customer_list))
        elif user.is_authenticated and user.is_superuser:
            customer_list = BrandingCustomer.objects.all()

        new_number_of_orders = 0
        new_number_of_customers = 0
        returning_number_of_orders = 0
        returning_number_of_customers = 0
        total_new_sales = 0
        total_returning_sales = 0
        for customer in customer_list:
            orders = customer.order.all()
            if len(orders) == 1:
                new_number_of_orders += 1
                new_number_of_customers += 1
                for order in orders:
                    total_new_sales += order.total_payment

            elif len(orders) > 1:
                returning_number_of_orders += len(orders)
                returning_number_of_customers += 1
                for order in orders:
                    total_returning_sales += order.total_payment

        if new_number_of_customers or returning_number_of_customers:
            new_percentage_of_customers = (100 / (new_number_of_customers + returning_number_of_customers)) * new_number_of_customers
            returning_percentage_of_customers = (100 / (new_number_of_customers + returning_number_of_customers)) * returning_number_of_customers
        else:
            new_percentage_of_customers = 0
            returning_percentage_of_customers = 0

        if new_number_of_orders or returning_number_of_orders:
            new_percentage_of_orders = (100/(new_number_of_orders+returning_number_of_orders))*new_number_of_orders
            returning_percentage_of_orders = (100/(new_number_of_orders+returning_number_of_orders))*returning_number_of_orders
        else:
            new_percentage_of_orders = 0
            returning_percentage_of_orders = 0

        if new_number_of_orders:
            avg_new_basket = total_new_sales/new_number_of_orders
        else:
            avg_new_basket = 0

        if returning_number_of_orders:
            avg_returning_basket = total_returning_sales / returning_number_of_orders
        else:
            avg_returning_basket = 0

        if new_number_of_customers:
            new_acv = total_new_sales/new_number_of_customers
        else:
            new_acv = 0

        if returning_number_of_customers:
            returning_acv = total_returning_sales/returning_number_of_customers
        else:
            returning_acv = 0

        customer_order = {
            'new': {
                'number_of_orders': new_number_of_orders,
                'number_of_customers': new_number_of_customers,
                'percentage_of_customers': new_percentage_of_customers,
                'percentage_of_orders': new_percentage_of_orders,
                'total_sales': total_new_sales,
                'avg_basket': avg_new_basket,
                'acv': new_acv,
            },
            'returning': {
                'number_of_orders': returning_number_of_orders,
                'number_of_customers': returning_number_of_customers,
                'percentage_of_customers': returning_percentage_of_customers,
                'percentage_of_orders': returning_percentage_of_orders,
                'total_sales': total_returning_sales,
                'avg_basket': avg_returning_basket,
                'acv': returning_acv,
            }
        }

        return Response(
            data=customer_order,
            status=status.HTTP_202_ACCEPTED,
        )
