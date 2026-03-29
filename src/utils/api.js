import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api",
  baseURL: "https://betopia-project-1-server.vercel.app/api",
  withCredentials: true,
});
 
api.interceptors.request.use(
  (config) => {
    // console.log(
    //   `[API REQUEST] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`,
    //   config.data || ""
    // );
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
 
api.interceptors.response.use(
  (response) => {
    // console.log(
    //   `[API RESPONSE] ${response.config.method?.toUpperCase()} ${
    //     response.config.baseURL
    //   }${response.config.url}`,
    //   response.data
    // );
    return response;
  },
  (error) => {
    console.error(
      `[API ERROR] ${error.config?.method?.toUpperCase()} ${
        error.config?.baseURL
      }${error.config?.url}`,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

export default api;
