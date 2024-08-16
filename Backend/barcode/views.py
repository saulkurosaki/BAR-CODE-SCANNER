from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import imageSerializer, productSerializer , codeSerializer
from .utils import decodeImage
from .models import products

# Create your views here.



class ProductFromImageView(APIView):
    def post(self, request):
        serializer = imageSerializer(data=request.data)
        if serializer.is_valid():
            codigobase64 = serializer.validated_data['codigobase64']
            barcode_data_list = decodeImage(codigobase64)

            if not barcode_data_list:
                return Response({'error': 'No se encontraron códigos de barras en la imagen.'}, status=status.HTTP_404_NOT_FOUND)

            # Suponiendo que solo hay un codigo de barras en la lista
            barcode_data = barcode_data_list[0]

            # Intentar obtener el producto con el codigo de barras
            product, created = products.objects.get_or_create(
                codigo_barras=barcode_data,
                defaults={'name': 'unknown', 'descripcion': '', 'precio': 0}
            )

            # Serializar el producto encontrado o creado
            product_serializer = productSerializer(product)
            
            if created:
                message = 'Producto creado con exito.'
            else:
                message = 'Producto encontrado.'

            return Response({
                'message': message,
                'product': product_serializer.data
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



#endpoint para consultar el producto o crearlo digitando el codigo manualmente
class digitCode(APIView):
    def post(self, request):
        serializer = codeSerializer(data=request.data)
        if serializer.is_valid():
            codigobase64 = serializer.validated_data['codigobase64']

            barcode_data = codigobase64

            product, created = products.objects.get_or_create(
                codigo_barras=barcode_data,
                defaults={'name': 'unknown', 'descripcion': '', 'precio': 0}
            )

            # Serializar el producto
            serialized_product = productSerializer(product)

            if created:
                message = 'Producto creado con éxito'
            else:
                message = 'Producto encontrado'

            return Response({
                'message': message,
                'product': serialized_product.data  # Accede a los datos serializados
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#Endpoint para registrar un producto ingresando los datos manualmente 

class registerProduct(APIView):
    def post(self, request):
        serializer = productSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({'message' : 'Producto agregado exitosamente',
                             'product' : serializer.data },
                             status = status.HTTP_200_OK)
    
        return Response(serializer.errors, status= status.HTTP_400_BAD_REQUEST)
