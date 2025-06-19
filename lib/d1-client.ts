// Cloudflare D1 Client for ARIANNA BEAUTY
// This replaces the Supabase client with D1 API calls

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  in_stock: boolean;
  created_at: string;
}

export interface Order {
  id: number;
  items: any[];
  total: number;
  whatsapp: string;
  created_at: string;
  status: string;
}

export interface Database {
  public: {
    Tables: {
      products: {
        Row: Product;
        Insert: Omit<Product, 'id' | 'created_at'>;
        Update: Partial<Omit<Product, 'id' | 'created_at'>>;
      };
      orders: {
        Row: Order;
        Insert: Omit<Order, 'id' | 'created_at' | 'status'>;
        Update: Partial<Omit<Order, 'id' | 'created_at'>>;
      };
    };
  };
}

class D1Client {
  private baseUrl: string;

  constructor() {
    // Use the current domain for API calls
    this.baseUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : 'http://localhost:5173';
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}/api/${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'API request failed');
    }

    return data;
  }

  // Products API
  products = {
    select: (columns: string = '*') => ({
      order: (column: string, options?: { ascending?: boolean }) => ({
        async all() {
          const data = await this.makeRequest('products');
          let results = data.data || [];
          
          // Sort results if needed
          if (column === 'created_at' && options?.ascending === false) {
            results.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
          }
          
          return { data: results, error: null };
        }
      })
    }),

    insert: async (values: any[]) => {
      const results = [];
      for (const value of values) {
        const data = await this.makeRequest('add-product', {
          method: 'POST',
          body: JSON.stringify(value),
        });
        results.push(data.data);
      }
      return { data: results, error: null };
    },

    update: (updates: any) => ({
      eq: (column: string, value: any) => ({
        async execute() {
          const data = await this.makeRequest(`update-product/${value}`, {
            method: 'PUT',
            body: JSON.stringify(updates),
          });
          return { data: data.data, error: null };
        }
      })
    }),

    delete: () => ({
      eq: (column: string, value: any) => ({
        async execute() {
          const data = await this.makeRequest(`delete-product/${value}`, {
            method: 'DELETE',
          });
          return { data: data.data, error: null };
        }
      })
    })
  };

  // Orders API
  orders = {
    select: (columns: string = '*') => ({
      order: (column: string, options?: { ascending?: boolean }) => ({
        limit: (count: number) => ({
          async all() {
            const data = await this.makeRequest('orders');
            let results = data.data || [];
            
            // Sort and limit results
            if (column === 'created_at' && options?.ascending === false) {
              results.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            }
            
            return { data: results.slice(0, count), error: null };
          }
        })
      })
    }),

    insert: async (values: any[]) => {
      const results = [];
      for (const value of values) {
        const data = await this.makeRequest('orders', {
          method: 'POST',
          body: JSON.stringify(value),
        });
        results.push(data.data);
      }
      return { data: results, error: null };
    }
  };

  // Auth placeholder (for compatibility)
  auth = {
    getUser: async () => ({ data: { user: null }, error: null }),
    signInWithPassword: async () => ({ data: { user: null }, error: { message: 'Auth not implemented with D1' } }),
    signOut: async () => ({ error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } })
  };

  // From method for table selection
  from(table: string) {
    if (table === 'products') {
      return this.products;
    }
    if (table === 'orders') {
      return this.orders;
    }
    throw new Error(`Table ${table} not supported`);
  }
}

// Create and export the D1 client instance
export const supabase = new D1Client();

// Export types for compatibility
export type { Product, Order, Database };