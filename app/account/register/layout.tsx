export default function CreateUserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-utsablue h-[100vh]">
      <div className="container mx-auto lg:max-w-[40%] translate-y-2 overflow-hidden">
        {children}
      </div>
    </div>
  );
}
