import { useEffect } from "react";
import "./App.css";
import MainComponent from "./components/pages/MainComponent";
import { useAppDispatch } from "./app/store";
import { getUser } from "./app/userSlice";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);
  return <MainComponent />;
}

export default App;
