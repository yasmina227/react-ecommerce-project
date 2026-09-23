import React from 'react';

const ProductFilter = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  maxPrice, 
  setMaxPrice, 
  inStockOnly, 
  setInStockOnly,
  onResetFilters
}) => {
  return
   (
    <div className="card p-3 mb-4 shadow-sm">
      <h5 className="mb-3">Filters</h5>
      <div className="mb-3">
        <label className="form-label fw-bold">Category</label>
        <select 
          className="form-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)} >
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          )
          )}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">
          Max Price: ${maxPrice}
        </label>
        <input 
          type="range" 
          className="form-range" 
          min="0" 
          max="4000" 
          step="10"
          value={maxPrice} 
          onChange={(e) => setMaxPrice(Number(e.target.value))} />
      </div>

      <div className="form-check mb-3">
        <input 
          className="form-check-input" 
          type="checkbox" 
          id="inStockCheck"
          checked={inStockOnly} 
          onChange={(e) => setInStockOnly(e.target.checked)} />
        <label className="form-check-label" htmlFor="inStockCheck">
          In Stock Only
        </label>
      </div>

      <button className="btn btn-outline-secondary btn-sm" onClick={onResetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default ProductFilter;