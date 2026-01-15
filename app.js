// ============================================
// ORGANIC HERB - ECOMMERCE WEBSITE
// JavaScript Functionality
// ============================================

// Global function to view product details
function viewProductDetails(productId) {
    if (productId) {
        window.location.href = `product.html?id=${productId}`;
    }
}

// Product Database
const products = [
    {
        id: 1,
        name: "Pure Shababi capsules",
        price: 1999,
        originalPrice: 2999,
        rating: 4.5,
        reviews: 45,
        image: "Images/WhatsApp Image 2026-01-14 at 7.33.48 PM.jpeg",
        images: [
            "Images/WhatsApp Image 2026-01-14 at 7.33.49 PM.jpeg",
            "Images/WhatsApp Image 2026-01-14 at 7.33.48 PM.jpeg",
            "Images/WhatsApp Image 2026-01-14 at 7.33.50 PM (1).jpeg",
            "Images/WhatsApp Image 2026-01-14 at 7.33.48 PM.jpeg"
        ],
        description: "Pure Shababi capsules with anti-inflammatory properties. Sourced directly from certified organic farms.",
        features: ["100% Organic", "Anti-inflammatory", "No Additives", "Premium Quality"],
        sku: "ORG-001",
        stock: "In Stock",
        weight: "250g",
        category: "Powder"
    },
    {
        id: 2,
        name: "Dried Ginger Root",
        price: 599,
        originalPrice: 799,
        rating: 4.8,
        reviews: 38,
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&h=500&fit=crop"
        ],
        description: "Natural ginger root for digestion and immunity. Perfect for brewing warm tea or adding to recipes.",
        features: ["Aids Digestion", "Boosts Immunity", "Naturally Dried", "Pure & Fresh"],
        sku: "ORG-002",
        stock: "In Stock",
        weight: "200g",
        category: "Dried Herbs"
    },
    {
        id: 3,
        name: "Organic Green Tea",
        price: 749,
        originalPrice: 999,
        rating: 4.6,
        reviews: 52,
        image: "https://images.unsplash.com/photo-1599599810956-72f370c859d1?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1599599810956-72f370c859d1?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1599599810956-72f370c859d1?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1599599810956-72f370c859d1?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1599599810956-72f370c859d1?w=500&h=500&fit=crop"
        ],
        description: "Pure green tea leaves for energy and wellness. Rich in antioxidants for optimal health benefits.",
        features: ["Rich in Antioxidants", "Energy Boosting", "100% Organic", "No Additives"],
        sku: "ORG-003",
        stock: "In Stock",
        weight: "150g",
        category: "Tea"
    },
    {
        id: 4,
        name: "Dried Holy Basil (Tulsi)",
        price: 899,
        originalPrice: 1299,
        rating: 4.7,
        reviews: 41,
        image: "Images/WhatsApp Image 2026-01-14 at 7.33.48 PM.jpeg",
        images: [
            "Images/WhatsApp Image 2026-01-14 at 7.33.48 PM.jpeg",
            "Images/WhatsApp Image 2026-01-14 at 7.33.48 PM.jpeg",
            "Images/WhatsApp Image 2026-01-14 at 7.33.48 PM.jpeg",
            "Images/WhatsApp Image 2026-01-14 at 7.33.48 PM.jpeg"
        ],
        description: "Traditional medicinal herb for immunity boost. Holy Basil is revered in Ayurvedic medicine for its wellness properties.",
        features: ["Immunity Booster", "Medicinal Herb", "Traditional", "Certified Organic"],
        sku: "ORG-004",
        stock: "In Stock",
        weight: "100g",
        category: "Medicinal Herbs"
    },
    {
        id: 5,
        name: "Premium Cinnamon Sticks",
        price: 749,
        originalPrice: 999,
        rating: 4.5,
        reviews: 35,
        image: "https://images.unsplash.com/photo-1599599810956-72f370c859d1?w=500&h=500&fit=crop",
        images: [
            "https://images.unsplash.com/photo-1599599810956-72f370c859d1?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1599599810956-72f370c859d1?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1599599810956-72f370c859d1?w=500&h=500&fit=crop",
            "https://images.unsplash.com/photo-1599599810956-72f370c859d1?w=500&h=500&fit=crop"
        ],
        description: "Ceylon cinnamon for blood sugar control. Premium quality sticks perfect for tea, cooking, or decoration.",
        features: ["Blood Sugar Control", "Ceylon Quality", "Aromatic", "Versatile Use"],
        sku: "ORG-005",
        stock: "In Stock",
        weight: "100g",
        category: "Spices"
    },
    {
        id: 6,
        name: "Dried Peppermint Leaves",
        price: 599,
        originalPrice: 799,
        rating: 4.8,
        reviews: 48,
        image: "Images/WhatsApp Image 2026-01-14 at 7.33.48 PM.jpeg",
        images: [
            "Images/WhatsApp Image 2026-01-14 at 7.33.48 PM.jpeg",
            "Images/WhatsApp Image 2026-01-14 at 7.33.48 PM.jpeg",
            "Images/WhatsApp Image 2026-01-14 at 7.33.48 PM.jpeg",
            "Images/WhatsApp Image 2026-01-14 at 7.33.48 PM.jpeg"
        ],
        description: "Refreshing mint for digestion and freshness. Naturally dried peppermint leaves with vibrant aroma.",
        features: ["Aids Digestion", "Refreshing Aroma", "Naturally Dried", "Pure Leaves"],
        sku: "ORG-006",
        stock: "In Stock",
        weight: "80g",
        category: "Herbs"
    }
];

// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update Cart Count
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(el => el.textContent = count);
}

// Add to Cart
function addToCart() {
    const productId = parseInt(new URLSearchParams(window.location.search).get('id') || 1);
    const quantity = parseInt(document.getElementById('quantity')?.value || 1);
    const product = products.find(p => p.id === productId);
    
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    alert(`${product.name} added to cart!`);
    
    // Optionally redirect to cart
    // window.location.href = 'cart.html';
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCart();
}

// Update Cart Quantity
function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, quantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        loadCart();
    }
}

// Quantity Controls on Product Page
function increaseQuantity() {
    const input = document.getElementById('quantity');
    input.value = Math.max(1, parseInt(input.value) + 1);
    updateProductPrice();
}

function decreaseQuantity() {
    const input = document.getElementById('quantity');
    input.value = Math.max(1, parseInt(input.value) - 1);
    updateProductPrice();
}

// Update Product Price based on Quantity
function updateProductPrice() {
    const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(quantityInput.value) || 1;
    
    // Get the current product price from the page
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id')) || 1;
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Calculate totals
    const subtotal = product.price * quantity;
    const total = subtotal; // No shipping or VAT
    
    // Update display
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('total-price');
    
    if (subtotalEl) subtotalEl.textContent = `Rs. ${subtotal.toLocaleString('en-PK')}`;
    if (totalEl) totalEl.textContent = `Rs. ${total.toLocaleString('en-PK')}`;
}

// Change Main Image
function changeMainImage(thumbnail) {
    const mainImage = document.getElementById('main-image');
    const src = thumbnail.querySelector('img').src;
    mainImage.src = src;
    
    // Update active state
    document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
}

