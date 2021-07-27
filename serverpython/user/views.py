from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.views import APIView
from rest_framework import status
from .serializers import *
from .models import *

from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated, AllowAny

#file upload
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser

import pandas as pd
import json
import pickle
import os

# Create your views here.
class Login(CreateAPIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if username is "" or password is "":
            return Response(
                {
                    'error': 'Please Input the Username and Password'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(request, username=username, password=password)
        print(user)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                "key": token.key,
                "username": user.username
            })
        else :
            return Response(
            {
                'error': 'invalid username or password'
            },
            status=status.HTTP_400_BAD_REQUEST
        )

class RegisterView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    '''
     METHOD -> POST
     # class yang berfungsi untuk membuat akun kandidat baru.
     # hanya admin yang bisa mengakses endpoint ini.
    '''
    serializer_class = CreateUserSerializer

class UserView(GenericAPIView):
    permission_classes = (AllowAny,)
    def get(self, request, pk):
        try:
            # return Response("ASHUPPP")
            print(User.objects.values_list("id", named=True))
            user = User.objects.filter(id=pk)
            serializer = UserSerializer(user, many=True)
            return Response(serializer.data)
        except Exception as error:
            print(error, "ERRORR NICH")
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def put(self, request, pk):
        try:
            # return Response("ASHUPPP")
            user = User.objects.get(id=pk)
            serializer = UserSerializer(user, data=request.data)
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
            user = User.objects.get(id=pk)
            user.delete()
            return Response("success delete!")
        except Exception as error:
            print("masukkkk")
            print(error)
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

class ModelView(CreateAPIView):
    # permission_classes = (AllowAny,)
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            module_dir = os.path.dirname(__file__)  
            tfdifloc = os.path.join(module_dir, 'tfidf.pickle')  
            mnbloc = os.path.join(module_dir, 'mnb.pickle')
            
            #Load tfidf matrix
            tfidf = pickle.load(open(tfdifloc, "rb"))

            #Load mnb model
            mnb = pickle.load(open(mnbloc, "rb"))

            tfidf_baru = tfidf.transform([request.data["word"]])
            hasil = mnb.predict(tfidf_baru)
            print(hasil, "<<<hasil nich")
            if hasil == 0:
                return Response({
                "sentiment" : "negative"
            })
            else :
                return Response({
                "sentiment" : "positive"
            })
        except Exception as error:
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

class FileUploadView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_class = (FileUploadParser,)

    def put(self, request, format=None):
        try :
            if 'file' not in request.data:
                raise ParseError("Empty content")
            
            module_dir = os.path.dirname(__file__)  
            tfdifloc = os.path.join(module_dir, 'tfidf.pickle')  
            mnbloc = os.path.join(module_dir, 'mnb.pickle')
            
            #Load tfidf matrix
            tfidf = pickle.load(open(tfdifloc, "rb"))

            #Load mnb model
            mnb = pickle.load(open(mnbloc, "rb"))

            f = request.data['file']

            df = pd.read_csv(f)
            words = df['sentiment']
            output = {}
            print(words)
            for x in words:
                tfidf_baru = tfidf.transform([x])
                hasil = mnb.predict(tfidf_baru)

                if hasil == 0:
                    output[x] = "negative"
                else :
                    output[x] = "positive"

            print(output, "<<<hasil nich")

            return Response({
                "data" : output},
            status=status.HTTP_201_CREATED)

        except Exception as error:
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

class MultipleView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try :
            module_dir = os.path.dirname(__file__)  
            tfdifloc = os.path.join(module_dir, 'tfidf.pickle')  
            mnbloc = os.path.join(module_dir, 'mnb.pickle')
            
            #Load tfidf matrix
            tfidf = pickle.load(open(tfdifloc, "rb"))

            #Load mnb model
            mnb = pickle.load(open(mnbloc, "rb"))
            data = request.data['words']
            # print(x)
            output = {}
            for x in data:
                tfidf_baru = tfidf.transform([x])
                hasil = mnb.predict(tfidf_baru)

                if hasil == 0:
                    output[x] = "negative"
                else :
                    output[x] = "positive"
            return Response({
            "output" : output},
            status=status.HTTP_200_OK)

        except Exception as error:
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

class PackageView(CreateAPIView):
    #ADMIN ONLY VIEW
    permission_classes = (AllowAny,)
    def get(self, request):
        try:
            package = Package.objects.all()
            serializer = PackageSerializer(package, many=True)
            return Response(serializer.data)
        except Exception as error:
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def post(self, request):
        try:
            serializer = PackageSerializer(data=request.data)
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
            print("ASHUPPP")
            package = Package.objects.get(id=pk)
            serializer = PackageSerializer(package, data=request.data)
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
            package = Package.objects.get(id=pk)
            package.delete()
            return Response("success delete!")
        except Exception as error:
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )