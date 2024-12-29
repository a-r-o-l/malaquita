import React from "react";
import { getAccount } from "@/actions/accountActions";
import EditAccountForm from "../components/EditAccountForm";

async function AccountScreen({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const account = await getAccount(id);

  if (!account) {
    return <div>Usuario no encontrado</div>;
  }

  return (
    <div>
      <EditAccountForm account={account} />
    </div>
  );
}

export default AccountScreen;
