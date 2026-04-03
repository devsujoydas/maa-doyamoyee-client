import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1/", 
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (
      (err.response?.status === 401 || err.response?.status === 403) &&
      !originalRequest._retry &&
      originalRequest.headers["Authorization"] && 
      !originalRequest.url.includes("/auth/refresh") 
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/auth/refresh",
          { withCredentials: true }
        );

        const newToken = data.accessToken;
        localStorage.setItem("accessToken", newToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        onRefreshed(newToken);

        return api(originalRequest);
      } catch (refreshError) { 
        localStorage.removeItem("accessToken");
        delete api.defaults.headers.common["Authorization"];
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
