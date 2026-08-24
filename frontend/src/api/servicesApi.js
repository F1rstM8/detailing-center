import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const fetchServices = async () => {
  const response = await axios.get(`${BASE_URL}/services?_t=${Date.now()}`);
  return response.data;
};
