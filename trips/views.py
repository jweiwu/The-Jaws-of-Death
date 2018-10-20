import json
import datetime
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets, status
from .models import Post
from .serializers import PostSerializer, PostListSerializer


def index(request):
    posts = Post.objects.all()
    return render(request, 'home.html', { 'posts': posts })


def details(request, pk):
    post = Post.objects.get(pk=pk)
    return render(request, 'post.html', {'post': post})


@csrf_exempt
def create_betch(request):
    received_json_data = json.loads(request.body)
    result = PostListSerializer.create(received_json_data)
    # return render(request, 'test.html', {'msg': result[0]})
    return JsonResponse({'data': received_json_data}, status=status.HTTP_201_CREATED)



class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer