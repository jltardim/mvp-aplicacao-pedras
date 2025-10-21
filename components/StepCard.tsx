import React from 'react';

interface StepCardProps {
  title: string;
  stepNumber: number;
  children: React.ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({ title, stepNumber, children }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-indigo-500 text-white rounded-full h-8 w-8 flex items-center justify-center font-bold">
            {stepNumber}
          </div>
          <h2 className="ml-4 text-xl font-semibold text-gray-800">{title}</h2>
        </div>
      </div>
      <div className="p-6 pt-0 flex-grow">{children}</div>
    </div>
  );
};

export default StepCard;