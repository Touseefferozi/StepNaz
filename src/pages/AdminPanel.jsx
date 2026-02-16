
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import { products as initialProducts } from '../data/products';
import { FaBoxOpen, FaListAlt, FaSignOutAlt, FaClipboardList, FaPlus } from 'react-icons/fa';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: '',
    reviews: '',
    relatedImages: []
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeView, setActiveView] = useState('products'); // 'products' or 'orders'
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Load products from Firestore on mount
  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'products'));
        const firestoreProducts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        if (firestoreProducts.length > 0) {
          setProducts(firestoreProducts);
          // Sync to localStorage
          localStorage.setItem('stepnaz_products', JSON.stringify(firestoreProducts));
        } else {
          // If no Firestore products, use initial products
          setProducts(initialProducts);
          localStorage.setItem('stepnaz_products', JSON.stringify(initialProducts));
        }
      } catch (error) {
        console.error('Error loading from Firestore:', error);
        // Fallback to localStorage
        const savedProducts = localStorage.getItem('stepnaz_products');
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        } else {
          setProducts(initialProducts);
          localStorage.setItem('stepnaz_products', JSON.stringify(initialProducts));
        }
      }
    };
    loadProducts();
  }, []);

  // Save products to localStorage
  const saveToLocalStorage = (updatedProducts) => {
    localStorage.setItem('stepnaz_products', JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  const compressImageFile = (file) => new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > 800) {
          height = Math.round((height * 800) / width);
          width = 800;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressedImage);
      };
    };
    reader.readAsDataURL(file);
  });

  // Add product to Firestore
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        name: form.name,
        price: Number(form.price),
        category: form.category,
        description: form.description,
        image: form.image,
        relatedImages: form.relatedImages || [],
        rating: 4.5,
        reviews: Number(form.reviews) || 0,
        originalPrice: Number(form.price) * 1.2,
        stock: "In Stock",
        createdAt: new Date()
      };
      const docRef = await addDoc(collection(db, 'products'), newProduct);
      const addedProduct = { id: docRef.id, ...newProduct };
      const updatedProducts = [...products, addedProduct];
      setProducts(updatedProducts);
      localStorage.setItem('stepnaz_products', JSON.stringify(updatedProducts));
      setForm({ name: '', price: '', category: '', description: '', image: '', reviews: '', relatedImages: [] });
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product: ' + error.message);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setSelectedProduct(product);
    setForm({ ...product, relatedImages: Array.isArray(product.relatedImages) ? product.relatedImages : [] });
    setIsEditing(true);
  };

  // Update product
  const handleUpdate = (e) => {
    e.preventDefault();
    const updatedProducts = products.map(p => p.id === selectedProduct.id ? { ...selectedProduct, ...form, price: Number(form.price), reviews: Number(form.reviews) || 0, relatedImages: form.relatedImages || [] } : p);
    saveToLocalStorage(updatedProducts);
    setSelectedProduct(null);
    setForm({ name: '', price: '', category: '', description: '', image: '', reviews: '', relatedImages: [] });
    setIsEditing(false);
    alert('Product updated successfully!');
  };

  // Delete product from Firestore
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
        const updatedProducts = products.filter(p => p.id !== id);
        setProducts(updatedProducts);
        localStorage.setItem('stepnaz_products', JSON.stringify(updatedProducts));
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product: ' + error.message);
      }
    }
  };

  // Handle image upload with compression
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      compressImageFile(file).then((compressedImage) => {
        setForm({ ...form, image: compressedImage });
      });
    }
  };

  const handleRelatedImagesUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const compressedImages = await Promise.all(files.map((file) => compressImageFile(file)));
    const existingImages = Array.isArray(form.relatedImages) ? form.relatedImages : [];
    const combined = [...existingImages, ...compressedImages].slice(0, 4);
    setForm({ ...form, relatedImages: combined });
    e.target.value = '';
  };

  // Read product
  const handleRead = (product) => {
    setSelectedProduct(product);
    setIsEditing(false);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/admin-login');
    } catch (err) {
      alert('Error logging out: ' + err.message);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f4f6f8', fontFamily: 'Inter, Arial, sans-serif' }}>
      {/* Sidebar */}
      <aside style={{ width: 250, background: '#fff', borderRight: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', boxShadow: '2px 0 8px #f0f1f3', minHeight: '100vh', padding: 0 }}>
        <div style={{ padding: '2.5rem 1.5rem 1rem 1.5rem' }}>
          <h2 style={{ marginBottom: '2.5rem', color: '#1a1a1a', fontWeight: 700, fontSize: '2rem', letterSpacing: '-1px', fontFamily: 'inherit' }}>StepNaz Admin</h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '0.85rem 1rem', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 1px 4px #e0fbe6' }} onClick={() => { setSelectedProduct(null); setIsEditing(false); }}><FaPlus /> Add Product</button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '0.85rem 1rem', background: '#f4f6f8', color: '#222', border: '1.5px solid #e5e7eb', borderRadius: 8, fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 1px 4px #f3f4f6' }} onClick={() => { setSelectedProduct(null); setIsEditing(false); setActiveView('products'); }}><FaBoxOpen /> View All Products</button>
            <button style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '0.85rem 1rem', background: '#f4f6f8', color: '#222', border: '1.5px solid #e5e7eb', borderRadius: 8, fontWeight: 600, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 1px 4px #f3f4f6' }} onClick={() => setActiveView('orders')}><FaClipboardList /> Orders</button>
          </nav>
          {/* Orders Section */}
          <div style={{ marginTop: '2.5rem', background: '#f9fafb', borderRadius: '10px', boxShadow: '0 1px 6px #f0f1f3', padding: '1.1rem', border: '1.5px solid #e5e7eb' }}>
            <h3 style={{ color: '#22c55e', marginBottom: '1rem', fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.5px' }}>Orders</h3>
            {orders.length === 0 ? (
              <p style={{ color: '#888', fontSize: '0.97rem', margin: 0 }}>No orders yet.</p>
            ) : (
              <div style={{ maxHeight: '220px', overflowY: 'auto' }}>
                {orders.map((order, idx) => (
                  <div key={idx} style={{ background: '#fff', borderRadius: '7px', marginBottom: '0.7rem', padding: '0.7rem', boxShadow: '0 1px 4px #f3f4f6', border: '1px solid #e5e7eb' }}>
                    <div style={{ fontWeight: 600, color: '#222', fontSize: '1rem' }}>Order #{order.orderId || idx + 1}</div>
                    <div style={{ fontSize: '0.97rem', color: '#555' }}>Customer: {order.customerData?.firstName} {order.customerData?.lastName}</div>
                    <div style={{ fontSize: '0.93rem', color: '#888' }}>Date: {order.orderDate ? new Date(order.orderDate).toLocaleString() : 'N/A'}</div>
                    <div style={{ fontSize: '0.93rem', color: '#888' }}>Total: Rs. {order.total?.toLocaleString('en-PK') || 'N/A'}</div>
                    <div style={{ fontSize: '0.93rem', color: '#888' }}>Items: {order.items?.length || 0}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div style={{ marginTop: 'auto', padding: '2rem 1.5rem 1.5rem 1.5rem', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '0.97rem', color: '#888', marginBottom: '1.2rem' }}>Logged in as:<br/><strong style={{ color: '#222' }}>{currentUser?.email}</strong></div>
          <button style={{ width: '100%', padding: '0.85rem 1rem', background: '#fff', color: '#d36a6a', border: '1.5px solid #d36a6a', borderRadius: 8, fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center' }} onClick={handleLogout}><FaSignOutAlt /> Logout</button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2.5rem 3vw', background: '#f4f6f8', minHeight: '100vh' }}>
        {/* Add/Edit Form */}
        {(isEditing || selectedProduct === null) && (
          <form onSubmit={isEditing ? handleUpdate : handleAdd} style={{ marginBottom: '2rem', background: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 12px 30px rgba(17, 24, 39, 0.08)', border: '1px solid #eef2f7', maxWidth: '560px' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 700, color: '#111827' }}>{isEditing ? 'Edit Product' : 'Add Product'}</h3>
              <p style={{ margin: '0.4rem 0 0', color: '#6b7280', fontSize: '0.95rem' }}>Fill the details below to publish your product.</p>
            </div>
            <input type="text" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required style={{ width: '100%', marginBottom: '1rem', padding: '0.9rem 1rem', border: '1px solid #e5e7eb', borderRadius: '10px', background: '#f9fafb', fontSize: '0.98rem' }} />
            <input type="number" placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required style={{ width: '100%', marginBottom: '1rem', padding: '0.9rem 1rem', border: '1px solid #e5e7eb', borderRadius: '10px', background: '#f9fafb', fontSize: '0.98rem' }} />
            <input type="number" placeholder="Number of Reviews" value={form.reviews} onChange={e => setForm({ ...form, reviews: e.target.value })} style={{ width: '100%', marginBottom: '1rem', padding: '0.9rem 1rem', border: '1px solid #e5e7eb', borderRadius: '10px', background: '#f9fafb', fontSize: '0.98rem' }} />
            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} required style={{ width: '100%', marginBottom: '1rem', padding: '0.9rem 1rem', border: '1px solid #e5e7eb', borderRadius: '10px', background: '#f9fafb', fontSize: '0.98rem' }}>
              <option value="">Select Category</option>
              <option value="Footwear">Footwear</option>
              <option value="Cosmetics">Cosmetics</option>
            </select>
            <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ width: '100%', marginBottom: '1rem', padding: '0.9rem 1rem', border: '1px solid #e5e7eb', borderRadius: '10px', resize: 'vertical', minHeight: '100px', background: '#f9fafb', fontSize: '0.98rem' }} />
            <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px dashed #e5e7eb', borderRadius: '12px', background: '#fbfcfe' }}>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '600', color: '#374151' }}>Upload Product Image</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: '100%', marginBottom: '0.5rem', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '10px', background: '#fff' }} />
              {form.image && (
                <div style={{ marginTop: '0.75rem' }}>
                  <img src={form.image} alt="Preview" style={{ maxWidth: '160px', maxHeight: '160px', borderRadius: '10px', objectFit: 'cover', border: '1px solid #e5e7eb' }} />
                </div>
              )}
            </div>
            <div style={{ marginBottom: '1rem', padding: '1rem', border: '1px dashed #e5e7eb', borderRadius: '12px', background: '#fbfcfe' }}>
              <label style={{ display: 'block', marginBottom: '0.6rem', fontWeight: '600', color: '#374151' }}>Upload Related Images (max 4)</label>
              <input type="file" accept="image/*" multiple onChange={handleRelatedImagesUpload} style={{ width: '100%', marginBottom: '0.5rem', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '10px', background: '#fff' }} />
              {form.relatedImages?.length > 0 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem', marginTop: '0.75rem' }}>
                  {form.relatedImages.map((img, idx) => (
                    <img key={`${img}-${idx}`} src={img} alt="Related preview" style={{ width: '100%', height: '70px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                  ))}
                </div>
              )}
            </div>
            <button type="submit" style={{ width: '100%', background: 'linear-gradient(90deg, #d36a6a, #ef8f8f)', color: '#fff', padding: '0.9rem', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '1rem', boxShadow: '0 8px 16px rgba(211, 106, 106, 0.25)' }}>{isEditing ? 'Update' : 'Add'}</button>
          </form>
        )}

        {/* Product List */}
        {activeView === 'products' && (
          <>
            <h3>All Products</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {products.map(product => (
            <div key={product.id} style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px #eee', padding: '1rem', position: 'relative' }}>
              <img src={product.image || '/Images/placeholder.png'} alt={product.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', marginBottom: '0.5rem' }} />
              <h4 style={{ color: '#d36a6a' }}>{product.name}</h4>
              <p>Rs. {product.price}</p>
              <p style={{ fontSize: '0.9rem', color: '#888' }}>{product.category}</p>
              <p style={{ fontSize: '0.9rem', color: '#888' }}>{product.description}</p>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button onClick={() => handleEdit(product)} style={{ background: '#f4d03f', border: 'none', borderRadius: '4px', padding: '0.5rem', color: '#333' }}>Edit</button>
                <button onClick={() => handleDelete(product.id)} style={{ background: '#d36a6a', border: 'none', borderRadius: '4px', padding: '0.5rem', color: '#fff' }}>Delete</button>
                <button onClick={() => handleRead(product)} style={{ background: '#eee', border: 'none', borderRadius: '4px', padding: '0.5rem', color: '#333' }}>Read</button>
              </div>
            </div>
          ))}
        </div>

        {/* Read Product Details */}
        {selectedProduct && !isEditing && activeView === 'products' && (
          <div style={{ marginTop: '2rem', background: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 8px #eee', maxWidth: '400px' }}>
            <h3>Product Details</h3>
            <img src={selectedProduct.image || '/Images/placeholder.png'} alt={selectedProduct.name} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', marginBottom: '0.5rem' }} />
            <h4 style={{ color: '#d36a6a' }}>{selectedProduct.name}</h4>
            <p>Rs. {selectedProduct.price}</p>
            <p style={{ fontSize: '0.9rem', color: '#888' }}>{selectedProduct.category}</p>
            <p style={{ fontSize: '0.9rem', color: '#888' }}>{selectedProduct.description}</p>
          </div>
        )}
        </>
        )}

        {/* Orders View */}
        {activeView === 'orders' && (
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1.5rem', color: '#222' }}>Orders</h2>
            {orders.length === 0 ? (
              <div style={{ background: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 8px #eee', textAlign: 'center' }}>
                <p style={{ color: '#888', fontSize: '1.1rem' }}>No orders yet.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {orders.map((order, idx) => (
                  <div key={idx} style={{ background: '#fff', borderRadius: '8px', boxShadow: '0 2px 8px #eee', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h3 style={{ margin: 0, color: '#d36a6a', fontSize: '1.2rem' }}>Order #{order.orderId || idx + 1}</h3>
                      <span style={{ background: '#e0fbe6', color: '#22c55e', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.85rem', fontWeight: '600' }}>{order.status || 'Pending'}</span>
                    </div>
                    
                    <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                      <p style={{ margin: '0.3rem 0', fontSize: '0.95rem' }}>
                        <strong>Customer:</strong> {order.customerData?.firstName} {order.customerData?.lastName}
                      </p>
                      <p style={{ margin: '0.3rem 0', fontSize: '0.95rem' }}>
                        <strong>Email:</strong> {order.customerData?.email || 'N/A'}
                      </p>
                      <p style={{ margin: '0.3rem 0', fontSize: '0.95rem' }}>
                        <strong>Phone:</strong> {order.customerData?.phone || 'N/A'}
                      </p>
                      <p style={{ margin: '0.3rem 0', fontSize: '0.95rem' }}>
                        <strong>Address:</strong> {order.customerData?.address}, {order.customerData?.city}
                      </p>
                    </div>

                    <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
                      <p style={{ margin: '0.3rem 0', fontWeight: '600', color: '#222' }}>Items ({order.items?.length || 0}):</p>
                      {order.items?.slice(0, 3).map((item, itemIdx) => (
                        <div key={itemIdx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#555', marginTop: '0.3rem' }}>
                          <span>{item.name} x{item.quantity}</span>
                          <span>Rs. {(item.price * item.quantity).toLocaleString('en-PK')}</span>
                        </div>
                      ))}
                      {order.items?.length > 3 && (
                        <p style={{ margin: '0.3rem 0', fontSize: '0.9rem', color: '#888' }}>+{order.items.length - 3} more items</p>
                      )}
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '0.3rem' }}>
                        <span>Subtotal:</span>
                        <span>Rs. {order.subtotal?.toLocaleString('en-PK')}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                        <span>Shipping:</span>
                        <span style={{ color: order.shipping === 0 ? '#22c55e' : '#d36a6a' }}>
                          {order.shipping === 0 ? 'FREE' : `Rs. ${order.shipping}`}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.1rem', fontWeight: '700', color: '#222' }}>
                        <span>Total:</span>
                        <span style={{ color: '#d36a6a' }}>Rs. {order.total?.toLocaleString('en-PK')}</span>
                      </div>
                    </div>

                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#888' }}>
                      Order Date: {order.orderDate ? new Date(order.orderDate).toLocaleString() : 'N/A'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
