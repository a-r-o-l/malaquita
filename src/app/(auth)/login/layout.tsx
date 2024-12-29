export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <main className="flex flex-col w-full">{children}</main>
      </div>
    </div>
  );
}
