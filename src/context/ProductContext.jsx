import React, { createContext, useState, useEffect } from 'react';
import { getAllProducts, getCategories } from '../services/productService';

export const ProductContext = createContext();
export const ProductProvider = ({ children }) => 

    {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [inStockOnly, setInStockOnly] = useState(false);


  useEffect(() => 
    {
    const fetchData = async () => 
        {
      try
       {
        setLoading(true);
        const productsData = await getAllProducts();
        const categoriesData = await getCategories();

        setProducts(productsData);
        setCategories(categoriesData);
      } 
      catch (error)
       {
        console.error('Error fetching data via productService:', error);
      } 
      finally 
      {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) =>
     {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || product.category === selectedCategory;
    const matchesPrice = product.price <= maxPrice;
    const matchesStock = !inStockOnly || product.stock > 0;

    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  const resetFilters = () =>
     {
    setSearchTerm('');
    setSelectedCategory('');
    setMaxPrice(2000);
    setInStockOnly(false);
  };

  return (
    <ProductContext.Provider
      value={{
        products: filteredProducts,
        allProducts: products,
        categories,
        loading,
        searchTerm,
        setSearchTerm,
        selectedCategory,
        setSelectedCategory,
        maxPrice,
        setMaxPrice,
        inStockOnly,
        setInStockOnly,
        resetFilters
      }} >
      {children}
    </ProductContext.Provider>
  );
};