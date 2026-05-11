from rest_framework import serializers
from leaves.models import LeaveRequest

class DashboardLeaveSerializer(serializers.ModelSerializer):
    duration = serializers.SerializerMethodField()

    class Meta:
        model = LeaveRequest
        fields = ['id', 'leave_type', 'start_date', 'end_date', 'status', 'duration']

    def get_duration(self, obj):
        if obj.start_date and obj.end_date:
            delta = obj.end_date - obj.start_date
            return delta.days + 1
        return 0
