export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice: number;
  badge?: string;
  image: string;
  gsm: number; // e.g. 240 GSM
  fit: string; // e.g. "Oversized Drop-Shoulder"
  print: string; // e.g. "Puff Print / High Density screen print"
  fabric: string; // e.g. "100% Cotton French Terry"
  colors: string[];
  sizes: ('M' | 'L' | 'XL' | 'XXL')[];
  description: string;
}

export interface Review {
  id: string;
  author: string;
  city: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  productName: string;
  image?: string; // photo review
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  city: string;
  address: string;
  productId: string;
  size: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: 'COD'; // Cash on Delivery is king in PK
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: string;
}
