import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog.jsx";
import { useState } from "react";
import { useToast } from "./ui/use-toast.js";

const NewProductButton = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [barcode, setBarcode] = useState("");
  const [price, setPrice] = useState("");

  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      codigo_barras: barcode,
      descripcion: description,
      precio: price,
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/registerproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      const data = await response.json();
      console.log("Producto registrado:", data);
      setName("");
      setDescription("");
      setBarcode("");
      setPrice("");
      toast({
        title: "Product Created",
        description: "The product has been created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error Creating the Product",
        description:
          "There was a problem creating the product. Please try again.",
        variant: "destructive",
      });
      console.error("Error al registrar el producto:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <button className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded">
          Create New Product
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-[#ddd] text-[40px]">
            Create New Product
          </DialogTitle>
          <DialogDescription>
            <form onSubmit={handleSubmit} className="mt-7">
              <div className="mb-7">
                <label
                  className="block mb-1 text-[#ddd] text-2xl"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="block w-full p-2 border rounded"
                />
              </div>
              <div className="mb-7">
                <label
                  className="block mb-1 text-[#ddd] text-2xl"
                  htmlFor="description"
                >
                  Description
                </label>
                <input
                  id="description"
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="block w-full p-2 border rounded"
                />
              </div>
              <div className="mb-7">
                <label
                  className="block mb-1 text-[#ddd] text-2xl"
                  htmlFor="barcode"
                >
                  Barcode
                </label>
                <input
                  id="barcode"
                  type="text"
                  placeholder="Barcode"
                  value={barcode}
                  onChange={(e) => setBarcode(e.target.value)}
                  required
                  className="block w-full p-2 border rounded"
                />
              </div>
              <div className="mb-14">
                <label
                  className="block mb-1 text-[#ddd] text-2xl"
                  htmlFor="price"
                >
                  Price
                </label>
                <input
                  id="price"
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                  className="block w-full p-2 border rounded"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Register Product
              </button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewProductButton;
