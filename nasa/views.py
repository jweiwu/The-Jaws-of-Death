import json
import numpy as np
import pandas as pd
from datetime import datetime, timedelta
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status
from .models import Report
from .serializers import ReportSerializer, ReportListSerializer
from .data_get import data_get



@csrf_exempt
def create_betch(request):
    received_json_data = json.loads(request.body)
    result = ReportListSerializer.create(received_json_data)
    return JsonResponse({'data': received_json_data}, status=status.HTTP_201_CREATED)

def get_wind(request):
    df = pd.DataFrame.from_records(Report.objects.values())
    data = data_get.wind(df)
    return JsonResponse({'data': pd.DataFrame(data).to_json(orient='index')})

class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
