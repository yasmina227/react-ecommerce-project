import axios from 'axios';

const BASE_URL = 'https://dummyjson.com/products';
export const getAllProducts = async () => {

  try
   {
    const response = await axios.get(BASE_URL);
    return response.data.products;
  } 
  catch (error)
   {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getCategories = async () => {

  try 
   {
    const response = await axios.get(`${BASE_URL}/category-list`);
    return response.data;
   } 
  catch (error) 
  {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getProductsByCategory = async (category) => {
  try
   {
    const response = await axios.get(`${BASE_URL}/category/${category}`);
    return response.data.products;
  } 
  
  catch (error)
  
  {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try 
  {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } 
  catch (error) 
  {
    console.error('Error fetching product details:', error);
    throw error;
  }
};