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

#Send Email
from django.conf import settings
from django.core.mail import send_mail

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
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            package = Package.objects.filter(id=user.package_id).values()
            return Response({
                "key": token.key,
                "username": user.username,
                "id" : user.id,
                "is_superuser" : user.is_superuser,
                "package" : package[0]['title']
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
            words = df['review']
            output = []
            for x in words :
                output.append(x)

            content = {'review' : output, 'model_id' : model_ID, 'username' : uname}
            output = requests.post('https://ml.tand.ai/multiple_text', json=content)
            print(output, "<<?????")

            user = User.objects.filter(id=request.user.id).get()
            user.API_usage = usage + 1
            user.save()

            return Response(output.json())

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

    def post(self, request, pk):
        try :
            S = 10
            model = Modelml.objects.filter(id=pk).values()
            baseName = model[0]['model_ID']
            ran = ''.join(random.choices(string.ascii_uppercase + string.digits, k = S))
            filename = str(request.user.id) + "_" + baseName + "_" + ran

            content = {
                        "model_name":  request.data['model_name'],
                        "model_owner_id":  request.data['model_owner_id'],
                        "baseline_ID":  request.data['baseline_ID'],
                        "model_ID": ran
                }
            output = requests.post('https://ml.tand.ai/insert_name', json=content)
            return Response({"filename" : filename, "modelID" : ran},
            status=status.HTTP_200_OK)

        except Exception as error:
            print(error, "<<<<ERRRORRRR")
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

class TransferView2(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    parser_class = (FileUploadParser,)

    def post(self, request, pk):
        try :
            if 'file' not in request.data:
                raise ParseError("Empty content")

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

            filename = request.data['filename']
            f = request.data['file'].file.getvalue()
            row = request.data['file']
            df = pd.read_csv(row)
            print(len(df), "<<<<ROWW")
            print(type(f), "<<<<<<<<??????????FILEE")
            
            user = User.objects.filter(id=request.user.id).get()
            user.TF_usage = usage + len(df)
            user.save()
            output = requests.post('https://ml.tand.ai/upload', files={'file': (filename, f, 'text/csv', {'Expires': '0'})})
            return Response({"status" : "OK!"},
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

class EndpointView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
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
            
            content = {'single_text' : request.data['single_text'], 'model_id' : request.data['model_id'], 'userID' : request.user.id}
            output = requests.post('https://ml.tand.ai/singletext', json=content)

            user = User.objects.filter(id=request.user.id).get()
            user.API_usage = usage + 1
            user.save()
            print(output, "<<<??")
            return Response(output.json())
        except Exception as error:
            print(error, "ERRORR NICH")
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

class MultipleEndpointView(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
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
            
            content = {'review' : request.data['review'], 'model_id' : request.data['model_id'], 'username' : request.user.id}
            output = requests.post('https://ml.tand.ai/multiple_text', json=content)

            user = User.objects.filter(id=request.user.id).get()
            user.API_usage = usage + 1
            user.save()

            return Response(output.json())
        except Exception as error:
            print(error, "ERRORR NICH")
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

class SendMail(CreateAPIView):
    permission_classes = (AllowAny,)
    def post(self, request):
        try:
            email = request.data.get('email')
            check = User.objects.filter(email=email).values()
            link = "https://app.tand.ai/link-changes-password/" + email
            S = 10
            ran = ''.join(random.choices(string.ascii_uppercase + string.digits, k = S))
            if check : 
                request.data['email'] = email
                request.data['code'] = ran
                serializer = ForgotSerializer(data=request.data)
                if serializer.is_valid():
                    serializer.save()
                send_mail(
                'Forgot Password Confirmation',
                'You are receiving this email because you requested a password reset for your user account at tand.ai. Click ' + link + ' to reset password. And input ' + ran + ' as confirmation code. This code will expired in 10 minutes. If it is not you, abort this email',
                settings.EMAIL_HOST_USER,
                [email],
                fail_silently=False,
                )
                return Response({
                "status": "OK!"
                },
                status=status.HTTP_200_OK,
            )

            else : 
                return Response(
                {'error': 'email is not registered!'},
                status=status.HTTP_400_BAD_REQUEST
        )

        except Exception as error:
            print(error, "ERRORR NICH")
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )

    def put(self, request):
        try:
            email = request.data.get("email")
            code = request.data.get("code")
            check = ForgotPassword.objects.filter(email=email, code=code).values()
            if check :
                expires_check = check[0]['Expires']
                if expires_check > timezone.now() :  
                    user = User.objects.filter(email=email).get()
                    user.set_password(request.data.get("password"))
                    # user.password = request.data.get("password")
                    user.save()
                    return Response({"status": "Success Change Password!"},status=status.HTTP_200_OK,)
                return Response({"detail": "Code Expired!"},
                status=status.HTTP_400_BAD_REQUEST,)
            return Response({"detail": "wrong code!"},status=status.HTTP_400_BAD_REQUEST,)
        except Exception as error:
            return Response({
                "detail": str(error)
            },
                status=status.HTTP_400_BAD_REQUEST,
            )
