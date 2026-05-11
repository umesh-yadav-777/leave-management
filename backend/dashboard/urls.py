from django.urls import path
from .views import employee_dashboard_stats

urlpatterns = [
    path('employee-stats/', employee_dashboard_stats, name='employee-dashboard-stats'),
]
