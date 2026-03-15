export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-h-screen overflow-x-hidden px-[12px]">{children}</main>
    </>
  );
}
