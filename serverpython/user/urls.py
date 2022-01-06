from django.urls import include, path
from user.views import *

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    # path('', UserView.as_view(), name="user"),
    path('transfer/<pk>', TransferView.as_view(), name="transfer"),
    path('transfer2/<pk>', TransferView2.as_view(), name="transfer2"),
    path('register', RegisterView.as_view(), name="register"),
    path('model',ModelView.as_view() , name="model"),
    path('csv',CsvView.as_view() , name="csv"),
    path('file/<pk>',FileUploadView.as_view() , name="file"),
    path('multiple',MultipleView.as_view() , name="multiple"),
    path('login', Login.as_view() , name="login"),
    path('package', PackageView.as_view() , name="package"),
    path('package/<pk>', PackageView.as_view() , name="package"),
    path('endpoint/singletext', EndpointView.as_view() , name="single"),
    path('endpoint/multiple', MultipleEndpointView.as_view() , name="multiple"),
    path('<pk>',UserView.as_view() , name="user"),
]