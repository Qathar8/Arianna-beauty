import React, { useState } from 'react';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';

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
    return <AdminPage />;
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-cream-white">
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
      </div>
    </CartProvider>
  );
}

export default App;