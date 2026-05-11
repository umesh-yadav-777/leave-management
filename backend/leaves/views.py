from django.shortcuts import render
from django.db.models import Q
from django.utils import timezone
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import LeaveRequest, SystemSettings
from .serializers import LeaveRequestSerializer
from accounts.permissions import IsAdmin
from accounts.models import Notification

User = get_user_model()

# 1. Employee: Apply and View Personal History
@api_view(['POST', 'GET'])
@permission_classes([IsAuthenticated])
def apply_leave(request):
    if request.method == 'POST':
        serializer = LeaveRequestSerializer(data=request.data)
        if serializer.is_valid():
            start_date = serializer.validated_data['start_date']
            end_date = serializer.validated_data['end_date']
            leave_type = serializer.validated_data['leave_type']
            user = request.user

            settings_obj, created = SystemSettings.objects.get_or_create(id=1)
            requested_days = (end_date - start_date).days + 1
            current_year = timezone.now().year

            already_taken = LeaveRequest.objects.filter(
                user=user,
                status__in=['pending', 'approved'],
                start_date__year=current_year,
                leave_type=leave_type
            )

            total_used_days = 0
            for leave in already_taken:
                total_used_days += (leave.end_date - leave.start_date).days + 1

            limit = settings_obj.annual_leaves
            if leave_type == 'Sick':
                limit = settings_obj.sick_leaves

            if (total_used_days + requested_days) > limit:
                remaining = limit - total_used_days
                if remaining < 0: remaining = 0
                return Response(
                    {"error": f"Limit exceeded! You have {remaining} {leave_type} leaves left for this year."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            overlap_exists = LeaveRequest.objects.filter(
                user=user,
                status__in=['pending', 'approved']
            ).filter(
                Q(start_date__lte=end_date) & Q(end_date__gte=start_date)
            ).exists()

            if overlap_exists:
                return Response(
                    {"error": "You have already applied for leave on these dates which is currently pending or approved."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            serializer.save(user=user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        leaves = LeaveRequest.objects.filter(user=request.user).order_by('-applied_on')
        serializer = LeaveRequestSerializer(leaves, many=True)
        return Response(serializer.data)


# 2. Admin: View all leaves and Update Status
@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated, IsAdmin])
def manage_leaves(request, pk=None):
    if request.method == 'GET':
        leaves = LeaveRequest.objects.all().order_by('-applied_on')
        serializer = LeaveRequestSerializer(leaves, many=True)
        return Response(serializer.data)

    if request.method == 'PATCH':
        try:
            leave = LeaveRequest.objects.get(pk=pk)
            new_status = request.data.get('status', leave.status).lower()
            leave.status = new_status
            leave.save()

            if new_status in ['approved', 'rejected']:
                Notification.objects.create(
                    user=leave.user,
                    message=f"Your leave request for {leave.start_date} has been {new_status.upper()}."
                )

            return Response({"message": f"Leave {leave.status} successfully!"})
        except LeaveRequest.DoesNotExist:
            return Response({"error": "Leave not found"}, status=status.HTTP_404_NOT_FOUND)


# 3. Team Calendar
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def team_calendar_view(request):
    approved_leaves = LeaveRequest.objects.filter(status__iexact='approved')
    calendar_data = []
    for leave in approved_leaves:
        name = f"{leave.user.first_name} {leave.user.last_name}" if leave.user.first_name else leave.user.username
        calendar_data.append({
            "id": leave.id,
            "name": name,
            "start_date": leave.start_date,
            "end_date": leave.end_date,
            "type": leave.leave_type
        })
    return Response(calendar_data)


# 4. Updated Admin Dashboard Summary (For Dashboard & Layout)
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_dashboard_summary(request):
    today = timezone.localdate()

    full_name = f"{request.user.first_name} {request.user.last_name}".strip()
    admin_display_name = full_name if full_name else request.user.username
    admin_role = "Super Admin" if request.user.is_superuser else "Admin"

    # Notifications: Sirf Pending requests dikhayenge taaki Action ke baad list se hat jaye
    pending_activities = LeaveRequest.objects.filter(status__iexact='pending').order_by('-applied_on')[:5]
    notifications = []
    for activity in pending_activities:
        notifications.append({
            "id": activity.id,
            "message": f"{activity.user.username} applied for {activity.leave_type} leave",
            "time": activity.applied_on
        })

    # Stats for Dashboard
    total_users = User.objects.filter(is_staff=False, is_superuser=False).count()
    pending_count = LeaveRequest.objects.filter(status__iexact='pending').count()
    on_leave_today_count = LeaveRequest.objects.filter(
        status__iexact='approved',
        start_date__lte=today,
        end_date__gte=today
    ).count()

    recent_requests = LeaveRequest.objects.all().order_by('-applied_on')[:5]
    serializer = LeaveRequestSerializer(recent_requests, many=True)

    return Response({
        "admin_name": admin_display_name,
        "role": admin_role,
        "notifications": notifications,
        "total_employees": total_users,
        "pending_requests": pending_count,
        "on_leave_today": on_leave_today_count,
        "recent_data": serializer.data
    })


# 5. Global Settings
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated, IsAdmin])
def global_settings(request):
    settings_obj, created = SystemSettings.objects.get_or_create(id=1)

    if request.method == 'GET':
        return Response({
            "company_name": settings_obj.company_name,
            "annual_leaves": settings_obj.annual_leaves,
            "sick_leaves": settings_obj.sick_leaves,
            "notifications": settings_obj.notifications,
            "allow_zero": settings_obj.allow_zero
        })

    if request.method == 'POST':
        data = request.data
        if 'company_name' in data:
            settings_obj.company_name = data.get('company_name')
        if 'annual_leaves' in data:
            settings_obj.annual_leaves = int(data.get('annual_leaves'))
        if 'sick_leaves' in data:
            settings_obj.sick_leaves = int(data.get('sick_leaves'))
        if 'notifications' in data:
            settings_obj.notifications = data.get('notifications')
        if 'allow_zero' in data:
            settings_obj.allow_zero = data.get('allow_zero')

        settings_obj.save()
        return Response({"message": "Settings Updated Successfully!"})
