
from django.shortcuts import render
from rest_framework import viewsets
from .models import Post
from .serializers import PostSerializer



def index(request):
    posts = Post.objects.all()
    return render(request, 'home.html', { 'posts': posts })


def details(request, pk):
    post = Post.objects.get(pk=pk)
    return render(request, 'post.html', {'post': post})
    


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer