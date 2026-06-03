import "./dashboard.css";
import Sidebar from "@/Components/dashboard/Sidebar";
import Topbar from "@/Components/dashboard/Topbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dashboard-layout min-h-screen bg-background">
      <Sidebar />
      <div className="ml-60">
        <Topbar />
        <main className="p-6 min-h-full">{children}</main>
      </div>
    </div>
  );
}