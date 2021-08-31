from django.urls import include, path
from modelml.views import *

# from user import views
# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', ModelmlView.as_view(), name="modelml"),
    path('<pk>',ModelmlView.as_view() , name="modelml")
]