import "./dashboard.css";
import Sidebar from "@/Components/dashboard/Sidebar";
import Topbar from "@/Components/dashboard/Topbar";
import Providers from "./providers";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dashboard-layout min-h-screen bg-background">
      <Sidebar />
      <div>
        <Topbar />
        <Providers>
          <main className="p-6 min-h-full">{children}</main>
        </Providers>
      </div>
    </div>
  );
}
