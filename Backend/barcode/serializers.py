from rest_framework import serializers
from .models import products


class imageSerializer(serializers.Serializer):
    codigobase64 = serializers.CharField() #campo para recibir el codigo de la imagen 


    

class productSerializer(serializers.ModelSerializer):
    class Meta:
        model = products
        fields =  ['name', 'codigo_barras' , 'descripcion', 'precio']

