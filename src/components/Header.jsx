import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import '../styles/header.css';

export const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { getCartCount } = useCart();
    const navigate = useNavigate();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    return (
        <>
            {/* Announcement Bar */}
            <div className="announcement-bar">
                <p>✨ New Spring Collection | Free Shipping on Orders Above Rs. 3000 | Cash on Delivery Available</p>
            </div>

            {/* Header */}
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        {/* Logo */}
                        <div className="logo">
                            <Link to="/" className="logo-text">
                                StepNaz
                            </Link>
                        </div>

                        {/* Navigation Menu */}
                        <nav className="nav-menu">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/products?category=Footwear" className="nav-link">Footwear</Link>
                            <Link to="/cosmetics" className="nav-link">Cosmetics</Link>
                            <Link to="/contact" className="nav-link">Contact</Link>
                        </nav>

                        {/* Search and Cart Icons */}
                        <div className="header-icons">
                            <form className="search-box" onSubmit={handleSearch}>
                                <input 
                                    type="text" 
                                    placeholder="Search products..." 
                                    className="search-input"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="search-btn">
                                    <i className="fas fa-search"></i>
                                </button>
                            </form>
                            <Link to="/cart" className="cart-icon">
                                <i className="fas fa-shopping-cart"></i>
                                <span className="cart-count">{getCartCount()}</span>
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button 
                            className="mobile-menu-toggle"
                            onClick={toggleMobileMenu}
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                {isMobileMenuOpen && (
                    <div className="mobile-menu" id="mobile-menu">
                        <div className="mobile-menu-content">
                            {/* Navigation Links */}
                            <nav className="mobile-nav">
                                <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                    <i className="fas fa-home"></i> Home
                                </Link>
                                <Link to="/products?category=Footwear" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                    <i className="fas fa-shoe-prints"></i> Footwear
                                </Link>
                                <Link to="/cosmetics" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                    <i className="fas fa-heart"></i> Cosmetics
                                </Link>
                                <Link to="/contact" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>
                                    <i className="fas fa-envelope"></i> Contact
                                </Link>
                            </nav>

                            {/* Cart Items in Mobile Menu */}
                            <div className="mobile-cart-section">
                                <h3 className="mobile-cart-title">
                                    <i className="fas fa-shopping-bag"></i> My Bag ({getCartCount()})
                                </h3>
                                <Link to="/cart" className="btn-view-cart" onClick={() => setIsMobileMenuOpen(false)}>
                                    <i className="fas fa-arrow-right"></i> View Full Cart
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;
