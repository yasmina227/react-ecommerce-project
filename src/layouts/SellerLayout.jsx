
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function SellerLayout() {
  return (
    <div className="dashboard-layout">

      <Sidebar type="seller" />

      <main className="dashboard-content">
        <Outlet />
      </main>

    </div>
  );
}

export default SellerLayout;

