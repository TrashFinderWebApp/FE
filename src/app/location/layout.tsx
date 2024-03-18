export default function LocationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="relative flex-grow">{children}</main>;
}
