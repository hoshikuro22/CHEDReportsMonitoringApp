import axios from "axios";

export const makeRequest = axios.create({
  baseURL: "http://localhost:8082/",
  withCredentials: true,
});
// export const makeRequest = axios.create({
//   baseURL: "http://localhost:8082/",
//   withCredentials: true,
// });