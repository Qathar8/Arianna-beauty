export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'perfume' | 'skincare' | 'makeup' | 'accessories';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}