
import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
  return (
    <div>
      <p className="text-sm font-medium text-center text-gray-500 dark:text-gray-400 mb-2">
        Step {currentStep} of {totalSteps}
      </p>
      <div className="flex items-center">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
          <React.Fragment key={step}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {step}
            </div>
            {step < totalSteps && (
              <div className={`flex-1 h-1 transition-all duration-300 ${
                currentStep > step ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
