export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='bg-auth-background flex h-full w-full items-center justify-center'>
      {children}
    </section>
  );
}
