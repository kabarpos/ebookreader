import React from 'react';
import { AlertProps } from '../../types';
import { AlertCircle, AlertTriangle, Info } from 'lucide-react';

const alertStyles = {
  tip: 'bg-blue-50 border-blue-200 text-blue-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  error: 'bg-red-50 border-red-200 text-red-800'
} as const;

const alertIcons = {
  tip: Info,
  warning: AlertTriangle,
  error: AlertCircle
} as const;

const Alert = ({ type, children }: AlertProps) => {
  const Icon = alertIcons[type];

  return (
    <div className={`p-4 mb-6 border-l-4 rounded-r-lg ${alertStyles[type]}`}>
      <div className="flex items-start">
        <Icon className="h-5 w-5 mr-3 mt-0.5" />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Alert;