import axios from "axios";
import { API_URL } from "../constants/API_URL";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: `${API_URL}/api/v1`,
});

instance.interceptors.request.use(
  function (config) {
    const AUTH_TOKEN = localStorage.getItem("AUTH_TOKEN");

    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${AUTH_TOKEN}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
