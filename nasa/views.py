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

def get_valid_data(lon, lat):
    df = pd.DataFrame.from_records(Report.objects.values('longitude', 'latitude', 'value'))
    data = data_get.get_curr_data(df)
    data = data_get.get_section(data, float(lon), float(lat))
    return data

@csrf_exempt
def get_wind(request, lon, lat):
    data = get_valid_data(lon, lat)
    data = data_get.wind(data)
    return JsonResponse({'data': pd.DataFrame(data).to_json(orient='index')})

@csrf_exempt
def get_rain(request, lon, lat):
    data = get_valid_data(lon, lat)
    data = data_get.rain(data)
    return JsonResponse({'data': pd.DataFrame(data).to_json(orient='index')})

@csrf_exempt
def get_temp(request, lon, lat):
    data = get_valid_data(lon, lat)
    data = data_get.temp(data)
    return JsonResponse({'data': pd.DataFrame(data).to_json(orient='index')})

@csrf_exempt
def get_wind_mean(request, lon, lat):
    data = get_valid_data(lon, lat)
    data = data_get.wind(data)
    data = np.mean(data.value)
    return JsonResponse({'data': pd.DataFrame(data).to_json(orient='index')})

@csrf_exempt
def get_rain_mean(request, lon, lat):
    data = get_valid_data(lon, lat)
    data = data_get.rain(data)
    data = np.mean(data.value)
    return JsonResponse({'data': pd.DataFrame(data).to_json(orient='index')})

@csrf_exempt
def get_temp_mean(request, lon, lat):
    data = get_valid_data(lon, lat)
    data = data_get.temp(data)
    data = np.mean(data.value)
    return JsonResponse({'data': pd.DataFrame(data).to_json(orient='index')})


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
