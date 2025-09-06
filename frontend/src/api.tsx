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

export const fetchTotalRdv = async (startDate: string, endDate: string) => {
  const res = await API.get("/stats/total", {
    params: { startDate, endDate },
  });
  return res.data;
};

export const fetchRdvParStatut = async (startDate: string, endDate: string) => {
  const res = await API.get("/stats/statut", {
    params: { startDate, endDate },
  });
  return res.data;
};

export const fetchRdvEvolution = async (start: string, end: string, interval: string) => {
  const res = await API.get("/stats/evolution", {
    params: { start, end, interval }
  });
  return res.data;
};

export const fetchRdvParMedecin = async (start: string, end: string) => {
  const res = await API.get("/stats/medecin", {
    params: { start, end}
  });
  return res.data;
};