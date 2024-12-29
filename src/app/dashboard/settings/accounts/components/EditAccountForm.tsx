"use client";
import { createAccount } from "@/actions/accountActions";
import ImageViewer from "@/app/dashboard/products/components/ImageViewer";
import PendingButton from "@/components/PendingButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function EditAccountForm({ account }: { account: IAccount }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (account) {
      setUserName(account.username);
      setPassword(account.password);
      setRole(account.role);
    }
  }, [account]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imageUrl = "";
    try {
      if (file) {
        const formDataImage = new FormData();
        formDataImage.append("file", file);
        formDataImage.append("folder", "profile");
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formDataImage,
        });
        if (response.ok) {
          const result = await response.json();
          imageUrl = result.imageUrl;
          console.log("File uploaded successfully", result);
        } else {
          console.error("File upload failed", await response.text());
        }
      }
      const formData = new FormData();
      formData.append("imageUrl", imageUrl);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("role", role);
      const res = await createAccount(formData);
      if (res.success) {
        toast.success(res.message);
        setFile(null);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("Error del servidor, intente nuevamente");
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col p-10 mx-auto">
      <Card className="w-[700px] mx-auto">
        <CardHeader>
          <CardTitle>Crear usuario</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-5">
            <div className="flex w-full justify-center">
              <ImageViewer
                setFile={setFile}
                file={file}
                imageUrl={account?.imageUrl}
                classname="h-40 w-40 border-0"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input
                placeholder="Ingresa el nombre de usuario"
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label>Contraseña</Label>
              <Input
                placeholder="Ingresa la contraseña"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Label>Tipo de cuenta</Label>
              <Select
                name="role"
                value={role}
                onValueChange={(e) => setRole(e)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecciona un tipo de cuenta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tipos</SelectLabel>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">Usuario</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end mt-10">
          <PendingButton className="w-full bg-fuchsia-500 hover:bg-fuchsia-700 text-white">
            Crear usuario
          </PendingButton>
        </CardFooter>
      </Card>
    </form>
  );
}

export default EditAccountForm;
