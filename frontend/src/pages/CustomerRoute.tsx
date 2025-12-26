import { Navigate, Outlet } from "react-router-dom";

interface Props {
  allowedRole: "customer" | "technician";
}

const CustomerRoute = ({ allowedRole }: Props) => {
  const role = localStorage.getItem("role");

  // login / register kuda lekapothe
  if (!role) {
    return <Navigate to="/login" />;
  }

  // role match avvakapothe
  if (role !== allowedRole) {
    // technician wrong page open chesthe
    if (role === "technician") {
      return <Navigate to="/technicians" />;
    }

    // customer wrong page open chesthe
    return <Navigate to="/category" />;
  }

  // role match ayite allow
  return <Outlet />;
};

export default CustomerRoute;
