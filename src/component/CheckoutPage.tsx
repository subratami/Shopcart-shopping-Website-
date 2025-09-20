import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../component/useCheckout';
import { ProgressIndicator } from '../component/ProgressIndicator';
import { CartReview } from './CartReview';
import { ShippingForm } from './ShippingForm';
import { DeliveryOptions } from './DeliveryOptions';
import { PaymentMethods } from './PaymentMethods';
import { OrderReview } from './OrderReview';
import { OrderSuccess } from './OrderSuccess';
import type { Product } from '../component/checkout.types';
import '../component/checkout.css';

// Configuration data (keep these)
const DELIVERY_OPTIONS = [
  {
    id: 'standard' as const,
    name: 'Standard Delivery',
    price: 0,
    duration: '5-7 business days',
    description: 'Free delivery for orders above ₹500'
  },
  {
    id: 'express' as const,
    name: 'Express Delivery', 
    price: 99,
    duration: '2-3 business days',
    description: 'Fast delivery'
  },
  {
    id: 'same-day' as const,
    name: 'Same Day Delivery',
    price: 199,
    duration: 'Within 6 hours',
    description: 'Available in select cities'
  }
];

const PAYMENT_METHODS = [
  {
    id: 'upi' as const,
    name: 'UPI',
    icon: '📱',
    description: 'Google Pay, PhonePe, Paytm',
    popular: true
  },
  {
    id: 'card' as const,
    name: 'Credit/Debit Card',
    icon: '💳', 
    description: 'Visa, MasterCard, RuPay',
    popular: true
  },
  {
    id: 'netbanking' as const,
    name: 'Net Banking',
    icon: '🏦',
    description: 'All major banks supported',
    popular: false
  },
  {
    id: 'cod' as const,
    name: 'Cash on Delivery',
    icon: '💵',
    description: 'Pay when you receive',
    popular: false
  }
];

interface CheckoutPageProps {
  cartItems?: Product[];
  onClose?: () => void;
  onContinueShopping?: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ 
  cartItems = [],
  onClose,
  onContinueShopping
}) => {
  const navigate = useNavigate(); 

  const {
    checkoutState,
    nextStep,
    prevStep,
    updateShippingAddress,
    updateDeliveryOption,
    updatePaymentMethod,
    updateQuantity,
    placeOrder
  } = useCheckout(cartItems);

  // Handle empty cart with React Router DOM 7 navigation
  const handleContinueShopping = () => {
   if (onContinueShopping) {
      onContinueShopping();
    } else {
      // Fallback to window navigation if no callback provided
      window.location.href = '/';
    }
  };

  const handleTrackOrder = (orderId: string) => {
    // Simple navigation without router
    window.location.href = `/orders/${orderId}`;
  };

  const handleGoBack = () => {
    if (onClose) {
      onClose();
    } else {
      // Fallback to browser back
      window.history.back();
    }
  };

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <header className="checkout-header">
          <div className="container">
            <div className="header-content">
              <h1 className="logo">Shopcart</h1>
               {onClose && (
                <button className="close-btn" onClick={handleGoBack}>
                  ✕
                </button>
              )}
            </div>
          </div>
        </header>
        <main className="main">
          <div className="container">
            <div className="empty-cart-message">
              <h2>Your cart is empty</h2>
              <p>Add some items to your cart before proceeding to checkout.</p>
              <button 
                onClick={handleContinueShopping}
                className="btn-continue-shopping"
                type="button"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const renderCurrentStep = () => {
    switch (checkoutState.currentStep) {
      case 1:
        return (
          <CartReview
            cartItems={checkoutState.cartItems}
            onNext={nextStep}
            onUpdateQuantity={updateQuantity}
          />
        );
      case 2:
        return (
          <ShippingForm
            shippingAddress={checkoutState.shippingAddress}
            onNext={nextStep}
            onPrev={prevStep}
            onUpdateAddress={updateShippingAddress}
          />
        );
      case 3:
        return (
          <DeliveryOptions
            selectedDelivery={checkoutState.selectedDelivery}
            deliveryOptions={DELIVERY_OPTIONS}
            onNext={nextStep}
            onPrev={prevStep}
            onSelectDelivery={updateDeliveryOption}
          />
        );
      case 4:
        return (
          <PaymentMethods
            selectedPayment={checkoutState.selectedPayment}
            paymentMethods={PAYMENT_METHODS}
            onNext={nextStep}
            onPrev={prevStep}
            onSelectPayment={updatePaymentMethod}
          />
        );
      case 5:
        return (
          <OrderReview
            checkoutState={checkoutState}
            deliveryOptions={DELIVERY_OPTIONS}
            paymentMethods={PAYMENT_METHODS}
            onPrev={prevStep}
            onPlaceOrder={placeOrder}
          />
        );
      case 6:
        return (
          <OrderSuccess
            checkoutState={checkoutState}
            onContinueShopping={handleContinueShopping}
            onTrackOrder={(orderId) => navigate(`/orders/${orderId}`)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="checkout-page">
     {/* <header className="checkout-header">
        <div className="container">
          <div className="header-content">
            <h1 className="logo">Shopcart</h1> 
            <div className="header-actions">
            <div className="user-info">
              <span>Hi</span>
            </div>
            {onClose && (
                <button className="close-btn" onClick={handleGoBack} title="Close">
                  ✕
                </button>
              )}
            </div>.
          </div>
        </div>
      </header> */}

      <main className="main">
        <div className="container">
          <div className="checkout-container">
            {checkoutState.currentStep < 6 && (
              <ProgressIndicator
                currentStep={checkoutState.currentStep}
                totalSteps={5}
              />
            )}

            <div className="checkout-content">
              <div className="checkout-main">
                {renderCurrentStep()}
              </div>

              {checkoutState.currentStep < 6 && (
                <div className="checkout-sidebar">
                  <div className="order-summary">
                    <h3>Order Summary</h3>
                    
                    <div className="summary-items">
                      {checkoutState.cartItems.map((item) => (
                        <div key={item.id} className="summary-item">
                          <img src={item.image} alt={item.name} />
                          <div className="item-info">
                            <div className="item-name">{item.brand} {item.name}</div>
                            <div className="item-variant">{item.variant}</div>
                            <div className="item-qty">Qty: {item.quantity}</div>
                          </div>
                          <div className="item-price">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="summary-calculations">
                      <div className="summary-line">
                        <span>Subtotal ({checkoutState.cartItems.length} items)</span>
                        <span>₹{checkoutState.orderCalculation.subtotal.toLocaleString('en-IN')}</span>
                      </div>
                      
                      {checkoutState.orderCalculation.savings && checkoutState.orderCalculation.savings > 0 && (
                        <div className="summary-line discount">
                          <span>Savings</span>
                          <span>-₹{checkoutState.orderCalculation.savings.toLocaleString('en-IN')}</span>
                        </div>
                      )}
                      
                      <div className="summary-line">
                        <span>Shipping</span>
                        <span>
                          {checkoutState.orderCalculation.shipping === 0 ? (
                            <span className="free-shipping">FREE</span>
                          ) : (
                            `₹${checkoutState.orderCalculation.shipping}`
                          )}
                        </span>
                      </div>
                      
                      <div className="summary-line total">
                        <span>Total Amount</span>
                        <span>₹{checkoutState.orderCalculation.total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    
                    {checkoutState.orderCalculation.savings && checkoutState.orderCalculation.savings > 0 && (
                      <div className="savings-badge">
                        You save ₹{checkoutState.orderCalculation.savings.toLocaleString('en-IN')} on this order
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
