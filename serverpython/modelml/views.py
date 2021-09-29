from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from rest_framework import status
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated, AllowAny

from rest_framework.parsers import FileUploadParser
from rest_framework.exceptions import ParseError

from django.core.files.storage import default_storage
from itertools import chain
import pandas as pd

# Create your views here.
class ModelmlView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    parser_class = (FileUploadParser,)
    def get(self, request):
        try:
            # return Response("ASHUPPP")
            modelml = Modelml.objects.filter(model_owner_id = request.user.id).values()
            baseModel = Modelml.objects.filter(model_name = "lstmw13").values()
            # serializer = ModelSerializer(modelml, many=True)
            result = list(chain(baseModel, modelml))
            obj = {'data': result}
            return Response(obj)
        except Exception as error:
            print(error, "<ERRRRRRRRORRR")
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

class ModelmlidView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    parser_class = (FileUploadParser,)
    def get(self, request, pk):
        try:
            # return Response("ASHUPPP")
            modelml = Modelml.objects.filter(id=pk)
            serializer = ModelSerializer(modelml, many=True)
            return Response(serializer.data)
        except Exception as error:
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def post(self, request, pk):
        permission_classes = (AllowAny,)
        try:
            # return Response("ASHUPPP")
            if 'accuracy_image' not in request.data:
                raise ParseError("Empty content")
            if 'loss_image' not in request.data:
                raise ParseError("Empty content")
            if 'csv' not in request.data:
                raise ParseError("Empty content")
            model = Modelml.objects.filter(id=pk).get()
            model.accuracy_image = request.data["accuracy_image"]
            model.loss_image = request.data["loss_image"]
            model.csv = request.data["csv"]
            model.save()

            f = request.data['csv']

            df = pd.read_csv(f)
            # print(df, "<<<<<<<<<<<<<<fgfdfgdg")
            for index, row in df.iterrows():
                print(type(pk), "<<<<LSLLS")
                # print(row['sent'], row['sent_pred'], row['review'])
                request.data['review'] = row['review']
                request.data['sent'] = row['sent']
                request.data['sent_pred'] = row['sent_pred']
                request.data['owner'] = pk
                serializer = ReviewSerializer(data=request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
            
            return Response({"status" : "sukses"},
            status=status.HTTP_200_OK)
        except Exception as error:
            print(error, "<<<<<<<ERRORRRRR")
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
    
class ReviewView(CreateAPIView):
    def get(self, request, pk):
        try:
            # return Response("ASHUPPP")
            review = Review.objects.filter(owner=pk)
            serializer = ReviewSerializer(review, many=True)
            return Response(serializer.data)
        except Exception as error:
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )