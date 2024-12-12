import React from 'react';
import { X, ChevronRight, Lock } from 'lucide-react';
import { Chapter } from '../types';

interface TableOfContentsProps {
  chapters: Chapter[];
  currentChapter: number;
  currentSubchapter: number;
  onSelect: (chapterIndex: number, subchapterIndex: number) => void;
  onClose: () => void;
  isPreview?: boolean;
  previewPagesRead?: number;
  previewPagesLimit?: number;
}

function TableOfContents({
  chapters,
  currentChapter,
  currentSubchapter,
  onSelect,
  onClose,
  isPreview = false,
  previewPagesRead = 0,
  previewPagesLimit = 0
}: TableOfContentsProps) {
  let pagesCount = 0;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      
      <div className="absolute inset-y-0 left-0 max-w-md w-full bg-white dark:bg-gray-800 shadow-xl">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="px-4 py-6 border-b dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Table of Contents
              </h2>
              {isPreview && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {previewPagesRead}/{previewPagesLimit} halaman
                </div>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            <nav className="px-4 py-4">
              {chapters.map((chapter, chapterIndex) => {
                const chapterStart = pagesCount;
                pagesCount += chapter.subchapters.length;
                const isLocked = isPreview && chapterStart >= previewPagesLimit;

                return (
                  <div key={chapter.id} className="mb-6">
                    <div 
                      className={`flex items-center text-lg font-semibold mb-2 ${
                        isLocked 
                          ? 'text-gray-400 cursor-not-allowed' 
                          : 'text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                      onClick={() => !isLocked && onSelect(chapterIndex, 0)}
                    >
                      <ChevronRight className="h-5 w-5 mr-2" />
                      {chapter.title}
                      {isLocked && <Lock className="h-4 w-4 ml-2" />}
                    </div>
                    
                    <ul className="ml-7 space-y-2">
                      {chapter.subchapters.map((subchapter, subchapterIndex) => {
                        const pageNumber = chapterStart + subchapterIndex;
                        const isSubchapterLocked = isPreview && pageNumber >= previewPagesLimit;

                        return (
                          <li key={subchapter.id} className="flex items-center justify-between">
                            <button
                              className={`text-sm ${
                                isSubchapterLocked
                                  ? 'text-gray-400 cursor-not-allowed'
                                  : currentChapter === chapterIndex && 
                                    currentSubchapter === subchapterIndex
                                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                              }`}
                              onClick={() => !isSubchapterLocked && onSelect(chapterIndex, subchapterIndex)}
                              disabled={isSubchapterLocked}
                            >
                              {subchapter.title}
                            </button>
                            {isSubchapterLocked && <Lock className="h-3 w-3 text-gray-400" />}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableOfContents;