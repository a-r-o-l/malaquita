import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { AppSidebar } from "@/components/app-sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { UserProvider } from "@/context/UserContext";
import { ThemeButton } from "@/components/ThemeButton";
import UserAvatar from "./components/UserAvatar";

interface User {
  id: string;
  name: string;
  role: string;
  password: string;
  imageUrl: string;
}

interface ExtendedSession extends Session {
  token?: {
    token: {
      user?: User;
    };
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session: ExtendedSession | null = await auth();

  const user = session?.token?.token?.user;

  if (!session) {
    redirect("/login");
  }

  return (
    <UserProvider user={user}>
      <div>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex flex-col w-full">
            <div className="p-5 flex justify-between">
              <SidebarTrigger variant="outline" />
              <div className="flex items-center gap-5">
                <ThemeButton />
                <UserAvatar user={user} />
              </div>
            </div>
            {children}
          </main>
        </SidebarProvider>
        <Toaster richColors={true} />
      </div>
    </UserProvider>
  );
}
