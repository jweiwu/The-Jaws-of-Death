from rest_framework import serializers
from .models import Report


class ReportListSerializer(serializers.ListSerializer):
    def create(validated_data):
        reports = [Report(**item) for item in validated_data]
        return Report.objects.bulk_create(reports)

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = '__all__'