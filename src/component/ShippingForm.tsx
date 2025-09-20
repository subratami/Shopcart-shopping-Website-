import React, { useState } from 'react';
import type { ShippingAddress } from '../component/checkout.types';

interface ShippingFormProps {
  shippingAddress?: ShippingAddress;
  onNext: () => void;   
  onPrev: () => void;
  onUpdateAddress: (address: ShippingAddress) => void;
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
  "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal"
];

export const ShippingForm: React.FC<ShippingFormProps> = ({
  shippingAddress,
  onNext,
  onPrev,
  onUpdateAddress
}) => {
  const [formData, setFormData] = useState<ShippingAddress>(shippingAddress || {
    fullName: '',
    mobile: '',
    pincode: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'PIN code is required';
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    
    // PIN code validation for India (6 digits, doesn't start with 0)
    if (formData.pincode && !/^[1-9][0-9]{5}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }
    
    // Mobile validation for India (10 digits, starts with 6-9)
    if (formData.mobile && !/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onUpdateAddress(formData);
      onNext();
    }
  };

  const updateField = (field: keyof ShippingAddress, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="step-content">
      <div className="step-header">
        <h2>Shipping Address</h2>
        <p>Enter your delivery address details</p>
      </div>

      <form onSubmit={handleSubmit} className="shipping-form">
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="fullName">Full Name *</label>
            <input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => updateField('fullName', e.target.value)}
              className={errors.fullName ? 'error' : ''}
              placeholder="Enter your full name"
            />
            {errors.fullName && <span className="error-text">{errors.fullName}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Mobile Number *</label>
            <input
              id="mobile"
              type="tel"
              value={formData.mobile}
              onChange={(e) => updateField('mobile', e.target.value)}
              placeholder="10-digit mobile number"
              className={errors.mobile ? 'error' : ''}
              maxLength={10}
            />
            {errors.mobile && <span className="error-text">{errors.mobile}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="pincode">PIN Code *</label>
            <input
              id="pincode"
              type="text"
              value={formData.pincode}
              onChange={(e) => updateField('pincode', e.target.value)}
              placeholder="6-digit PIN code"
              maxLength={6}
              className={errors.pincode ? 'error' : ''}
            />
            {errors.pincode && <span className="error-text">{errors.pincode}</span>}
          </div>

          <div className="form-group full-width">
            <label htmlFor="addressLine1">Address Line 1 *</label>
            <input
              id="addressLine1"
              type="text"
              value={formData.addressLine1}
              onChange={(e) => updateField('addressLine1', e.target.value)}
              placeholder="House No., Building Name, Street"
              className={errors.addressLine1 ? 'error' : ''}
            />
            {errors.addressLine1 && <span className="error-text">{errors.addressLine1}</span>}
          </div>

          <div className="form-group full-width">
            <label htmlFor="addressLine2">Address Line 2 (Optional)</label>
            <input
              id="addressLine2"
              type="text"
              value={formData.addressLine2}
              onChange={(e) => updateField('addressLine2', e.target.value)}
              placeholder="Area, Colony, Sector"
            />
          </div>

          <div className="form-group">
            <label htmlFor="landmark">Landmark (Optional)</label>
            <input
              id="landmark"
              type="text"
              value={formData.landmark}
              onChange={(e) => updateField('landmark', e.target.value)}
              placeholder="Near by landmark"
            />
          </div>

          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              id="city"
              type="text"
              value={formData.city}
              onChange={(e) => updateField('city', e.target.value)}
              placeholder="Enter your city"
              className={errors.city ? 'error' : ''}
            />
            {errors.city && <span className="error-text">{errors.city}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="state">State *</label>
            <select
              id="state"
              value={formData.state}
              onChange={(e) => updateField('state', e.target.value)}
              className={errors.state ? 'error' : ''}
            >
              <option value="">Select State</option>
              {INDIAN_STATES.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {errors.state && <span className="error-text">{errors.state}</span>}
          </div>
        </div>

        <div className="step-actions">
          <button type="button" className="btn-back" onClick={onPrev}>
            Back to Cart
          </button>
          <button type="submit" className="btn-continue">
            Continue to Delivery
          </button>
        </div>
      </form>
    </div>
  );
};
