import axios from "axios";
const base = process.env.REACT_APP_API_BASE || "http://localhost:4000/api";

export const getCurrent = async () => (await axios.get(`${base}/crowd/current`)).data;
export const getTrends = async () => (await axios.get(`${base}/crowd/trends`)).data;
export const getAlerts = async () => (await axios.get(`${base}/crowd/alerts`)).data;
