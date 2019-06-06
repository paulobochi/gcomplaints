import axios from "axios";

const api = {
  collect(params) {
    return axios.get("/countries", { params });
  }
};

export default api;
