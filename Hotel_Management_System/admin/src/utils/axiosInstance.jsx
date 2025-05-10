import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8800/api",  // ✅ Make sure to add `/api` here
  withCredentials: true,                 // ✅ Include credentials
});

export default axiosInstance;
