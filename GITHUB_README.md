# StepNaz - E-Commerce Platform

A modern React-based e-commerce platform for selling footwear and cosmetics with advanced features like product management, reviews, and order processing.

## 🎯 Features

### Customer Features
- 🛍️ **Product Browsing** - Browse footwear and cosmetics with filters and search
- ⭐ **Product Reviews** - Customers can write and view product reviews with ratings
- 🛒 **Shopping Cart** - Add/remove products, manage quantities, and apply discounts
- 💳 **Checkout** - Complete order process with shipping information
- 📦 **Order Confirmation** - Beautiful success popup with order details
- 👤 **User Authentication** - Sign up and login for customers

### Admin Features
- 🔐 **Admin Panel** - Secure login for administrators
- ➕ **Product Management** - Add, edit, and delete products in real-time
- 📊 **Product Categories** - Organize products by category (Footwear, Cosmetics)
- 🔄 **Live Updates** - Products update instantly across all pages
- 💾 **Cloud Storage** - Firebase integration for data persistence

### Technical Features
- 🔥 **Firebase Integration** - Real-time database and authentication
- 💬 **Review System** - Firestore-based reviews with star ratings and categories
- 🎨 **Responsive Design** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Vite bundler for optimized builds
- 🔄 **Local Caching** - localStorage for instant page loads

## 🏗️ Project Structure

```
StepNaz/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/              # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── Cosmetics.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── AdminLogin.jsx
│   │   ├── AdminPanel.jsx
│   │   ├── AdminSignup.jsx
│   │   └── Contact.jsx
│   ├── context/            # React Context for state management
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── hooks/              # Custom React hooks
│   │   └── useCart.js
│   ├── config/             # Configuration files
│   │   └── firebase.js
│   ├── data/               # Static data
│   │   └── products.js
│   ├── styles/             # CSS stylesheets
│   └── App.jsx
├── Images/                 # Product and banner images
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/StepNaz.git
cd StepNaz
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env` file in the root directory:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. **Run the development server**
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 🔑 Key Components

### ProductCard Component
- Displays product information with images, prices, and ratings
- Shows discount badges
- Quick add to cart functionality

### ProductDetail Page
- Detailed product view with image gallery
- Size selection for footwear
- Customer reviews with Firebase integration
- Write review form with category and rating

### Admin Panel
- Add new products with images and details
- Edit existing products
- Delete products
- Real-time updates to Firebase

### Checkout Process
- Shipping address form
- Payment method selection
- Order summary with discounts
- Success popup with order confirmation

## 💾 Database Structure

### Products Collection (Firebase)
```javascript
{
  id: string,
  name: string,
  price: number,
  originalPrice: number,
  category: string,
  image: string,
  images: [string],
  rating: number,
  reviews: number,
  description: string
}
```

### Reviews Collection (Firebase)
```javascript
{
  productId: string,
  name: string,
  rating: number,
  category: string,
  comment: string,
  date: timestamp,
  timestamp: number
}
```

## 🎨 Styling

The project uses custom CSS with:
- Responsive grid layouts
- Mobile-first approach
- Smooth animations and transitions
- Brand color scheme (Orange #ea580c, Red #d36a6a)

## 📱 Pages Overview

| Page | Path | Features |
|------|------|----------|
| Home | `/` | Featured products, categories |
| Products | `/products` | Product listing, filters, search |
| Cosmetics | `/cosmetics` | Cosmetics category view |
| Product Detail | `/product/:id` | Full product info, reviews |
| Cart | `/cart` | Cart management, totals |
| Checkout | `/checkout` | Order form, confirmation |
| Admin Login | `/admin-login` | Admin authentication |
| Admin Panel | `/admin` | Product management |
| Contact | `/contact` | Contact form |

## 🔐 Authentication

- Customer authentication via Firebase Auth
- Admin verification through custom login system
- Protected routes for admin panel
- Session management

## 📦 Order System

- Automatic discount calculation based on quantity
- Free shipping for orders over Rs. 3,000
- Order storage in localStorage with Firebase backup
- Order confirmation with unique ID generation

## 🔄 Review System

- Write reviews with name, rating (1-5 stars), category, and comment
- Reviews stored in Firebase Firestore
- Real-time review display on product pages
- Category field for review filtering
- Verified badge for admin reviews

## 📊 Future Enhancements

- [ ] Payment gateway integration (Stripe, JazzCash)
- [ ] Email notifications for orders
- [ ] User profile and order history
- [ ] Product inventory management
- [ ] Advanced analytics dashboard
- [ ] Social sharing features
- [ ] Wishlist functionality
- [ ] Multiple language support

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 📞 Contact

For questions or support, please reach out through the contact form on the website.

---

**Made with ❤️ by StepNaz Team**
