from rest_framework import permissions

import logging

logger = logging.getLogger(__name__)


class IsBrandOwnerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_authenticated and (
            request.user.is_superuser
            or request.user.is_owner
            or request.user.is_manager
        ):
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_superuser is True or request.user.is_owner is True:
            return True
        return (
            request.user.is_manager and obj.managers.filter(id=request.user.id).exists()
        )


class IsCompanyOwnerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_authenticated and (
            request.user.is_superuser or request.user.is_owner
        ):
            return True
        return False

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_superuser is True:
            return True
        if request.user.is_owner is True and request.user == obj.owner:
            return True
        return False


class IsOutletOwnerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_authenticated and (
            request.user.is_superuser
            or request.user.is_owner
            or request.user.is_manager
        ):
            return True
        return False
