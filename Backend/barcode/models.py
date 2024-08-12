from django.db import models

# Create your models here.



class products(models.Model):
    name = models.CharField(max_length=100, null=False, default='unknown')
    codigo_barras = models.IntegerField(default=0,unique=True,null=False)
    descripcion = models.TextField(null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    registered_at = models.DateTimeField(auto_now_add= True)




