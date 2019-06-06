import axios from "axios";

const api = {
  collect(params) {
    return axios.get("/cities", { params });
  }
};

export default api;
