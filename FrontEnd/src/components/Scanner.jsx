import { useState } from "react";

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);

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
          <div className="text-2xl text-gray-600">Escaneando...</div>
        ) : (
          <div className="text-2xl text-gray-600">No hay cámara activa</div>
        )}
      </div>

      <div className="w-full mt-8 text-center text-lg text-gray-600">
        Coloca el código QR dentro del área de escaneo
      </div>
    </section>
  );
};

export default Scanner;
