import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import '../styles/product-card.css';

export const ProductCard = ({ product, showAddButton = true }) => {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const discount = product.originalPrice > product.price 
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(product, 1);
        
        // Show custom popup
        setShowSuccessPopup(true);
        
        // Auto close popup and redirect to cart after 2 seconds
        setTimeout(() => {
            setShowSuccessPopup(false);
            navigate('/cart');
        }, 2000);
    };

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
    };

    return (
        <>
            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="success-popup-overlay" onClick={(e) => e.stopPropagation()}>
                    <div className="success-popup">
                        <div className="success-icon">
                            <i className="fas fa-check-circle"></i>
                        </div>
                        <h3>Success!</h3>
                        <p>{product.name} added to bag!</p>
                        <div className="success-animation">
                            <div className="checkmark-circle">
                                <div className="checkmark"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <Link to={`/product/${product.id}`} className="product-card-link">
                <div className="product-card">
                    <div className="product-image">
                        <img src={product.image} alt={product.name} loading="lazy" />
                        {discount > 0 && (
                            <span className="product-badge">-{discount}%</span>
                        )}
                    </div>
                    <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        <div className="product-rating">
                            <div className="stars">{renderStars(product.rating)}</div>
                            <span>({product.reviews})</span>
                        </div>
                        <div className="product-pricing">
                            <span className="product-price">Rs. {product.price.toLocaleString('en-PK')}</span>
                            {product.originalPrice > product.price && (
                                <span className="original-price">Rs. {product.originalPrice.toLocaleString('en-PK')}</span>
                            )}
                        </div>
                        {showAddButton && (
                            <button 
                                className="btn btn-view-details"
                                onClick={handleAddToCart}
                            >
                                Add to Bag
                            </button>
                        )}
                    </div>
                </div>
            </Link>
        </>
    );
};

export default ProductCard;
