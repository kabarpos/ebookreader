import React, { useState } from 'react';
import { Book } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../theme/ThemeToggle';
import MobileMenu from './MobileMenu';

interface NavbarProps {
  onBackToDashboard: () => void;
  onNavigate: (view: string) => void;
}

export default function Navbar({ onBackToDashboard, onNavigate }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div 
            className="flex items-center cursor-pointer" 
            onClick={onBackToDashboard}
          >
            <Book className="h-8 w-8 text-blue-600 dark:text-blue-500" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
              EduReader
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {user && (
              <>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                >
                  Perpustakaan
                </button>
                {!user.subscription?.status && (
                  <button
                    onClick={() => onNavigate('subscription')}
                    className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  >
                    Berlangganan
                  </button>
                )}
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                  {user.subscription?.status === 'active' && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-sm rounded-full">
                      {user.subscription.type === 'monthly' ? 'Langganan Bulanan' : 'Langganan Tahunan'}
                    </span>
                  )}
                  <button
                    onClick={logout}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    Keluar
                  </button>
                </div>
              </>
            )}
            {!user && (
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal'))}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Masuk
              </button>
            )}
          </div>

          {/* Theme Toggle and Mobile Menu */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <MobileMenu
              isOpen={isMobileMenuOpen}
              onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              onNavigate={onNavigate}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}