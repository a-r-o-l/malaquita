import { getAllCategories } from "@/actions/categoriesActions";
import { Label } from "@/components/ui/label";
import CategorySelect from "./components/CategorySelect";
import SearchInput from "./components/SearchInput";
import { getProductsByCategory } from "@/actions/productActions";
import GoToButton from "../../../components/GoToButton";
import ProductTable from "./components/ProductTable";
import { ScrollArea } from "@/components/ui/scroll-area";

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
        <div className="w-full flex flex-col justify-center gap-10 lg:flex-row">
          <div className="w-full space-y-2">
            <Label>Categoria</Label>
            <CategorySelect categories={categories} />
          </div>
          <div className="w-full space-y-2">
            <Label>Buscar</Label>
            <SearchInput />
          </div>
          <div className="w-full flex justify-end items-end">
            <GoToButton
              title="Crear producto"
              goTo="/dashboard/products/new"
              className="bg-fuchsia-500 hover:bg-fuchsia-700 text-white"
              privateAccess={true}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex items-center my-10">
        <div className="w-full items-center flex gap-10">
          <h1>Productos</h1>
        </div>
        <div className="flex items-center"></div>
      </div>
      <ScrollArea className="relative h-[400px] w-full overflow-y-auto border rounded-md">
        <ProductTable products={data} />
      </ScrollArea>
    </div>
  );
}
