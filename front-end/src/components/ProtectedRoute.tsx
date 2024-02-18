import { useEffect } from "react";
import { useAppSelector } from "../app/store";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [user]);

  return <Outlet />;
};

export default ProtectedRoute;
