import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { priceParser } from "@/functions/productsHandler";
import { getIconById } from "@/lib/icons";
import { PartialProduct } from "@/models/Product";
import { useRouter } from "next/navigation";

function ProductTableCell({
  product,
  role,
}: {
  product: {
    id: string;
    hasMultipleItems: boolean;
    items: PartialProduct[];
  };
  role: string;
}) {
  const router = useRouter();
  if (!product.hasMultipleItems) {
    const item = product.items.length ? product.items[0] : null;
    if (!item) return null;
    return (
      <TableRow>
        <TableCell align="left">
          <Avatar className="h-14 w-14 rounded-md border-4 justify-center items-center">
            <AvatarImage src={item.imageUrl} alt="product" />
          </Avatar>
        </TableCell>
        <TableCell>{item.code}</TableCell>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.description}</TableCell>
        <TableCell>{item.color}</TableCell>
        <TableCell>
          <span>{item.category ? getIconById(item.category.icon) : ""}</span>
        </TableCell>
        <TableCell>{item.size || "-"}</TableCell>
        <TableCell>{item.stock}</TableCell>
        {role === "admin" && (
          <TableCell>{priceParser(item.costPrice)}</TableCell>
        )}
        <TableCell>{priceParser(item.price)}</TableCell>
        <TableCell align="right">
          <Button
            variant="link"
            onClick={() => router.push(`/dashboard/products/${item._id}`)}
          >
            Ver
          </Button>
        </TableCell>
      </TableRow>
    );
  }
  const item = product.items[0];
  const sizes = product.items.map((item) => item.size).join(", ");
  const totalStock = product.items.reduce((acc, item) => acc + item.stock!, 0);
  return (
    <TableRow key={item._id}>
      <TableCell>
        <Avatar className="h-14 w-14 rounded-md border-4 justify-center items-center">
          <AvatarImage src={item.imageUrl} alt="product" />
        </Avatar>
      </TableCell>
      <TableCell>{item.code}</TableCell>
      <TableCell>{item.name}</TableCell>
      <TableCell>{item.description}</TableCell>
      <TableCell>{item.color}</TableCell>
      <TableCell align="left">
        <span>{item.category ? getIconById(item.category.icon) : ""}</span>
      </TableCell>
      <TableCell>{sizes}</TableCell>
      <TableCell>{totalStock}</TableCell>
      {role === "admin" && (
        <TableCell>{priceParser(item?.costPrice)}</TableCell>
      )}
      <TableCell>{priceParser(item?.price)}</TableCell>
      <TableCell align="right">
        <Button
          variant="link"
          onClick={() => router.push(`/dashboard/products/${item._id}`)}
        >
          Ver
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default ProductTableCell;
