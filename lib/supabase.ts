import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pktfydiamqkcfcjkfbcg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBrdGZ5ZGlhbXFrY2ZjamtmYmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAyMzA3ODEsImV4cCI6MjA2NTgwNjc4MX0.8m9GDnQLqC0kQNqK1qhd59BosFX6it7_JkuY9Qawj2c';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          in_stock: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          price: number;
          image_url?: string | null;
          in_stock?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          price?: number;
          image_url?: string | null;
          in_stock?: boolean;
          created_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          items: any;
          total: number;
          whatsapp: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          items: any;
          total: number;
          whatsapp: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          items?: any;
          total?: number;
          whatsapp?: string;
          created_at?: string;
        };
      };
    };
  };
};

export type Product = Database['public']['Tables']['products']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];