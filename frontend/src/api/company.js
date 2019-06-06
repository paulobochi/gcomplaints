import axios from "axios";

const api = {
  collect(params) {
    return axios.get("/companies", { params });
  },
  create(values) {
    return axios.post("/companies", values);
  }
};

export default api;
