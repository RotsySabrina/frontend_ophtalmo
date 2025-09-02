import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/",
});

export const getRoles = async () => {
  const response = await API.get("/roles");
  return response.data;
};
