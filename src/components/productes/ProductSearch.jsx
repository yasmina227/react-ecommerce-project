import React from 'react';

const ProductSearch = ({ searchTerm, setSearchTerm }) => {
  return
   (
    <div className="mb-3">
      <input
      type="text"
      className="form-control form-control-lg"
      placeholder="Search for products..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)} />
    </div>
  );
};

export default ProductSearch;