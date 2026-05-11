from django.urls import path
from . import views

urlpatterns = [
    path('global-settings/', views.global_settings, name='global-settings'),
    path('apply/', views.apply_leave, name='apply_leave'),
    path('manage/', views.manage_leaves, name='manage_all_leaves'),
    path('manage/<int:pk>/', views.manage_leaves, name='update_leave_status'),
    path('team-calendar/', views.team_calendar_view, name='team_calendar'),
    path('admin-summary/', views.admin_dashboard_summary, name='admin-summary'),
]

