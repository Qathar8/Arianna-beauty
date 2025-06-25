import React from 'react';
import { MessageCircle } from 'lucide-react';

const FloatingWhatsApp: React.FC = () => {
  const handleWhatsAppClick = () => {
    const message = "Hello ARIANNA BEAUTY! I'd like to learn more about your premium perfumes and beauty products.";
    const whatsappUrl = `https://wa.me/254721787191?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="whatsapp-float group"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white group-hover:scale-110 transition-transform duration-300" />
    </button>
  );
};

export default FloatingWhatsApp;