import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import ComparisonPage from './components/ComparisonPage';
import ProductCard from './components/ProductCard';
import NotFound from './components/NotFound';
import config from './config';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('mobile');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${config.apiBaseUrl}/api/products/${selectedCategory}`);
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleCompareClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseComparison = () => {
    setSelectedProduct(null);
  };

  const handleInfoClick = () => {
    setShowInfo(true);
  };

  const closeInfo = () => {
    setShowInfo(false);
  };

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={
            <>
              {selectedProduct ? (
                <ComparisonPage 
                  product={selectedProduct} 
                  onClose={handleCloseComparison}
                />
              ) : (
                <>
                  <header>
                    <h1>ELECTRONIC RECOMMENDATION SYSTEM WITH ONLINE AND OFFLINE DATA INTEGRATION</h1>
                    <div className="category-buttons">
                      <button 
                        onClick={handleInfoClick}
                        className="info-button"
                        title="System Information"
                      >
                        Information ℹ️
                      </button>
                      <button 
                        onClick={() => {
                          window.open('http://localhost:5174', '_blank', 'noopener,noreferrer');
                        }}
                        className="recommendation-button"
                        title="AI Based Electronic Recommendation"
                      >
                        Get Recommendation 🤖
                      </button>
                      <button>
                        Laptops
                      </button>
                      <button className="active">
                        Mobiles
                      </button>
                      <button>
                        Washing Machines
                      </button>
                    </div>
                  </header>

                  {showInfo && (
                    <div className="modal-overlay" onClick={closeInfo}>
                      <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <h2>About the System</h2>
                        <div className="info-details">
                          <p>Welcome to our Electronic Recommendation System!</p>
                          <p>This system integrates both online and offline data to provide you with personalized electronic product recommendations.</p>
                          
                          <h3>Key Features:</h3>
                          <ul>
                            <li>AI-Powered Recommendations</li>
                            <li>Real-time Price Comparisons</li>
                            <li>Data Integration from Multiple Sources</li>
                            <li>Personalized Product Suggestions</li>
                            <li>Interactive Chat Interface</li>
                            <li>Fake Review Detection</li>
                          </ul>

                          <h3>Fake Review Detection Extension:</h3>
                          <div className="feature-highlight">
                            <p>Our system includes a powerful Chrome extension for detecting fake reviews:</p>
                            <ul>
                              <li>Advanced ML algorithms to analyze review authenticity</li>
                              <li>Works seamlessly with major e-commerce platforms</li>
                              <li>Real-time review analysis</li>
                              <li>High accuracy in detecting suspicious patterns</li>
                              <li>Detailed authenticity scores</li>
                            </ul>
                          </div>

                          <h3>How to Use the System:</h3>
                          <ol>
                            <li>Browse through different categories</li>
                            <li>Click "Get Recommendation" for personalized suggestions</li>
                            <li>Use the chat interface to describe your needs</li>
                            <li>Compare prices across different platforms</li>
                            <li>Use our Fake Review Detection extension for verified reviews</li>
                          </ol>
                        </div>
                        <button onClick={closeInfo} className="close-button">×</button>
                      </div>
                    </div>
                  )}

                  {loading && <div className="loading">Loading...</div>}
                  {error && <div className="error">Error: {error}</div>}
                  
                  <div className="products-list">
                    {products.map((product, index) => (
                      <ProductCard
                        key={index}
                        product={product}
                        onCompare={handleCompareClick}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
