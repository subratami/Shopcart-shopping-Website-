import React from 'react';
import type { Product } from '../component/checkout.types';

interface CartReviewProps {
  cartItems: Product[];
  onNext: () => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}

export const CartReview: React.FC<CartReviewProps> = ({
  cartItems,
  onNext,
  onUpdateQuantity
}) => {

  return (
    <div className="step-content">
      <div className="step-header">
        <h2>Review Your Cart</h2>
        <p>Check your items and quantities before proceeding</p>
      </div>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={item.image} alt={`${item.brand} ${item.name}`} />
            </div>
            
            <div className="item-details">
              <div className="item-header">
                <div>
                  <h4>{item.brand}</h4>
                  <h3>{item.name}</h3>
                </div>
              </div>
              
              <div className="item-variant">{item.variant}</div>
              
              <div className="item-pricing">
                <div className="current-price">₹{item.price.toLocaleString('en-IN')}</div>
                {item.originalPrice && item.originalPrice > item.price && (
                  <div className="original-price">₹{item.originalPrice.toLocaleString('en-IN')}</div>
                )}
                {item.originalPrice && item.originalPrice > item.price && (
                  <div className="discount-percent">
                    {Math.round((1 - item.price / item.originalPrice) * 100)}% off
                  </div>
                )}
              </div>
              
              <div className="item-actions">
                <div className="quantity-selector">
                  <label>Qty:</label>
                  <select
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
                <button className="remove-item" type="button">
                  Remove
                </button>
              </div>
            </div>
            
            <div className="item-total">
              <div className="total-price">
                ₹{(item.price * item.quantity).toLocaleString('en-IN')}
              </div>
              {item.originalPrice && item.originalPrice > item.price && (
                <div className="total-savings">
                  Save ₹{((item.originalPrice - item.price) * item.quantity).toLocaleString('en-IN')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="step-actions">
        <button className="btn-continue" onClick={onNext}>
          Proceed to Shipping Address
        </button>
      </div>
    </div>
  );
};
