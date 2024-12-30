"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICustomer } from "@/models/Customer";
import { IProduct } from "@/models/Product";
import { Minus, Plus, Search, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import ProductTableRow from "../../products/components/ProductTableRow";
import { createSale } from "@/actions/salesActions";
import { useUser } from "@/context/UserContext";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  stock?: number;
  size?: string;
  quantity: number;
}

export interface groupedItems {
  id: string;
  hasMultipleItems: boolean;
  items: IProduct[];
}

const paymentTypes = [
  {
    id: 1,
    value: "efectivo",
    name: "Efectivo",
  },
  {
    id: 2,
    value: "tarjeta de creadito",
    name: "Tarjeta de credito",
  },
  {
    id: 3,
    value: "tarjeta de debito",
    name: "Tarjeta de debito",
  },
  {
    id: 4,
    value: "transferencia",
    name: "Transferencia",
  },
  {
    id: 5,
    value: "cuenta corriente",
    name: "Cuenta corriente",
  },
];

function ProductsCard({
  products,
  customers,
}: {
  products: IProduct[];
  customers: ICustomer[];
}) {
  const { user } = useUser();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaymentType, setSelectedPaymentType] = useState(
    paymentTypes[0].value
  );
  const [pay, setPay] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<groupedItems[] | []>(
    []
  );
  const [cart, setCart] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const groupedProductsArray = results.reduce((acc, product) => {
      const groupId = product.code;
      if (!acc[groupId]) {
        acc[groupId] = {
          id: groupId,
          hasMultipleItems: false,
          items: [],
        };
      }
      acc[groupId].items.push(product);
      acc[groupId].hasMultipleItems = acc[groupId].items.length > 1;
      return acc;
    }, {} as { [key: string]: groupedItems });

    const groupedProductsList = Object.values(groupedProductsArray);
    setFilteredProducts(groupedProductsList);
  }, [searchTerm, products]);

  const addToCart = (product: IProduct) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (!product.stock) {
        toast.error("No hay stock disponible");
        return prevCart;
      }
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          toast.error("No hay suficiente stock disponible");
          return prevCart;
        }
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      if (product.stock < 1) {
        toast.error("No hay suficiente stock disponible");
        return prevCart;
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (!user) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <div className="container mx-auto p-5 py-20">
      <div className="flex flex-col lg:flex-row gap-4">
        <Card className="w-full lg:w-2/3">
          <CardHeader>
            <CardTitle>Productos</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar producto."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="relative h-[400px] w-full overflow-y-auto border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Codigo</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell>Categoria</TableCell>
                    <TableCell>Talles</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Precio</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => {
                    return (
                      <ProductTableRow
                        key={product.id}
                        product={product}
                        addProductToCart={addToCart}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="w-full lg:w-1/3">
          <CardHeader>
            <CardTitle>Detalles de la venta</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between mb-4"
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Talle {item.size || "-"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        $ {item.price.toLocaleString("es-ES")}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        updateQuantity(item._id, item.quantity - 1);
                      }}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        if (item.quantity === item.stock) {
                          toast.error("No hay suficiente stock disponible");
                          return;
                        }
                        updateQuantity(item._id, item.quantity + 1);
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white"
                      onClick={() => removeFromCart(item._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>

            <div className="mt-4 flex justify-between items-center">
              <span className="font-semibold w-40">Total:</span>
              <Badge variant="secondary" className="text-lg w-full">
                $ {totalPrice.toLocaleString("es-ES")}
              </Badge>
            </div>
            <Button
              className="w-full mt-4 bg-fuchsia-500 hover:bg-fuchsia-700 text-white"
              onClick={async () => setOpen(true)}
              disabled={!cart.length}
            >
              Crear venta
            </Button>
          </CardContent>
        </Card>
      </div>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalles del pago</DialogTitle>
            <DialogDescription>
              Completa los detalles del pago para finalizar la venta.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-semibold w-40">Tipo de pago:</span>
              <Select
                value={selectedPaymentType}
                onValueChange={(e: string) => setSelectedPaymentType(e)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona una categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipos</SelectLabel>
                    {paymentTypes.map((paymentType) => (
                      <SelectItem
                        key={paymentType.id}
                        value={paymentType.value}
                      >
                        {paymentType.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="mt-4 flex justify-between items-center">
              <span className="font-semibold w-40">Total:</span>
              <Input
                readOnly
                value={`$ ${totalPrice.toLocaleString("es-ES")}` || 0}
              />
            </div>
            {selectedPaymentType === "cuenta corriente" ? (
              <div className="mt-4 flex justify-between items-center">
                <span className="font-semibold w-40">Cliente:</span>
                <Select
                  value={selectedCustomer}
                  onValueChange={(e: string) => setSelectedCustomer(e)}
                  disabled={selectedPaymentType !== "cuenta corriente"}
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Selecciona un cliente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Clientes</SelectLabel>
                      {customers.map((customer) => (
                        <SelectItem key={customer._id} value={customer._id}>
                          {customer.name} {customer.lastname}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            ) : (
              <div className="mt-4 flex justify-between items-center">
                <span className="font-semibold w-40">Paga:</span>
                <Input
                  type="number"
                  placeholder="Ingresa el monto abonado por el cliente"
                  value={pay}
                  onChange={(e) => setPay(e.target.value)}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                const itemIds = cart.flatMap((item) =>
                  Array(item.quantity).fill(item._id)
                );
                const formData = new FormData();
                formData.append("date", new Date().toISOString());
                formData.append("accountId", user?.id);
                formData.append("type", selectedPaymentType);
                formData.append("total", totalPrice.toString());
                formData.append("pay", pay.toString());
                formData.append("items", JSON.stringify(itemIds));
                if (selectedPaymentType === "cuenta corriente") {
                  formData.append("customerId", selectedCustomer);
                }
                const res = await createSale(formData);
                if (res.success) {
                  toast.success(res.message);
                  setCart([]);
                } else {
                  toast.error(res.message);
                }
                setOpen(false);
              }}
            >
              Aceptar
            </Button>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductsCard;
