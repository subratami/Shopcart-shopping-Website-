import React from 'react';
import type { DeliveryOption } from './checkout.types';

interface DeliveryOptionsProps {
  selectedDelivery: string;
  deliveryOptions: DeliveryOption[];
  onNext: () => void;
  onPrev: () => void;
  onSelectDelivery: (deliveryId: string) => void;
}

export const DeliveryOptions: React.FC<DeliveryOptionsProps> = ({
  selectedDelivery,
  deliveryOptions,
  onNext,
  onPrev,
  onSelectDelivery
}) => {
  return (
    <div className="step-content">
      <div className="step-header">
        <h2>Choose Delivery Option</h2>
        <p>Select your preferred delivery method</p>
      </div>

      <div className="delivery-options">
        {deliveryOptions.map((option) => (
          <div
            key={option.id}
            className={`delivery-option ${selectedDelivery === option.id ? 'selected' : ''}`}
            onClick={() => onSelectDelivery(option.id)}
          >
            <div className="option-header">
              <div className="radio-button">
                <input
                  type="radio"
                  name="delivery"
                  value={option.id}
                  checked={selectedDelivery === option.id}
                  onChange={() => onSelectDelivery(option.id)}
                />
              </div>
              <div className="option-info">
                <div className="option-name">{option.name}</div>
                <div className="option-duration">{option.duration}</div>
                <div className="option-description">{option.description}</div>
              </div>
              <div className="option-price">
                {option.price === 0 ? (
                  <span className="free-price">FREE</span>
                ) : (
                  <span className="paid-price">₹{option.price}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="delivery-info">
        <div className="info-item">
          <span className="info-icon">📦</span>
          <span>All items will be delivered together</span>
        </div>
        <div className="info-item">
          <span className="info-icon">🛡️</span>
          <span>Safe and secure packaging</span>
        </div>
        <div className="info-item">
          <span className="info-icon">📱</span>
          <span>Real-time tracking available</span>
        </div>
      </div>

      <div className="step-actions">
        <button type="button" className="btn-back" onClick={onPrev}>
          Back to Address
        </button>
        <button type="button" className="btn-continue" onClick={onNext}>
          Continue to Payment
        </button>
      </div>
    </div>
  );
};
