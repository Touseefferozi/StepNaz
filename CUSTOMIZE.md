# Configuration & Customization Guide

## 🎨 Brand Customization

### 1. Change Company Name & Branding

**Step 1**: Open all HTML files and find/replace:
- Old: `Organic Herb`
- New: `Your Brand Name`

**Step 2**: Update the logo in HTML header:
```html
<!-- Current -->
<span class="logo-icon">🌿</span>
<span class="logo-text">Organic Herb</span>

<!-- Change to -->
<span class="logo-icon">🌿</span>
<span class="logo-text">Your Brand Name</span>
```

**Step 3**: Update meta tags in `<head>` sections:
```html
<meta name="description" content="Your brand description here">
<title>Your Brand Name - Description</title>
```

### 2. Change Colors

Edit the `:root` variables in `styles.css`:

```css
:root {
    /* Green Theme Colors */
    --primary-green: #2d6a3e;      /* Main brand color */
    --light-green: #4a9d6f;        /* Accent/hover color */
    --accent-green: #6bb896;       /* Lighter accent */
    
    /* Neutral Colors */
    --white: #ffffff;
    --light-gray: #f5f5f5;
    --medium-gray: #e0e0e0;
    --dark-gray: #333333;
    --text-dark: #2c2c2c;
    --text-light: #666666;
    
    /* Status Colors */
    --success: #27ae60;            /* Green checkmarks */
    --danger: #e74c3c;             /* Red for sale badges */
}
```

**Popular Color Combinations**:

*Elegant Blue*:
```css
--primary-green: #1e5f74;
--light-green: #2a8ba0;
--accent-green: #4fb3cc;
```

*Modern Purple*:
```css
--primary-green: #6b3fa0;
--light-green: #8e54c4;
--accent-green: #b78dd4;
```

*Warm Orange*:
```css
--primary-green: #d85c2a;
--light-green: #e87e47;
--accent-green: #f0a86a;
```

### 3. Change Contact Information

**Find and replace these in all files**:

**Email**:
- Old: `info@organicherb.com`
- New: `your@email.com`

**Phone**:
- Old: `+92-300-1234567`
- New: `+92-YOUR-PHONE-NUMBER`

**WhatsApp** (Also update href links):
- Old: `https://wa.me/923001234567`
- New: `https://wa.me/92YOURPHONENUMBER`

**Location/Address**:
Update in footer:
```html
<p>Pakistan</p>
<!-- Change to -->
<p>Your Country/City</p>
```

## 📦 Product Management

### Adding a New Product

Edit `app.js` and add to the `products` array:

```javascript
{
    id: 9,                                          // Unique ID
    name: "Neem Leaf Powder",                       // Product name
    price: 649,                                     // Current price (Rs.)
    originalPrice: 899,                            // Original/sale price
    rating: 4.5,                                    // Star rating (0-5)
    reviews: 45,                                    // Number of reviews
    image: "https://your-image-url.jpg",           // Main image
    images: [                                       // Gallery images
        "https://your-image-url-1.jpg",
        "https://your-image-url-2.jpg",
        "https://your-image-url-3.jpg",
        "https://your-image-url-4.jpg"
    ],
    description: "Premium neem leaf powder for skin and wellness...",
    features: [                                     // Bullet points
        "100% Organic",
        "No Additives",
        "Fresh Harvest",
        "Lab Tested"
    ],
    sku: "ORG-009",                                // Stock keeping unit
    stock: "In Stock",                             // Stock status
    weight: "250g",                                // Package weight
    category: "Powder"                             // Product category
}
```

### Removing a Product

1. Find the product in `app.js`
2. Delete the entire object from the `products` array
3. Or set a `hidden: true` property instead of deleting

### Updating Product Prices

```javascript
// In products array
{
    id: 1,
    name: "Green Tea Extract",
    price: 1299,              // Change this
    originalPrice: 1799,      // And this
    // ...
}
```

## 🎯 Shipping Configuration

### Change Shipping Cost

Edit `checkout.html`:

```html
<!-- Find this line -->
<strong>Express Shipping</strong>
<small>Rs. 500 - Delivery in 2-3 business days</small>

<!-- Change Rs. 500 to your amount -->
```

Also update in `checkout.html`:

```javascript
// In the shipping calculation
const shippingCost = selectedMethod === 'express' ? 500 : 0;
```

### Add/Remove Provinces

Edit `product.html` and `checkout.html`:

```html
<select id="province" required>
    <option value="">Select Province</option>
    <option value="punjab">Punjab</option>
    <option value="sindh">Sindh</option>
    <option value="kpk">Khyber Pakhtunkhwa</option>
    <!-- Add or remove provinces here -->
    <option value="your-province">Your Province</option>
</select>
```

## 🏪 Store Information

### Update Announcement Bar

Edit in all HTML files:

```html
<!-- Current -->
<p>🌿 Shop our latest arrivals - Free shipping nationwide on orders above Rs. 2000</p>

<!-- Change to -->
<p>🌿 Your announcement message here</p>
```

### Update Footer

Edit footer section (appears in all files):

