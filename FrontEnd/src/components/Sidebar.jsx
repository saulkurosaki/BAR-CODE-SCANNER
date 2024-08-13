import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet.jsx";
import shoppingCartIcon from "../assets/shopping-cart-icon.svg";

const Sidebar = () => {
  return (
    <section className="absolute top-10 right-12">
      <Sheet>
        <SheetTrigger>
          <img src={shoppingCartIcon} alt="shopping-cart" width={37} />
        </SheetTrigger>
        <SheetContent className="bg-gradient-to-br from-[#30cfd0] to-[#330867] border-none">
          <SheetHeader>
            <SheetTitle className="text-[28px] text-[#ddd] mb-7 mt-1">
              Shopping Cart
            </SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Sidebar;
