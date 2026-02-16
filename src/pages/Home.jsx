import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products as initialProducts } from '../data/products';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';
import '../styles/pages.css';

export const Home = () => {
    // Initialize products from localStorage first, fallback to initial products
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('stepnaz_products');
        return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    });

    // Load products from Firestore in background
    useEffect(() => {
        const loadProducts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'products'));
                const firestoreProducts = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                if (firestoreProducts.length > 0) {
                    setProducts(firestoreProducts);
                    localStorage.setItem('stepnaz_products', JSON.stringify(firestoreProducts));
                } else {
                    const savedProducts = localStorage.getItem('stepnaz_products');
                    if (savedProducts) {
                        setProducts(JSON.parse(savedProducts));
                    }
                }
            } catch (error) {
                console.error('Error loading from Firestore:', error);
                const savedProducts = localStorage.getItem('stepnaz_products');
                if (savedProducts) {
                    setProducts(JSON.parse(savedProducts));
                }
            }
        };
        loadProducts();
    }, []);

    const footwearProducts = products.filter(product => product.category === 'Footwear');
    const cosmeticsProducts = products.filter(product => product.category !== 'Footwear');
    const footwearSubcategories = ['Heeled Chappal', 'Sandal Chappal', 'Flat Chappal'];
    const cosmeticsSubcategories = ['Treatment', 'Masks', 'Hair Care'];


    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-background">
                    <div className="hero-overlay"></div>
                    <img src="/Images/Banner.jpeg" alt="StepNaz Footwear Collection" className="banner-image" />
                </div>
                <div className="hero-content">
                    <h1 className="hero-title">Step Into Elegance</h1>
                    <p className="hero-subtitle">Discover our curated collection of premium footwear designed for the modern woman</p>
                    <Link to="/products" className="btn btn-primary">Shop Collection</Link>
                </div>
            </section>

            {/* Footwear Collection */}
            <section className="featured-products">
                <div className="container">
                    <div className="section-header">
                        <h2>Footwear Collection</h2>
                        <p>Explore our signature chappal styles crafted for elegance and comfort</p>
                    </div>

                    <div className="subcategory-pills">
                        {footwearSubcategories.map((subcategory) => (
                            <span key={subcategory} className="subcategory-pill">{subcategory}</span>
                        ))}
                    </div>

                    <div className="products-grid">
                        {footwearProducts.map(product => (
                            <ProductCard key={product.id} product={product} showAddButton={false} />
                        ))}
                    </div>

                    <div className="section-cta">
                        <Link to="/products?category=Footwear" className="btn btn-secondary">View Footwear</Link>
                    </div>
                </div>
            </section>

            {/* Cosmetics Collection */}
            <section className="featured-products">
                <div className="container">
                    <div className="section-header">
                        <h2>Cosmetics Collection</h2>
                        <p>Premium beauty essentials designed for glow, care, and confidence</p>
                    </div>

                    <div className="subcategory-pills">
                        {cosmeticsSubcategories.map((subcategory) => (
                            <span key={subcategory} className="subcategory-pill">{subcategory}</span>
                        ))}
                    </div>

                    <div className="products-grid">
                        {cosmeticsProducts.map(product => (
                            <ProductCard key={product.id} product={product} showAddButton={false} />
                        ))}
                    </div>

                    <div className="section-cta">
                        <Link to="/cosmetics" className="btn btn-secondary">View Cosmetics</Link>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="why-choose-us">
                <div className="container">
                    <h2>Why Choose StepNaz</h2>
                    <div className="benefits-grid">
                        <div className="benefit-card">
                            <i className="fas fa-shipping-fast"></i>
                            <h3>Free Shipping</h3>
                            <p>On orders above Rs. 3000</p>
                        </div>
                        <div className="benefit-card">
                            <i className="fas fa-lock"></i>
                            <h3>Secure Payment</h3>
                            <p>Safe and encrypted transactions</p>
                        </div>
                        <div className="benefit-card">
                            <i className="fas fa-undo"></i>
                            <h3>Easy Returns</h3>
                            <p>15-day return policy</p>
                        </div>
                        <div className="benefit-card">
                            <i className="fas fa-headset"></i>
                            <h3>24/7 Support</h3>
                            <p>Customer service always available</p>
                        </div>
                    </div>
                    
                </div>
            </section>

        </div>
    );
};

export default Home;
