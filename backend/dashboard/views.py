from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from leaves.models import LeaveRequest, SystemSettings
from .serializers import DashboardLeaveSerializer
from accounts.models import Notification

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def employee_dashboard_stats(request):
    user = request.user
    try:
        settings_obj = SystemSettings.objects.first()
        if settings_obj:
            total_allowed = settings_obj.annual_leaves + settings_obj.sick_leaves
        else:
            total_allowed = 20
    except Exception:
        total_allowed = 20
    approved_leaves = LeaveRequest.objects.filter(user=user, status__iexact='approved')

    try:
        used_count = sum(l.duration for l in approved_leaves)
    except AttributeError:
        used_count = 0
        for leave in approved_leaves:
            delta = leave.end_date - leave.start_date
            used_count += (delta.days + 1)

    available_balance = max(0, total_allowed - used_count)

    pending_count = LeaveRequest.objects.filter(user=user, status__iexact='pending').count()

    recent_history = LeaveRequest.objects.filter(user=user).order_by('-applied_on')[:5]
    serializer = DashboardLeaveSerializer(recent_history, many=True)

    unread_notes = Notification.objects.filter(user=user, is_read=False).order_by('-created_at')
    notifications_list = [{"id": n.id, "message": n.message} for n in unread_notes]

    return Response({
        "user_full_name": f"{user.first_name} {user.last_name}" if user.first_name else user.username,
        "stats": {
            "available": available_balance,
            "used": used_count,
            "pending": pending_count,
            "total_admin_limit": total_allowed
        },
        "history": serializer.data,
        "notifications": notifications_list
    })
