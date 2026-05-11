from rest_framework import serializers
from .models import LeaveRequest

from rest_framework import serializers
from .models import LeaveRequest

class LeaveRequestSerializer(serializers.ModelSerializer):
  
    user_name = serializers.ReadOnlyField(source='user.first_name')
    user_email = serializers.ReadOnlyField(source='user.email')

    employee_name = serializers.ReadOnlyField(source='user.get_full_name')
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = LeaveRequest
        fields = [
            'id', 'user', 'user_name', 'user_email', 'employee_name',
            'username', 'leave_type', 'start_date', 'end_date',
            'reason', 'status', 'applied_on'
        ]

        read_only_fields = ['user', 'status', 'applied_on']
