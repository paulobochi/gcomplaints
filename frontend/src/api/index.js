import axios from "axios";

export const configureAPI = () => {
  axios.defaults.baseURL = "http://localhost:4000";
};

export const createQueryString = () => {};
