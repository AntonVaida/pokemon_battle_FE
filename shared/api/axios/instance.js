import axios from "axios";

export const api = axios.create({
  timeout: 60000,
});