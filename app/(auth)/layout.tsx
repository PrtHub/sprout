export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="w-full h-full flex items-center justify-center">{children}</main>;
}
