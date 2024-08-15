import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet.jsx";
import shoppingCartIcon from "../assets/shopping-cart-icon.svg";
import ScannedItem from "./ScannedItem.jsx";
import { useScannedItems } from "../context/ScannedItemsContext.jsx";

const Sidebar = () => {
  const { scannedItems } = useScannedItems();

  return (
    <section className="absolute top-10 right-12">
      <Sheet>
        <SheetTrigger>
          <div className="relative">
            <img
              src={shoppingCartIcon}
              alt="shopping-cart"
              width={40}
              className="invert"
            />
            {scannedItems.length > 0 && (
              <span className="absolute top-0 left-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {scannedItems.length}
              </span>
            )}
          </div>
        </SheetTrigger>
        <SheetContent className="min-w-[500px] bg-gradient-to-br from-[#30cfd0] to-[#330867] border-none">
          <SheetHeader>
            <SheetTitle className="text-[33px] text-[#ddd] mb-7 mt-1">
              Shopping Cart
            </SheetTitle>
            <SheetDescription>
              <div className="flex flex-col space-y-5 overflow-y-auto max-h-[85vh]">
                {scannedItems.length > 0 ? (
                  scannedItems.map((item, index) => (
                    <ScannedItem
                      item={item}
                      index={index}
                      key={item.codigo_barras}
                    />
                  ))
                ) : (
                  <p className="text-center text-lg mt-56 text-[#bbb]">
                    You don't have anything to buy yet
                  </p>
                )}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Sidebar;
