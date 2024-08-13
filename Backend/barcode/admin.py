from django.contrib import admin
from .models import products

@admin.register(products)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'codigo_barras', 'descripcion', 'precio', 'registered_at')
    search_fields = ('name', 'codigo_barras', 'descripcion')