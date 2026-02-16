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
                    <div className="cart-items">
                        <div className="cart-header">
                            <span>Product</span>
                            <span>Price</span>
                            <span>Quantity</span>
                            <span>Total</span>
                            <span></span>
                        </div>

                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <Link to={`/product/${item.id}`} className="item-image">
                                    <img src={item.image} alt={item.name} />
                                </Link>
                                <div className="item-details">
                                    <Link to={`/product/${item.id}`} className="item-name">
                                        {item.name}
                                    </Link>
                                    <p className="item-sku">SKU: {item.sku}</p>
                                    {item.size && <p className="item-size">Size: {item.size}</p>}
                                </div>
                                <div className="item-price">
                                    Rs. {item.price.toLocaleString('en-PK')}
                                </div>
                                <div className="item-quantity">
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="qty-btn"
                                    >
                                        -
                                    </button>
                                    <input 
                                        type="number" 
                                        value={item.quantity}
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                        min="1"
                                        className="qty-input"
                                    />
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="qty-btn"
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="item-total">
                                    Rs. {(item.price * item.quantity).toLocaleString('en-PK')}
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="btn-remove"
                                    title="Remove item"
                                >
                                    <i className="fas fa-trash"></i>
                                </button>
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
