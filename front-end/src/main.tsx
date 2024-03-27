import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import ProductDetails from "./components/ProductDetails.tsx";
import "./index.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import HomeContent from "./components/pages/HomeContent.tsx";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import { store } from "./app/store.ts";
import NotebooksContent from "./components/pages/NotebooksContent.tsx";
import TabletsContent from "./components/pages/TabletsContent.tsx";
import PhonesContent from "./components/pages/PhonesContent.tsx";
import TvsContent from "./components/pages/TvsContent.tsx";
import CamerasContent from "./components/pages/CamerasContent.tsx";
import MainLayout from "./components/MainLayout.tsx";
import MyAccountPage from "./components/pages/MyAccountPage.tsx";
import Login from "./components/pages/Login.tsx";
import Signup from "./components/pages/Signup.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import CartPage from "./components/pages/CartPage.tsx";
import PaymentPage from "./components/stripe/PaymentPage.tsx";
import CheckoutPage from "./components/pages/CheckoutPage.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderSuccess from "./components/order/OrderSuccess.tsx";
import AdminPage from "./components/AdminPage.tsx";

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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Signup />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/checkout",
            element: <CheckoutPage />,
          },
          {
            path: "/pedido-concluido",
            element: <OrderSuccess />,
          },
          {
            path: "/admin",
            element: <AdminPage />,
          },
        ],
      },
      {
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
            path: "/product/:id",
            element: <ProductDetails />,
          },
          {
            path: "/carrinho",
            element: <CartPage />,
          },
          {
            element: <ProtectedRoute />,
            children: [
              {
                path: "/minha-conta",
                element: <MyAccountPage />,
              },
              {
                path: "/meus-pedidos",
                element: <Navigate to="/minha-conta?tab=orders" />,
              },
              {
                path: "/checkout",
                element: <CheckoutPage />,
              },
            ],
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
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
