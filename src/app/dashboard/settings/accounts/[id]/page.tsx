import React from "react";
import { getAccount } from "@/actions/accountActions";
import EditAccountForm from "../components/EditAccountForm";
import BackButton from "@/app/dashboard/products/components/BackButton";

async function AccountScreen({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const account = await getAccount(id);

  if (!account) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <div className="container mx-auto p-4 flex flex-col justify-center items-center">
      <div className="flex justify-start w-1/2">
        <BackButton url="/dashboard/settings/accounts" />
      </div>
      <EditAccountForm account={account} />
    </div>
  );
}

export default AccountScreen;
