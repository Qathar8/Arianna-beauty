import React from 'react';
import { Facebook, Instagram, Music } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/ariannas.cosmeti?mibextid=kFxxJD',
      icon: <Facebook className="h-6 w-6" />
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ariannabeautycosmetics?igsh=MTFiM3Bwc29oYm5tMQ==',
      icon: <Instagram className="h-6 w-6" />
    },
    {
      name: 'TikTok',
      url: 'https://www.tiktok.com/@briana_beauty?_t=ZM-8xDkxzNqrMW&_r=1',
      icon: <Music className="h-6 w-6" />
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-rose-gold bg-clip-text text-transparent mb-4">
              ARIANNA BEAUTY
            </h3>
            <p className="text-gray-300 mb-4">
              Premium scents and beauty products, handpicked for you. 
              Elevate your style with our curated collection.
            </p>
            <p className="text-sm text-gray-400">
              Nairobi, Kenya
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-rose-gold transition-colors duration-200">About Us</a></li>
              <li><a href="#" className="hover:text-rose-gold transition-colors duration-200">Products</a></li>
              <li><a href="#" className="hover:text-rose-gold transition-colors duration-200">Contact</a></li>
              <li><a href="#" className="hover:text-rose-gold transition-colors duration-200">Shipping Info</a></li>
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-700 rounded-full hover:bg-rose-gold transition-all duration-200 transform hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-300 text-sm">
              WhatsApp: +254 721 787 191
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 ARIANNA BEAUTY. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;