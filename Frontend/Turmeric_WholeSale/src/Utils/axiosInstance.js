import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

let accessToken = null;

export const setAccessToken = (token) => {
  accessToken = token;
};

export const clearAccessToken = () => {
  accessToken = null;
};

export const getAccessToken = () => accessToken;

const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    if (accessToken && config.headers) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${BACKEND_URL}/users/refresh`,
          {},
          {
            withCredentials: true,
          }
        );

        const newAccessToken =
          refreshResponse.data?.AccessToken;

        if (newAccessToken) {
          setAccessToken(newAccessToken);
        }

        if (originalRequest.headers) {
          originalRequest.headers.Authorization =
            `Bearer ${newAccessToken}`;
        }

        return axiosInstance(originalRequest);

      } catch (refreshError) {
        clearAccessToken();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;