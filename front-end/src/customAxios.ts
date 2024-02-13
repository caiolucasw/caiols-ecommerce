import axios from "axios";
import { store } from "./app/store";

const axiosApp = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
});

axiosApp.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    if (store?.getState()?.user?.token) {
      config.headers["Authorization"] = `Bearer ${store.getState().user.token}`;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default axiosApp;
