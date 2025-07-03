import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-pearl-white">
          <Routes>
            {/* Admin page (no layout) */}
            <Route
              path="/admin"
              element={
                <>
                  <AdminPage />
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 3000,
                      style: {
                        background: '#fff',
                        color: '#1f2937',
                        border: '1px solid #d4a373',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(212, 163, 115, 0.2)',
                      },
                    }}
                  />
                </>
              }
            />

            {/* Layout pages */}
            <Route
              path="*"
              element={
                <>
                  <Header onCartOpen={() => setIsCartOpen(true)} />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/about" element={<AboutPage />} />
                      <Route path="/contact" element={<ContactPage />} />
                    </Routes>
                  </main>
                  <Footer />
                  <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                  <FloatingWhatsApp />
                  <Toaster
                    position="top-right"
                    toastOptions={{
                      duration: 3000,
                      style: {
                        background: '#fff',
                        color: '#1f2937',
                        border: '1px solid #d4a373',
                        borderRadius: '12px',
                        boxShadow: '0 8px 32px rgba(212, 163, 115, 0.2)',
                        fontWeight: '500',
                      },
                      success: {
                        iconTheme: {
                          primary: '#10b981',
                          secondary: '#fff',
                        },
                      },
                    }}
                  />
                </>
              }
            />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
