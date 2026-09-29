import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function AdminLayout() {
  return (
    <div className="dashboard-layout">
      <Sidebar type="admin" />

      <main className="dashboard-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;