import React, { useState } from 'react';
import '../styles/pages.css';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:5000/send-contact-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Message sent successfully! We will get back to you soon.');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                alert('Failed to send message. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error sending message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact-page">
            <div className="container">
                <h1>Contact Us</h1>
                <p className="page-subtitle">We'd love to hear from you. Get in touch with us today!</p>

                <div className="contact-content">
                    {/* Contact Information */}
                    <div className="contact-info-section">
                        <div className="info-card">
                            <i className="fas fa-map-marker-alt"></i>
                            <h3>Address</h3>
                            <p>StepNaz Boutique</p>
                            <p>Karachi, Pakistan</p>
                        </div>

                        <div className="info-card">
                            <i className="fas fa-phone"></i>
                            <h3>Phone</h3>
                            <p>
                                <a href="tel:+92-XXX-XXXXXXX">+92-XXX-XXXXXXX</a>
                            </p>
                            <p>Available 9 AM - 9 PM (Mon-Sun)</p>
                        </div>

                        <div className="info-card">
                            <i className="fas fa-envelope"></i>
                            <h3>Email</h3>
                            <p>
                                <a href="mailto:info@stepnaz.com">info@stepnaz.com</a>
                            </p>
                            <p>We reply within 24 hours</p>
                        </div>

                        <div className="info-card">
                            <i className="fas fa-clock"></i>
                            <h3>Business Hours</h3>
                            <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                            <p>Saturday - Sunday: 10:00 AM - 5:00 PM</p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-section">
                        <h2>Send us a Message</h2>
                        <form onSubmit={handleSubmit} className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Full Name *</label>
                                <input 
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address *</label>
                                <input 
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject *</label>
                                <select 
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #ddd',
                                        borderRadius: '5px',
                                        fontSize: '1rem',
                                        backgroundColor: 'white'
                                    }}
                                >
                                    <option value="">Select a subject</option>
                                    <option value="Product Inquiry">Product Inquiry</option>
                                    <option value="Order Status">Order Status</option>
                                    <option value="Shipping & Delivery">Shipping & Delivery</option>
                                    <option value="Returns & Refunds">Returns & Refunds</option>
                                    <option value="Payment Issues">Payment Issues</option>
                                    <option value="Product Quality">Product Quality</option>
                                    <option value="Complaint">Complaint</option>
                                    <option value="Feedback">Feedback</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Message *</label>
                                <textarea 
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    required
                                ></textarea>
                            </div>

                            <button 
                                type="submit" 
                                className="btn btn-primary"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="faq-section">
                    <h2>Frequently Asked Questions</h2>
                    <div className="faq-grid">
                        <div className="faq-item">
                            <h4>What are your shipping times?</h4>
                            <p>We offer free shipping on orders above Rs. 3000. Standard delivery takes 2-5 business days within Karachi and 3-7 days for other cities.</p>
                        </div>

                        <div className="faq-item">
                            <h4>Do you accept cash on delivery?</h4>
                            <p>Yes, we accept cash on delivery for all orders. Payment is collected when the order is delivered.</p>
                        </div>

                        <div className="faq-item">
                            <h4>What's your return policy?</h4>
                            <p>We offer a 30-day return policy for all products. Items must be in original condition with tags attached.</p>
                        </div>

                        <div className="faq-item">
                            <h4>How can I track my order?</h4>
                            <p>You will receive a tracking link via email once your order is shipped. You can track your package in real-time.</p>
                        </div>

                        <div className="faq-item">
                            <h4>Do you have a physical store?</h4>
                            <p>Currently, we operate online only. You can place orders through our website and choose your delivery preference.</p>
                        </div>

                        <div className="faq-item">
                            <h4>Can I modify my order?</h4>
                            <p>You can modify your order within 2 hours of placing it. Contact us immediately if you need changes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
