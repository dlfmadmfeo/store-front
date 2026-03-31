import GnbNav from "@/components/gnb/GnbNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="p-2">
        <GnbNav />
      </div>
      <main className="min-h-screen overflow-x-hidden">{children}</main>
    </>
  );
}
