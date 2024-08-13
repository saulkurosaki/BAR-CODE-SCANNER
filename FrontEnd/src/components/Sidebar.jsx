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

const cartItems = [
  {
    id: crypto.randomUUID(),
    name: "Galletas Oreo",
    description:
      "Galletas de chocolate rellenas de una deliciosa crema blanca por dentro que te dejara con ganas de comer mas.",
    price: 2.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Café con Leche",
    description:
      "Un delicioso café mezclado con leche fresca, perfecto para empezar el día.",
    price: 1.49,
  },
  {
    id: crypto.randomUUID(),
    name: "Tortilla de Patatas",
    description:
      "Una tortilla de patatas casera, hecha con amor y dedicación, para disfrutar en cualquier momento.",
    price: 3.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Pizza Margherita",
    description:
      "Una pizza clásica italiana, con salsa de tomate, mozzarella fresca y albahaca, perfecta para una noche de cine.",
    price: 12.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Hamburguesa Clásica",
    description:
      "Una hamburguesa clásica, con carne de ternera, lechuga, tomate, cebolla y queso, para disfrutar en un día de verano.",
    price: 8.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Ensalada de Frutas",
    description:
      "Una fresca ensalada de frutas, con una variedad de colores y sabores, perfecta para una comida ligera.",
    price: 4.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Tacos de Carnitas",
    description:
      "Tacos de carnitas, con carne de cerdo cocida a la perfección, salsa de limón y cebolla, para disfrutar en un día festivo.",
    price: 9.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Sushi de Atún",
    description:
      "Sushi de atún fresco, con arroz japonés y wasabi, perfecto para una comida exótica.",
    price: 15.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Tortas de Aceite",
    description:
      "Tortas de aceite, hechas con aceite de oliva y azúcar, perfectas para un desayuno o merienda.",
    price: 1.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Pollo al Curry",
    description:
      "Pollo al curry, cocido en una deliciosa salsa de curry, con arroz basmati y verduras, para disfrutar en un día de invierno.",
    price: 10.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Ensalada de Espinacas",
    description:
      "Ensalada de espinacas frescas, con aguacate, huevo duro y vinagreta de limón, perfecta para una comida saludable.",
    price: 5.99,
  },
  {
    id: crypto.randomUUID(),
    name: "Tostada de Aguacate",
    description:
      "Tostada de aguacate, con aguacate fresco, sal y limón, perfecta para un snack saludable.",
    price: 3.49,
  },
];

const Sidebar = () => {
  const itemCount = cartItems.length; // Contar los elementos en cartItems

  return (
    <section className="absolute top-10 right-12">
      <Sheet>
        <SheetTrigger>
          <div className="relative">
            {" "}
            {/* Contenedor relativo para la burbuja */}
            <img
              src={shoppingCartIcon}
              alt="shopping-cart"
              width={37}
              className="invert"
            />
            {itemCount > 0 && ( // Mostrar burbuja solo si hay elementos
              <span className="absolute top-0 left-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {itemCount}
              </span>
            )}
          </div>
        </SheetTrigger>
        <SheetContent className="min-w-[500px] bg-gradient-to-br from-[#30cfd0] to-[#330867] border-none">
          <SheetHeader>
            <SheetTitle className="text-[28px] text-[#ddd] mb-7 mt-1">
              Shopping Cart
            </SheetTitle>
            <SheetDescription>
              <div className="flex flex-col space-y-4 overflow-y-auto max-h-[83vh]">
                {cartItems.map((item, index) => (
                  <ScannedItem item={item} index={index} />
                ))}
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default Sidebar;
