# Organic Herb - Premium Herbal eCommerce Website

A modern, professional, and fully responsive eCommerce website for selling premium organic herbs and herbal products in Pakistan.

## 🌿 Features

### Homepage
- **Announcement Bar**: Eye-catching banner with promotional message
- **Professional Header**: Logo, navigation menu, search functionality, and cart icon
- **Hero Section**: Large headline "Nature's Healing Touch" with call-to-action button
- **Featured Products Grid**: Display of products with images, ratings, prices, and sale badges
- **Responsive Footer**: Contact info, quick links, and social media icons

### Product Pages

#### All Products Page (`products.html`)
- Complete product catalog with grid layout
- Sort functionality (Latest, Price Low-High, Price High-Low, Product Name)
- Responsive product cards with hover effects
- Quick product information display

#### Product Details Page (`product.html`)
- **Left Side - Image Gallery**:
  - Large main product image
  - Thumbnail gallery with multiple images
  - Zoom functionality on click
  - Image navigation

- **Right Side - Product Information**:
  - Product title and ratings
  - Current and original price with discount percentage
  - Short product description
  - Key features list with checkmarks
  - Quantity selector (+ and -)
  - Add to Cart button
  - Product meta (SKU, Stock, Weight)
  - Shipping information

- **Order Form** (Below Product Details):
  - First Name & Last Name fields
  - Phone Number field
  - Address field
  - Province dropdown (Punjab, Sindh, KPK, Balochistan, Gilgit-Baltistan)
  - City field
  - Special instructions textarea

- **Related Products Section**:
  - Shows similar products from same category
  - Quick view and add to cart options

### Shopping Cart (`cart.html`)
- Complete cart items list with images and details
- Quantity adjustment buttons
- Remove item functionality
- Order Summary panel with:
  - Subtotal calculation
  - Shipping cost (Free shipping on orders above Rs. 2000)
  - Total price
  - Proceed to Checkout button

### Checkout Page (`checkout.html`)
- **Billing Information Section**:
  - First Name & Last Name
  - Email Address
  - Phone Number

- **Shipping Address Section**:
  - Street Address
  - City
  - Province (5 provinces available)
  - Country (Pakistan pre-selected)

- **Shipping Method**:
  - Free Shipping – Nationwide (5-7 business days)
  - Express Shipping (Rs. 500 - 2-3 business days)

- **Payment Method**:
  - Cash on Delivery (COD) - Default
  - Bank Transfer
  - Easypaisa / JazzCash

- **Additional Features**:
  - Special instructions/notes field
  - Terms & Conditions acceptance
  - Order Summary panel on the right
  - All items list in summary
  - Total amount calculation
  - Trust badges for security and shipping info

## 🎨 Design Features

### Color Scheme
- **Primary Green**: #2d6a3e (Professional, trustworthy)
- **Light Green**: #4a9d6f (Accent color)
- **White & Light Gray**: Clean, minimal background
- **Professional Typography**: Modern, elegant sans-serif fonts

### Responsive Design
- **Desktop**: Full-featured layout with multi-column grids
- **Tablet**: Optimized column layouts and touch-friendly buttons
- **Mobile**: Single-column layout with optimized navigation
- **Extra Small**: Simplified grid (2-column products)

## 🛒 Key Features

### Cart Management
- Real-time cart count update on header
- LocalStorage persistence (cart survives page refresh)
- Add/remove items
- Quantity adjustment
- Cart summary with price calculations

### Product Features
- High-quality product images
- Star ratings and review counts
- Sale badges on discounted items
- Detailed product information
- Related products suggestions
- Product categories and SKU tracking

### Additional Features
- **WhatsApp Floating Button**: Quick contact option
- **Search Functionality**: Search by product name, description, or category
- **Mobile Menu**: Hamburger menu for mobile devices
- **Breadcrumb Navigation**: Easy navigation tracking
- **SEO-Friendly**: Proper meta tags, semantic HTML
- **Fast Loading**: Optimized images and CSS

## 📁 File Structure

```
organic-herb/
├── index.html          # Homepage
├── products.html       # All Products Page
├── product.html        # Product Details Page
├── cart.html          # Shopping Cart Page
├── checkout.html      # Checkout Page
├── styles.css         # All styling
├── app.js             # JavaScript functionality
└── README.md          # This file
```

## 🚀 How to Use

### Starting the Website
1. Open any HTML file in a web browser
2. The website uses LocalStorage for cart management
3. No backend required (demo mode)

### Adding Products
Products are stored in the `app.js` file. To add a new product:

```javascript
{
    id: 9,
    name: "Product Name",
    price: 999,
    originalPrice: 1299,
    rating: 4.5,
    reviews: 100,
    image: "image-url",
    images: ["image-url-1", "image-url-2"],
    description: "Product description",
    features: ["Feature 1", "Feature 2"],
    sku: "ORG-009",
    stock: "In Stock",
    weight: "250g",
    category: "Category Name"
}
```

### Customize
- **Colors**: Edit CSS variables in `:root` section of `styles.css`
- **WhatsApp Number**: Update in header comments and all HTML files (currently: +923001234567)
- **Contact Info**: Update footer email and phone number
- **Shipping Settings**: Modify in checkout and cart pages

## 💳 Payment Integration

Currently set up for:
- Cash on Delivery (COD) - Default payment method
- Bank Transfer
- Easypaisa / JazzCash

For actual payment processing, integrate with:
- Stripe
- JazzCash API
- Easypaisa API
- PayPal

## 📱 Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security Notes

- Currently a demo version (no backend server)
- For production:
  - Implement backend API for order processing
  - Use SSL/HTTPS
  - Secure payment gateway integration
  - User authentication system
  - Database for orders and products
  - Email notifications

## 📊 Sample Products Included

1. Green Tea Extract
2. Turmeric Powder
3. Ginger Root Tea
4. Ashwagandha Capsules
5. Honey & Herbs Mix
6. Moringa Leaf Powder
7. Basil & Mint Blend
8. Spirulina Tablets

## ✨ Best Practices Implemented

- Clean, semantic HTML
- Mobile-first responsive design
- Efficient CSS with variables for easy customization
- Vanilla JavaScript (no dependencies)
- LocalStorage for client-side cart management
- Performance optimized (lazy loading images)
- Accessibility considerations
- Cross-browser compatibility

## 🎯 Conversion-Focused Design

- Clear CTAs throughout
- Trust badges and security indicators
- Free shipping information prominent
- Easy checkout process
- Product recommendations
- Customer ratings and reviews
- Quick contact via WhatsApp

## 📝 License

Free to use and modify for commercial or personal projects.

---

Built with ❤️ for Organic Herb - Pakistan's Premium Herbal Products

Contact: info@organicherb.com
Phone: +92-300-1234567
