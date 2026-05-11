from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views
from .views import (
    CustomTokenView, register, profile, admin_dashboard,
    list_users, manage_user_actions, leave_reports, change_password,
    clear_notifications 
)

urlpatterns = [
    path('login/', CustomTokenView.as_view(), name='login'),
    path('register/', register, name='register'),
    path('profile/', profile, name='profile'),
    path('admin-dashboard/', admin_dashboard, name='admin_dashboard'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('manage-users/', list_users, name='manage-users'),
    path('manage-users/<int:pk>/', manage_user_actions, name='manage-user-actions'),
    path('leave-reports/', leave_reports, name='leave-reports'),
    path('change-password/', change_password, name='change-password'),
    path('clear-notifications/', clear_notifications, name='clear-notifications'),
]
