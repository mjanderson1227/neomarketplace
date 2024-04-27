export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[85vh] p-12 grid lg:grid-cols-3 gap-8 sm:grid-cols-1 md:grid-cols-2">
      {children}
    </div>
  );
}
