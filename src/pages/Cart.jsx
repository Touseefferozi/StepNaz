import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import '../styles/pages.css';

export const Cart = () => {
    const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

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

    if (cart.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <h1>Shopping Cart</h1>
                    <div className="empty-cart">
                        <i className="fas fa-shopping-cart"></i>
                        <h2>Your cart is empty</h2>
                        <p>Start shopping to add items to your cart</p>
                        <Link to="/products" className="btn btn-primary">Continue Shopping</Link>
                    </div>
                </div>
            </div>
        );
    }

    const subtotal = getCartTotal();
    const totalQuantity = getTotalQuantity();
    const discountPercent = getDiscountPercentage(totalQuantity);
    const discountAmount = (subtotal * discountPercent) / 100;
    const priceAfterDiscount = subtotal - discountAmount;
    const shippingFee = priceAfterDiscount > 3000 ? 0 : 200;
    const grandTotal = priceAfterDiscount + shippingFee;

    return (
        <div className="cart-page">
            <div className="container">
                <h1>Shopping Cart</h1>

                <div className="cart-content">
                    {/* Cart Items */}
                    <div className="cart-items" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'clamp(1rem, 3vw, 1.5rem)',
                        width: '100%'
                    }}>
                        {cart.map(item => (
                            <div key={item.id} className="cart-item" style={{
                                display: 'flex',
                                flexDirection: window.innerWidth < 768 ? 'column' : 'row',
                                alignItems: 'center',
                                gap: 'clamp(1rem, 3vw, 1.5rem)',
                                padding: 'clamp(1rem, 3vw, 1.5rem)',
                                background: '#fff',
                                borderRadius: '12px',
                                border: '1px solid #f0f0f0',
                                boxShadow: '0 3px 12px rgba(0,0,0,0.04)',
                                position: 'relative'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.boxShadow = '0 10px 26px rgba(0,0,0,0.08)';
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.borderColor = '#f2a54a';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.boxShadow = '0 3px 12px rgba(0,0,0,0.04)';
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = '#f0f0f0';
                            }}>
                                <Link to={`/product/${item.id}`} className="item-image" style={{
                                    flex: '0 0 clamp(80px, 12vw, 120px)',
                                    display: 'block'
                                }}>
                                    <img src={item.image} alt={item.name} style={{
                                        width: '100%',
                                        height: 'auto',
                                        aspectRatio: '1',
                                        objectFit: 'cover',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.06)'
                                    }}/>
                                </Link>

                                <div className="item-details" style={{
                                    flex: 1,
                                    textAlign: window.innerWidth < 768 ? 'center' : 'left'
                                }}>
                                    <Link to={`/product/${item.id}`} className="item-name" style={{
                                        fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
                                        fontWeight: '700',
                                        color: '#1a1a1a',
                                        textDecoration: 'none',
                                        display: 'block',
                                        marginBottom: '0.25rem'
                                    }}>{item.name}</Link>
                                    {item.size && <p style={{margin: '0.15rem 0', color: '#333', fontWeight: 600}}>Shoe size: <strong style={{color:'#1a1a1a'}}>{item.size}</strong></p>}
                                    <div style={{
                                        marginTop: '0.6rem',
                                        display: 'flex',
                                        gap: '0.6rem',
                                        alignItems: 'center',
                                        justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start'
                                    }}>
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1, item.size)} style={{
                                            width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #eee', background:'#fff', cursor:'pointer'
                                        }}>-</button>
                                        <div style={{minWidth: '44px', textAlign: 'center', fontWeight:700}}>{item.quantity}</div>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1, item.size)} style={{
                                            width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #eee', background:'#fff', cursor:'pointer'
                                        }}>+</button>
                                    </div>
                                    <button onClick={() => removeFromCart(item.id, item.size)} style={{
                                        marginTop: '0.6rem',
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#666',
                                        cursor: 'pointer',
                                        textDecoration: 'underline'
                                    }}>Remove</button>
                                </div>

                                <div style={{
                                    flex: '0 0 140px',
                                    textAlign: 'right',
                                    fontSize: 'clamp(1rem, 2.2vw, 1.15rem)',
                                    fontWeight: '800',
                                    color: '#ea580c'
                                }}>
                                    Rs. {item.price.toLocaleString('en-PK')}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="cart-summary">
                        <h2>Order Summary</h2>

                        <div className="summary-item">
                            <span>Subtotal</span>
                            <span>Rs. {subtotal.toLocaleString('en-PK')}</span>
                        </div>

                        {discountPercent > 0 && (
                            <>
                                <div className="summary-item" style={{ color: '#22c55e', fontWeight: '600' }}>
                                    <span>Discount ({discountPercent}%)</span>
                                    <span>-Rs. {discountAmount.toLocaleString('en-PK')}</span>
                                </div>
                                <div className="summary-item">
                                    <span>Price after Discount</span>
                                    <span>Rs. {priceAfterDiscount.toLocaleString('en-PK')}</span>
                                </div>
                            </>
                        )}

                        <div className="summary-item">
                            <span>Shipping</span>
                            <span>
                                {shippingFee === 0 ? (
                                    <span className="free-shipping">Free</span>
                                ) : (
                                    `Rs. ${shippingFee}`
                                )}
                            </span>
                        </div>

                        {shippingFee > 0 && (
                            <p className="shipping-note">
                                <i className="fas fa-info-circle"></i> Free shipping on orders above Rs. 3000
                            </p>
                        )}

                        <div className="summary-divider"></div>

                        <div className="summary-total">
                            <span>Total</span>
                            <span>Rs. {grandTotal.toLocaleString('en-PK')}</span>
                        </div>

                        <Link to="/checkout" className="btn btn-primary btn-checkout">
                            <i className="fas fa-lock"></i> Proceed to Checkout
                        </Link>

                        <Link to="/products" className="btn btn-secondary btn-continue-shopping">
                            <i className="fas fa-arrow-left"></i> Continue Shopping
                        </Link>

                        <button 
                            onClick={clearCart}
                            className="btn-clear-cart"
                        >
                            Clear Cart
                        </button>

                        {/* Security Trust Badges */}
                        <div className="trust-badges">
                            <div className="badge">
                                <i className="fas fa-shield-alt"></i>
                                <span>Secure Checkout</span>
                            </div>
                            <div className="badge">
                                <i className="fas fa-lock"></i>
                                <span>Encrypted Payment</span>
                            </div>
                            <div className="badge">
                                <i className="fas fa-check-circle"></i>
                                <span>Money Back Guarantee</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
