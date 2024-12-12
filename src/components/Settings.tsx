import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface SettingsProps {
  darkMode: boolean;
  onDarkModeChange: (value: boolean) => void;
  onClose: () => void;
}

function Settings({ darkMode, onDarkModeChange, onClose }: SettingsProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
      <div className="absolute right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg">
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold dark:text-white">Settings</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {darkMode ? (
                <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              ) : (
                <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
              <span className="text-sm font-medium dark:text-white">Dark Mode</span>
            </div>
            <button
              onClick={() => onDarkModeChange(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out ${
                darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;