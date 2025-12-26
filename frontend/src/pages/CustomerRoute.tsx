import { Navigate, Outlet } from "react-router-dom";

interface Props {
  allowedRole: "customer" | "technician";
}

const CustomerRoute = ({ allowedRole }: Props) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (role !== allowedRole) {
    if (role === "technician") {
      return <Navigate to="/technicians" />;
    }

    return <Navigate to="/category" />;
  }

  return <Outlet />;
};

export default CustomerRoute;
