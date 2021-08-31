from django.urls import include, path
from user.views import *

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    # path('', UserView.as_view(), name="user"),
    path('transfer', TransferView.as_view(), name="transfer"),
    path('register', RegisterView.as_view(), name="register"),
    path('model',ModelView.as_view() , name="model"),
    path('file',FileUploadView.as_view() , name="file"),
    path('multiple',MultipleView.as_view() , name="multiple"),
    path('login', Login.as_view() , name="login"),
    path('package', PackageView.as_view() , name="package"),
    path('package/<pk>', PackageView.as_view() , name="package"),
    path('<pk>',UserView.as_view() , name="user"),
]