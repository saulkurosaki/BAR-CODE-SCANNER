from django.contrib import admin
from django.urls import path, include
from .views import ProductFromImageView , digitCode , registerProduct

urlpatterns = [ # Ruta para el panel de administración de Django
    path('api/scanProduct/', ProductFromImageView.as_view()),  # Ruta para tu endpoint
    path('api/digitCode/', digitCode.as_view() ) ,#ruta para el endpoint donde se ingresa codigo a mano
    path('api/registerProduct/', registerProduct()), #ruta para agregar producto manualmente 
]