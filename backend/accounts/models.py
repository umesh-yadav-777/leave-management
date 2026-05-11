from django.db import models
from django.contrib.auth.models import AbstractUser

# 1. User Model
class CustomUser(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('employee', 'Employee'),
        ('manager', 'Manager'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='employee')
    total_leaves = models.IntegerField(default=20)
    used_leaves = models.IntegerField(default=0)

    def __str__(self):
        return self.username

# 2. Leave Application Model (Reports ke liye zaroori hai)
class LeaveApplication(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )

    LEAVE_TYPE_CHOICES = (
        ('Sick Leave', 'Sick Leave'),
        ('Casual Leave', 'Casual Leave'),
        ('Annual Leave', 'Annual Leave'),
    )

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='leaves')
    leave_type = models.CharField(max_length=50, choices=LEAVE_TYPE_CHOICES)
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.leave_type} ({self.status})"


# 3. Notification Model (Optional, for sending notifications to users about leave status)
class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='notifications')
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Notification for {self.user.username}"
