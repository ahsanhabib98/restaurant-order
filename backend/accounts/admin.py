from django.contrib import admin
from accounts.models import User, UserProfile, UserInvitation

admin.site.register(User)
admin.site.register(UserProfile)
admin.site.register(UserInvitation)