```html
<div class="footer-section">
    <h3>About Organic Herb</h3>
    <p>Your about us text here</p>
</div>

<div class="footer-section">
    <h3>Contact</h3>
    <p>Email: your@email.com</p>
    <p>Phone: +92-YOUR-NUMBER</p>
    <p>Your Location</p>
</div>
```

## 🔗 Social Media Links

Update in footer (all HTML files):

```html
<div class="social-links">
    <a href="https://facebook.com/yourpage"><i class="fab fa-facebook"></i></a>
    <a href="https://instagram.com/yourprofile"><i class="fab fa-instagram"></i></a>
    <a href="https://twitter.com/yourhandle"><i class="fab fa-twitter"></i></a>
</div>
```

## 💳 Payment Methods

### Current Payment Options

Edit `checkout.html` to modify payment methods:

```html
<label class="payment-option">
    <input type="radio" name="payment" value="cod" checked>
    <span>Cash on Delivery (COD)</span>
</label>
<label class="payment-option">
    <input type="radio" name="payment" value="bank">
    <span>Bank Transfer</span>
</label>
<label class="payment-option">
    <input type="radio" name="payment" value="easypaisa">
    <span>Easypaisa / JazzCash</span>
</label>
<!-- Add new payment method here -->
```

### Bank Details Template

Add after payment methods:

```html
<div class="payment-details" id="bank-details" style="display:none;">
    <h4>Bank Transfer Details</h4>
    <p>Bank Name: Your Bank</p>
    <p>Account Number: XXXX-XXXX-XXXX</p>
    <p>IBAN: PKXX XXXX XXXX XXXX XXXX</p>
</div>
```

## 📱 Mobile Customization

### Change Mobile Breakpoints

Edit in `styles.css`:

```css
/* Default breakpoints */
@media (max-width: 768px) {    /* Tablets */
    /* ... tablet styles */
}

@media (max-width: 480px) {    /* Mobile phones */
    /* ... mobile styles */
}

@media (max-width: 360px) {    /* Extra small */
    /* ... extra small styles */
}
```

You can adjust these pixel values to match your needs.

## 🔤 Font Customization

### Change Default Font

Edit in `styles.css`:

```css
:root {
    --font-primary: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

**Popular Font Options**:
```css
/* Modern Clean */
--font-primary: 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;

/* Elegant */
--font-primary: 'Georgia', 'Garamond', serif;

/* Minimal */
--font-primary: 'Arial', sans-serif;

/* Professional */
--font-primary: 'Open Sans', 'Helvetica Neue', sans-serif;
```

## 🎬 Animations & Transitions

### Disable Animations

If you want a faster, simpler site, edit `styles.css`:

```css
:root {
    /* Change from this */
    --transition: all 0.3s ease;
    
    /* To this */
    --transition: none;
}
```

### Adjust Animation Speed

```css
:root {
    /* Faster */
    --transition: all 0.1s ease;
    
    /* Slower */
    --transition: all 0.5s ease;
}
```

## 🖼️ Image Replacement

### Replace Product Images

1. Get your image URLs (Unsplash, Pexels, or your server)
2. In `app.js`, update the `image` field:

```javascript
{
    id: 1,
    name: "Green Tea Extract",
    image: "https://your-new-image-url.jpg",  // Replace this
    images: [                                   // And these
        "https://your-image-1.jpg",
        "https://your-image-2.jpg",
        "https://your-image-3.jpg",
        "https://your-image-4.jpg"
    ]
}
```

### Logo Image

Replace the emoji logo:

```html
<!-- Current (emoji) -->
<span class="logo-icon">🌿</span>

<!-- Replace with image -->
<img src="path/to/logo.png" alt="Logo" style="width: 30px; height: 30px;">
```

## 📊 Analytics Integration

### Google Analytics

Add to `<head>` of all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'YOUR_GA_ID');
</script>
```

### Facebook Pixel

Add to `<head>` of all HTML files:

```html
<!-- Facebook Pixel -->
<script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    // ... rest of pixel code
}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

## 🔐 Security Settings

### Add HTTPS Meta Tag

```html
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```

### Add Security Headers

For production server, add these HTTP headers:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

## 📧 Email Configuration

### Contact Form Email

For production, create a backend that sends emails. Example endpoint:

```javascript
// In app.js, add after order placement:
fetch('/api/send-order-email', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({order: order, customer: formData})
});
```

## 🌍 Multi-Language Support

To add another language, create a new language file:

```javascript
// language-ur.js - Urdu example
const translations = {
    'add-to-cart': 'کارٹ میں شامل کریں',
    'checkout': 'چیک آؤٹ',
    'free-shipping': 'مفت ڈیلیوری'
};
```

Then use in HTML:

```javascript
// Load language and apply translations
const currentLang = localStorage.getItem('language') || 'en';
loadLanguage(currentLang);
```

## 📋 Checklist Before Launch

- [ ] All contact information updated
- [ ] Real product images added
- [ ] All products configured
- [ ] Shipping costs verified
- [ ] Payment methods configured
- [ ] Social media links updated
- [ ] Company branding complete
- [ ] No broken links
- [ ] Mobile responsive tested
- [ ] Analytics integrated
- [ ] SSL certificate installed
- [ ] Backup created
- [ ] Domain configured
- [ ] Email setup complete

---

**Last Updated**: January 2026
**Version**: 1.0
