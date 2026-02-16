# 🚀 Quick Start Guide - StepNaz React App

## 5-Minute Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The app will automatically open at **http://localhost:5173**

### Step 3: Start Backend (Optional - for emails)
In a new terminal:
```bash
npm run server:dev
```

Backend runs at **http://localhost:5000**

### ✅ Done! Your React store is running!

---

## 📁 Project Structure

```
StepNaz/
├── src/
│   ├── components/     → Reusable components (Header, Footer, etc.)
│   ├── pages/         → Page components (Home, Cart, etc.)
│   ├── context/       → Global state (Cart management)
│   ├── hooks/         → Custom hooks (useCart)
│   ├── data/          → Products database
│   ├── styles/        → CSS files
│   ├── App.jsx        → Main app with routes
│   └── main.jsx       → React entry point
├── public/            → Static assets
├── package.json       → Dependencies
├── vite.config.js     → Vite configuration
└── index.html         → HTML entry point
```

---

## 🎯 Key Features

✅ **Full-Featured E-Commerce**
- Browse products
- Filter by category & price
- Shopping cart
- Checkout process

✅ **Modern React Stack**
- React 18 with hooks
- React Router for navigation
- Context API for state
- Vite for fast development

✅ **Mobile Responsive**
- Works on all devices
- Touch-friendly interface
- Optimized performance

✅ **Data Persistence**
- Cart saves to localStorage
- Auto-syncs across tabs

---

## 📝 Common Tasks

### Add a New Product
Edit `src/data/products.js`:
```javascript
{
  id: 99,
  name: "My New Product",
  price: 1999,
  originalPrice: 2999,
  image: "path/to/image.jpg",
  // ... other fields
}
```

### Change Colors
Edit `src/styles/index.css`:
```css
:root {
  --primary-color: #2c2c2c;      /* Main color */
  --secondary-color: #8b7355;    /* Secondary color */
  --accent-gold: #d4af37;        /* Accent color */
}
```

### Add a New Page
1. Create file `src/pages/MyPage.jsx`
2. Add route in `src/App.jsx`:
```jsx
<Route path="/mypage" element={<MyPage />} />
```

### Use Cart in Any Component
```jsx
import { useCart } from '../hooks/useCart';

function MyComponent() {
  const { cart, addToCart, getCartCount } = useCart();
  
  return (
    <button onClick={() => addToCart(product)}>
      Add ({getCartCount()})
    </button>
  );
}
```

---

## 🔗 Useful Links

- **React Docs**: https://react.dev
- **React Router**: https://reactrouter.com
- **Vite**: https://vitejs.dev

---

## 🚀 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

---

## ❓ Troubleshooting

**Can't see products?**
- Check `src/data/products.js` has data
- Check browser console for errors

**Cart not saving?**
- Check localStorage is enabled
- Check browser DevTools → Application → LocalStorage

**Styles not loading?**
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server

**Backend not working?**
- Ensure port 5000 is not in use
- Run `npm run server:dev` in new terminal

---

## 📊 File Overview

| File | Purpose |
|------|---------|
| `src/App.jsx` | Main app with all routes |
| `src/pages/Home.jsx` | Homepage |
| `src/pages/Products.jsx` | Product listing |
| `src/pages/ProductDetail.jsx` | Single product page |
| `src/pages/Cart.jsx` | Shopping cart |
| `src/pages/Checkout.jsx` | Checkout page |
| `src/pages/Contact.jsx` | Contact page |
| `src/context/CartContext.jsx` | Cart state management |
| `src/components/Header.jsx` | Navigation header |
| `src/components/Footer.jsx` | Footer |

---

## 🎨 Customization Quick Links

- **Colors**: `src/styles/index.css` (lines 6-16)
- **Fonts**: `src/styles/index.css` (lines 18-26)
- **Products**: `src/data/products.js`
- **Header**: `src/components/Header.jsx`
- **Navigation**: `src/App.jsx` (Routes)

---

## 💡 Tips

1. **Save Often**: Use `Ctrl+S` to save files
2. **Hard Refresh**: `Ctrl+Shift+R` to clear cache
3. **Dev Tools**: F12 to open browser DevTools
4. **React Devtools**: Install React DevTools extension
5. **Git**: Commit early and often

---

## 🔒 Security Notes

- Never commit `.env` file with passwords
- Keep dependencies updated: `npm update`
- Check vulnerabilities: `npm audit`

---

## 📞 Need Help?

Check these files for documentation:
- `CONVERSION_SUMMARY.md` - Complete overview
- `REACT_SETUP.md` - Detailed setup guide
- `MIGRATION_GUIDE.md` - From vanilla JS to React

---

**Happy Coding! 🎉**

*Your StepNaz React store is ready to go!*
