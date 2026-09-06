import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export const fetchServices = async () => {
  const response = await axios.get(`${BASE_URL}/services?_t=${Date.now()}`);
  return response.data;
};