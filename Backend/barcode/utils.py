import base64
import numpy as np
import cv2
from pyzbar import pyzbar

def decodeImage(codigo):
    try:
        # Decodificar la imagen base64
        image_data = base64.b64decode(codigo.split(',')[1] if ',' in codigo else codigo)
        np_arr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        
        if image is None:
            raise ValueError("La imagen no se pudo decodificar.")

        # Decodificar los codigos de barras
        barcodes = pyzbar.decode(image)
        barcode_data_list = []

        for barcode in barcodes:
            (x, y, w, h) = barcode.rect
            cv2.rectangle(image, (x, y), (x + w, y + h), (0, 0, 255), 2)
            barcodeData = barcode.data.decode("utf-8")
            barcode_data_list.append(barcodeData)

        # Retornar la lista de datos de codigos de barras encontrados
        return barcode_data_list

    except Exception as e:
        print(f"Error al decodificar la imagen: {e}")
        return []
    



    



