import downArrowIcon from "../assets/down-arrow-icon.svg";
import { useState } from "react";

const ScannedItem = ({ item, index }) => {
  const [isArrowUp, setIsArrowUp] = useState(false);

  const toggleArrow = () => {
    setIsArrowUp(!isArrowUp);
  };

  return (
    <div
      key={item.id}
      onClick={toggleArrow}
      className={`flex flex-col items-center rounded-lg border-2 justify-between cursor-pointer ${
        isArrowUp ? "h-auto border-[#ddd]" : "min-h-16 border-[#2AC8CA]"
      } transition-min-height duration-700 ease-in-out`}
    >
      <div className="flex items-center mt-4 mb-3 justify-between w-full">
        <span className="ml-4 text-[#ddd] text-xl font-bold gradient-text">
          {index + 1}
        </span>
        <span className="ml-7 text-[17px] font-bold text-[#ddd]">
          ${item.price}
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
          <p className="text-[#ddd] text-lg line-clamp-3">{item.description}</p>
        </div>
      )}
    </div>
  );
};

export default ScannedItem;
