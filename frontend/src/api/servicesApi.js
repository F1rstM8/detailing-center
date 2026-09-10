import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const fetchServices = async () => {

  const response = await axios.get(`${API_URL}/services?_t=${Date.now()}`);
  return response.data;
};