import { getAllCategories } from "@/actions/categoriesActions";
import NewProductForm from "../components/NewProductForm";

export default async function NewProductScreen() {
  const categories = await getAllCategories();
  return <NewProductForm categories={categories} />;
}
