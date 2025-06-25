import React, { useState } from 'react';
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
  const [currentPage, setCurrentPage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  // Don't show header/footer on admin page
  if (currentPage === 'admin') {
    return (
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
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-pearl-white">
        <Header 
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          onCartOpen={() => setIsCartOpen(true)}
        />
        
        <main className="flex-1">
          {renderPage()}
        </main>
        
        <Footer />
        
        <Cart 
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
        />

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
      </div>
    </CartProvider>
  );
}

export default App;