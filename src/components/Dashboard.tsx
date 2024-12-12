import React from 'react';
import { Book as BookType } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { Lock, BookOpen } from 'lucide-react';

interface DashboardProps {
  books: BookType[];
  onBookSelect: (bookId: number, isPreview?: boolean) => void;
}

function Dashboard({ books, onBookSelect }: DashboardProps) {
  const { user } = useAuth();
  const hasActiveSubscription = user?.subscription?.status === 'active';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {!hasActiveSubscription && user && (
        <div className="mb-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Lock className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Anda belum berlangganan. Berlangganan sekarang untuk akses semua buku!
              </p>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Perpustakaan Digital</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div 
            key={book.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
          >
            <img 
              src={book.coverImage} 
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {book.title}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                by {book.author}
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {book.description}
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => onBookSelect(book.id, true)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-200 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Baca Preview</span>
                </button>
                {!hasActiveSubscription && (
                  <button
                    onClick={() => onBookSelect(book.id)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Lock className="h-4 w-4" />
                    <span>Langganan</span>
                  </button>
                )}
                {hasActiveSubscription && (
                  <button
                    onClick={() => onBookSelect(book.id)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>Baca Lengkap</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;