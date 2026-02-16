# StepNaz - React E-Commerce Store

A modern, fully responsive e-commerce platform for premium footwear and cosmetics, built with **React 18**, **React Router**, **Vite**, and **Context API**.

## 🎯 Features

- ✨ **Modern React Architecture** - Functional components with hooks
- 🛒 **Complete Shopping Experience** - Browse, search, filter, cart, and checkout
- 🎨 **Responsive Design** - Mobile-first approach, works on all devices
- 💾 **Local Storage** - Persistent cart management
- 🔄 **Context API** - Centralized state management
- 📦 **Product Management** - Detailed product pages with images gallery
- 🔍 **Advanced Filtering** - Filter by category and price range
- 📧 **Contact Form** - Integrated with backend email service
- 🚀 **Fast Performance** - Built with Vite for optimal performance

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Start Development Server**
```bash
npm run dev
```
The app will open at `http://localhost:5173`

3. **Start Backend Server** (in another terminal)
```bash
npm run server:dev
```
Backend runs on `http://localhost:5000`

4. **Build for Production**
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation & Cart
│   ├── Footer.jsx          # Footer section
│   └── ProductCard.jsx     # Product display component
├── pages/
│   ├── Home.jsx            # Homepage with hero & featured products
│   ├── Products.jsx        # Products listing with filters
│   ├── ProductDetail.jsx   # Single product page
│   ├── Cart.jsx            # Shopping cart
│   ├── Checkout.jsx        # Checkout form
│   └── Contact.jsx         # Contact page with form
├── context/
│   └── CartContext.jsx     # Cart state management
├── hooks/
│   └── useCart.js          # Custom hook for cart operations
├── data/
│   └── products.js         # Product database
├── styles/
│   ├── index.css           # Global styles
│   ├── header.css          # Header styles
│   ├── footer.css          # Footer styles
│   ├── product-card.css    # Product card styles
│   └── pages.css           # Page-specific styles
├── App.jsx                 # Main app component with routes
├── main.jsx                # React entry point
└── App.css                 # App-level styles
```

## 🎨 Color Scheme

- **Primary**: `#2c2c2c` (Dark Gray)
- **Secondary**: `#8b7355` (Brown)
- **Accent Gold**: `#d4af37` (Gold)
- **Light Gray**: `#f5f5f4` (Off-white)

## 🔧 Key Technologies

- **React 18** - UI framework
- **React Router v6** - Client-side routing
- **Vite** - Build tool & dev server
- **Context API** - State management
- **CSS3** - Styling with variables
- **Font Awesome 6** - Icons
- **Google Fonts** - Typography

## 📱 Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Homepage with featured products |
| `/products` | Products | All products with filters |
| `/footwear` | Products | Filter by footwear category |
| `/cosmetics` | Products | Filter by cosmetics category |
| `/product/:id` | ProductDetail | Single product page |
| `/cart` | Cart | Shopping cart |
| `/checkout` | Checkout | Order checkout |
| `/contact` | Contact | Contact form & FAQ |

## 🛒 Cart Management

The cart is managed through **Context API** and persists to **localStorage**:

```jsx
import { useCart } from './hooks/useCart';

function MyComponent() {
  const { cart, addToCart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  
  // Use cart state and methods
}
```

### Cart Operations

- `addToCart(product, quantity)` - Add item to cart
- `removeFromCart(productId)` - Remove item from cart
- `updateQuantity(productId, quantity)` - Update item quantity
- `getCartTotal()` - Get total price
- `getCartCount()` - Get number of items
- `clearCart()` - Empty the cart

## 🔌 Backend Integration

The app connects to an Express backend for:

- **Email Notifications** - Order confirmations via nodemailer
- **Contact Messages** - Save and send contact inquiries

Backend endpoints:
- `POST /send-order-email` - Process orders
- `POST /send-contact-email` - Send contact messages

## 📦 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000
```

Backend `.env` file:

```env
PORT=5000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

## 🎯 Product Data Structure

```javascript
{
  id: 1,
  name: "Product Name",
  price: 1999,
  originalPrice: 2999,
  rating: 4.5,
  reviews: 45,
  image: "path/to/image.jpg",
  images: ["image1", "image2", "image3"],
  description: "Product description",
  features: ["Feature 1", "Feature 2"],
  sku: "SKU-001",
  stock: "In Stock",
  weight: "250g",
  category: "Category Name"
}
```

## 🎨 Customization

### Colors
Modify CSS variables in `src/styles/index.css`:
```css
:root {
  --primary-color: #2c2c2c;
  --secondary-color: #8b7355;
  --accent-gold: #d4af37;
}
```

### Products
Edit `src/data/products.js` to add/modify products

### Pages
Add new page components in `src/pages/` and update routes in `App.jsx`

## 📞 Support

For issues or questions:
- Email: info@stepnaz.com
- WhatsApp: +92-XXX-XXXXXXX

## 📄 License

MIT License - feel free to use this template for your projects

---

**Made with ❤️ for elegant shopping experiences**
