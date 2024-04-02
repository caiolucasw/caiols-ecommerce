import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/store";
import { useEffect } from "react";
import axiosApp from "../../customAxios";

const AllowAdminPage = () => {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
      const res = await axiosApp.get("/user");
      if (!res || res?.status !== 200 || res?.data?.type !== "admin") {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      navigate("/");
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  return user?.type === "admin" ? <Outlet /> : <></>;
};

export default AllowAdminPage;
