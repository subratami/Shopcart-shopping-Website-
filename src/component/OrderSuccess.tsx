import React from 'react';
import type { CheckoutState } from '../component/checkout.types';

interface OrderSuccessProps {
  checkoutState: CheckoutState;
  onContinueShopping: () => void;
  onTrackOrder: (orderId: string) => void;
}

export const OrderSuccess: React.FC<OrderSuccessProps> = ({ 
  checkoutState, 
  onContinueShopping,
  onTrackOrder 
}) => {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 7);

  const handleTrackOrder = () => {
    if (checkoutState.orderId) {
      onTrackOrder(checkoutState.orderId);
    }
  };

  return (
    <div className="step-content success-page">
      <div className="success-header">
        <div className="success-icon">✅</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for shopping with Shopcart</p>
      </div>

      <div className="order-details">
        <div className="order-info">
          <div className="info-row">
            <span className="label">Order ID:</span>
            <span className="value">{checkoutState.orderId}</span>
          </div>
          <div className="info-row">
            <span className="label">Order Amount:</span>
            <span className="value">₹{checkoutState.orderCalculation.total.toLocaleString('en-IN')}</span>
          </div>
          <div className="info-row">
            <span className="label">Estimated Delivery:</span>
            <span className="value">{estimatedDelivery.toLocaleDateString('en-IN', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </div>

      <div className="next-steps">
        <h3>What's Next?</h3>
        <ul>
          <li>📧 Order confirmation email sent to your registered email</li>
          <li>📦 Your order will be packed and dispatched soon</li>
          <li>📱 You'll receive SMS updates about your order status</li>
          <li>🚚 Track your order in real-time once shipped</li>
        </ul>
      </div>

      <div className="success-actions">
        <button 
          type="button" 
          className="btn-continue-shopping"
          onClick={onContinueShopping}
        >
          Continue Shopping
        </button>
        <button 
          type="button" 
          className="btn-track-order"
          onClick={handleTrackOrder}
        >
          Track Order
        </button>
      </div>
    </div>
  );
};
