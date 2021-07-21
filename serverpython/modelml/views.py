from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework import status
from .serializers import ModelSerializer
from .models import Modelml
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.
class ModelmlView(CreateAPIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        try:
            # return Response("ASHUPPP")
            modelml = Modelml.objects.all()
            serializer = ModelSerializer(modelml, many=True)
            return Response(serializer.data)
        except Exception as error:
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def post(self, request):
        try:
            serializer = ModelSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as error:
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def put(self, request, pk):
        try:
            # return Response("ASHUPPP")
            post = Modelml.objects.get(id=pk)
            serializer = ModelSerializer(post, data=request.data)
            if serializer.is_valid():
                serializer.save()
            return Response(serializer.data)
        except Exception as error:
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def delete(self, request, pk):
        try:
            post = Modelml.objects.get(id=pk)
            post.delete()
            return Response("success delete!")
        except Exception as error:
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )