import React from 'react';

const ProductCard = ({ product, onCompare }) => {
  return (
    <div className="product-card">
      <img src={product.Image} alt={product.Title} />
      <div className="product-info">
        <h3>{product.Title}</h3>
        
        <div className="rating">
          <span>4.6</span>
          <span>★</span>
        </div>

        <div className="price-section">
          <span className="current-price">₹{product.nx9bqj}</span>
          {product.yray8j && (
            <>
              <span className="original-price">₹{product.yray8j}</span>
              <span className="discount">16% off</span>
            </>
          )}
        </div>
        
        <div className="offers-section">
          <div className="offer-item">
            <span>
              <span role="img" aria-label="exchange">↔️</span>
              Upto ₹32,950 Off on Exchange
            </span>
          </div>
          <div className="offer-item">
            <span>
              <span role="img" aria-label="gift">🎁</span>
              Save extra with combo offers
            </span>
          </div>
        </div>

        <div className="features-section">
          <div className="feature-item">128 GB ROM</div>
          <div className="feature-item">15.49 cm (6.1 inch) Super Retina XDR Display</div>
          <div className="feature-item">48MP + 12MP | 12MP Front Camera</div>
          <div className="feature-item">A16 Bionic Chip, 6 Core Processor</div>
          <div className="feature-item">1 year warranty for phone and 1 year warranty for in Box Accessories</div>
        </div>

        <button className="compare-button" onClick={() => onCompare(product)}>
          Compare Prices
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
