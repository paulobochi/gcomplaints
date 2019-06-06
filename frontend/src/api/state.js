import axios from "axios";

const api = {
  collect(params) {
    return axios.get("/states", { params });
  }
};

export default api;
