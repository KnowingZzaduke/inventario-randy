import { Outlet } from "react-router-dom";
import NavbarDashboard from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      navigate("/dashboard/welcome");
    }
  }, [location]);
  return (
    <>
      <NavbarDashboard />
      <Outlet />
    </>
  );
}

export default Dashboard;
