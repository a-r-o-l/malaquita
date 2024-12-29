import { getProduct } from "@/actions/productActions";
import GoToButton from "../../../../components/GoToButton";
import { IProduct, PartialProduct } from "@/models/Product";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ItemTableBody from "../components/ItemTableBody";
import CreateProductModal from "../components/CreateProductModal";
import { Separator } from "@/components/ui/separator";
import BackButton from "../components/BackButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { priceParser } from "@/functions/productsHandler";
import { Image as ImageIcon } from "lucide-react";
import EditProductInfoModal from "../components/EditProductInfoModal";
import { getAllCategories } from "@/actions/categoriesActions";
import Image from "next/image";

interface IProductData extends IProduct {
  similarProducts: PartialProduct[] | [];
}

export default async function NewProductScreen({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const param = await params;
  const product = (await getProduct(param.id)) as IProductData | null;
  if (product && !product.similarProducts) {
    // product.similarProducts = [];
  }
  const categories = await getAllCategories();
  if (!product) {
    return (
      <div className="flex flex-1 flex-col justify-center items-center">
        <div className="flex flex-1 flex-col w-1/2">
          <div className="text-center">
            <h1 className="font-bold text-xl">Producto no encontrado</h1>
          </div>
          <div className="w-full space-y-2">
            <GoToButton title="Volver" goTo="/dashboard/products" />
          </div>
        </div>
      </div>
    );
  }

  const productImage = product.imageUrl;
  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <div className="w-full">
        <BackButton url="/dashboard/products" />
      </div>
      <div className="flex flex-row gap-5 w-full justify-center">
        <Card className="w-1/2 mt-10">
          <CardHeader>
            <div className="flex justify-between">
              <div>
                <CardTitle className="font-bold text-xl">
                  {product.name?.toUpperCase()}
                </CardTitle>
                <CardDescription>Informacion del producto</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <EditProductInfoModal item={product} categories={categories} />
              </div>
            </div>
            <Separator />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-5">
              <div className="flex justify-center w-full">
                {productImage ? (
                  <Image
                    src={productImage}
                    alt="Product preview"
                    className="w-60 h-60 object-fill rounded-lg border-4 border-zinc-400"
                  />
                ) : (
                  <div className="flex flex-col justify-center text-center w-60 h-60 rounded-lg border-4 border-zinc-400">
                    <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-600">No hay imagen</p>
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-sm">Codigo</p>
                <p className="text-sm">{product.code}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-sm">Nombre</p>
                <p className="text-sm">{product.name}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-sm">category</p>
                <p className="text-sm"> {product.category.name}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-sm">Color</p>
                <p className="text-sm">{product.color}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-sm">Descripcion</p>
                <p className="text-sm">{product.description}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-sm">Precio</p>
                <p className="text-sm">{priceParser(product.price)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        {!product.uniqueSize && (
          <Card className="w-1/2 mt-10">
            <CardHeader>
              <div className="flex justify-between py-2">
                <div>
                  <CardTitle>Talles</CardTitle>
                  <CardDescription>
                    Talles disponible del producto
                  </CardDescription>
                </div>
                <div className="flex items-center">
                  <CreateProductModal product={product} variant="secondary">
                    <span>Crear talle</span>
                  </CreateProductModal>
                </div>
              </div>
            </CardHeader>
            <CardContent className="w-full">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Talle</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead align="center" className="text-right">
                      Acciones
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <ItemTableBody items={product.similarProducts} />
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
