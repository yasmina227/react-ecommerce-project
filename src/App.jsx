/*import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';

function App() 
{
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;*/

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import ProductsPage from './pages/ProductsPage';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
  
    <ProductProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </Router>
    </ProductProvider>
  );
}

export default App;
