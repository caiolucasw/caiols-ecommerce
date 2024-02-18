import { useEffect } from "react";
import "./App.css";
import { useAppDispatch, useAppSelector } from "./app/store";
import { getUser } from "./app/userSlice";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, []);

  if (user.loading) return <></>;
  return <Outlet />;
}

export default App;
