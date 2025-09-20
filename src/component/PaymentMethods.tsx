import React from 'react';
import type { PaymentMethod } from '../component/checkout.types';

interface PaymentMethodsProps {
  selectedPayment: string;
  paymentMethods: PaymentMethod[];
  onNext: () => void;
  onPrev: () => void;
  onSelectPayment: (paymentId: string) => void;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  selectedPayment,
  paymentMethods,
  onNext,
  onPrev,
  onSelectPayment
}) => {
  return (
    <div className="step-content">
      <div className="step-header">
        <h2>Choose Payment Method</h2>
        <p>Select your preferred payment option</p>
      </div>

      <div className="payment-methods">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`payment-method ${selectedPayment === method.id ? 'selected' : ''} ${method.popular ? 'popular' : ''}`}
            onClick={() => onSelectPayment(method.id)}
          >
            {method.popular && <div className="popular-badge">Popular</div>}
            
            <div className="method-header">
              <div className="radio-button">
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={selectedPayment === method.id}
                  onChange={() => onSelectPayment(method.id)}
                />
              </div>
              
              <div className="method-info">
                <div className="method-icon">{method.icon}</div>
                <div className="method-details">
                  <div className="method-name">{method.name}</div>
                  <div className="method-description">{method.description}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="payment-security">
        <div className="security-info">
          <span className="security-icon">🔒</span>
          <div>
            <div className="security-title">100% Safe & Secure Payments</div>
            <div className="security-description">
              Your payment information is encrypted and secure
            </div>
          </div>
        </div>
      </div>

      <div className="step-actions">
        <button type="button" className="btn-back" onClick={onPrev}>
          Back to Delivery
        </button>
        <button type="button" className="btn-continue" onClick={onNext}>
          Review Order
        </button>
      </div>
    </div>
  );
};
