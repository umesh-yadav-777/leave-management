from django.contrib import admin
from .models import SystemSettings, LeaveRequest

# Register your models here.
admin.site.register(SystemSettings)
admin.site.register(LeaveRequest)
