import { useState, useRef, useEffect } from "react";

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isScanning) {
      startCamera();
    } else {
      stopCamera();
    }
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
    setInterval(() => {
      captureImage();
    }, 3000); // Captura una imagen cada 3 segundos
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

      // Enviar la imagen al backend
      const imageDataUrl = canvas.toDataURL("image/jpeg");
      sendImageToBackend(imageDataUrl);
    }
  };

  // const sendImageToBackend = (imageDataUrl) => {
  //   // Lógica para enviar la imagen al backend
  //   console.log("Enviando imagen al backend:", imageDataUrl);
  // };

  return (
    <section className="w-full max-w-4xl mx-auto min-h-screen flex flex-col justify-center items-center p-4">
      <div className="w-full mb-8 flex justify-center">
        <button
          onClick={() => setIsScanning(!isScanning)}
          className={`px-8 py-4 rounded-lg text-xl font-semibold transition-colors ${
            isScanning
              ? "bg-red-600 hover:bg-red-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isScanning ? "Detener escaneo" : "Iniciar escaneo"}
        </button>
      </div>

      <div className="w-full aspect-[4/3] bg-gray-100 border-4 border-blue-500 rounded-xl shadow-xl overflow-hidden flex justify-center items-center">
        {isScanning ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover transform -scale-x-100"
          />
        ) : (
          <div className="text-2xl text-gray-600">No hay cámara activa</div>
        )}
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="w-full mt-8 text-center text-lg text-gray-600">
        Coloca el código QR dentro del área de escaneo
      </div>
    </section>
  );
};

export default Scanner;
