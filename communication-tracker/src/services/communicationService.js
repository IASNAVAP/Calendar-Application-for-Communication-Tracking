import axios from "axios";

const API_URL = "http://localhost:5000/api/communications";

export const getCommunications = async (companyId) => {
  const response = await axios.get(`${API_URL}/company/${companyId}`);
  return response.data;
};

export const addCommunication = async (data) => {
  const response = await axios.post(`${API_URL}/add`, data);
  return response.data;
};
