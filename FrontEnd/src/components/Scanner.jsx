import { useState, useRef, useEffect } from "react";
import { useScannedItems } from "../context/ScannedItemsContext.jsx";

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [scanningText, setScanningText] = useState("Scanning");
  const [dotCount, setDotCount] = useState(0);
  const { setScannedItems, scannedItems } = useScannedItems();
  const [manualCode, setManualCode] = useState(""); // Estado para el código manual

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setScanningText("Scanning" + ".".repeat(dotCount));
  }, [dotCount]);

  useEffect(() => {
    if (isScanning) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isScanning]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      startCapturing();
    } catch (error) {
      console.error("Error al acceder a la cámara:", error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const startCapturing = () => {
    const capture = () => {
      captureImage();
      if (isScanning) {
        setTimeout(capture, 3000);
      }
    };
    capture();
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext("2d")
        .drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageDataUrl = canvas.toDataURL("image/jpeg");
      sendImageToBackend(imageDataUrl);
    }
  };

  const sendImageToBackend = async (imageDataUrl) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/scanProduct/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigobase64: imageDataUrl }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (data.message === "Producto encontrado.") {
        const newId =
          scannedItems.length > 0
            ? Math.max(...scannedItems.map((item) => item.id)) + 1
            : 1;
        const productWithId = { ...data.product, id: newId };
        setScannedItems((prevItems) => [...prevItems, productWithId]);

        // Detener la cámara después de recibir un producto exitosamente
        setIsScanning(false);
      }
    } catch (error) {
      console.error("Error al enviar la imagen al backend:", error);
    }
  };

  const handleManualCodeSubmit = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/digitCode/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ codigobase64: manualCode }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (data.message === "Producto encontrado") {
        const newId =
          scannedItems.length > 0
            ? Math.max(...scannedItems.map((item) => item.id)) + 1
            : 1;
        const productWithId = { ...data.product, id: newId };
        setScannedItems((prevItems) => [...prevItems, productWithId]);
        setManualCode(""); // Limpiar el campo de entrada
      }
    } catch (error) {
      console.error("Error al enviar el código manual al backend:", error);
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full mb-8 flex justify-center">
        <button
          onClick={() => setIsScanning(!isScanning)}
          className={`px-8 py-4 rounded-lg text-xl font-semibold transition-colors ${
            isScanning
              ? "bg-gradient-to-br from-[#685bfe] to-[#ff61a1] text-white"
              : "bg-gradient-to-br from-[#ff61a1] to-[#685bfe] text-white"
          }`}
        >
          {isScanning ? scanningText : "Start scanning"}
        </button>
      </div>

      <div className="w-full aspect-[3/2] bg-gray-100 border-4 border-blue-500 rounded-xl shadow-xl overflow-hidden flex justify-center items-center">
        {isScanning ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="bg-[#436b9d] text-white text-center h-full w-full">
            <div className="flex items-center flex-col p-8 gap-28 w-full h-full">
              <p className="text-[80px] mt-24">
                Welcome to <span className="gradient-text">Scann-X</span>
              </p>
              <p className="text-5xl">
                Click on the button above to start scanning your products!
              </p>
            </div>
          </div>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Campo de texto para ingresar el código manual */}
      <div className="mt-4">
        <input
          type="text"
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
          placeholder="Enter the barcode manually"
          className="px-4 py-2 border rounded"
        />
        <button
          onClick={handleManualCodeSubmit}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default Scanner;
