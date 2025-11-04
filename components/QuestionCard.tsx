
import React from 'react';

interface QuestionCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
  onSubmit?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  isLoading?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  title,
  icon,
  children,
  onNext,
  onPrev,
  onSubmit,
  isFirst = false,
  isLast = false,
  isLoading = false,
}) => {
  return (
    <div className="animate-fade-in">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2>
      </div>
      
      <div className="space-y-4">
        {children}
      </div>

      <div className="mt-8 flex justify-between items-center">
        {!isFirst ? (
          <button
            onClick={onPrev}
            className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-700 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Back
          </button>
        ) : <div />}
        
        {!isLast ? (
          <button
            onClick={onNext}
            className="px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          >
            Next
          </button>
        ) : (
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="px-6 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition disabled:bg-green-400 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading && (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isLoading ? 'Generating...' : 'Create My Plan'}
          </button>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
