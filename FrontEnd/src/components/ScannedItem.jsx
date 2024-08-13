import downArrowIcon from "../assets/down-arrow-icon.svg";

const ScannedItem = ({ item, index }) => {
  return (
    <div
      key={item.id}
      className="flex items-center min-h-16 rounded-lg border-2 border-[#2AC8CA] justify-between"
    >
      <span className="ml-4 text-[#ddd] text-xl gradient-text">
        {index + 1}
      </span>
      <span className="ml-7 text-[16px] font-bold text-[#ddd]">
        ${item.price}
      </span>
      <span className="text-[16px] font-bold text-[#ddd] flex-1 text-center">
        {item.name}
      </span>
      <img
        src={downArrowIcon}
        alt="Icono de flecha abajo"
        className="mr-4 invert"
        width={20}
      />
    </div>
  );
};

export default ScannedItem;
