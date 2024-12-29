"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ICustomer } from "@/models/Customer";
import { useRouter, useSearchParams } from "next/navigation";

function CustomersSelect({
  customers,
  url,
}: {
  customers: ICustomer[] | [];
  url: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCustomer = searchParams.get("customer") || "all";

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("customer", value);
    } else {
      params.delete("customer");
    }
    router.push(`${url}?${params.toString()}`);
  };

  return (
    <Select
      name="category"
      value={selectedCustomer}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-full text-left font-normal">
        <SelectValue placeholder="Selecciona un usuario" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Clientes</SelectLabel>
          <SelectItem value="all" className="text-zinc-400 font-black">
            Todos los clientes
          </SelectItem>
          {customers?.map((user: ICustomer) => (
            <SelectItem key={user._id} value={user._id}>
              <div className="flex flex-row items-center">
                <p>
                  {user.name} {user.lastname}
                </p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default CustomersSelect;
