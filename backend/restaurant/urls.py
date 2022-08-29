from django.urls import path, include
from rest_framework.routers import DefaultRouter

from restaurant.views.inventory_views import *
from restaurant.views.order_item_views import *
from restaurant.views.outlet_views import *
from restaurant.views.restaurant_views import *

router = DefaultRouter()
# public = DefaultRouter()

router.register("company", CompanyViewSet)
router.register("company-discount", CompanyDiscountViewSet)
router.register("marketing-brand", MarketingBrandViewSet)
router.register("branding", BrandingViewSet)
router.register("outlet", OutletViewSet)
router.register("branding-customer", BrandingCustomerViewSet)
router.register("day", DayViewSet)
router.register("inventory", InventoryViewSet)
router.register("location", LocationViewSet)
router.register("menus", MenuViewSet)
router.register("category", CateogryViewSet)
router.register("modifier", ModifierViewSet)
router.register("order", OrderViewSet)
router.register("address", AddressViewSet)


# public.register("branding", PublicBrandingViewSet)

urlpatterns = [
    path("user-id/", UserIDView.as_view(), name="user-id"),
    path("items/", InventoryListView.as_view(), name="item-list"),
    path("items/<pk>/", InventoryDetailView.as_view(), name="item-detail"),
    path(
        "order-item/<pk>/delete/",
        OrderItemDeleteView.as_view(),
        name="order-item-delete",
    ),
    path("order-item/update/", RemoveFromCartView.as_view(), name="order-item-update"),
    path("add-to-cart/", AddToCartView.as_view(), name="add-to-cart"),
    path("order-summary/", OrderDetailView.as_view(), name="order-summary"),
    path("order-update/<id>/", OrderUpdateView.as_view(), name="order-update"),
    path("checkout/", PaymentView.as_view(), name="checkout"),
    path("add-coupon/", AddCouponView.as_view(), name="add-coupon"),
    path("payments/", PaymentListView.as_view(), name="payment-list"),
    path(
        "branding-wise-order-list/<subdomain>/",
        BrandingWiseOrderList.as_view(),
        name="branding_wise_order",
    ),
    path(
        "restaurant-discount/<subdomain>/",
        RestaurantInventoryDiscount.as_view(),
        name="restaurant_discount",
    ),
    # path("add-user-restaurant/<subdomain>/", AddUserToRestaurant.as_view(), name="add_user_restaurant"),
    path(
        "company-request-owners/",
        CompanyRequestOwners.as_view(),
        name="company_request_owners",
    ),
    path("remove-false-order/", RemoveFalseOrder.as_view(), name="remove-false-order"),
    path("customer-payment-information/", CustomerPaymentInformationAPIView.as_view(), name="customer-payment-information"),
    path("branding-wise-company/<subdomain>/", BrandingWiseCompany.as_view(), name="branding-wise-company"),
    path("company-branding-manager/<id>/", CompanyBrandingManager.as_view(), name="company-branding-manager"),
    path("customer-payment/", CustomerPaymentInformationAPIView.as_view(), name="customer-payment"),
    path("dashboard-wise-customer-order/", DashboardWiseCustomerOrder.as_view(), name="dashboard-wise-customer-order"),
    path("order-history-list/", OrderHistoryListView.as_view(), name="order-history-list"),
    # path("pause-order/", PauseOrderListView.as_view(), name="pause_order_list"),
    # path("public", include(public.urls)),
] + router.urls
