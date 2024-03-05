import MenuDashboard from './menu/page'; 
export default function DashboardLayout({
  children, }: {children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen ">
    <MenuDashboard />
      <div className="flex-grow overflow-y-auto">
        {children}
      </div>
    </div>
  );
}
