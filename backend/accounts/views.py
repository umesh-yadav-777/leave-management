from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView

# Models aur Serializers
from .models import CustomUser, Notification
from leaves.models import LeaveRequest
from .serializers import CustomTokenSerializer, UserSerializer, UserManageSerializer
from .permissions import IsAdmin

# 1. JWT Login
class CustomTokenView(TokenObtainPairView):
    serializer_class = CustomTokenSerializer

# 2. Registration (Add User)
@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def register(request):
    data = request.data
    role = data.get('role', 'employee')
    admin_key = data.get('adminKey', '')

    if role == 'admin':
        if admin_key != "UMESH_YADAV":
            return Response(
                {"error": "Unauthorized: Invalid Admin Secret Key!"},
                status=status.HTTP_403_FORBIDDEN
            )

    try:
        if CustomUser.objects.filter(username=data.get('email')).exists():
            return Response({"error": "User with this email already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.create(
            username=data.get('email'),
            email=data.get('email'),
            first_name=data.get('fullName', ''),
            role=role,
            total_leaves=20,
            is_staff=(True if role == 'admin' else False)
        )
        user.set_password(data['password'])
        user.save()

        return Response({"message": f"{role.capitalize()} registered successfully"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    serializer = UserSerializer(user)
    data = serializer.data

    data["full_name"] = f"{user.first_name} {user.last_name}".strip() or user.username
    data["initials"] = (user.first_name[0] if user.first_name else user.username[0]).upper()
    data["employee_id"] = f"EMP-2024-{user.id:03d}"

    if not data.get('role'):
        data["role"] = "Admin" if user.is_staff else "Employee"
    else:
        data["role"] = str(data["role"]).capitalize()

    return Response(data)
# 4. Admin Dashboard Access Check
@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def admin_dashboard(request):
    return Response({
        "message": "Welcome Admin",
        "status": "Authorized"
    })

# --- ADMIN PANEL USER MANAGEMENT ---

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def list_users(request):
    """List all users for Admin"""
    users = CustomUser.objects.filter(is_superuser=False).order_by('-id')
    serializer = UserManageSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['DELETE', 'PATCH'])
@permission_classes([IsAuthenticated, IsAdmin])
def manage_user_actions(request, pk):
    """Delete user, Toggle Status, or Update Details (Edit)"""
    try:
        user = CustomUser.objects.get(pk=pk)
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found!"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        user.delete()
        return Response({"message": "User deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)

    if request.method == 'PATCH':
        if not request.data:
            user.is_active = not user.is_active
            user.save()
            status_msg = "Active" if user.is_active else "Inactive"
            return Response({"message": f"User status changed to {status_msg}"})

        user.first_name = request.data.get('first_name', user.first_name)
        user.role = request.data.get('role', user.role)
        user.save()
        return Response({"message": "User updated successfully!"})

# --- NEW: LEAVE ANALYTICS REPORTS (UPDATED TO USE LEAVEREQUEST) ---

@api_view(['GET'])
@permission_classes([IsAuthenticated, IsAdmin])
def leave_reports(request):
    """Fetch all leave applications from LeaveRequest model for Admin Report page"""
    try:
        leaves = LeaveRequest.objects.select_related('user').all().order_by('-applied_on')

        report_data = []
        for leave in leaves:

            duration_days = (leave.end_date - leave.start_date).days + 1

            report_data.append({
                "id": leave.id,
                "employee_name": f"{leave.user.first_name} {leave.user.last_name}".strip() or leave.user.username,
                "department": getattr(leave.user, 'role', 'General').capitalize(),
                "leave_type": leave.leave_type,
                "duration": f"{duration_days} Days",
                "status": leave.status.capitalize(),

                "start_date": leave.start_date.strftime('%Y-%m-%d'),
                "end_date": leave.end_date.strftime('%Y-%m-%d'),
                "reason": getattr(leave, 'reason', 'No reason provided')
            })

        return Response(report_data, status=status.HTTP_200_OK)
    except Exception as e:
        print(f"Backend Error: {str(e)}")
        return Response({"error": "Failed to fetch reports"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    new_pw = request.data.get('new_password')

    if not new_pw:
        return Response({"error": "New password is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user.set_password(new_pw)
        user.save()
        return Response({"message": "Password updated successfully!"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def clear_notifications(request):

    Notification.objects.filter(user=request.user, is_read=False).update(is_read=True)
    return Response({"message": "Notifications cleared successfully"}, status=status.HTTP_200_OK)