// Image Zoom
document.addEventListener('DOMContentLoaded', function() {
    const mainImage = document.getElementById('main-image');
    const modal = document.getElementById('zoom-modal');
    const zoomedImage = document.getElementById('zoomed-image');
    const closeBtn = document.querySelector('.close');

    if (mainImage) {
        mainImage.addEventListener('click', function() {
            modal.classList.add('show');
            zoomedImage.src = this.src;
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.classList.remove('show');
        });
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
});

// Render Products Grid
function renderProducts(productsToRender = products) {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    grid.innerHTML = productsToRender.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.originalPrice > product.price ? `<span class="product-badge">Sale</span>` : ''}
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</div>
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-pricing">
                    <span class="product-price">Rs. ${product.price.toLocaleString('en-PK')}</span>
                    ${product.originalPrice > product.price ? `<span class="original-price">Rs. ${product.originalPrice.toLocaleString('en-PK')}</span>` : ''}
                </div>
                <button class="btn-view-details" onclick="viewProductDetails(${product.id})">
                    View Details
                </button>
            </div>
        </div>
    `).join('');
}

// Load Product Details
function loadProductDetails() {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id')) || 1;
    const product = products.find(p => p.id === productId);

    if (!product) return;

    // Update page content
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-price').textContent = `Rs. ${product.price.toLocaleString('en-PK')}`;
    document.getElementById('product-original-price').textContent = `Rs. ${product.originalPrice.toLocaleString('en-PK')}`;
    document.getElementById('discount-badge').textContent = `-${Math.round((product.originalPrice - product.price) / product.originalPrice * 100)}%`;
    document.getElementById('product-description').textContent = product.description;
    
    // Update features
    const featuresHtml = product.features.map(f => `<li>${f}</li>`).join('');
    document.getElementById('product-features').innerHTML = featuresHtml;

    // Update meta information
    document.getElementById('product-sku').textContent = product.sku;
    document.getElementById('product-stock').textContent = product.stock;
    document.getElementById('product-weight').textContent = product.weight;
    document.getElementById('breadcrumb-product').textContent = product.name;

    // Update images
    const mainImage = document.getElementById('main-image');
    mainImage.src = product.images[0];
    
    const thumbnailGallery = document.querySelector('.thumbnail-gallery');
    thumbnailGallery.innerHTML = product.images.map((img, index) => `
        <div class="thumbnail ${index === 0 ? 'active' : ''}" onclick="changeMainImage(this)">
            <img src="${img}" alt="Thumbnail ${index + 1}">
        </div>
    `).join('');

    // Load related products
    const relatedProducts = products.filter(p => 
        p.id !== productId && p.category === product.category
    ).slice(0, 4);
    
    if (relatedProducts.length === 0) {
        // If no related products in same category, show random products
        const otherProducts = products.filter(p => p.id !== productId).slice(0, 4);
        renderRelatedProducts(otherProducts);
    } else {
        renderRelatedProducts(relatedProducts);
    }
}

// Render Related Products
function renderRelatedProducts(productsToRender) {
    const grid = document.getElementById('related-products-grid');
    if (!grid) return;

    grid.innerHTML = productsToRender.map(product => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.originalPrice > product.price ? `<span class="sale-badge">Sale</span>` : ''}
            </div>
            <div class="product-body">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">${'★'.repeat(Math.floor(product.rating))}${'☆'.repeat(5 - Math.floor(product.rating))}</div>
                    <span class="rating-count">(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">Rs. ${product.price.toLocaleString('en-PK')}</span>
                    ${product.originalPrice > product.price ? `<span class="original-price">Rs. ${product.originalPrice.toLocaleString('en-PK')}</span>` : ''}
                </div>
                <a href="product.html?id=${product.id}" class="btn btn-primary">View Details</a>
            </div>
        </div>
    `).join('');
}

// Load Cart Page
function loadCart() {
    const cartList = document.getElementById('cart-items-list');
    const emptyCart = document.getElementById('empty-cart');
    
    if (!cartList) return;

    if (cart.length === 0) {
        cartList.innerHTML = '';
        emptyCart.style.display = 'block';
        updateOrderSummary();
        return;
    }

    emptyCart.style.display = 'none';
    cartList.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">Rs. ${item.price.toLocaleString('en-PK')}</div>
                <div class="cart-item-quantity">
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity - 1})">−</button>
                    <input type="number" value="${item.quantity}" readonly>
                    <button onclick="updateCartQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <div class="cart-item-actions">
                <div style="font-weight: bold; color: var(--primary-green);">Rs. ${(item.price * item.quantity).toLocaleString('en-PK')}</div>
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    updateOrderSummary();
}

// Update Order Summary
function updateOrderSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 2000 ? 0 : 0; // Free shipping always in this demo
    const total = subtotal + shipping;

    const subtotalEl = document.getElementById('subtotal');
    const shippingEl = document.getElementById('shipping-cost');
    const totalEl = document.getElementById('total-price');
    const checkoutSubtotalEl = document.getElementById('checkout-subtotal');
    const checkoutShippingEl = document.getElementById('checkout-shipping');
    const checkoutTotalEl = document.getElementById('checkout-total');

    if (subtotalEl) subtotalEl.textContent = `Rs. ${subtotal.toLocaleString('en-PK')}`;
    if (shippingEl) shippingEl.textContent = shipping > 0 ? `Rs. ${shipping.toLocaleString('en-PK')}` : 'Free';
    if (totalEl) totalEl.textContent = `Rs. ${total.toLocaleString('en-PK')}`;
    
    if (checkoutSubtotalEl) checkoutSubtotalEl.textContent = `Rs. ${subtotal.toLocaleString('en-PK')}`;
    if (checkoutShippingEl) checkoutShippingEl.textContent = shipping > 0 ? `Rs. ${shipping.toLocaleString('en-PK')}` : 'Free';
    if (checkoutTotalEl) checkoutTotalEl.textContent = `Rs. ${total.toLocaleString('en-PK')}`;

    // Load checkout items
    loadCheckoutItems();
}

