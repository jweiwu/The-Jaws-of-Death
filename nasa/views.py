import json
import datetime
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from .models import Report
from .serializers import ReportSerializer, ReportListSerializer

@csrf_exempt
def create_betch(request):
    received_json_data = json.loads(request.body)
    result = ReportListSerializer.create(received_json_data)
    return JsonResponse({'data': received_json_data}, status=status.HTTP_201_CREATED)



class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
