import axios from "axios";

const api = axios.create({
  baseURL: "https://task-management-app-1-1g0c.onrender.com/api"
});

export default api;