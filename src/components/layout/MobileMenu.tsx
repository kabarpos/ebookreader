import React from 'react';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useScrollLock } from '../../hooks/useScrollLock';

interface MobileMenuProps {
  isOpen: boolean;
  onToggle: () => void;
  onNavigate: (view: string) => void;
}

export default function MobileMenu({ isOpen, onToggle, onNavigate }: MobileMenuProps) {
  const { user, logout } = useAuth();
  useScrollLock(isOpen);

  const handleLogout = () => {
    logout();
    onToggle();
  };

  const handleNavigate = (view: string) => {
    onNavigate(view);
    onToggle();
  };

  const handleLogin = () => {
    window.dispatchEvent(new CustomEvent('open-auth-modal'));
    onToggle();
  };

  return (
    <>
      <button
        onClick={onToggle}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm"
            onClick={onToggle}
          />

          {/* Menu Panel */}
          <div className="lg:hidden fixed inset-y-0 right-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-200 ease-in-out">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  {user ? (
                    <>
                      <div className="border-b dark:border-gray-700 pb-4 mb-4">
                        <p className="text-gray-900 dark:text-white font-medium">{user.name}</p>
                        {user.subscription?.status === 'active' && (
                          <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                            {user.subscription.type === 'monthly' ? 'Langganan Bulanan' : 'Langganan Tahunan'}
                          </p>
                        )}
                      </div>
                      <nav className="space-y-1">
                        <button
                          onClick={() => handleNavigate('dashboard')}
                          className="w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          Perpustakaan
                        </button>
                        {!user.subscription?.status && (
                          <button
                            onClick={() => handleNavigate('subscription')}
                            className="w-full text-left px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                          >
                            Berlangganan
                          </button>
                        )}
                      </nav>
                    </>
                  ) : (
                    <button
                      onClick={handleLogin}
                      className="w-full bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
                    >
                      Masuk
                    </button>
                  )}
                </div>
              </div>

              {user && (
                <div className="p-4 border-t dark:border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}