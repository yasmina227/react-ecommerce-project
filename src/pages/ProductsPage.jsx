import React, { useState, useEffect } from 'react';
import { getAllProducts, getCategories } from '../services/productService';
import ProductCard from '../components/products/ProductCard';
import ProductSearch from '../components/products/ProductSearch';
import ProductFilter from '../components/products/ProductFilter';

   const ProductsPage = () => 
    {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxPrice, setMaxPrice] = useState(2000);
  const [inStockOnly, setInStockOnly] = useState(false);

  useEffect(() => {
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
        console.error('Error fetching data:', error);
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

  const handleResetFilters = () => 
    {
    setSearchTerm('');
    setSelectedCategory('');
    setMaxPrice(4000);
    setInStockOnly(false);
  };

  if (loading)
     {
    return (
      <div className="text-center my-5">
     <div className="spinner-border text-primary" role="status">
     <span className="visually-hidden">Loading...</span>
     </div>
      </div>
    );
  }

      return (
    <div className="container my-4">
      <h2 className="mb-4">products list</h2>
      <div className="row">
      
        <div className="col-md-3">
          <ProductFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
            onResetFilters={handleResetFilters}  />
        </div>

        <div className="col-md-9">
          <ProductSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <div className="row row-cols-1 row-cols-md-3 g-4">
            {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
         <div className="col" key={product.id}>
          <ProductCard product={product} />
          </div>
              ))
            ) : (
             <div className="col-12">
         <div className="alert alert-warning text-center">
              No products found matching your criteria.
            </div>
            </div>
         )}
     </div>
    </div>
 </div>
 </div>
  );
};

export default ProductsPage;