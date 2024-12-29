import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import GoToButton from "../../../../../components/GoToButton";
import { createCustomer } from "@/actions/customerActions";

function newCustomerScreen() {
  return (
    <div className="flex flex-1 flex-col justify-center items-center py-20">
      <div className="flex flex-1 flex-col w-1/2">
        <div className="text-center">
          <h1 className="font-bold text-xl">Crear un nuevo Cliente</h1>
        </div>
        <form
          className="flex flex-col gap-5 items-start mt-10"
          action={createCustomer}
        >
          <div className="w-full space-y-2">
            <Label>Nombre</Label>
            <Input
              autoComplete="off"
              placeholder="Ingresa el nombre del cliente"
              name="name"
            />
          </div>
          <div className="w-full space-y-2">
            <Label>Apellido</Label>
            <Input
              autoComplete="off"
              placeholder="Ingresa el apellido del cliente"
              name="lastname"
            />
          </div>
          <div className="w-full space-y-2">
            <Label>Dni</Label>
            <Input
              autoComplete="off"
              placeholder="Ingresa el dni del cliente"
              name="dni"
              type="number"
            />
          </div>

          <div className="w-full space-y-2">
            <Label>Correo elecctronico</Label>
            <Input
              autoComplete="off"
              placeholder="Ingresa el correo electronico del cliente"
              name="email"
            />
          </div>
          <div className="w-full space-y-2">
            <Label>Telefono</Label>
            <Input
              autoComplete="off"
              placeholder="Ingresa el telefono del cliente"
              name="phone"
              type="number"
            />
          </div>
          <div className="w-full space-y-2">
            <Label>Direccion</Label>
            <Input
              autoComplete="off"
              placeholder="Ingresa la direccion del cliente"
              name="address"
            />
          </div>
          <div className="w-full flex gap-10 mt-20 justify-end items-center">
            <Button type="submit" className="w-40">
              Crear
            </Button>
            <GoToButton
              goTo="/dashboard/settings/customers"
              title="Cancelar"
              className="w-40"
              variant="outline"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default newCustomerScreen;
