from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.GetJobs.as_view()),
]