// Load Checkout Items
function loadCheckoutItems() {
    const checkoutItems = document.getElementById('checkout-items');
    if (!checkoutItems) return;

    checkoutItems.innerHTML = cart.map(item => `
        <div class="order-item">
            <div>
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-qty">Quantity: ${item.quantity}</div>
            </div>
            <div class="order-item-price">Rs. ${(item.price * item.quantity).toLocaleString('en-PK')}</div>
        </div>
    `).join('');
}

// Handle Checkout Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                firstName: document.getElementById('checkout-first-name').value,
                lastName: document.getElementById('checkout-last-name').value,
                email: document.getElementById('checkout-email').value,
                phone: document.getElementById('checkout-phone').value,
                address: document.getElementById('checkout-address').value,
                city: document.getElementById('checkout-city').value,
                province: document.getElementById('checkout-province').value,
                country: document.getElementById('checkout-country').value,
                shipping: document.querySelector('input[name="shipping"]:checked').value,
                payment: document.querySelector('input[name="payment"]:checked').value,
                notes: document.getElementById('checkout-notes').value
            };

            // Save order
            const order = {
                id: Date.now(),
                date: new Date().toLocaleDateString('en-PK'),
                items: cart,
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                status: 'Pending'
            };

            // Save to localStorage
            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));

            // Send email notification to backend
            sendOrderEmailToBackend(order, formData);

            // Clear cart
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));

            // Show success message
            alert('Order placed successfully! Order ID: ' + order.id + '\n\nWe will contact you soon at ' + formData.phone + '\n\nOrder confirmation email is being sent to your email and our team.');
            
            // Redirect to home
            window.location.href = 'index.html';
        });
    }

    // Handle Order Form on Product Page
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // This is for the product page order form
            // Just redirect to checkout with the product in cart
            const productId = parseInt(new URLSearchParams(window.location.search).get('id') || 1);
            const quantity = parseInt(document.getElementById('quantity')?.value || 1);
            const product = products.find(p => p.id === productId);
            
            if (product) {
                addToCart();
                window.location.href = 'checkout.html';
            }
        });
    }
});

// Sort Products
document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            let sortedProducts = [...products];
            
            switch(this.value) {
                case 'price-low':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-high':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'name':
                    sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                    break;
                default:
                    sortedProducts = products;
            }
            
            renderProducts(sortedProducts);
        });
    }
});

// Search Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInputs = document.querySelectorAll('.search-input');
    const searchBtns = document.querySelectorAll('.search-btn');

    searchBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const query = input.value.toLowerCase();
            
            if (query.trim() === '') {
                renderProducts(products);
                return;
            }

            const filtered = products.filter(p => 
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );

            if (document.getElementById('products-grid')) {
                renderProducts(filtered);
            }
        });
    });

    // Search on Enter key
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                this.nextElementSibling.click();
            }
        });
    });
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'none' ? 'flex' : 'none';
        });
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Check if on checkout page
    const isCheckoutPage = window.location.pathname.includes('checkout.html') || 
                          window.location.href.includes('checkout.html');
    
    // Check if on cart page
    const isCartPage = window.location.pathname.includes('cart.html') || 
                      window.location.href.includes('cart.html');
    
    // Load cart or update order summary based on page
    if (isCheckoutPage) {
        loadCheckoutItems();
        updateOrderSummary();
    } else if (isCartPage) {
        loadCart();
    } else {
        loadCart();
    }
    
    loadProductDetails();
    
    // Render products only on products page, not homepage
    const productsGrid = document.getElementById('products-grid');
    const isProductsPage = window.location.pathname.includes('products.html') || 
                          window.location.href.includes('products.html');
    
    if (productsGrid && isProductsPage) {
        renderProducts();
    }

    // Add event listeners to View Details buttons after a short delay
    setTimeout(function() {
        attachViewDetailsListeners();
    }, 200);
});

