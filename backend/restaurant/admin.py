from django.contrib import admin

from restaurant.models.inventory import Category, Inventory, Menus, Modifier
from restaurant.models.outlets import Location, Outlet
from restaurant.models.order_items import Address, Coupon, Order, OrderItem, Payment
from restaurant.models.restaurants import Company, Branding, BrandingCustomer, Day, MarketingBrand, CompanyDiscount

admin.site.register(Company)
admin.site.register(CompanyDiscount)
admin.site.register(Day)
admin.site.register(BrandingCustomer)
admin.site.register(Inventory)
admin.site.register(Menus)
admin.site.register(Category)
admin.site.register(Modifier)
admin.site.register(OrderItem)
admin.site.register(Order)
admin.site.register(Payment)
admin.site.register(Address)
admin.site.register(Coupon)
admin.site.register(Location)
admin.site.register(Branding)
admin.site.register(Outlet)
admin.site.register(MarketingBrand)
