import downArrowIcon from "../assets/down-arrow-icon.svg";
import { useState } from "react";
import { useScannedItems } from "../context/ScannedItemsContext.jsx";

const ScannedItem = ({ item, index }) => {
  const [isArrowUp, setIsArrowUp] = useState(false);
  const { scannedItems, setScannedItems } = useScannedItems();

  const toggleArrow = () => {
    setIsArrowUp(!isArrowUp);
  };

  const handleRemoveItem = () => {
    console.log("Items antes de eliminar:", scannedItems);
    console.log("Eliminando item con id:", item.id);
    setScannedItems((prevItems) =>
      prevItems.filter((scannedItem) => scannedItem.id !== item.id)
    );
    console.log("Items después de eliminar:", scannedItems);
  };

  return (
    <div
      key={item.id}
      onClick={toggleArrow}
      className={`flex flex-col items-center rounded-lg border-2 justify-between cursor-pointer ${
        isArrowUp ? "h-auto border-[#ddd]" : "min-h-16 border-[#2AC8CA]"
      } transition-min-height duration-700 ease-in-out relative`}
    >
      <div className="flex items-center mt-4 mb-3 justify-between w-full">
        <span className="ml-4 text-[#ddd] text-xl font-bold gradient-text">
          {index + 1}
        </span>
        <span className="ml-7 text-[17px] font-bold text-[#ddd]">
          ${item.precio}
        </span>
        <span className="text-[16px] font-bold text-[#ddd] flex-1 text-center">
          {item.name}
        </span>
        <img
          src={downArrowIcon}
          alt="Icono de flecha abajo"
          className={`mr-4 invert ${
            isArrowUp
              ? "-rotate-180 transition-transform duration-500"
              : "transition-transform duration-500"
          }`}
          width={20}
        />
      </div>
      {isArrowUp && (
        <div className="p-4">
          <p className="text-[#ddd] text-lg line-clamp-3">{item.descripcion}</p>
        </div>
      )}
      {/* Burbuja blanca con "X" para eliminar el item */}
      <button
        onClick={handleRemoveItem}
        className="absolute top-2 right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
      >
        <span className="text-red-500 font-bold">X</span>
      </button>
    </div>
  );
};

export default ScannedItem;
