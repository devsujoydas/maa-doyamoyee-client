import axios from "axios";

const api = axios.create({
  baseURL: "https://api.maa-doyamoyee.com/api/v1",
  // baseURL: "https://maa-doyamoyee-server.vercel.app/api/v1",
  // baseURL: "http://localhost:5000/api/v1",
  withCredentials: true,
});

// 🔥 Request interceptor (attach token)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🔁 Refresh logic
let isRefreshing = false;
let subscribers = [];

// queue resolve
const onRefreshed = (token) => {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
};

const addSubscriber = (cb) => {
  subscribers.push(cb);
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // only handle auth errors
    if (
      (err.response?.status === 401 || err.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      // 🔁 already refreshing
      if (isRefreshing) {
        return new Promise((resolve) => {
          addSubscriber((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const { data } = await api.get("/auth/refresh", {
          withCredentials: true,
        });
        const newToken = data.accessToken;

        localStorage.setItem("accessToken", newToken);

       
        api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        onRefreshed(newToken);

        window.dispatchEvent(new Event("authUpdated"));

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);

        localStorage.removeItem("accessToken");
        delete api.defaults.headers.common["Authorization"];

        window.location.href = "/signin";

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  },
);

export default api;
