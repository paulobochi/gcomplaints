import axios from "axios";

const api = {
  collect(params) {
    return axios.get("/complaints", { params });
  },

  show(id) {
    return axios.get(`/complaints/${id}`);
  },

  create(values) {
    return axios.post("/complaints", values);
  },

  update(id, values) {
    return axios.put(`/complaints/${id}`, values);
  },

  createOrUpdate(id, values) {
    if (id) {
      return this.update(id, values);
    }

    return this.create(values);
  },

  destroy(id) {
    return axios.delete(`/complaints/${id}`);
  }
};

export default api;
