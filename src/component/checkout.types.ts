// Product interface matching your existing Shopcaart structure
export interface Product {
  id: string;
  name: string;
  brand: string;
  variant: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  rating: number;
  image: string;
}

// Indian shipping address format
export interface ShippingAddress {
  fullName: string;
  mobile: string;
  pincode: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  city: string;
  state: string;
}

// Delivery options for Indian market
export interface DeliveryOption {
  id: 'standard' | 'express' | 'same-day';
  name: string;
  price: number;
  duration: string;
  description: string;
}

// Indian payment methods
export interface PaymentMethod {
  id: 'upi' | 'card' | 'netbanking' | 'cod';
  name: string;
  icon: string;
  description: string;
  popular: boolean;
}

// Order calculations with Indian GST
export interface OrderCalculation {
  subtotal: number;
  gst: number;
  shipping: number;
  total: number;
  savings?: number;
}

export interface CheckoutState {
  currentStep: number;
  cartItems: Product[];
  shippingAddress?: ShippingAddress;
  selectedDelivery: string;
  selectedPayment: string;
  orderCalculation: OrderCalculation;
  orderId?: string;
}

export type CheckoutStep = 1 | 2 | 3 | 4 | 5 | 6;
