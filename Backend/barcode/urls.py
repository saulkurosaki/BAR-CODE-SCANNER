from django.contrib import admin
from django.urls import path, include
from .views import ProductFromImageView

urlpatterns = [ # Ruta para el panel de administración de Django
    path('api/scanProduct/', ProductFromImageView.as_view()),  # Ruta para tu endpoint
]