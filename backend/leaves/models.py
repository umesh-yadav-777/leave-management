from django.db import models
from django.conf import settings

class LeaveRequest(models.Model):
    LEAVE_TYPES = (
        ('Sick', 'Sick Leave'),
        ('Casual', 'Casual Leave'),
        ('Emergency', 'Emergency Leave'),
    )

    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    leave_type = models.CharField(max_length=20, choices=LEAVE_TYPES)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    applied_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.leave_type} ({self.status})"


class SystemSettings(models.Model):
    company_name = models.CharField(max_length=255, default="ProLeave Tech")
    annual_leaves = models.IntegerField(default=20)
    sick_leaves = models.IntegerField(default=12)
    notifications = models.BooleanField(default=True)
    allow_zero = models.BooleanField(default=False)

    def __str__(self):
        return "Global System Settings"

    class Meta:
        verbose_name = "System Setting"
        verbose_name_plural = "System Settings"
