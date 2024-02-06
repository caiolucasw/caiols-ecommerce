import { useEffect } from "react";
import { useAppSelector } from "../app/store";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user.token) {
      navigate("/login");
    }
  }, [user]);

  return <Outlet />;
};

export default ProtectedRoute;
