const API = "http://localhost:8080/api";

const SummaryApi = {
  Register: {
    url: `${API}/register`,
    method: "POST",
  },

  logIn: {
    url: `${API}/login`,
    method: "POST",
  },

  ImageUpload: {
    url: `${API}/admin/products/upload/image`,
    method: "POST",
  },

  currentUser: {
    url: `${API}/public/users`,
    method: "GET",
  },
};

export default SummaryApi;
