import { getAllCategories } from "@/actions/categoriesActions";
import { Label } from "@/components/ui/label";
import CategorySelect from "./components/CategorySelect";
import SearchInput from "./components/SearchInput";
import { getProductsByCategory } from "@/actions/productActions";
import GoToButton from "../../../components/GoToButton";
import ProductTable from "./components/ProductTable";

interface SearchParams {
  category?: string;
  search?: string;
}

export default async function ProductsScreen({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const param = await searchParams;
  const selectedCategory = param.category || "all";
  const searchQuery = param.search || "";
  const { data } = await getProductsByCategory(selectedCategory, searchQuery);
  const categories = await getAllCategories();

  return (
    <div className="flex flex-1 flex-col items-center p-10">
      <div className=" flex w-full items-center">
        <div className="w-full flex gap-10">
          <div className="w-full space-y-2">
            <Label>Categoria</Label>
            <CategorySelect categories={categories} />
          </div>
          <div className="w-full space-y-2">
            <Label>Buscar</Label>
            <SearchInput />
          </div>
        </div>
        <div className="flex items-center justify-end w-full">
          <GoToButton
            title="Crear producto"
            goTo="/dashboard/products/new"
            className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white"
            privateAccess={true}
          />
        </div>
      </div>
      <div className="w-full flex items-center my-10">
        <div className="w-full items-center flex gap-10">
          <h1>Productos</h1>
        </div>
        <div className="flex items-center"></div>
      </div>
      <ProductTable products={data} />
    </div>
  );
}
