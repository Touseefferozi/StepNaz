import React, { createContext, useState, useEffect, useCallback } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            if (typeof window === 'undefined' || !window.localStorage) return [];
            const savedCart = localStorage.getItem('cart');
            if (!savedCart) return [];
            // Avoid attempting to parse extremely large payloads
            const MAX_PARSE_LENGTH = 5 * 1024 * 1024; // 5MB
            if (savedCart.length > MAX_PARSE_LENGTH) {
                console.warn('CartContext: stored cart is too large to parse, ignoring localStorage cart');
                return [];
            }
            return JSON.parse(savedCart);
        } catch (err) {
            console.error('CartContext: failed to read cart from localStorage', err);
            return [];
        }
    });
    
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        try {
            if (typeof window === 'undefined' || !window.localStorage) return;

            // Pre-serialize and check size to avoid immediate QuotaExceededError
            const serialized = JSON.stringify(cart);
            const SIZE_THRESHOLD = 1024 * 1024; // 1MB conservative threshold

            if (serialized.length <= SIZE_THRESHOLD) {
                localStorage.setItem('cart', serialized);
                return;
            }

            // If too large, try saving a reduced representation first
            const reducedCart = cart.map(item => {
                const { images, relatedImages, description, longDescription, reviews, ...keep } = item;
                return keep;
            });

            const reducedSerialized = JSON.stringify(reducedCart);
            if (reducedSerialized.length <= SIZE_THRESHOLD) {
                localStorage.setItem('cart', reducedSerialized);
                console.warn('CartContext: saved reduced cart to localStorage to avoid quota');
                return;
            }

            // If reduced still too large, try sessionStorage as fallback
            if (typeof window !== 'undefined' && window.sessionStorage) {
                try {
                    sessionStorage.setItem('cart', reducedSerialized);
                    console.warn('CartContext: saved reduced cart to sessionStorage as final fallback');
                } catch (err3) {
                    console.error('CartContext: failed to save cart in sessionStorage', err3);
                }
            }

        } catch (err) {
            console.error('CartContext: failed to save cart to storage', err);
        }
    }, [cart]);

    const addToCart = useCallback((product, quantity = 1, size = null) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => 
                item.id === product.id && item.size === size
            );
            
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity, size }];
            }
        });
        setIsCartOpen(true); // Open cart sidebar when item added
    }, []);

    const removeFromCart = useCallback((productId, size = null) => {
        setCart(prevCart => prevCart.filter(item => 
            !(item.id === productId && item.size === size)
        ));
    }, []);

    const updateQuantity = useCallback((productId, quantity, size = null) => {
        if (quantity <= 0) {
            removeFromCart(productId, size);
        } else {
            setCart(prevCart =>
                prevCart.map(item =>
                    item.id === productId && item.size === size
                        ? { ...item, quantity }
                        : item
                )
            );
        }
    }, [removeFromCart]);

    const clearCart = useCallback(() => {
        setCart([]);
    }, []);

    const getCartTotal = useCallback(() => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [cart]);

    const getCartCount = useCallback(() => {
        return cart.reduce((count, item) => count + item.quantity, 0);
    }, [cart]);

    const openCart = useCallback(() => {
        setIsCartOpen(true);
    }, []);

    const closeCart = useCallback(() => {
        setIsCartOpen(false);
    }, []);

    const value = {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isCartOpen,
        openCart,
        closeCart
    };

    return (
        <CartContext.Provider value={value}>
            <ErrorBoundary>
                {children}
            </ErrorBoundary>
        </CartContext.Provider>
    );
};
