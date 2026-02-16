import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import '../styles/pages.css';

export const Checkout = () => {
    const navigate = useNavigate();
    const { cart, getCartTotal, clearCart } = useCart();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'Pakistan',
        paymentMethod: 'cod'
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [orderData, setOrderData] = useState(null);

    // Show success popup instead of checking empty cart
    if (showSuccessPopup && orderData) {
        return (
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
                padding: '1rem',
                animation: 'fadeIn 0.3s ease'
            }}>
                <div style={{
                    background: '#fff',
                    borderRadius: '20px',
                    padding: '3rem 2.5rem',
                    maxWidth: '500px',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    animation: 'slideUp 0.4s ease'
                }}>
                    {/* Success Icon */}
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3.5rem',
                        color: '#fff',
                        margin: '0 auto 1.5rem',
                        boxShadow: '0 10px 25px rgba(34, 197, 94, 0.3)'
                    }}>
                        ✓
                    </div>

                    {/* Success Message */}
                    <h2 style={{
                        fontSize: '2rem',
                        fontWeight: '800',
                        color: '#222',
                        margin: '0 0 0.8rem 0',
                        letterSpacing: '-0.5px'
                    }}>Order Placed Successfully!</h2>

                    <p style={{
                        fontSize: '1rem',
                        color: '#666',
                        margin: '0 0 1.5rem 0',
                        lineHeight: '1.6'
                    }}>
                        Thank you for your order. Your items will be dispatched soon.
                    </p>

                    {/* Order ID */}
                    <div style={{
                        background: '#f5f5f5',
                        padding: '1rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        border: '2px solid #e5e7eb'
                    }}>
                        <p style={{
                            margin: '0 0 0.5rem 0',
                            fontSize: '0.85rem',
                            color: '#999',
                            fontWeight: '600',
                            letterSpacing: '0.5px'
                        }}>ORDER ID</p>
                        <p style={{
                            margin: '0',
                            fontSize: '1.3rem',
                            fontWeight: '800',
                            color: '#222',
                            fontFamily: 'monospace'
                        }}>{orderData.orderId}</p>
                    </div>

                    {/* Order Summary */}
                    <div style={{
                        background: '#fafafa',
                        padding: '1.2rem',
                        borderRadius: '12px',
                        marginBottom: '1.5rem',
                        textAlign: 'left'
                    }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '0.8rem',
                            fontSize: '0.9rem'
                        }}>
                            <span style={{ color: '#666' }}>Subtotal:</span>
                            <span style={{ fontWeight: '600', color: '#222' }}>Rs. {orderData.subtotal.toLocaleString('en-PK')}</span>
                        </div>
                        {orderData.discount > 0 && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '0.8rem',
                                fontSize: '0.9rem'
                            }}>
                                <span style={{ color: '#22c55e' }}>Discount ({orderData.discountPercent}%):</span>
                                <span style={{ fontWeight: '600', color: '#22c55e' }}>-Rs. {orderData.discount.toLocaleString('en-PK')}</span>
                            </div>
                        )}
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '0.8rem',
                            fontSize: '0.9rem'
                        }}>
                            <span style={{ color: '#666' }}>Shipping:</span>
                            <span style={{ fontWeight: '600', color: orderData.shipping === 0 ? '#22c55e' : '#d36a6a' }}>
                                {orderData.shipping === 0 ? 'FREE' : `Rs. ${orderData.shipping}`}
                            </span>
                        </div>
                        <div style={{
                            borderTop: '2px solid #e5e7eb',
                            paddingTop: '0.8rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '1.1rem',
                            fontWeight: '700'
                        }}>
                            <span>Total:</span>
                            <span style={{ color: '#d36a6a' }}>Rs. {orderData.total.toLocaleString('en-PK')}</span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div style={{
                        display: 'flex',
                        gap: '1rem',
                        flexDirection: 'column'
                    }}>
                        <button
                            onClick={() => {
                                setShowSuccessPopup(false);
                                navigate('/');
                            }}
                            style={{
                                padding: '1rem 1.5rem',
                                background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '10px',
                                fontSize: '1rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)',
                                letterSpacing: '0.5px'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.4)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(34, 197, 94, 0.3)';
                            }}
                        >
                            Continue Shopping
                        </button>
                        <button
                            onClick={() => {
                                setShowSuccessPopup(false);
                                navigate('/products');
                            }}
                            style={{
                                padding: '1rem 1.5rem',
                                background: '#f5f5f5',
                                color: '#222',
                                border: '2px solid #e5e7eb',
                                borderRadius: '10px',
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
                            View All Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <div className="checkout-page">
                <div className="container">
                    <div className="empty-cart">
                        <h2>Your cart is empty</h2>
                        <button onClick={() => navigate('/products')} className="btn btn-primary">
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Calculate total quantity and discount
    const getTotalQuantity = () => {
        return cart.reduce((sum, item) => sum + item.quantity, 0);
    };

    const getDiscountPercentage = (quantity) => {
        if (quantity >= 5) return 20;
        if (quantity >= 4) return 15;
        if (quantity >= 3) return 10;
        if (quantity >= 2) return 5;
        return 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const subtotal = getCartTotal();
            const totalQuantity = getTotalQuantity();
            const discountPercent = getDiscountPercentage(totalQuantity);
            const discountAmount = (subtotal * discountPercent) / 100;
            const priceAfterDiscount = subtotal - discountAmount;
            const shipping = priceAfterDiscount > 3000 ? 0 : 200;
            const total = priceAfterDiscount + shipping;

            const newOrderData = {
                items: cart,
                subtotal,
                discount: discountAmount,
                discountPercent,
                priceAfterDiscount,
                shipping,
                total,
                orderDate: new Date().toISOString(),
                status: 'pending',
                customerData: formData,
                orderId: `ORD-${Date.now()}`
            };

            const orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(newOrderData);
            localStorage.setItem('orders', JSON.stringify(orders));

            clearCart();
            setOrderData(newOrderData);
            setShowSuccessPopup(true);

        } catch (error) {
            console.error(error);
            alert('Something went wrong. Try again.');
        } finally {
            setIsProcessing(false);
        }
    };

    const subtotal = getCartTotal();
    const totalQuantity = getTotalQuantity();
    const discountPercent = getDiscountPercentage(totalQuantity);
    const discountAmount = (subtotal * discountPercent) / 100;
    const priceAfterDiscount = subtotal - discountAmount;
    const shipping = priceAfterDiscount > 3000 ? 0 : 200;
    const total = priceAfterDiscount + shipping;

    return (
        <div className="checkout-page">
            <div className="container">
                <h1>Checkout</h1>

                <div className="checkout-content">
                    
                    {/* Form Section */}
                    <div className="checkout-form-section">
                        <form onSubmit={handleSubmit} className="checkout-form">

                            <div className="form-section">
                                <h2>Shipping Address</h2>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name *</label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Last Name *</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Phone *</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Address *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>City *</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Postal Code</label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Country</label>
                                    <select
                                        name="country"
                                        value={formData.country}
                                        onChange={handleChange}
                                    >
                                        <option value="Pakistan">Pakistan</option>
                                        <option value="USA">USA</option>
                                        <option value="UK">UK</option>
                                        <option value="UAE">UAE</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-place-order"
                                disabled={isProcessing}
                            >
                                {isProcessing ? 'Processing...' : 'Place Order'}
                            </button>
                        </form>

                        {/* Bulk Discount Offer */}
                        <div style={{
                            marginTop: '2rem',
                            padding: '2rem',
                            background: '#2d2d2d',
                            borderRadius: '8px',
                            color: '#fff'
                        }}>
                            <h3 style={{
                                textAlign: 'center',
                                fontSize: '1.4rem',
                                fontWeight: '700',
                                marginBottom: '1.5rem',
                                letterSpacing: '0.5px'
                            }}>
                                🏷️ SPEND LESS, GET MORE! 🏷️
                            </h3>

                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: '0.5rem',
                                marginBottom: '1.5rem',
                                textAlign: 'center'
                            }}>
                                <div style={{
                                    padding: '1rem',
                                    borderBottom: '1px solid #555',
                                    borderRight: '1px solid #555'
                                }}>
                                    <p style={{
                                        margin: '0.5rem 0',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        color: '#ffd700'
                                    }}>BUY ANY 2</p>
                                    <p style={{
                                        margin: '0',
                                        fontSize: '0.9rem',
                                        color: '#ccc'
                                    }}>GET <span style={{color: '#ffd700', fontWeight: '700'}}>5% OFF</span></p>
                                </div>

                                <div style={{
                                    padding: '1rem',
                                    borderBottom: '1px solid #555'
                                }}>
                                    <p style={{
                                        margin: '0.5rem 0',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        color: '#ffd700'
                                    }}>BUY ANY 3</p>
                                    <p style={{
                                        margin: '0',
                                        fontSize: '0.9rem',
                                        color: '#ccc'
                                    }}>GET <span style={{color: '#ffd700', fontWeight: '700'}}>10% OFF</span></p>
                                </div>

                                <div style={{
                                    padding: '1rem',
                                    borderRight: '1px solid #555'
                                }}>
                                    <p style={{
                                        margin: '0.5rem 0',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        color: '#ffd700'
                                    }}>BUY ANY 4</p>
                                    <p style={{
                                        margin: '0',
                                        fontSize: '0.9rem',
                                        color: '#ccc'
                                    }}>GET <span style={{color: '#ffd700', fontWeight: '700'}}>15% OFF</span></p>
                                </div>

                                <div style={{
                                    padding: '1rem'
                                }}>
                                    <p style={{
                                        margin: '0.5rem 0',
                                        fontSize: '1rem',
                                        fontWeight: '700',
                                        color: '#ffd700'
                                    }}>BUY ANY 5+</p>
                                    <p style={{
                                        margin: '0',
                                        fontSize: '0.9rem',
                                        color: '#ccc'
                                    }}>GET <span style={{color: '#ffd700', fontWeight: '700'}}>20% OFF</span></p>
                                </div>
                            </div>

                            <p style={{
                                margin: '0',
                                fontSize: '0.85rem',
                                color: '#ffd700',
                                fontStyle: 'italic',
                                textAlign: 'center'
                            }}>
                                *Products featuring this discount table are eligible for this offer
                            </p>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary-sidebar">
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1.5rem', color: '#222' }}>Order Summary</h2>

                        <div style={{ maxHeight: '320px', overflowY: 'auto', marginBottom: '1.5rem', paddingRight: '0.5rem' }}>
                            {cart.map(item => (
                                <div 
                                    key={item.id} 
                                    className="order-item"
                                    style={{
                                        display: 'flex',
                                        gap: '1rem',
                                        marginBottom: '1.2rem',
                                        padding: '1rem',
                                        background: '#f9fafb',
                                        borderRadius: '8px',
                                        border: '1px solid #e5e7eb',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.background = '#f0f1f3';
                                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.background = '#f9fafb';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}
                                >
                                    <div style={{ minWidth: '70px', height: '70px', borderRadius: '6px', overflow: 'hidden', background: '#fff', border: '1px solid #e5e7eb', flexShrink: 0 }}>
                                        <img 
                                            src={item.image || '/Images/placeholder.png'} 
                                            alt={item.name} 
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                        />
                                    </div>
                                    
                                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                        <div>
                                            <p style={{ margin: '0 0 0.4rem 0', fontWeight: '600', color: '#222', fontSize: '0.95rem' }}>{item.name}</p>
                                            <p style={{ margin: 0, color: '#888', fontSize: '0.85rem' }}>Qty: {item.quantity}</p>
                                        </div>
                                        <p style={{ margin: 0, fontWeight: '700', color: '#d36a6a', fontSize: '0.95rem' }}>Rs. {(item.price * item.quantity).toLocaleString('en-PK')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '1.2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.95rem', color: '#555' }}>
                                <span>Subtotal</span>
                                <span style={{ fontWeight: '600' }}>Rs. {subtotal.toLocaleString('en-PK')}</span>
                            </div>
                            
                            {discountPercent > 0 && (
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.8rem', fontSize: '0.95rem', color: '#22c55e', fontWeight: '600' }}>
                                        <span>Discount ({discountPercent}%)</span>
                                        <span>-Rs. {discountAmount.toLocaleString('en-PK')}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '0.95rem', color: '#555' }}>
                                        <span>Price after Discount</span>
                                        <span style={{ fontWeight: '600' }}>Rs. {priceAfterDiscount.toLocaleString('en-PK')}</span>
                                    </div>
                                </>
                            )}

                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '0.95rem', color: '#555' }}>
                                <span>Shipping</span>
                                <span style={{ fontWeight: '600', color: shipping === 0 ? '#22c55e' : '#d36a6a' }}>
                                    {shipping === 0 ? 'FREE' : `Rs. ${shipping}`}
                                </span>
                            </div>
                            <div style={{ borderTop: '2px solid #e5e7eb', paddingTop: '1rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.3rem', fontWeight: '700', color: '#222' }}>
                                    <span>Total</span>
                                    <span style={{ color: '#d36a6a' }}>Rs. {total.toLocaleString('en-PK')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;
