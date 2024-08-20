export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='flex h-full w-full items-center justify-center bg-background-base'>
      {children}
    </section>
  );
}
