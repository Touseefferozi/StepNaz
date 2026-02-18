import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    {/* About Section */}
                    <div className="footer-section">
                        <h3>About StepNaz</h3>
                        <p>Discover premium footwear and cosmetics designed for the modern, elegant woman. Every product is carefully curated to ensure quality and style.</p>
                        <div className="social-links">
                            <a href="https://www.facebook.com/share/188PC1Urcr/" className="social-link"><i className="fab fa-facebook"></i></a>
                            <a href="https://www.instagram.com/stepnaaz?igsh=MTY4b2QzZWI0c25ycA==" className="social-link"><i className="fab fa-instagram"></i></a>
                            {/* <a href="#" className="social-link"><i className="fab fa-twitter"></i></a> */}
                            <a href="https://wa.me/923219277352" target="_blank" rel="noopener noreferrer" className="social-link"><i className="fab fa-whatsapp"></i></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/footwear">Shop Footwear</Link></li>
                            <li><Link to="/cosmetics">Shop Cosmetics</Link></li>
                            <li><Link to="/cart">My Cart</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div className="footer-section">
                        <h3>Customer Service</h3>
                        <ul>
                            <li><a href="#faq">FAQ</a></li>
                            <li><a href="#shipping">Shipping Info</a></li>
                            <li><a href="#returns">Returns & Exchanges</a></li>
                            <li><a href="#privacy">Privacy Policy</a></li>
                            <li><a href="#terms">Terms & Conditions</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="footer-section">
                        <h3>Get In Touch</h3>
                        <p>
                            <i className="fas fa-phone"></i> +92-319-0027069
                        </p>
                        <p>
                            <i className="fas fa-envelope"></i> <a href="mailto:info@stepnaz.com">info@stepnaz.com</a>
                        </p>
                        <p>
                            <i className="fas fa-map-marker-alt"></i> Karachi, Pakistan
                        </p>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; 2026 StepNaz. All rights reserved.</p>
                    <p>Made with <i className="fas fa-heart" style={{color: '#d4af37'}}></i> for fashion lovers</p>
                </div>
            </div>
            
            {/* WhatsApp Floating Button */}
            <a 
                href="https://wa.me/923219277352" 
                target="_blank" 
                rel="noopener noreferrer"
                className="whatsapp-float"
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '60px',
                    height: '60px',
                    backgroundColor: '#25D366',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '30px',
                    color: 'white',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    zIndex: 1000,
                    transition: 'all 0.3s ease',
                    textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.5)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                }}
            >
                <i className="fab fa-whatsapp"></i>
            </a>
        </footer>
    );
};

export default Footer;
