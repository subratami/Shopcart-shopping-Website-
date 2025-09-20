import { useState, useEffect, useCallback } from 'react';
import type { CheckoutState, Product, ShippingAddress } from '../component/checkout.types';

export const useCheckout = (initialCartItems: Product[] = []) => {
  const [checkoutState, setCheckoutState] = useState<CheckoutState>(() => ({
    currentStep: 1,
    cartItems: initialCartItems,
    selectedDelivery: 'standard',
    selectedPayment: 'upi',
    orderCalculation: {
      subtotal: 0,
      gst: 0,
      shipping: 0,
      total: 0
    }
  }));

  // Calculate order totals with React 19 optimizations
  const calculateTotals = useCallback(() => {
    const { cartItems, selectedDelivery } = checkoutState;
    
    const subtotal = cartItems.reduce(
      (sum, item) => sum + (item.price * item.quantity), 0
    );
    
    const savings = cartItems.reduce(
      (sum, item) => sum + ((item.originalPrice || item.price) - item.price) * item.quantity, 0
    );
    
    //const gst = Math.floor(subtotal * 0.18); // 18% GST
    
    let shipping = 0;
    if (selectedDelivery === 'express') shipping = 99;
    else if (selectedDelivery === 'same-day') shipping = 199;
    
    // Free shipping above ₹500 for standard delivery
    if (subtotal > 500 && selectedDelivery === 'standard') {
      shipping = 0;
    } else if (selectedDelivery === 'standard' && subtotal <= 500) {
      shipping = 40;
    }
    
    const total = subtotal + shipping;

    return { subtotal, shipping, total, savings };
  }, [checkoutState.cartItems, checkoutState.selectedDelivery]);

  // Use React 19's improved useEffect
  useEffect(() => {
    const newCalculation = calculateTotals();
    setCheckoutState(prev => ({
      ...prev,
      orderCalculation: newCalculation
    }));
  }, [calculateTotals]);

  const nextStep = useCallback(() => {
    setCheckoutState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, 6)
    }));
  }, []);

  const prevStep = useCallback(() => {
    setCheckoutState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 1)
    }));
  }, []);

  const updateShippingAddress = useCallback((address: ShippingAddress) => {
    setCheckoutState(prev => ({ ...prev, shippingAddress: address }));
  }, []);

  const updateDeliveryOption = useCallback((deliveryId: string) => {
    setCheckoutState(prev => ({ ...prev, selectedDelivery: deliveryId }));
  }, []);

  const updatePaymentMethod = useCallback((paymentId: string) => {
    setCheckoutState(prev => ({ ...prev, selectedPayment: paymentId }));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCheckoutState(prev => ({
      ...prev,
      cartItems: prev.cartItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    }));
  }, []);

  const placeOrder = useCallback(async (): Promise<string> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderId = `ORD${Date.now()}`;
    setCheckoutState(prev => ({
      ...prev,
      orderId,
      currentStep: 6
    }));
    
    return orderId;
  }, []);

  return {
    checkoutState,
    nextStep,
    prevStep,
    updateShippingAddress,
    updateDeliveryOption,
    updatePaymentMethod,
    updateQuantity,
    placeOrder
  };
};
