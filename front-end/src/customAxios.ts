import axios from "axios";

const axiosApp = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_API_URL}`,
});

axiosApp.interceptors.request.use(
  function (config) {
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        "token"
      )}`;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default axiosApp;
