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
    <section className="absolute top-12 right-12">
      <Sheet>
        <SheetTrigger>
          <img src={shoppingCartIcon} alt="shopping-cart" width={45} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
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
