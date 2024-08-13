const ScannedItem = ({ item, index }) => {
  return (
    <div
      key={item.id}
      className="flex items-center h-16 rounded-lg border-2 border-[#2AC8CA]"
    >
      <span className="ml-4 text-[#ddd] text-xl gradient-text">
        {index + 1}
      </span>
      <span className="ml-4 text-[16px] font-bold text-[#ddd]">
        {item.name}
      </span>
      <span
        className="ml-4 text-[#ddd] overflow-hidden text-ellipsis whitespace-nowrap"
        style={{ maxWidth: "60%" }}
      >
        {item.description}
      </span>
    </div>
  );
};

export default ScannedItem;
