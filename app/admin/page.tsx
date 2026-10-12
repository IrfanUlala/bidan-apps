import { AdminDashboard } from "../../features/admin/admin-dashboard";

export const metadata = {
  title: "Admin Demo | Ruang Bunda",
  description: "Panel simulasi untuk mengelola booking, pertanyaan, dan laporan Ruang Bunda.",
};

export default function DashboardPage() {
  return <AdminDashboard />;
}
