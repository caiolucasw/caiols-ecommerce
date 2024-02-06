import { useEffect } from "react";
import "./App.css";
import { useAppDispatch } from "./app/store";
import { getUser } from "./app/userSlice";
import { Outlet } from "react-router-dom";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return <Outlet />;
}

export default App;
