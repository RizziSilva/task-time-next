export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='h-full w-full justify-center items-center flex bg-background-base'>
      {children}
    </section>
  );
}
