import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products as initialProducts } from '../data/products';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';

export const Cosmetics = () => {
    const [searchParams] = useSearchParams();
    const searchParam = searchParams.get('search');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('featured');
    const [priceRange, setPriceRange] = useState([0, 12000]);
    const [searchQuery, setSearchQuery] = useState(searchParam || '');
    
    // Initialize products from localStorage first, fallback to initial products
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('stepnaz_products');
        return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParam) {
            setSearchQuery(searchParam);
        }
    }, [searchParam]);

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

    const cosmeticCategories = ['All', 'Treatment', 'Masks', 'Hair Care'];

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = products.filter(product => {
            // Search filter
            if (searchQuery) {
                const searchLower = searchQuery.toLowerCase();
                const nameMatch = product.name.toLowerCase().includes(searchLower);
                const categoryMatch = product.category.toLowerCase().includes(searchLower);
                const descMatch = product.description?.toLowerCase().includes(searchLower);
                if (!nameMatch && !categoryMatch && !descMatch) {
                    return false;
                }
            }

            // Show all products that are NOT Footwear
            const categoryMatch = product.category !== 'Footwear';
            const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
            return categoryMatch && priceMatch;
        });

        // Sort products
        switch (sortBy) {
            case 'price-low':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                filtered.reverse();
                break;
            default:
                break;
        }

        return filtered;
    }, [selectedCategory, sortBy, priceRange, searchQuery]);

    return (
        <div className="products-page">
            {/* Hero Banner Section */}
            <section className="hero">
                <div className="hero-background">
                    <div className="hero-overlay"></div>
                    <img src="/Images/Cosmatic.png" alt="Cosmetics Collection" className="banner-image" />
                </div>
                <div className="hero-content">
                    <h1 className="hero-title">Beauty & Personal Care</h1>
                    <p className="hero-subtitle">Experience premium quality beauty products designed for natural radiance and self-care</p>
                </div>
            </section>

            <div className="container">
                <div className="products-section">
                    {/* Sidebar Filters */}
                    <aside className="filters-sidebar">
                        <h3>Filters</h3>

                        {/* Category Filter */}
                        <div className="filter-group">
                            <h4>Category</h4>
                            <div className="filter-options">
                                {cosmeticCategories.map(category => (
                                    <label key={category} className="filter-option">
                                        <input 
                                            type="radio" 
                                            name="category"
                                            value={category}
                                            checked={selectedCategory === category}
                                            onChange={(e) => setSelectedCategory(e.target.value)}
                                        />
                                        <span>{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Filter */}
                        <div className="filter-group">
                            <h4>Price Range</h4>
                            <div className="price-range">
                                <input 
                                    type="range" 
                                    min="0" 
                                    max="12000" 
                                    value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                />
                                <span>Rs. 0 - Rs. {priceRange[1]}</span>
                            </div>
                        </div>
                    </aside>

                    {/* Products Section */}
                    <div className="products-main">
                        {/* Sort Dropdown */}
                        <div className="products-header">
                            <label htmlFor="sort">Sort by:</label>
                            <select 
                                id="sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="sort-dropdown"
                            >
                                <option value="featured">Featured</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Top Rated</option>
                                <option value="newest">Newest</option>
                            </select>
                            <span className="product-count">
                                Showing {filteredAndSortedProducts.length} products
                            </span>
                        </div>

                        {/* Products Grid */}
                        {filteredAndSortedProducts.length > 0 ? (
                            <div className="products-grid">
                                {filteredAndSortedProducts.map(product => (
                                    <div key={product.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <ProductCard product={product} />
                                        <button
                                            style={{
                                                marginTop: '10px',
                                                width: '90%',
                                                padding: '16px',
                                                border: '2px solid #222',
                                                borderRadius: '6px',
                                                background: '#fff',
                                                color: '#222',
                                                fontWeight: 'bold',
                                                fontSize: '1.2rem',
                                                cursor: 'pointer',
                                                transition: 'background 0.2s, color 0.2s',
                                            }}
                                            onClick={() => navigate('/cart')}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-products">
                                <p>No products found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="container" style={{ marginTop: '4rem' }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    fontWeight: '700',
                    marginBottom: '2rem',
                    color: '#222'
                }}>Related Products</h2>

                <div className="products-grid">
                    {filteredAndSortedProducts.slice(0, 4).map(product => (
                        <div key={product.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <ProductCard product={product} />
                            <button
                                style={{
                                    marginTop: '10px',
                                    width: '90%',
                                    padding: '16px',
                                    border: '2px solid #222',
                                    borderRadius: '6px',
                                    background: '#fff',
                                    color: '#222',
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s, color 0.2s',
                                }}
                                onClick={() => navigate('/cart')}
                            >
                                Buy Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Cosmetics;
