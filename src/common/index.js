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

  addProduct: {
    url: `${API}/admin/add/product`,
    method: "POST",
  },

  allProduct: {
    url: `${API}/public/products`,
    method: "GET",
  },

  updateProduct: {
    url: `${API}/admin/products`,
    method: "POST",
  },

  currentUser: {
    url: `${API}/public/users`,
    method: "GET",
  },

  changeRole: {
    url: `${API}/admin/users`,
    method: "PUT",
  },

  allUser: {
    url: `${API}/admin/users`,
    method: "GET",
  },

  updateProduct: {
    url: `${API}/admin/products`,
    method: "POST",
  },

  categoryWiseProduct: {
    url: `${API}/public/categories`,
    method: "GET",
  },

  productDetails: {
    url: `${API}/public/products`,
    method: "GET",
  },
};

export default SummaryApi;
