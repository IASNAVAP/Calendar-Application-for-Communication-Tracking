import axios from "axios";

const API_URL = "http://localhost:5000/api/companies";

export const getCompanies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
