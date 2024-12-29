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
import { IAccount } from "@/models/Account";
import { useRouter, useSearchParams } from "next/navigation";

function UserSelect({ users, url }: { users: IAccount[] | []; url: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedUser = searchParams.get("user") || "all";

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("user", value);
    } else {
      params.delete("user");
    }
    router.push(`${url}?${params.toString()}`);
  };

  return (
    <Select
      name="category"
      value={selectedUser}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-full text-left font-normal">
        <SelectValue placeholder="Selecciona un usuario" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Usuarios</SelectLabel>
          <SelectItem value="all">Todos los usuarios</SelectItem>
          {users?.map((user: IAccount) => (
            <SelectItem key={user._id} value={user._id}>
              <div className="flex flex-row items-center">
                <p>{user.username}</p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default UserSelect;
