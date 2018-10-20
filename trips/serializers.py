from rest_framework import serializers
from .models import Post


class PostListSerializer(serializers.ListSerializer):
    def create(validated_data):
        posts = [Post(**item) for item in validated_data]
        return Post.objects.bulk_create(posts)

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        # fields = ('pk', 'title', 'content', 'photo', 'created_at')