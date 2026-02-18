import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import { products as initialProducts } from '../data/products';
import { db } from '../config/firebase';
import { collection, addDoc, query, where, getDocs, orderBy } from 'firebase/firestore';
import '../styles/pages.css';

export const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('36');
    const [mainImage, setMainImage] = useState(null);
    const [showCartSidebar, setShowCartSidebar] = useState(false);
    const [showSizeChart, setShowSizeChart] = useState(false);
    const [reviewName, setReviewName] = useState('');
    const [reviewEmail, setReviewEmail] = useState('');
    const [reviewRating, setReviewRating] = useState(5);
    const [reviewCategory, setReviewCategory] = useState('');
    const [reviewComment, setReviewComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const { addToCart, cart, updateQuantity, removeFromCart } = useCart();

    // Load product from localStorage or initial products
    useEffect(() => {
        const loadProduct = async () => {
            try {
                // First try localStorage
                const savedProducts = localStorage.getItem('stepnaz_products');
                if (savedProducts) {
                    const localProducts = JSON.parse(savedProducts);
                    const found = localProducts.find(p => p.id.toString() === id || p.id === id);
                    if (found) {
                        setProduct(found);
                        setMainImage(found.relatedImages?.[0] || found.images?.[0] || found.image);
                        setLoading(false);
                        return;
                    }
                }
                
                // Fallback to initial products
                const staticProduct = initialProducts.find(p => p.id.toString() === id);
                if (staticProduct) {
                    setProduct(staticProduct);
                    setMainImage(staticProduct.relatedImages?.[0] || staticProduct.images?.[0] || staticProduct.image);
                }
            } catch (error) {
                console.error('Error loading product:', error);
                // Fallback to initial products
                const staticProduct = initialProducts.find(p => p.id.toString() === id);
                setProduct(staticProduct);
                setMainImage(staticProduct?.relatedImages?.[0] || staticProduct?.images?.[0] || staticProduct?.image);
            } finally {
                setLoading(false);
            }
        };
        
        loadProduct();
        
        // Load reviews from Firebase
        const loadReviews = async () => {
            try {
                const reviewsRef = collection(db, 'reviews');
                const q = query(reviewsRef, where('productId', '==', id), orderBy('date', 'desc'));
                const querySnapshot = await getDocs(q);
                const loadedReviews = [];
                querySnapshot.forEach((doc) => {
                    loadedReviews.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });
                setReviews(loadedReviews);
            } catch (error) {
                console.error('Error loading reviews:', error);
                // Fallback to localStorage if Firebase fails
                const savedReviews = localStorage.getItem(`reviews_${id}`);
                if (savedReviews) {
                    setReviews(JSON.parse(savedReviews));
                }
            }
        };
        
        loadReviews();
    }, [id]);

    const sizes = [
        { size: '36', stock: 3 },
        { size: '37', stock: 5 },
        { size: '38', stock: 3 },
        { size: '39', stock: 8 },
        { size: '40', stock: 6 },
        { size: '41', stock: 1 }
    ];

    if (loading) {
        return (
            <div className="container">
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="container">
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <h1>Product Not Found</h1>
                    <Link to="/products" className="btn btn-primary">Back to Products</Link>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        const sizeToAdd = product.category === 'Footwear' ? selectedSize : null;
        addToCart(product, quantity, sizeToAdd);
        
        // Show custom popup
        setShowSuccessPopup(true);
        
        // Auto close popup and show sidebar after 2 seconds
        setTimeout(() => {
            setShowSuccessPopup(false);
            setShowCartSidebar(true);
        }, 2000);
    };

    const discount = product.originalPrice > product.price 
        ? Math.round((1 - product.price / product.originalPrice) * 100)
        : 0;

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        return '★'.repeat(fullStars) + '☆'.repeat(emptyStars);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        
        if (!reviewName.trim() || !reviewComment.trim() || !reviewCategory.trim()) {
            alert('Please fill in all fields');
            return;
        }
        
        try {
            // Add review to Firebase
            const reviewData = {
                productId: id,
                name: reviewName,
                rating: reviewRating,
                category: reviewCategory,
                comment: reviewComment,
                date: new Date(),
                timestamp: Date.now()
            };
            
            const docRef = await addDoc(collection(db, 'reviews'), reviewData);
            
            // Add to local state with the Firebase doc ID
            const newReview = {
                id: docRef.id,
                ...reviewData
            };
            
            setReviews([newReview, ...reviews]);
            
            // Reset form
            setReviewName('');
            setReviewRating(5);
            setReviewCategory('');
            setReviewComment('');
            
            setShowReviewPopup(false);
            alert('Review submitted successfully!');
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Error submitting review. Please try again.');
        }
    };

    return (
        <div className="product-detail-page">
            <div className="container">
                <div className="breadcrumb" style={{
                    fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                    color: '#666',
                    padding: '0.8rem 0',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'baseline',
                    gap: '0.4rem',
                    lineHeight: '1.6'
                }}>
                    <Link to="/" style={{
                        color: '#ea580c',
                        textDecoration: 'none',
                        fontWeight: '600',
                        transition: 'color 0.2s ease',
                        whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#c94a07'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#ea580c'}>Home</Link>
                    <span style={{ color: '#999', fontSize: '0.9em', lineHeight: '1' }}>/</span>
                    <Link to="/products" style={{
                        color: '#ea580c',
                        textDecoration: 'none',
                        fontWeight: '600',
                        transition: 'color 0.2s ease',
                        whiteSpace: 'nowrap'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#c94a07'}
                    onMouseLeave={(e) => e.currentTarget.style.color = '#ea580c'}>Products</Link>
                    <span style={{ color: '#999', fontSize: '0.9em', lineHeight: '1' }}>/</span>
                    <span style={{ 
                        color: '#666', 
                        fontWeight: '500',
                        fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                        whiteSpace: 'normal',
                        wordWrap: 'break-word'
                    }}>{product.name}</span>
                </div>

                <div className="product-detail">
                    {/* Image Gallery */}
                    <div className="product-gallery">
                        <div className="main-image">
                            <img src={mainImage || '/Images/placeholder.png'} alt={product.name} id="main-image" />
                            {discount > 0 && (
                                <span className="product-badge">-{discount}%</span>
                            )}
                        </div>
                        <div className="thumbnails">
                            {(() => {
                                const imageArray = Array.isArray(product.relatedImages) && product.relatedImages.length > 0
                                    ? product.relatedImages
                                    : (product.images && product.images.length > 0
                                        ? product.images
                                        : [product.image || '/Images/placeholder.png']);

                                return imageArray.slice(0, 4).map((image, index) => (
                                    <div 
                                        key={index}
                                        className={`thumbnail ${image === mainImage ? 'active' : ''}`}
                                        onClick={() => setMainImage(image)}
                                    >
                                        <img src={image} alt={`${product.name} ${index + 1}`} />
                                    </div>
                                ));
                            })()}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="product-details">
                        <h1 className="product-title">{product.name}</h1>

                        {/* Rating */}
                        <div className="product-rating-detail">
                            <div className="stars">{renderStars(product.rating)}</div>
                            <span>({product.reviews} reviews)</span>
                        </div>


                        {/* Pricing */}
                        <div className="pricing-section">
                            <div className="current-price">Rs. {product.price.toLocaleString('en-PK')}</div>
                            {product.originalPrice > product.price && (
                                <>
                                    <div className="original-price">Rs. {product.originalPrice.toLocaleString('en-PK')}</div>
                                    <div className="savings">Save Rs. {(product.originalPrice - product.price).toLocaleString('en-PK')}</div>
                                </>
                            )}
                        </div>

                        {/* Size Selection - Only for Footwear */}
                        {product.category === 'Footwear' && (
                            <div className="size-section">
                                <div className="size-header">
                                    <label>Shoe Size</label>
                                    <a href="#" className="size-chart-link" onClick={(e) => { e.preventDefault(); setShowSizeChart(true); }}>Size Chart</a>
                                </div>
                                <div className="size-options">
                                    {sizes.map((sizeItem) => (
                                        <button 
                                            key={sizeItem.size}
                                            className={`size-btn ${selectedSize === sizeItem.size ? 'active' : ''}`}
                                            onClick={() => setSelectedSize(sizeItem.size)}
                                        >
                                            {sizeItem.size}
                                            <span className="size-stock">{sizeItem.stock}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Buttons */}
                        <div className="button-group">
                            <button 
                                className="btn btn-primary btn-add-to-cart"
                                onClick={handleAddToCart}
                            >
                                <i className="fas fa-shopping-bag"></i> Add To Bag
                            </button>
                            <button 
                                className="btn btn-secondary btn-buy-now"
                                onClick={() => {
                                    handleAddToCart();
                                    navigate('/cart');
                                }}
                            >
                                Buy Now
                            </button>
                        </div>

                        {/* Description Section - Moved Below Buttons */}
                        <div className="product-description" style={{margin: '1.5rem 0', padding: '1rem', background: '#fafafa', borderRadius: '8px'}}>
                            <h4 style={{marginBottom: '0.5rem'}}>Description</h4>
                            <p style={{margin: 0}}>
                                Best masndaksjd asdas das duays d as (Description Best masndaksj d asdas das duays d as)
                            </p>
                        </div>

                        {/* Quick Info Section */}
                        <div className="quick-info-section">
                            <div className="quick-info-item">
                                <i className="fas fa-bolt"></i>
                                <div>
                                    <strong>Instant dispatch, no delays</strong>
                                </div>
                            </div>
                            {/* <div className="quick-info-item">
                                <i className="fas fa-truck"></i>
                                <div>
                                    <strong>Est. shipping by Feb 09, 2026</strong>
                                    <p>Express delivery · Pakistan</p>
                                </div>
                            </div> */}
                            <div className="quick-info-item">
                                <i className="fas fa-undo"></i>
                                <div>
                                    <strong>Easy 14 days return and refund</strong>
                                    <p>Return for a different size within 14 days.</p>
                                </div>
                            </div>
                        </div>

                        {/* Shipping & Guarantees Section */}
                        <div style={{
                            marginTop: '2.5rem',
                            paddingTop: '2rem',
                            borderTop: '1px solid #e5e7eb'
                        }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1.5rem'
                            }}>
                                {/* Instant Dispatch */}
                                <div style={{
                                    padding: '1.5rem',
                                    background: '#f9fafb',
                                    borderRadius: '8px',
                                    borderLeft: '4px solid #ea580c',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}>
                                    <div style={{
                                        fontSize: '2rem',
                                        marginBottom: '0.8rem'
                                    }}>⚡</div>
                                    <h4 style={{
                                        margin: '0 0 0.5rem 0',
                                        fontSize: '1.1rem',
                                        fontWeight: '700',
                                        color: '#222'
                                    }}>Instant dispatch, no delays</h4>
                                    <p style={{
                                        margin: '0',
                                        fontSize: '0.9rem',
                                        color: '#666',
                                        lineHeight: '1.5'
                                    }}>Orders processed and shipped immediately</p>
                                </div>

                                {/* Easy Returns */}
                                <div style={{
                                    padding: '1.5rem',
                                    background: '#f9fafb',
                                    borderRadius: '8px',
                                    borderLeft: '4px solid #22c55e',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = 'none';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}>
                                    <div style={{
                                        fontSize: '2rem',
                                        marginBottom: '0.8rem'
                                    }}>↩️</div>
                                    <h4 style={{
                                        margin: '0 0 0.5rem 0',
                                        fontSize: '1.1rem',
                                        fontWeight: '700',
                                        color: '#222'
                                    }}>Easy 14 days return and refund</h4>
                                    <p style={{
                                        margin: '0',
                                        fontSize: '0.9rem',
                                        color: '#666',
                                        lineHeight: '1.5'
                                    }}>Return for a different size within 14 days</p>
                                </div>
                            </div>

                            {/* Additional Trust Badges */}
                            <div style={{
                                marginTop: '2rem',
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '1rem'
                            }}>
                                <div style={{
                                    padding: '1rem',
                                    background: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '6px',
                                    textAlign: 'center'
                                }}>
                                    <div style={{
                                        fontSize: '1.5rem',
                                        marginBottom: '0.5rem'
                                    }}>🛡️</div>
                                    <p style={{
                                        margin: '0',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: '#222'
                                    }}>100% Secure Payment</p>
                                </div>
                                <div style={{
                                    padding: '1rem',
                                    background: '#fff',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '6px',
                                    textAlign: 'center'
                                }}>
                                    <div style={{
                                        fontSize: '1.5rem',
                                        marginBottom: '0.5rem'
                                    }}>✓</div>
                                    <p style={{
                                        margin: '0',
                                        fontSize: '0.9rem',
                                        fontWeight: '600',
                                        color: '#222'
                                    }}>Money Back Guarantee</p>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                    <br />

                        {/* Features */}
                        {product.features && product.features.length > 0 && (
                            <div className="product-features">
                                <h3>Features</h3>
                                <ul>
                                    {product.features.map((feature, index) => (
                                        <li key={index}>
                                            <i className="fas fa-check"></i> {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Customer Reviews section removed as per request */}

                        {/* Product Info */}
                        <div className="product-specs">
                            <div className="spec">
                                <span className="label">SKU:</span>
                                <span className="value">SLP-001</span> {/* Slippers SKU */}
                            </div>
                            <div className="spec">
                                <span className="label">Stock:</span>
                                <span className="value">{product.stock}</span>
                            </div>
                            <div className="spec">
                                <span className="label">Weight:</span>
                                <span className="value">250g</span> {/* Slippers Weight */}
                            </div>
                            <div className="spec">
                                <span className="label">Category:</span>
                                <span className="value">{product.category}</span>
                            </div>
                        </div>

                        {/* Quantity and Add to Bag */}
                        <div className="discount-section">
                            <div className="discount-header">
                                <i className="fas fa-tag"></i>
                                <span>SPEND LESS, GET MORE!</span>
                                <i className="fas fa-tag"></i>
                            </div>
                            <table className="discount-table">
                                <tbody>
                                    <tr>
                                        <td className="discount-condition">BUY ANY <span className="highlight">2</span></td>
                                        <td className="discount-offer">GET <span className="highlight">5%</span> OFF</td>
                                    </tr>
                                    <tr>
                                        <td className="discount-condition">BUY ANY <span className="highlight">3</span></td>
                                        <td className="discount-offer">GET <span className="highlight">10%</span> OFF</td>
                                    </tr>
                                    <tr>
                                        <td className="discount-condition">BUY ANY <span className="highlight">4</span></td>
                                        <td className="discount-offer">GET <span className="highlight">15%</span> OFF</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p className="discount-note">*Products featuring this discount table are eligible for this offer</p>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                <div className="related-products">
                    <h2>Related Products</h2>
                    <div className="products-grid">
                        {initialProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map(relatedProduct => (
                            <Link key={relatedProduct.id} to={`/product/${relatedProduct.id}`} className="product-card-link">
                                <div className="product-card">
                                    <div className="product-image">
                                        <img src={relatedProduct.image} alt={relatedProduct.name} />
                                    </div>
                                    <div className="product-info">
                                        <h3 className="product-name">{relatedProduct.name}</h3>
                                        <div className="product-pricing">
                                            <span className="product-price">Rs. {relatedProduct.price.toLocaleString('en-PK')}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Size Chart Modal */}
            {showSizeChart && (
                <div className="cart-sidebar-overlay" onClick={() => setShowSizeChart(false)}>
                    <div className="size-chart-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2>Size Chart</h2>
                            <button className="close-btn" onClick={() => setShowSizeChart(false)}>&times;</button>
                        </div>
                        <div className="modal-body">
                            <img src="/Images/Size Chat.png" alt="Size Chart" className="size-chart-image" />
                        </div>
                    </div>
                </div>
            )}

            {/* Success Popup */}
            {showSuccessPopup && (
                <div className="success-popup-overlay">
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

            {/* Cart Sidebar */}
            {showCartSidebar && (
                <div className="cart-sidebar-overlay" onClick={() => setShowCartSidebar(false)} style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 9999,
                    animation: 'fadeIn 0.3s ease'
                }}>
                    <div className="cart-sidebar" onClick={(e) => e.stopPropagation()} style={{
                        position: 'fixed',
                        top: 0,
                        right: 0,
                        width: '100%',
                        maxWidth: '450px',
                        height: '100vh',
                        background: '#fff',
                        boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
                        display: 'flex',
                        flexDirection: 'column',
                        animation: 'slideInRight 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                        overflow: 'hidden'
                    }}>
                        <div className="cart-sidebar-header" style={{
                            padding: '1.2rem 1.5rem',
                            background: '#fff',
                            color: '#1a1a1a',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: '1px solid #f0f0f0',
                            flexShrink: 0
                        }}>
                            <h2 style={{
                                margin: 0,
                                fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
                                fontWeight: '700',
                                letterSpacing: '-0.02em',
                                textTransform: 'uppercase'
                            }}>CART</h2>
                            <button className="close-btn" onClick={() => setShowCartSidebar(false)} style={{
                                background: 'transparent',
                                border: 'none',
                                width: '32px',
                                height: '32px',
                                color: '#1a1a1a',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.2s ease',
                                lineHeight: 1
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#ea580c';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#1a1a1a';
                            }}>
                                ✕
                            </button>
                        </div>

                        {/* Free Shipping Banner */}
                        <div style={{
                            background: 'linear-gradient(90deg, #ea580c 0%, #f97316 100%)',
                            padding: 'clamp(0.6rem, 2vw, 0.8rem) clamp(1rem, 3vw, 1.5rem)',
                            color: '#fff',
                            fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            flexShrink: 0
                        }}>
                            <span style={{ fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>🎉</span>
                            <span>Congrats! You've unlocked <strong>FREE SHIPPING</strong></span>
                        </div>

                        <div className="cart-sidebar-content" style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: 'clamp(1rem, 3vw, 1.5rem)',
                            background: '#fff'
                        }}>
                            {cart && cart.length > 0 ? (
                                <>
                                    <div className="cart-items" style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 'clamp(0.8rem, 2vw, 1rem)'
                                    }}>
                                        {cart.map((item) => (
                                            <div key={`${item.id}-${item.size}`} className="cart-item" style={{
                                                display: 'flex',
                                                gap: 'clamp(0.8rem, 2vw, 1rem)',
                                                padding: 'clamp(0.8rem, 2vw, 1rem)',
                                                background: '#fff',
                                                borderRadius: '12px',
                                                border: '1px solid #f0f0f0',
                                                transition: 'all 0.3s ease',
                                                alignItems: 'center'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                                                e.currentTarget.style.borderColor = '#e5e7eb';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.boxShadow = 'none';
                                                e.currentTarget.style.borderColor = '#f0f0f0';
                                            }}>
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="cart-item-image" 
                                                    style={{
                                                        width: 'clamp(90px, 22vw, 110px)',
                                                        height: 'clamp(90px, 22vw, 110px)',
                                                        objectFit: 'cover',
                                                        borderRadius: '8px',
                                                        flexShrink: 0
                                                    }}
                                                />
                                                <div className="cart-item-details" style={{
                                                    flex: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    gap: '0.5rem',
                                                    minWidth: 0
                                                }}>
                                                    <h4 style={{
                                                        margin: 0,
                                                        fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                                                        fontWeight: '700',
                                                        color: '#1a1a1a',
                                                        lineHeight: '1.3',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical'
                                                    }}>{item.name}</h4>
                                                    {item.size && (
                                                        <p style={{
                                                            margin: 0,
                                                            fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
                                                            color: '#666',
                                                            fontWeight: '600'
                                                        }}>Shoe size: {item.size}</p>
                                                    )}
                                                    <div style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.6rem',
                                                        marginTop: '0.3rem',
                                                        flexWrap: 'wrap'
                                                    }}>
                                                        <div style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.6rem'
                                                        }}>
                                                            <button 
                                                                onClick={() => {
                                                                    const newQty = item.quantity - 1;
                                                                    if (newQty > 0) {
                                                                        updateQuantity(item.id, newQty, item.size);
                                                                    } else {
                                                                        removeFromCart(item.id, item.size);
                                                                    }
                                                                }}
                                                                style={{
                                                                    width: '28px',
                                                                    height: '28px',
                                                                    borderRadius: '6px',
                                                                    border: '1px solid #e5e7eb',
                                                                    background: '#fff',
                                                                    color: '#666',
                                                                    fontSize: '1rem',
                                                                    fontWeight: '600',
                                                                    cursor: 'pointer',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    transition: 'all 0.2s ease'
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.background = '#f9fafb';
                                                                    e.currentTarget.style.borderColor = '#ea580c';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.background = '#fff';
                                                                    e.currentTarget.style.borderColor = '#e5e7eb';
                                                                }}
                                                            >
                                                                −
                                                            </button>
                                                            <span style={{
                                                                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                                                                fontWeight: '700',
                                                                color: '#1a1a1a',
                                                                minWidth: '20px',
                                                                textAlign: 'center'
                                                            }}>{item.quantity}</span>
                                                            <button 
                                                                onClick={() => {
                                                                    updateQuantity(item.id, item.quantity + 1, item.size);
                                                                }}
                                                                style={{
                                                                    width: '28px',
                                                                    height: '28px',
                                                                    borderRadius: '6px',
                                                                    border: '1px solid #e5e7eb',
                                                                    background: '#fff',
                                                                    color: '#666',
                                                                    fontSize: '1rem',
                                                                    fontWeight: '600',
                                                                    cursor: 'pointer',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'center',
                                                                    transition: 'all 0.2s ease'
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.background = '#f9fafb';
                                                                    e.currentTarget.style.borderColor = '#ea580c';
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.background = '#fff';
                                                                    e.currentTarget.style.borderColor = '#e5e7eb';
                                                                }}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                        <span style={{
                                                            fontSize: 'clamp(0.95rem, 2.2vw, 1.05rem)',
                                                            fontWeight: '800',
                                                            color: '#ea580c',
                                                            marginLeft: 'auto'
                                                        }}>Rs.{item.price.toLocaleString('en-PK')}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recommended Products Section - Hidden */}
                                    {false && (
                                    <div style={{
                                        marginTop: 'clamp(1.5rem, 4vw, 2rem)',
                                        paddingTop: 'clamp(1.2rem, 3vw, 1.5rem)',
                                        borderTop: '1px solid #f0f0f0'
                                    }}>
                                        <h3 style={{
                                            fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)',
                                            fontWeight: '700',
                                            color: '#1a1a1a',
                                            marginBottom: 'clamp(0.8rem, 2vw, 1rem)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px'
                                        }}>RECOMMENDED FOR YOU</h3>
                                        <div style={{
                                            display: 'grid',
                                            gridTemplateColumns: 'repeat(auto-fit, minmax(70px, 1fr))',
                                            gap: 'clamp(0.6rem, 1.5vw, 0.8rem)',
                                            maxWidth: '100%'
                                        }}>
                                            {initialProducts.slice(0, 4).map((prod) => (
                                                <Link 
                                                    key={prod.id} 
                                                    to={`/product/${prod.id}`}
                                                    onClick={() => setShowCartSidebar(false)}
                                                    style={{
                                                        textDecoration: 'none',
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'center',
                                                        gap: '0.4rem'
                                                    }}
                                                >
                                                    <img 
                                                        src={prod.image} 
                                                        alt={prod.name}
                                                        style={{
                                                            width: '100%',
                                                            aspectRatio: '1',
                                                            objectFit: 'cover',
                                                            borderRadius: '8px',
                                                            border: '1px solid #f0f0f0',
                                                            transition: 'all 0.2s ease'
                                                        }}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.transform = 'scale(1.05)';
                                                            e.currentTarget.style.borderColor = '#ea580c';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.transform = 'scale(1)';
                                                            e.currentTarget.style.borderColor = '#f0f0f0';
                                                        }}
                                                    />
                                                    <span style={{
                                                        fontSize: 'clamp(0.65rem, 1.5vw, 0.75rem)',
                                                        color: '#1a1a1a',
                                                        fontWeight: '600',
                                                        textAlign: 'center',
                                                        lineHeight: '1.2',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 2,
                                                        WebkitBoxOrient: 'vertical'
                                                    }}>{prod.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    )}

                                    {/* Discounts Section */}
                                    <div style={{
                                        marginTop: 'clamp(1.2rem, 3vw, 1.5rem)',
                                        paddingTop: 'clamp(1.2rem, 3vw, 1.5rem)',
                                        borderTop: '1px solid #f0f0f0'
                                    }}>
                                        <h4 style={{
                                            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                                            fontWeight: '700',
                                            color: '#1a1a1a',
                                            marginBottom: '0.5rem'
                                        }}>Discounts</h4>
                                    </div>

                                    <div className="cart-sidebar-footer" style={{
                                        padding: 'clamp(1.2rem, 3vw, 1.5rem) 0 0 0',
                                        marginTop: 'clamp(1rem, 2.5vw, 1.5rem)',
                                        background: 'transparent',
                                        border: 'none',
                                        borderTop: '2px solid #f0f0f0',
                                        borderRadius: 0
                                    }}>
                                        <div className="cart-total" style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.5rem',
                                            marginBottom: 'clamp(0.8rem, 2vw, 1rem)'
                                        }}>
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                                                color: '#1a1a1a',
                                                fontWeight: '700',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                gap: '1rem'
                                            }}>
                                                <span>SUBTOTAL</span>
                                                <span style={{ 
                                                    fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                                                    color: '#1a1a1a',
                                                    fontWeight: '800'
                                                }}>Rs.{cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString('en-PK')}</span>
                                            </div>
                                            <p style={{
                                                fontSize: 'clamp(0.7rem, 1.6vw, 0.8rem)',
                                                color: '#666',
                                                margin: '0.5rem 0 1rem 0',
                                                lineHeight: '1.4'
                                            }}>Shipping, taxes, and discount codes calculated at checkout.</p>
                                        </div>
                                        <Link to="/checkout" className="btn btn-primary" style={{ 
                                            width: '100%', 
                                            textAlign: 'center',
                                            padding: 'clamp(0.9rem, 2.5vw, 1rem)',
                                            fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                                            fontWeight: '700',
                                            borderRadius: '0',
                                            background: '#1a1a1a',
                                            color: '#fff',
                                            border: 'none',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1px',
                                            transition: 'all 0.3s ease',
                                            textDecoration: 'none',
                                            display: 'block'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.background = '#333';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.background = '#1a1a1a';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                        >
                                            CHECK OUT
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <div className="empty-cart" style={{
                                    textAlign: 'center',
                                    padding: '3rem 1rem',
                                    color: '#999'
                                }}>
                                    <div style={{
                                        fontSize: '3rem',
                                        marginBottom: '1rem'
                                    }}>🛍️</div>
                                    <p style={{
                                        fontSize: '1.1rem',
                                        fontWeight: '600',
                                        margin: 0
                                    }}>Your bag is empty</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Customer Reviews Section */}
            <div style={{ 
                marginTop: '4rem', 
                paddingTop: '3rem', 
                borderTop: '1px solid #e5e7eb'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '2.5rem',
                    flexDirection: 'column',
                    gap: '0.8rem',
                    padding: '0 1rem'
                }}>
                    <h2 style={{
                        fontSize: 'clamp(1.8rem, 5vw, 3rem)',
                        fontWeight: '800',
                        color: '#222',
                        margin: '0',
                        letterSpacing: '-0.5px',
                        textAlign: 'center'
                    }}>Customer Reviews</h2>
                    <div style={{
                        width: '80px',
                        height: '4px',
                        background: 'linear-gradient(90deg, #d36a6a 0%, #fbbf24 50%, #d36a6a 100%)',
                        borderRadius: '2px',
                        marginBottom: '1rem'
                    }} />
                    <div style={{
                        display: 'flex', 
                        gap: '1rem', 
                        justifyContent: 'center', 
                        marginTop: '1rem',
                        flexWrap: 'wrap',
                        width: '100%',
                        maxWidth: '500px'
                    }}>
                        <button 
                            style={{
                                background: '#ea580c',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '6px',
                                padding: '0.75rem 1.5rem',
                                fontWeight: 700,
                                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px #ea580c33',
                                flex: '1 1 auto',
                                minWidth: '140px',
                                transition: 'all 0.3s ease'
                            }}
                            onClick={() => setShowReviewPopup(true)}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#c94a07';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px #ea580c44';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#ea580c';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 8px #ea580c33';
                            }}
                        >
                            Write Review
                        </button>
                        <button 
                            style={{
                                background: '#fff',
                                color: '#ea580c',
                                border: '2px solid #ea580c',
                                borderRadius: '6px',
                                padding: '0.75rem 1.5rem',
                                fontWeight: 700,
                                fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                                cursor: 'pointer',
                                boxShadow: '0 2px 8px #ea580c33',
                                flex: '1 1 auto',
                                minWidth: '140px',
                                transition: 'all 0.3s ease'
                            }}
                            onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.background = '#ea580c';
                                e.currentTarget.style.color = '#fff';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 4px 12px #ea580c44';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.background = '#fff';
                                e.currentTarget.style.color = '#ea580c';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 2px 8px #ea580c33';
                            }}
                        >
                            Another Action
                        </button>
                    </div>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: window.innerWidth > 768 ? '320px 1fr' : '1fr',
                    gap: 'clamp(1.5rem, 3vw, 4rem)',
                    alignItems: 'start',
                    padding: '0 1rem'
                }}>
                    {/* Reviews Summary */}
                    <div style={{
                        padding: 'clamp(1.5rem, 4vw, 3rem)',
                        background: 'linear-gradient(135deg, #fff9f0 0%, #fff 100%)',
                        borderRadius: '16px',
                        border: '1px solid #f0e5d8',
                        boxShadow: '0 2px 16px rgba(0,0,0,0.04)',
                        position: window.innerWidth > 768 ? 'sticky' : 'static',
                        top: '2rem'
                    }}>
                        <div style={{
                            marginBottom: '2rem'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: 'clamp(0.8rem, 2vw, 1.2rem)',
                                marginBottom: '1.5rem',
                                flexWrap: window.innerWidth < 480 ? 'wrap' : 'nowrap',
                                justifyContent: window.innerWidth < 480 ? 'center' : 'flex-start'
                            }}>
                                <div style={{
                                    fontSize: 'clamp(3.5rem, 10vw, 5rem)',
                                    fontWeight: '900',
                                    color: '#d36a6a',
                                    lineHeight: '0.9',
                                    textShadow: '0 2px 4px rgba(211, 106, 106, 0.1)'
                                }}>4.7</div>
                                <div style={{
                                    flex: 1,
                                    minWidth: window.innerWidth < 480 ? '100%' : 'auto',
                                    textAlign: window.innerWidth < 480 ? 'center' : 'left'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        gap: '0.4rem',
                                        marginBottom: '0.8rem',
                                        justifyContent: window.innerWidth < 480 ? 'center' : 'flex-start'
                                    }}>
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} style={{
                                                color: '#fbbf24',
                                                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                                                lineHeight: '1'
                                            }}>★</span>
                                        ))}
                                    </div>
                                    <p style={{
                                        margin: '0',
                                        color: '#666',
                                        fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
                                        fontWeight: '600',
                                        letterSpacing: '0.3px'
                                    }}>Based on 38 reviews</p>
                                </div>
                            </div>
                        </div>

                        {/* Rating Breakdown */}
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1.4rem'
                        }}>
                            {[
                                { stars: 5, percentage: 82, count: 31 },
                                { stars: 4, percentage: 13, count: 5 },
                                { stars: 3, percentage: 3, count: 1 },
                                { stars: 2, percentage: 0, count: 0 },
                                { stars: 1, percentage: 2, count: 1 }
                            ].map(rating => (
                                <div key={rating.stars} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.9rem'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        gap: '0.15rem',
                                        minWidth: '75px'
                                    }}>
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} style={{
                                                color: i < rating.stars ? '#fbbf24' : '#e5e7eb',
                                                fontSize: '0.9rem',
                                                lineHeight: '1'
                                            }}>★</span>
                                        ))}
                                    </div>
                                    <div style={{
                                        flex: 1,
                                        height: '12px',
                                        background: '#e5e7eb',
                                        borderRadius: '6px',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${rating.percentage}%`,
                                            height: '100%',
                                            background: `linear-gradient(90deg, #fbbf24 0%, ${rating.percentage > 0 ? '#fcd34d' : '#e5e7eb'} 100%)`,
                                            transition: 'width 0.4s ease',
                                            borderRadius: '6px'
                                        }} />
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        gap: '0.4rem',
                                        minWidth: '55px',
                                        fontSize: '0.8rem',
                                        color: '#666',
                                        fontWeight: '600'
                                    }}>
                                        <span>{rating.percentage}%</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Individual Reviews */}
                    <div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '2rem',
                            paddingBottom: '1rem',
                            borderBottom: '2px solid #f0f0f0',
                            flexWrap: 'wrap',
                            gap: '1rem'
                        }}>
                            <p style={{
                                margin: '0',
                                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                                color: '#666',
                                fontWeight: '600'
                            }}>Sort by</p>
                            <select style={{
                                padding: 'clamp(0.6rem, 1.5vw, 0.75rem) clamp(0.8rem, 2vw, 1rem)',
                                border: '2px solid #e5e7eb',
                                borderRadius: '8px',
                                fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                                color: '#222',
                                cursor: 'pointer',
                                background: '#fff',
                                fontWeight: '600',
                                transition: 'all 0.2s ease',
                                minWidth: '150px',
                                width: window.innerWidth < 480 ? '100%' : 'auto'
                            }}
                            onFocus={(e) => {
                                e.target.style.borderColor = '#d36a6a';
                                e.target.style.boxShadow = '0 0 0 3px rgba(211, 106, 106, 0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = '#e5e7eb';
                                e.target.style.boxShadow = 'none';
                            }}>
                                <option>Most Recent</option>
                                <option>Highest Rating</option>
                                <option>Lowest Rating</option>
                            </select>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2.5rem'
                        }}>
                            {(() => {
                                const hardcodedReviews = [
                                    {
                                        name: 'Ahmad Hassan',
                                        rating: 5,
                                        date: '02/10/2026',
                                        title: 'Perfect fit and comfort',
                                        comment: 'Amazing quality, very comfortable to wear all day!',
                                        verified: true,
                                        initials: 'AH'
                                    },
                                    {
                                        name: 'Sara Khan',
                                        rating: 5,
                                        date: '02/08/2026',
                                        title: 'Excellent product',
                                        comment: 'Highly satisfied with the purchase. Delivery was quick.',
                                        verified: true,
                                        initials: 'SK'
                                    },
                                    {
                                        name: 'Ali Raza',
                                        rating: 4,
                                        date: '02/05/2026',
                                        title: 'Good quality',
                                        comment: 'Good product but slightly tight on first wear.',
                                        verified: true,
                                        initials: 'AR'
                                    }
                                ];
                                
                                // Convert user reviews to display format
                                const userReviewsFormatted = reviews.map(review => ({
                                    ...review,
                                    title: '',
                                    verified: false,
                                    initials: review.name.split(' ').map(n => n[0]).join('').toUpperCase(),
                                    date: review.date instanceof Date ? 
                                        review.date.toLocaleDateString('en-PK') : 
                                        new Date(review.date).toLocaleDateString('en-PK')
                                }));
                                
                                // Combine and show user reviews first
                                const allReviews = [...userReviewsFormatted, ...hardcodedReviews].slice(0, 3);
                                
                                return allReviews.map((review, index) => (
                                <div key={index} style={{
                                    paddingBottom: '2.5rem',
                                    borderBottom: index < 2 ? '1px solid #e5e7eb' : 'none',
                                    transition: 'all 0.3s ease'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        gap: '1.2rem'
                                    }}>
                                        {/* Avatar */}
                                        <div style={{
                                            width: '52px',
                                            height: '52px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #d36a6a 0%, #c85a5a 100%)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: '800',
                                            color: '#fff',
                                            fontSize: '1.05rem',
                                            flexShrink: 0,
                                            boxShadow: '0 4px 12px rgba(211, 106, 106, 0.25)',
                                            border: '2px solid #fff'
                                        }}>
                                            {review.initials}
                                        </div>

                                        {/* Review Content */}
                                        <div style={{
                                            flex: 1
                                        }}>
                                            {/* Rating */}
                                            <div style={{
                                                display: 'flex',
                                                gap: '0.25rem',
                                                marginBottom: '0.6rem'
                                            }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} style={{
                                                        color: i < review.rating ? '#fbbf24' : '#d1d5db',
                                                        fontSize: '1.15rem',
                                                        lineHeight: '1'
                                                    }}>★</span>
                                                ))}
                                            </div>

                                            {/* Name, Date and Verified Badge */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.7rem',
                                                marginBottom: '0.7rem',
                                                flexWrap: 'wrap'
                                            }}>
                                                <span style={{
                                                    fontWeight: '800',
                                                    color: '#222',
                                                    fontSize: '1rem',
                                                    letterSpacing: '-0.3px'
                                                }}>{review.name}</span>
                                                {review.verified && (
                                                    <span style={{
                                                        background: '#222',
                                                        color: '#fff',
                                                        padding: '0.35rem 0.8rem',
                                                        borderRadius: '4px',
                                                        fontSize: '0.7rem',
                                                        fontWeight: '700',
                                                        letterSpacing: '0.5px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.3rem'
                                                    }}>✓ Verified</span>
                                                )}
                                                <span style={{
                                                    color: '#bbb',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '500'
                                                }}>{review.date}</span>
                                            </div>

                                            {/* Title */}
                                            {review.title && (
                                                <p style={{
                                                    margin: '0.6rem 0',
                                                    fontWeight: '700',
                                                    color: '#222',
                                                    fontSize: '1rem',
                                                    letterSpacing: '-0.2px'
                                                }}>{review.title}</p>
                                            )}

                                            {/* Comment */}
                                            {review.comment && (
                                                <p style={{
                                                    margin: '0.5rem 0 0 0',
                                                    color: '#555',
                                                    fontSize: '0.95rem',
                                                    lineHeight: '1.7',
                                                    letterSpacing: '0.2px'
                                                }}>{review.comment}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                ));
                            })()}
                        </div>

                        {/* Load More Button */}
                        <button 
                            onClick={() => setShowAllReviews(!showAllReviews)}
                            style={{
                            maxWidth: '280px',
                            margin: 'clamp(1.5rem, 3vw, 2.5rem) auto 0',
                            width: '100%',
                            padding: 'clamp(0.6rem, 1.5vw, 0.75rem) clamp(1rem, 2vw, 1.2rem)',
                            border: '2px solid #ea580c',
                            borderRadius: '8px',
                            background: 'linear-gradient(135deg, #ffffff 0%, #fff5f0 100%)',
                            color: '#ea580c',
                            fontWeight: '700',
                            fontSize: 'clamp(0.8rem, 1.8vw, 0.9rem)',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                            letterSpacing: '0.8px',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.4rem',
                            boxShadow: '0 3px 12px rgba(234, 88, 12, 0.12)',
                            textTransform: 'uppercase'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)';
                            e.currentTarget.style.color = '#fff';
                            e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
                            e.currentTarget.style.boxShadow = '0 8px 20px rgba(234, 88, 12, 0.3)';
                            e.currentTarget.style.borderColor = '#ea580c';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'linear-gradient(135deg, #ffffff 0%, #fff5f0 100%)';
                            e.currentTarget.style.color = '#ea580c';
                            e.currentTarget.style.transform = 'translateY(0) scale(1)';
                            e.currentTarget.style.boxShadow = '0 3px 12px rgba(234, 88, 12, 0.12)';
                            e.currentTarget.style.borderColor = '#ea580c';
                        }}>
                            <span>{showAllReviews ? '▲ SHOW LESS' : '▼ VIEW ALL REVIEWS'}</span>
                        </button>

                        {/* All Reviews Section - Shown when expanded */}
                        {showAllReviews && (
                            <div style={{
                                marginTop: '3rem',
                                paddingTop: '3rem',
                                borderTop: '2px solid #eee'
                            }}>
                                <h3 style={{
                                    fontSize: '1.5rem',
                                    fontWeight: '800',
                                    color: '#222',
                                    marginBottom: '2rem',
                                    letterSpacing: '-0.5px'
                                }}>All Customer Reviews</h3>

                                <div style={{
                                    display: 'grid',
                                    gap: '1.5rem'
                                }}>
                                    {(() => {
                                        const hardcodedReviews = [
                                            {
                                                name: 'Ahmad Hassan',
                                                verified: true,
                                                date: '2 days ago',
                                                rating: 5,
                                                title: 'Excellent product!',
                                                comment: 'Very comfortable and high quality. Exceeded my expectations. Highly recommend to everyone looking for premium footwear.'
                                            },
                                            {
                                                name: 'Sara Khan',
                                                verified: true,
                                                date: '5 days ago',
                                                rating: 5,
                                                title: 'Perfect fit and great quality',
                                                comment: 'The product arrived on time and in perfect condition. The quality is amazing and the price is very reasonable. Will definitely buy again.'
                                            },
                                            {
                                                name: 'Ali Raza',
                                                verified: true,
                                                date: '1 week ago',
                                                rating: 4,
                                                title: 'Good product',
                                                comment: 'Good quality and comfortable. Slightly expensive but worth the money. Customer service was helpful.'
                                            },
                                            {
                                                name: 'Fatima Ahmed',
                                                verified: true,
                                                date: '1 week ago',
                                                rating: 5,
                                                title: 'Amazing! Love it',
                                                comment: 'Best purchase ever! The quality is outstanding and delivery was super fast. Will be ordering more soon!'
                                            },
                                            {
                                                name: 'Hassan Ali',
                                                verified: true,
                                                date: '2 weeks ago',
                                                rating: 5,
                                                title: 'Highly recommended',
                                                comment: 'Perfect in every way. Material is premium, design is elegant, and comfort is unmatched. Five stars definitely!'
                                            },
                                            {
                                                name: 'Zainab Khan',
                                                verified: true,
                                                date: '2 weeks ago',
                                                rating: 4,
                                                title: 'Very good',
                                                comment: 'Great product overall. Very satisfied with purchase. Minor packaging issue but product itself is excellent.'
                                            },
                                            {
                                                name: 'Muhammad Usman',
                                                verified: true,
                                                date: '3 weeks ago',
                                                rating: 5,
                                                title: 'Premium quality',
                                                comment: 'Impressive quality and attention to detail. Perfect for daily wear or special occasions. Highly satisfied.'
                                            },
                                            {
                                                name: 'Amira Hassan',
                                                verified: true,
                                                date: '3 weeks ago',
                                                rating: 4,
                                                title: 'Good value for money',
                                                comment: 'Good product at reasonable price. Very comfortable and durable. Recommend to friends and family.'
                                            },
                                            {
                                                name: 'Karim Saeed',
                                                verified: true,
                                                date: '1 month ago',
                                                rating: 5,
                                                title: 'Excellent purchase',
                                                comment: 'Exactly as described. Quality is top notch. Delivery was fast and packaging was excellent. Great seller!'
                                            },
                                            {
                                                name: 'Nida Malik',
                                                verified: false,
                                                date: '1 month ago',
                                                rating: 3,
                                                title: 'Good but could be better',
                                                comment: 'Product is good but delivery took longer than expected. Quality is decent though.'
                                            }
                                        ];
                                        
                                        // Convert user reviews to display format
                                        const userReviewsFormatted = reviews.map(review => ({
                                            ...review,
                                            verified: false,
                                            date: review.date instanceof Date ? 
                                                review.date.toLocaleDateString('en-PK') : 
                                                new Date(review.date).toLocaleDateString('en-PK')
                                        }));
                                        
                                        // Combine - user reviews first
                                        const allReviews = [...userReviewsFormatted, ...hardcodedReviews];
                                        
                                        return allReviews.map((review, idx) => (
                                        <div key={idx} style={{
                                            background: 'linear-gradient(135deg, #fff 0%, #fafafa 100%)',
                                            padding: '1.5rem',
                                            borderRadius: '10px',
                                            border: '1px solid #eee',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                                            transition: 'all 0.3s ease',
                                            cursor: 'pointer'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.1)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}>
                                            {/* Star Rating */}
                                            <div style={{
                                                display: 'flex',
                                                gap: '0.3rem',
                                                marginBottom: '0.8rem'
                                            }}>
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} style={{
                                                        color: i < review.rating ? '#ffc107' : '#ddd',
                                                        fontSize: '1rem'
                                                    }}>★</span>
                                                ))}
                                            </div>

                                            {/* Name and Verified Badge */}
                                            <div style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.7rem',
                                                marginBottom: '0.7rem',
                                                flexWrap: 'wrap'
                                            }}>
                                                <span style={{
                                                    fontWeight: '800',
                                                    color: '#222',
                                                    fontSize: '1rem',
                                                    letterSpacing: '-0.3px'
                                                }}>{review.name}</span>
                                                {review.verified && (
                                                    <span style={{
                                                        background: '#222',
                                                        color: '#fff',
                                                        padding: '0.35rem 0.8rem',
                                                        borderRadius: '4px',
                                                        fontSize: '0.7rem',
                                                        fontWeight: '700',
                                                        letterSpacing: '0.5px',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.3rem'
                                                    }}>✓ Verified</span>
                                                )}
                                                <span style={{
                                                    color: '#bbb',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '500'
                                                }}>{review.date}</span>
                                            </div>

                                            {/* Title */}
                                            {review.title && (
                                                <p style={{
                                                    margin: '0.6rem 0',
                                                    fontWeight: '700',
                                                    color: '#222',
                                                    fontSize: '1rem',
                                                    letterSpacing: '-0.2px'
                                                }}>{review.title}</p>
                                            )}

                                            {/* Comment */}
                                            {review.comment && (
                                                <p style={{
                                                    margin: '0.5rem 0 0 0',
                                                    color: '#555',
                                                    fontSize: '0.95rem',
                                                    lineHeight: '1.7',
                                                    letterSpacing: '0.2px'
                                                }}>{review.comment}</p>
                                            )}
                                        </div>
                                    ));
                                    })()}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Review Form Popup Modal */}
            {showReviewPopup && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '1rem'
                }}>
                    <div style={{
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '2.5rem',
                        maxWidth: '600px',
                        width: '100%',
                        maxHeight: '90vh',
                        overflowY: 'auto',
                        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                        animation: 'slideUp 0.3s ease'
                    }}>
                        {/* Header */}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '2rem',
                            paddingBottom: '1.5rem',
                            borderBottom: '2px solid #f0f0f0'
                        }}>
                            <h2 style={{
                                margin: 0,
                                fontSize: '1.8rem',
                                fontWeight: '800',
                                color: '#222',
                                letterSpacing: '-0.5px'
                            }}>Share Your Review</h2>
                            <button
                                onClick={() => setShowReviewPopup(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.8rem',
                                    cursor: 'pointer',
                                    color: '#999',
                                    padding: '0',
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.background = '#f0f0f0';
                                    e.target.style.color = '#222';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.background = 'none';
                                    e.target.style.color = '#999';
                                }}
                            >
                                ×
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Name Field */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.6rem',
                                    fontWeight: '700',
                                    color: '#222',
                                    fontSize: '0.95rem',
                                    letterSpacing: '0.3px'
                                }}>Your Name *</label>
                                <input
                                    type="text"
                                    value={reviewName}
                                    onChange={(e) => setReviewName(e.target.value)}
                                    placeholder="Enter your full name"
                                    style={{
                                        width: '100%',
                                        padding: '0.95rem 1.2rem',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontFamily: 'inherit',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#ea580c';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(234, 88, 12, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e5e7eb';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>

                            {/* Rating Field */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.8rem',
                                    fontWeight: '700',
                                    color: '#222',
                                    fontSize: '0.95rem',
                                    letterSpacing: '0.3px'
                                }}>Rating *</label>
                                <div style={{
                                    display: 'flex',
                                    gap: '0.6rem',
                                    alignItems: 'center'
                                }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setReviewRating(star)}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                fontSize: '2.5rem',
                                                cursor: 'pointer',
                                                color: star <= reviewRating ? '#ffc107' : '#ddd',
                                                transition: 'all 0.2s ease',
                                                padding: '0.2rem',
                                                lineHeight: '1'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'scale(1.2)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'scale(1)';
                                            }}
                                        >
                                            ★
                                        </button>
                                    ))}
                                    <span style={{
                                        marginLeft: '0.8rem',
                                        color: '#666',
                                        fontWeight: '600',
                                        fontSize: '0.95rem'
                                    }}>({reviewRating}/5)</span>
                                </div>
                            </div>

                            {/* Category Field */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.6rem',
                                    fontWeight: '700',
                                    color: '#222',
                                    fontSize: '0.95rem',
                                    letterSpacing: '0.3px'
                                }}>Product Category *</label>
                                <input
                                    type="text"
                                    value={reviewCategory}
                                    onChange={(e) => setReviewCategory(e.target.value)}
                                    placeholder="e.g., Footwear, Cosmetics, Clothing"
                                    style={{
                                        width: '100%',
                                        padding: '0.95rem 1.2rem',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontFamily: 'inherit',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#ea580c';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(234, 88, 12, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e5e7eb';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>

                            {/* Comment Field */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '0.6rem',
                                    fontWeight: '700',
                                    color: '#222',
                                    fontSize: '0.95rem',
                                    letterSpacing: '0.3px'
                                }}>Your Review *</label>
                                <textarea
                                    value={reviewComment}
                                    onChange={(e) => setReviewComment(e.target.value)}
                                    placeholder="Share your experience with this product..."
                                    rows="5"
                                    style={{
                                        width: '100%',
                                        padding: '0.95rem 1.2rem',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontFamily: 'inherit',
                                        transition: 'all 0.2s ease',
                                        boxSizing: 'border-box',
                                        resize: 'none'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = '#ea580c';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(234, 88, 12, 0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e5e7eb';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>

                            {/* Buttons */}
                            <div style={{
                                display: 'flex',
                                gap: '1rem',
                                marginTop: '1rem'
                            }}>
                                <button
                                    type="submit"
                                    style={{
                                        flex: 1,
                                        padding: '0.95rem 1.5rem',
                                        background: 'linear-gradient(135deg, #ea580c 0%, #d44c08 100%)',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        boxShadow: '0 4px 15px rgba(234, 88, 12, 0.3)',
                                        letterSpacing: '0.5px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.transform = 'translateY(-2px)';
                                        e.target.style.boxShadow = '0 6px 20px rgba(234, 88, 12, 0.4)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.transform = 'translateY(0)';
                                        e.target.style.boxShadow = '0 4px 15px rgba(234, 88, 12, 0.3)';
                                    }}
                                >
                                    Submit Review
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowReviewPopup(false)}
                                    style={{
                                        flex: 1,
                                        padding: '0.95rem 1.5rem',
                                        background: '#f5f5f5',
                                        color: '#222',
                                        border: '2px solid #e5e7eb',
                                        borderRadius: '8px',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        letterSpacing: '0.5px'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = '#e5e7eb';
                                        e.target.style.borderColor = '#999';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.target.style.background = '#f5f5f5';
                                        e.target.style.borderColor = '#e5e7eb';
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
