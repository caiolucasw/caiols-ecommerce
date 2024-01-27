import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ProductDetails from "./components/ProductDetails.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeContent from "./components/HomeContent.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import NotebooksContent from "./components/NotebooksContent.tsx";
import TabletsContent from "./components/TabletsContent.tsx";
import PhonesContent from "./components/PhonesContent.tsx";
import TvsContent from "./components/TvsContent.tsx";
import CamerasContent from "./components/CamerasContent.tsx";
import MainLayout from "./components/MainLayout.tsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#70e000",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          fontWeight: 700,
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "",
        element: <MainLayout />,
        children: [
          {
            path: "/notebooks",
            element: <NotebooksContent />,
          },
          {
            path: "/tablets",
            element: <TabletsContent />,
          },
          {
            path: "/celulares",
            element: <PhonesContent />,
          },
          {
            path: "/tvs",
            element: <TvsContent />,
          },
          {
            path: "/cameras",
            element: <CamerasContent />,
          },
          {
            path: "",
            element: <HomeContent />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
