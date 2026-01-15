// ============================================
// SEHAThope BACKEND SERVER
// Email & Order Management
// ============================================

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Email Service (Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER || 'touseefbashir919@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your_app_password_here'
    }
});

// Check if email credentials are configured
const isEmailConfigured = process.env.EMAIL_PASSWORD && process.env.EMAIL_PASSWORD !== 'your_app_password_here';

if (!isEmailConfigured) {
    console.warn('⚠️  WARNING: Email credentials not configured in .env file');
    console.warn('📧 To enable email: Add your Gmail App Password to .env file');
    console.warn('ℹ️  See EMAIL_SETUP.md for instructions');
}

// Route: Send Order Email
app.post('/send-order-email', async (req, res) => {
    try {
        const { orderData, customerData } = req.body;

        // Validate required fields
        if (!orderData || !customerData) {
            return res.status(400).json({ error: 'Missing order or customer data' });
        }

        // Check if email is configured
        if (!isEmailConfigured) {
            console.log('Email not configured - storing order in queue');
            return res.json({ 
                success: true, 
                message: 'Order received (Email backend not configured)',
                orderId: orderData.id,
                warning: 'Email service not configured. Please setup Gmail credentials.'
            });
        }

        // Create email HTML template
        const emailHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background-color: #2d6a3e; color: white; padding: 20px; border-radius: 5px; text-align: center; }
                    .section { margin: 20px 0; padding: 15px; border: 1px solid #ddd; border-radius: 5px; }
                    .section h2 { color: #2d6a3e; margin-top: 0; }
                    .item-table { width: 100%; border-collapse: collapse; margin: 10px 0; }
                    .item-table th { background-color: #f5f5f5; padding: 10px; text-align: left; border-bottom: 2px solid #2d6a3e; }
                    .item-table td { padding: 10px; border-bottom: 1px solid #ddd; }
                    .total { background-color: #f5f5f5; padding: 15px; border-radius: 5px; font-size: 18px; font-weight: bold; color: #2d6a3e; }
                    .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>🌿 SehatHerb - Order Confirmation</h1>
                    </div>

                    <div class="section">
                        <h2>Order Details</h2>
                        <p><strong>Order ID:</strong> ${orderData.id}</p>
                        <p><strong>Date:</strong> ${orderData.date}</p>
                        <p><strong>Status:</strong> ${orderData.status}</p>
                    </div>

                    <div class="section">
                        <h2>Customer Information</h2>
                        <p><strong>Name:</strong> ${customerData.firstName} ${customerData.lastName}</p>
                        <p><strong>Email:</strong> ${customerData.email}</p>
                        <p><strong>Phone:</strong> ${customerData.phone}</p>
                    </div>

                    <div class="section">
                        <h2>Shipping Address</h2>
                        <p>${customerData.address}</p>
                        <p>${customerData.city}, ${customerData.province}</p>
                        <p>${customerData.country}</p>
                    </div>

                    <div class="section">
                        <h2>Order Items</h2>
                        <table class="item-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${orderData.items.map(item => `
                                    <tr>
                                        <td>${item.name}</td>
                                        <td>${item.quantity}</td>
                                        <td>Rs. ${item.price}</td>
                                        <td>Rs. ${item.price * item.quantity}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>

                    <div class="section">
                        <h2>Order Summary</h2>
                        <p><strong>Subtotal:</strong> Rs. ${orderData.subtotal || orderData.total}</p>
                        <p><strong>Shipping:</strong> ${customerData.shipping || 'Free'}</p>
                        <p class="total">Total: Rs. ${orderData.total}</p>
                    </div>

                    <div class="section">
                        <h2>Payment Method</h2>
                        <p><strong>${customerData.payment === 'cod' ? 'Cash on Delivery' : customerData.payment === 'easypaisa-jazzcash' ? 'Easypaisa / JazzCash' : 'Bank Transfer'}</strong></p>
                    </div>

                    ${customerData.notes ? `
                    <div class="section">
                        <h2>Special Notes</h2>
                        <p>${customerData.notes}</p>
                    </div>
                    ` : ''}

                    <div class="footer">
                        <p>This is an automated order confirmation from SehatHerb.</p>
                        <p>We will contact you soon at ${customerData.phone}</p>
                        <p>For more information, visit <strong>www.sehatherb.com</strong> or call <strong>+92-304-0105467</strong></p>
                    </div>
                </div>
            </body>
            </html>
        `;

        // Email options for Business Owner
        const businessEmailOptions = {
            from: process.env.EMAIL_USER || 'touseefbashir919@gmail.com',
            to: 'touseefbashir919@gmail.com',
            subject: `New Order Received - Order ID: ${orderData.id}`,
            html: emailHTML,
            replyTo: customerData.email
        };

        // Email options for Customer
        const customerEmailOptions = {
            from: process.env.EMAIL_USER || 'touseefbashir919@gmail.com',
            to: customerData.email,
            subject: `Order Confirmation - SehatHerb Order ID: ${orderData.id}`,
            html: emailHTML
        };

        // Send emails
        await transporter.sendMail(businessEmailOptions);
        console.log('✅ Business email sent successfully');

        await transporter.sendMail(customerEmailOptions);
        console.log('✅ Customer email sent successfully');

        res.json({ 
            success: true, 
            message: 'Order confirmation emails sent successfully',
            orderId: orderData.id
        });

    } catch (error) {
        console.error('❌ Email sending error:', error.message);
        res.status(500).json({ 
            success: false, 
            error: error.message,
            message: 'Failed to send email - Order saved locally'
        });
    }
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'Backend server is running' });
});

// Root route
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>SehatHerb Backend Server</title>
            <style>
                body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
                .container { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
                h1 { color: #2d6a3e; }
                .status { padding: 10px; background: #d4edda; border-left: 4px solid #28a745; margin: 20px 0; }
                .info { background: #d1ecf1; border-left: 4px solid #0c5460; padding: 10px; margin: 10px 0; }
                .warning { background: #fff3cd; border-left: 4px solid #856404; padding: 10px; margin: 10px 0; }
                a { color: #2d6a3e; text-decoration: none; font-weight: bold; }
                code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🌿 SehatHerb Backend Server</h1>
                <div class="status">
                    ✅ Server is running successfully on port ${PORT}
                </div>
                
                <h2>How to Use:</h2>
                <div class="info">
                    <strong>📌 This is the BACKEND server for email notifications.</strong>
                    <p>To view your website, open the HTML file directly:</p>
                    <ol>
                        <li>Navigate to your project folder</li>
                        <li>Double-click <code>index.html</code></li>
                        <li>Or right-click → Open with → Chrome/Firefox</li>
                    </ol>
                </div>

                <h2>Server Information:</h2>
                <ul>
                    <li><strong>Port:</strong> ${PORT}</li>
                    <li><strong>Email:</strong> ${process.env.EMAIL_USER}</li>
                    <li><strong>Status:</strong> ${isEmailConfigured ? '✅ Email Configured' : '⚠️ Email Not Configured'}</li>
                </ul>

                ${!isEmailConfigured ? `
                <div class="warning">
                    <strong>⚠️ Email Service Not Configured</strong>
                    <p>Add your Gmail App Password to <code>.env</code> file to enable email notifications.</p>
                    <p>See <code>EMAIL_SETUP.md</code> for instructions.</p>
                </div>
                ` : ''}

                <h2>API Endpoints:</h2>
                <ul>
                    <li><code>GET /</code> - This page</li>
                    <li><code>GET /api/health</code> - Health check</li>
                    <li><code>POST /send-order-email</code> - Send order email</li>
                </ul>

                <p style="margin-top: 30px; color: #666;">
                    SehatHerb E-commerce Backend | Port ${PORT}
                </p>
            </div>
        </body>
        </html>
    `);
});

// Start server
app.listen(PORT, () => {
    console.log(`\n✅ SehatHerb Backend Server running on port ${PORT}`);
    console.log(`📧 Email configured for: ${process.env.EMAIL_USER || 'touseefbashir919@gmail.com'}`);
    if (isEmailConfigured) {
        console.log('✅ Email service: READY');
    } else {
        console.log('⚠️  Email service: NOT CONFIGURED (See EMAIL_SETUP.md)');
    }
    console.log('\n📝 Server is ready to receive orders!\n');
});
