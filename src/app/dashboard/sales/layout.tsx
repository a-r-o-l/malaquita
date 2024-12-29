import NavigationList from "./components/NavigationList";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex justify-center">
        <NavigationList />
      </div>
      {children}
    </div>
  );
}
