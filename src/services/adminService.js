import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

// ==================== PRODUCTS ====================
export const getAllProducts = async () => {
  const res = await axios.get(`${BASE_URL}/products`);
  return res.data.products;
};

export const addProduct = async (data) => {
  const res = await axios.post(`${BASE_URL}/products/add`, data);
  return res.data;
};

export const updateProduct = async (id, data) => {
  const res = await axios.put(`${BASE_URL}/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${BASE_URL}/products/${id}`);
  return res.data;
};

// ==================== CATEGORIES ====================
export const getAllCategories = async () => {
  const res = await axios.get(`${BASE_URL}/products/category-list`);
  return res.data;
};

// ==================== USERS ====================
export const getAllUsers = async () => {
  const res = await axios.get(`${BASE_URL}/users?limit=0`);
  return res.data.users;
};

export const deleteUser = async (id) => {
  const res = await axios.delete(`${BASE_URL}/users/${id}`);
  return res.data;
};

// ==================== ORDERS ====================
export const getAllOrders = async () => {
  const res = await axios.get(`${BASE_URL}/carts?limit=0`);
  return res.data.carts;
};

export const deleteOrder = async (id) => {
  const res = await axios.delete(`${BASE_URL}/carts/${id}`);
  return res.data;
};

// ==================== DASHBOARD ====================
export const getDashboardStats = async () => {
  const [p, u, o] = await Promise.all([
    axios.get(`${BASE_URL}/products?limit=1`),
    axios.get(`${BASE_URL}/users?limit=1`),
    axios.get(`${BASE_URL}/carts?limit=1`),
  ]);
  return {
    totalProducts: p.data.total,
    totalUsers: u.data.total,
    totalOrders: o.data.total,
  };
};