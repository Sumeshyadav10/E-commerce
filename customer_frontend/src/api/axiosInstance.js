import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-commerce-render-kjjo.onrender.com/api", // your backend API base
  withCredentials: true, // if using cookies/sessions
});

export default axiosInstance;
