import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, List, Settings as SettingsIcon, ArrowLeft, Lock } from 'lucide-react';
import { Book } from '../types';
import TableOfContents from './TableOfContents';
import Settings from './Settings';
import { MDXProvider } from '@mdx-js/react';
import { VideoEmbed, CodeBlock, Alert, Quiz } from './mdx';
import { useAuth } from '../contexts/AuthContext';

interface EbookReaderProps {
  book: Book;
  onBack: () => void;
  isDarkMode: boolean;
  onDarkModeChange: (value: boolean) => void;
  isPreview?: boolean;
}

function EbookReader({ book, onBack, isDarkMode, onDarkModeChange, isPreview = false }: EbookReaderProps) {
  const [fontSize, setFontSize] = useState(16);
  const [showControls, setShowControls] = useState(true);
  const [showTOC, setShowTOC] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentSubchapterIndex, setCurrentSubchapterIndex] = useState(0);
  const [totalPagesRead, setTotalPagesRead] = useState(0);
  const { user } = useAuth();

  const hasActiveSubscription = user?.subscription?.status === 'active';

  useEffect(() => {
    if (isPreview) {
      setTotalPagesRead(prev => prev + 1);
    }
  }, [currentChapterIndex, currentSubchapterIndex, isPreview]);

  const currentChapter = book.chapters[currentChapterIndex];
  const currentSubchapter = currentChapter?.subchapters[currentSubchapterIndex];

  const components = {
    VideoEmbed,
    CodeBlock,
    Alert,
    Quiz
  };

  const handleNextSubchapter = () => {
    if (isPreview && totalPagesRead >= book.previewPages) {
      return;
    }

    if (currentChapter.subchapters.length - 1 > currentSubchapterIndex) {
      setCurrentSubchapterIndex(prev => prev + 1);
    } else if (book.chapters.length - 1 > currentChapterIndex) {
      setCurrentChapterIndex(prev => prev + 1);
      setCurrentSubchapterIndex(0);
    }
  };

  const handlePrevSubchapter = () => {
    if (currentSubchapterIndex > 0) {
      setCurrentSubchapterIndex(prev => prev - 1);
    } else if (currentChapterIndex > 0) {
      setCurrentChapterIndex(prev => prev - 1);
      setCurrentSubchapterIndex(book.chapters[currentChapterIndex - 1].subchapters.length - 1);
    }
  };

  const isPreviewLimitReached = isPreview && totalPagesRead >= book.previewPages;

  return (
    <div className="relative">
      {/* Top Navigation */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b dark:border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Library
          </button>
          {isPreview && (
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Preview: {totalPagesRead}/{book.previewPages} halaman
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <MDXProvider components={components}>
          <div 
            className="prose prose-blue dark:prose-invert max-w-none"
            style={{ fontSize: `${fontSize}px` }}
            onClick={() => setShowControls(prev => !prev)}
          >
            {isPreviewLimitReached ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center">
                <Lock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Batas Preview Tercapai
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Anda telah mencapai batas preview {book.previewPages} halaman. Untuk melanjutkan membaca, silakan berlangganan.
                </p>
                <button
                  onClick={onBack}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Berlangganan Sekarang
                </button>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
                {currentSubchapter?.content}
              </div>
            )}
          </div>
        </MDXProvider>
      </div>

      {/* Reading Controls */}
      {showControls && !isPreviewLimitReached && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowTOC(true)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <List className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button 
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <SettingsIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setFontSize(prev => Math.max(12, prev - 2))}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                A-
              </button>
              <span className="text-gray-600 dark:text-gray-400">{fontSize}px</span>
              <button 
                onClick={() => setFontSize(prev => Math.min(24, prev + 2))}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                A+
              </button>
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={handlePrevSubchapter}
                disabled={currentChapterIndex === 0 && currentSubchapterIndex === 0}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              <button 
                onClick={handleNextSubchapter}
                disabled={
                  (currentChapterIndex === book.chapters.length - 1 && 
                  currentSubchapterIndex === currentChapter.subchapters.length - 1) ||
                  (isPreview && totalPagesRead >= book.previewPages)
                }
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table of Contents Modal */}
      {showTOC && (
        <TableOfContents
          chapters={book.chapters}
          currentChapter={currentChapterIndex}
          currentSubchapter={currentSubchapterIndex}
          onSelect={(chapterIndex, subchapterIndex) => {
            if (isPreview && totalPagesRead >= book.previewPages) {
              return;
            }
            setCurrentChapterIndex(chapterIndex);
            setCurrentSubchapterIndex(subchapterIndex);
            setShowTOC(false);
          }}
          onClose={() => setShowTOC(false)}
          isPreview={isPreview}
          previewPagesRead={totalPagesRead}
          previewPagesLimit={book.previewPages}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          darkMode={isDarkMode}
          onDarkModeChange={onDarkModeChange}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default EbookReader;