import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_LABELS = ['Cart', 'Address', 'Delivery', 'Payment', 'Review'];

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps
}) => {
  return (
    <div className="progress-indicator">
      {STEP_LABELS.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;
        
        return (
          <div
            key={stepNumber}
            className={`progress-step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
          >
            <div className="step-circle">
              {isCompleted ? '✓' : stepNumber}
            </div>
            <span className="step-label">{label}</span>
          </div>
        );
      })}
    </div>
  );
};
