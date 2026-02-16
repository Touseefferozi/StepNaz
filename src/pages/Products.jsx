import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products as initialProducts } from '../data/products';
import ProductCard from '../components/ProductCard';
import '../styles/pages.css';

export const Products = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'All');
    const [sortBy, setSortBy] = useState('featured');
    const [priceRange, setPriceRange] = useState([0, 12000]);
    const [searchQuery, setSearchQuery] = useState(searchParam || '');
    
    // Initialize products from localStorage first, fallback to initial products
    const [products, setProducts] = useState(() => {
        const savedProducts = localStorage.getItem('stepnaz_products');
        return savedProducts ? JSON.parse(savedProducts) : initialProducts;
    });

    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
        if (searchParam) {
            setSearchQuery(searchParam);
        }
    }, [categoryParam, searchParam]);

    // Listen for localStorage changes
    useEffect(() => {
        const handleStorageChange = () => {
            const savedProducts = localStorage.getItem('stepnaz_products');
            if (savedProducts) {
                setProducts(JSON.parse(savedProducts));
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const categories = ['All', 'Heeled Chappal', 'Sandal Chappal', 'Flat Chappal'];

    const getFootwearType = (product) => {
        const name = product.name.toLowerCase();

        if (name.includes('heel') || name.includes('heeled')) {
            return 'Heeled Chappal';
        }

        if (name.includes('sandal')) {
            return 'Sandal Chappal';
        }

        if (name.includes('flat') || name.includes('slipper')) {
            return 'Flat Chappal';
        }

        return 'Flat Chappal';
    };

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
            
            // FIX: Show all categories when 'All' is selected
            const categoryMatch = selectedCategory === 'All'
                ? true
                : product.category === 'Footwear' && getFootwearType(product) === selectedCategory;
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

    const relatedImages = useMemo(() => {
        const relatedFromFiltered = filteredAndSortedProducts
            .flatMap(product => Array.isArray(product.relatedImages) ? product.relatedImages : [])
            .filter(Boolean);

        const relatedFromAllProducts = products
            .flatMap(product => Array.isArray(product.relatedImages) ? product.relatedImages : [])
            .filter(Boolean);

        const uniqueRelated = Array.from(new Set([...relatedFromFiltered, ...relatedFromAllProducts]));
        if (uniqueRelated.length >= 4) {
            return uniqueRelated.slice(0, 4);
        }

        const primaryImages = filteredAndSortedProducts
            .map(product => product.image)
            .filter(Boolean);

        const fallbackImages = products
            .map(product => product.image)
            .filter(Boolean);

        const combined = Array.from(new Set([...uniqueRelated, ...primaryImages, ...fallbackImages]));
        return combined.slice(0, 4);
    }, [filteredAndSortedProducts, products]);

    return (
        <div className="products-page">
            {/* Hero Banner Section */}
            <section className="hero">
                <div className="hero-background">
                    <div className="hero-overlay"></div>
                    <img src="/Images/Banner.jpeg" alt="Footwear Collection" className="banner-image" />
                </div>
                <div className="hero-content">
                    <h1 className="hero-title">Our Premium Collection</h1>
                    <p className="hero-subtitle">Discover our curated selection of premium footwear designed for style and comfort</p>
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
                                {categories.map(category => (
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
                                    className="price-slider"
                                />
                                <div className="price-display">
                                    Rs. 0 - Rs. {priceRange[1].toLocaleString('en-PK')}
                                </div>
                            </div>
                        </div>

                        {/* Reset Filters */}
                        <button 
                            className="btn-reset-filters"
                            onClick={() => {
                                setSelectedCategory('All');
                                setPriceRange([0, 12000]);
                                setSortBy('featured');
                            }}
                        >
                            Reset Filters
                        </button>
                    </aside>

                    {/* Products List */}
                    <div className="products-list">
                        {/* Sort Options */}
                        <div className="sort-options">
                            <label>
                                Sort by:
                                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <option value="featured">Featured</option>
                                    <option value="newest">Newest</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="rating">Highest Rated</option>
                                </select>
                            </label>
                            <span className="product-count">
                                Showing {filteredAndSortedProducts.length} products
                            </span>
                        </div>

                        {/* Products Grid */}
                        {filteredAndSortedProducts.length > 0 ? (
                            <div className="products-grid">
                                {filteredAndSortedProducts.map(product => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="no-products">
                                <p>No products found matching your criteria.</p>
                            </div>
                        )}
                    </div>

                    {/* Related Images Sidebar */}
                    <aside className="related-images-sidebar">
                        <h3>Related Images</h3>
                        <div className="related-images-grid">
                            {relatedImages.map((image, index) => (
                                <div key={`${image}-${index}`} className="related-image-card">
                                    <img src={image} alt="Related product" loading="lazy" />
                                </div>
                            ))}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Products;
