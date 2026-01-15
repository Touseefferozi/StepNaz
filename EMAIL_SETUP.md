# SehatHerb Email Setup Guide

## Installation & Setup

### Step 1: Install Node.js (if not already installed)
Download from: https://nodejs.org/

### Step 2: Install Dependencies
Open terminal in the project folder and run:
```bash
npm install
```

### Step 3: Setup Gmail App Password
1. Go to: https://myaccount.google.com/
2. Click "Security" in the left menu
3. Scroll down and find "App passwords"
4. Select "Mail" and "Windows Computer" (or your device)
5. Google will generate a 16-character app password
6. Copy this password

### Step 4: Configure .env File
Open `.env` file and replace:
```
EMAIL_PASSWORD=your_app_password_here
```
With your actual app password from Step 3. Example:
```
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

### Step 5: Start the Backend Server
```bash
npm start
```

You should see:
```
SehatHerb Backend Server running on port 5000
Email service configured for: touseefbashir919@gmail.com
```

### Step 6: Test the Website
1. Open `index.html` in your browser
2. Try placing an order
3. Check `touseefbashir919@gmail.com` for order confirmation email

## Email Flow

When a user clicks "Place Order":

1. **Frontend (app.js)** collects order data
2. **Sends to Backend** (http://localhost:5000/send-order-email)
3. **Backend (server.js)** uses Gmail SMTP to send:
   - Email to you (touseefbashir919@gmail.com)
   - Email to customer with order confirmation
4. **Fallback**: If backend is down, uses FormSubmit.co free service

## Troubleshooting

### Email not arriving?
1. Check spam/junk folder
2. Verify `EMAIL_PASSWORD` is correct app password (not regular password)
3. Enable "Less secure app access" if needed
4. Check backend console for errors

### Backend won't start?
1. Make sure Node.js is installed: `node --version`
2. Reinstall dependencies: `rm -r node_modules && npm install`
3. Check if port 5000 is available

### How to Deploy?

For production, deploy `server.js` to:
- Heroku (free tier available)
- Render.com
- Railway.app
- AWS
- DigitalOcean

Then update the backend URL in app.js from `http://localhost:5000` to your deployed server URL.

## Commands

```bash
# Start backend server
npm start

# Development mode (auto-restart on changes)
npm run dev

# Install new dependencies
npm install [package-name]
```

## Notes

- Emails are sent automatically on order placement
- Both business owner and customer receive emails
- Order details include: items, price, shipping address, payment method
- System stores pending emails in localStorage if backend is unavailable
