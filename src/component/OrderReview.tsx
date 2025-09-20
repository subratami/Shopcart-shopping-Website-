import React, { useState } from 'react';
import type { CheckoutState, DeliveryOption, PaymentMethod } from '../component/checkout.types';

interface OrderReviewProps {
  checkoutState: CheckoutState;
  deliveryOptions: DeliveryOption[];
  paymentMethods: PaymentMethod[];
  onPrev: () => void;
  onPlaceOrder: () => Promise<string>;
}

export const OrderReview: React.FC<OrderReviewProps> = ({
  checkoutState,
  deliveryOptions,
  paymentMethods,
  onPrev,
  onPlaceOrder
}) => {
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const selectedDeliveryOption = deliveryOptions.find(
    option => option.id === checkoutState.selectedDelivery
  );
  
  const selectedPaymentMethod = paymentMethods.find(
    method => method.id === checkoutState.selectedPayment
  );

  const handlePlaceOrder = async () => {
    setIsPlacingOrder(true);
    try {
      await onPlaceOrder();
    } catch (error) {
      console.error('Order placement failed:', error);
      setIsPlacingOrder(false);
    }
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2>Review Your Order</h2>
        <p>Please review all details before placing your order</p>
      </div>

      <div className="order-review">
        {/* Shipping Address */}
        <div className="review-section">
          <h3>Delivery Address</h3>
          {checkoutState.shippingAddress && (
            <div className="address-card">
              <div className="address-name">{checkoutState.shippingAddress.fullName}</div>
              <div className="address-details">
                {checkoutState.shippingAddress.addressLine1}
                {checkoutState.shippingAddress.addressLine2 && (
                  <>, {checkoutState.shippingAddress.addressLine2}</>
                )}
              </div>
              {checkoutState.shippingAddress.landmark && (
                <div className="address-landmark">
                  Near {checkoutState.shippingAddress.landmark}
                </div>
              )}
              <div className="address-location">
                {checkoutState.shippingAddress.city}, {checkoutState.shippingAddress.state} - {checkoutState.shippingAddress.pincode}
              </div>
              <div className="address-mobile">Mobile: {checkoutState.shippingAddress.mobile}</div>
            </div>
          )}
        </div>

        {/* Delivery Option */}
        <div className="review-section">
          <h3>Delivery Option</h3>
          {selectedDeliveryOption && (
            <div className="delivery-card">
              <div className="delivery-name">{selectedDeliveryOption.name}</div>
              <div className="delivery-duration">{selectedDeliveryOption.duration}</div>
              <div className="delivery-price">
                {selectedDeliveryOption.price === 0 ? 'FREE' : `₹${selectedDeliveryOption.price}`}
              </div>
            </div>
          )}
        </div>

        {/* Payment Method */}
        <div className="review-section">
          <h3>Payment Method</h3>
          {selectedPaymentMethod && (
            <div className="payment-card">
              <span className="payment-icon">{selectedPaymentMethod.icon}</span>
              <div className="payment-info">
                <div className="payment-name">{selectedPaymentMethod.name}</div>
                <div className="payment-description">{selectedPaymentMethod.description}</div>
              </div>
            </div>
          )}
        </div>

        {/* Order Items */}
        <div className="review-section">
          <h3>Order Items ({checkoutState.cartItems.length} items)</h3>
          <div className="review-items">
            {checkoutState.cartItems.map((item) => (
              <div key={item.id} className="review-item">
                <img src={item.image} alt={`${item.brand} ${item.name}`} />
                <div className="item-info">
                  <div className="item-name">{item.brand} {item.name}</div>
                  <div className="item-variant">{item.variant}</div>
                  <div className="item-qty">Qty: {item.quantity}</div>
                </div>
                <div className="item-price">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="step-actions">
        <button type="button" className="btn-back" onClick={onPrev} disabled={isPlacingOrder}>
          Back to Payment
        </button>
        <button 
          type="button" 
          className="btn-place-order" 
          onClick={handlePlaceOrder}
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? 'Placing Order...' : `Place Order ₹${checkoutState.orderCalculation.total.toLocaleString('en-IN')}`}
        </button>
      </div>
    </div>
  );
};
