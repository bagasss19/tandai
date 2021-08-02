from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework import status
from .serializers import ModelSerializer
from .models import Modelml
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework.parsers import FileUploadParser
from rest_framework.exceptions import ParseError

from django.core.files.storage import default_storage
# Create your views here.
class ModelmlView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    parser_class = (FileUploadParser,)
    def get(self, request):
        try:
            # return Response("ASHUPPP")
            modelml = Modelml.objects.filter(model_owner_id = request.user.id)
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
            # if 'modelml_url' not in request.data:
            #     raise ParseError("Empty content")
            request.data['model_owner'] = request.user.id
            serializer = ModelSerializer(data=request.data)
            print(request.data)
            if serializer.is_valid():
                serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as error:
            print(error, "<<<<ERRROR nich")
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