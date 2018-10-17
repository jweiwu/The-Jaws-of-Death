import json
from django.shortcuts import render
from django.views.decorators.http import require_GET, require_POST
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
from .models import Post


def hello_world(request):
    return render(request, 'hello_world.html', {
        'current_time': str(datetime.now()),
        })



def home(request):
    posts = Post.objects.all()
    return render(request, 'home.html', { 'posts': posts })


def details(request, pk):
    post = Post.objects.get(pk=pk)
    return render(request, 'post.html', {'post': post})
    

@require_GET
def mytest(request):
    return render(request, 'test.html', {'title': 'Nasa Hackthon'})

@api_view(['POST'])
def jsonpost(request):
    received_json_data = json.loads(request.body)
    return Response(received_json_data, status=status.HTTP_200_OK)