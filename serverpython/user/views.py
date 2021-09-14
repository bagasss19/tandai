from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, GenericAPIView
from rest_framework.views import APIView
from rest_framework import status
from .serializers import *
from .models import *
from modelml.models import *

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


import string    
import random
import requests

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
                "username": user.username,
                "id" : user.id,
                "is_superuser" : user.is_superuser
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

class UserView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, pk):
        try:
            u = User.objects.filter(id=request.user.id).values()
            usage = u[0]['API_usage']
            tf_usage = u[0]['TF_usage']
            package = u[0]['package_id']
            p = Package.objects.filter(id=package).values()
            limit = p[0]['API_quota']
            tf_limit = p[0]['TF_quota']
            p_name = p[0]['title']
            username = u[0]['username']
            email = u[0]['email']
            company = u[0]['company']
            return Response({"usage" : usage,  "TF_limit" : tf_limit , "TF_usage" : tf_usage ,"limit" : limit,"package_name" : p_name, "username" : username
            , "email" : email, "company" : company})
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
            user = User.objects.get(id=request.user.id)

            uname = request.data.get("username")
            comp = request.data.get("company")

            user.username = uname
            user.company = comp

            serializer = UserSerializer(user, data=request.data)
            if serializer.is_valid():
                serializer.save()
            user.save()
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
            # module_dir = os.path.dirname(__file__)  
            # tfdifloc = os.path.join(module_dir, 'tfidf.pickle')  
            # mnbloc = os.path.join(module_dir, 'mnb.pickle')
            
            #Load tfidf matrix
            # tfidf = pickle.load(open(tfdifloc, "rb"))

            #Load mnb model
            # mnb = pickle.load(open(mnbloc, "rb"))

            #Check Api Usage
            u = User.objects.filter(id=request.user.id).values()
            usage = u[0]['API_usage']
            package = u[0]['package_id']
            p = Package.objects.filter(id=package).values()
            limit = p[0]['API_quota']

            if usage >= limit :
                return Response({
                    "Error" : "Kuota Abis Cuy"
                })

            #proses data
            # tfidf_baru = tfidf.transform([request.data["word"]])
            # hasil = mnb.predict(tfidf_baru)

            user = User.objects.filter(id=request.user.id).get()
            user.API_usage = usage + 1
            user.save()

            return Response({
                    "Response" : "Sukses"
                })
            # if hasil == 0:
            #     return Response({
            #     "sentiment" : "negative"
            # })
            # else :
            #     return Response({
            #     "sentiment" : "positive"
            # })
        except Exception as error:
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

class FileUploadView(APIView):
    permission_classes = (IsAuthenticated,)
    parser_class = (FileUploadParser,)

    def put(self, request, pk):
        try :
            if 'file' not in request.data:
                raise ParseError("Empty content")
            
            # module_dir = os.path.dirname(__file__)  
            # tfdifloc = os.path.join(module_dir, 'tfidf.pickle')  
            # mnbloc = os.path.join(module_dir, 'mnb.pickle')
            
            #Load tfidf matrix
            # tfidf = pickle.load(open(tfdifloc, "rb"))

            #Load mnb model
            # mnb = pickle.load(open(mnbloc, "rb"))

            #Check Api Usage
            u = User.objects.filter(id=request.user.id).values()
            usage = u[0]['API_usage']
            package = u[0]['package_id']
            uname = u[0]['id']
            p = Package.objects.filter(id=package).values()
            limit = p[0]['API_quota']
            m = Modelml.objects.filter(id=pk).values()
            model_ID = m[0]['model_ID']

            if usage >= limit :
                return Response({
                    "Error" : "Kuota Abis Cuy"
                })

            f = request.data['file']

            df = pd.read_csv(f)
            words = df['sentiment']
            # output = []
            print(words, ">>>>>>>>>>>>WORDSS")
            # for x in words:
            #     obj = {}
            #     tfidf_baru = tfidf.transform([x])
            #     hasil = mnb.predict(tfidf_baru)

            #     if hasil == 0:
            #         obj['word'] = x
            #         obj['sentiment'] = "negative"
            #         output.append(obj)
            #     else :
            #         obj['word'] = x
            #         obj['sentiment'] = "positive"
            #         output.append(obj)

            # print(output, "<<<hasil nich")
            user = User.objects.filter(id=request.user.id).get()
            user.API_usage = usage + 1
            user.save()
            return Response({
                "username" : uname, "model_id" : model_ID,"review" : words},
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
    permission_classes = (IsAuthenticated,)
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

class TransferView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    parser_class = (FileUploadParser,)

    def post(self, request, pk):
        try :
            if 'file' not in request.data:
                raise ParseError("Empty content")
            S = 10

            #Check Api Usage
            u = User.objects.filter(id=request.user.id).values()
            usage = u[0]['TF_usage']
            package = u[0]['package_id']
            p = Package.objects.filter(id=package).values()
            limit = p[0]['TF_quota']

            if usage >= limit :
                return Response({
                    "Error" : "Kuota Abis Cuy"
                },status=status.HTTP_400_BAD_REQUEST)

            f = request.data['file']
            df = pd.read_csv(f)
            print(len(df), "<<<<ROWW")

            u = User.objects.filter(id=request.user.id).values()
            username = u[0]['username']
            model = Modelml.objects.filter(id=pk).values()
            baseName = model[0]['model_ID']
            
            
            user = User.objects.filter(id=request.user.id).get()
            user.TF_usage = usage + len(df)
            user.save()

            ran = ''.join(random.choices(string.ascii_uppercase + string.digits, k = S))

            filename = str(request.user.id) + "_" + baseName + "_" + ran
            return Response({"filename" : filename},
            status=status.HTTP_200_OK)

        except Exception as error:
            print(error, "<<<<ERRRORRRR")
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

class CsvView(CreateAPIView):
    parser_class = (FileUploadParser,)
    def post(self, request):
        try :
            if 'file' not in request.data:
                raise ParseError("Empty content")
        
            f = request.data['file']
            df = pd.read_csv(f)
            review = df['review']
            s = df['sent']
            s1 = df['sent_pred']
            return Response({"review" : review, 's' : s, 's1' : s1},
            status=status.HTTP_200_OK)

        except Exception as error:
            print(error, "<<<<ERRRORRRRa")
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )