import React, { useState } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

interface AuthModalProps {
  onClose: () => void;
}

function AuthModal({ onClose }: AuthModalProps) {
  const [view, setView] = useState<'login' | 'register'>('login');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="relative w-full max-w-md transform rounded-lg bg-white p-6 shadow-xl transition-all">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {view === 'login' ? 'Masuk ke Akun' : 'Daftar Akun Baru'}
            </h2>
          </div>

          {view === 'login' ? (
            <>
              <LoginForm onClose={onClose} />
              <p className="mt-4 text-center text-sm text-gray-600">
                Belum punya akun?{' '}
                <button
                  onClick={() => setView('register')}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Daftar sekarang
                </button>
              </p>
            </>
          ) : (
            <>
              <RegisterForm onClose={onClose} />
              <p className="mt-4 text-center text-sm text-gray-600">
                Sudah punya akun?{' '}
                <button
                  onClick={() => setView('login')}
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Masuk
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;