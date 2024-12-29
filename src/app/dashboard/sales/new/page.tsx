import { getAllCustomers } from "@/actions/customerActions";
import { getAllProducts } from "@/actions/productActions";
import ProductsCard from "../components/ProductsCard";

export default async function SalesScreen() {
  const products = await getAllProducts();
  const customers = await getAllCustomers();

  return <ProductsCard products={products} customers={customers} />;
}
