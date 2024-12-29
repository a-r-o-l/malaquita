import LogoutButton from "@/components/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import React from "react";

interface User {
  id: string;
  name: string;
  role: string;
  password: string;
  imageUrl: string;
}

function UserAvatar({ user }: { user?: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-14 h-14">
          <AvatarImage src={user?.imageUrl || ""} alt={user?.name} />
          <AvatarFallback>
            <User size={32} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <span>{user?.name || ""}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LogoutButton
              icon={<LogOut size={16} />}
              variant="ghost"
              className=""
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserAvatar;