// Function to attach event listeners to View Details buttons
function attachViewDetailsListeners() {
    const viewDetailsButtons = document.querySelectorAll('.btn-view-details');
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            if (productId) {
                window.location.href = `product.html?id=${productId}`;
            }
        });
    });
}

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const phone = document.getElementById('contact-phone').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;
            
            // Create WhatsApp message
            const whatsappMessage = `Hello SehatHerb,%0A%0AName: ${name}%0AEmail: ${email}%0APhone: ${phone}%0ASubject: ${subject}%0AMessage: ${message}`;
            
            // Open WhatsApp
            window.open(`https://wa.me/923040105467?text=${whatsappMessage}`, '_blank');
            
            // Reset form
            contactForm.reset();
            
            // Show success message
            alert('Thank you for reaching out! Opening WhatsApp to send your message.');
        });
    }

    // FAQ Toggle Functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            faqItem.classList.toggle('active');
        });
    });

    // Payment Method Toggle
    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const codDetails = document.getElementById('cod-details');
    const easypaisaDetails = document.getElementById('easypaisa-details');
    const bankDetails = document.getElementById('bank-details');

    if (paymentRadios.length > 0) {
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'cod') {
                    if (codDetails) codDetails.style.display = 'block';
                    if (easypaisaDetails) easypaisaDetails.style.display = 'none';
                    if (bankDetails) bankDetails.style.display = 'none';
                } else if (this.value === 'easypaisa-jazzcash') {
                    if (codDetails) codDetails.style.display = 'none';
                    if (easypaisaDetails) easypaisaDetails.style.display = 'block';
                    if (bankDetails) bankDetails.style.display = 'none';
                } else if (this.value === 'bank') {
                    if (codDetails) codDetails.style.display = 'none';
                    if (easypaisaDetails) easypaisaDetails.style.display = 'none';
                    if (bankDetails) bankDetails.style.display = 'block';
                }
            });
        });
    }
});

// ============================================
// EMAIL NOTIFICATION FUNCTION
// ============================================

function sendOrderEmailToBackend(order, customerData) {
    try {
        // Try to send to backend server
        const emailPayload = {
            orderData: order,
            customerData: customerData
        };

        // Try local backend first (production server)
        fetch('http://localhost:3001/send-order-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailPayload)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Email sent via backend:', data);
        })
        .catch(error => {
            console.log('Backend not available, trying FormSubmit...');
            // Fallback to FormSubmit service
            sendEmailViaFormSubmit(order, customerData);
        });

    } catch (error) {
        console.error('Error sending order email:', error);
        // Fallback to FormSubmit
        sendEmailViaFormSubmit(order, customerData);
    }
}

// Fallback Email Service using FormSubmit.co
function sendEmailViaFormSubmit(order, customerData) {
    try {
        const itemsList = order.items.map(item => 
            `${item.name} (Qty: ${item.quantity}) - Rs. ${item.price * item.quantity}`
        ).join('%0A');

        const emailMessage = `
NEW ORDER RECEIVED%0A
========================%0A
Order ID: ${order.id}%0A
Date: ${order.date}%0A
Status: ${order.status}%0A
%0A
CUSTOMER INFO%0A
Name: ${customerData.firstName} ${customerData.lastName}%0A
Email: ${customerData.email}%0A
Phone: ${customerData.phone}%0A
%0A
ITEMS%0A
${itemsList}%0A
%0A
Total: Rs. ${order.total}%0A
Payment: ${customerData.payment}%0A
Shipping: ${customerData.shipping}
        `;

        const formData = new FormData();
        formData.append('email', 'touseefbashir919@gmail.com');
        formData.append('subject', `New Order - ID: ${order.id}`);
        formData.append('message', emailMessage);

        fetch('https://formsubmit.co/ajax/touseefbashir919@gmail.com', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Email sent via FormSubmit:', data);
        })
        .catch(error => {
            console.error('FormSubmit error:', error);
            storeEmailInQueue(order, customerData);
        });

    } catch (error) {
        console.error('FormSubmit error:', error);
        storeEmailInQueue(order, customerData);
    }
}

// Store email in queue for manual processing
function storeEmailInQueue(order, customerData) {
    try {
        let emailQueue = JSON.parse(localStorage.getItem('pendingEmails')) || [];
        emailQueue.push({
            timestamp: new Date().toISOString(),
            order: order,
            customer: customerData
        });
        localStorage.setItem('pendingEmails', JSON.stringify(emailQueue));
        console.log('Email queued for manual sending:', emailQueue.length, 'pending emails');
    } catch (error) {
        console.error('Error storing email in queue:', error);
    }
}

