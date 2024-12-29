import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2, User } from "lucide-react";
import React from "react";
import { getAllAccounts } from "@/actions/accountActions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import NewAccountForm from "./components/NewAccountForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import GoToButton from "../../../../components/GoToButton";

async function AccountsScreen() {
  const accounts = await getAllAccounts();
  return (
    <div className="flex w-full flex-col p-10">
      <div className="flex flex-row">
        <div className="flex flex-col w-4/5">
          <NewAccountForm />
        </div>
        <div className="w-full">
          <div className="mb-10 text-center">
            <h1>Usuarios</h1>
          </div>

          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Imagen</TableHead>
                <TableHead>Nombre de usuario</TableHead>
                <TableHead>Contraseña</TableHead>
                <TableHead>Tipo de cuenta</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accounts.length ? (
                accounts.map((account) => (
                  <TableRow key={account?._id}>
                    <TableCell>
                      <Avatar className="h-14 w-14 rounded-md border-4 justify-center items-center">
                        <AvatarImage
                          src={account.imageUrl}
                          alt={account?.username}
                        />
                        <AvatarFallback className="bg-white dark:bg-black items-end">
                          <User size={40} />
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{account.username}</TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button variant="link" className="w-28">
                              {"*".repeat(account.password.length)}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{account.password}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell>{account.role}</TableCell>
                    <TableCell className="text-right">
                      <GoToButton
                        goTo={`/dashboard/settings/accounts/${account._id}`}
                        variant="ghost"
                        size="icon"
                        className="rounded-full mr-3"
                      >
                        <Pencil size={16} />
                      </GoToButton>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="rounded-full"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center h-60">
                    No hay usuarios
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default AccountsScreen;
