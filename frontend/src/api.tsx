import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/",
});

export const getRoles = async () => {
  const response = await API.get("/roles");
  return response.data;
};

export const getUsers = async () => {
  const response = await API.get("/users");
  return response.data;
};

export const getRendezVous = async () => {
  const response = await API.get("/rendez_vous");
  return response.data;
};