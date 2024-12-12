import React, { useState } from 'react';
import { QuizProps } from '../../types';

const Quiz = ({ question, options, answer }: QuizProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowResult(true);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">{question}</h3>
      <div className="space-y-3">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResult && setSelectedAnswer(index)}
            className={`w-full text-left p-3 rounded-md transition-colors duration-200 ${
              selectedAnswer === index
                ? showResult
                  ? index === answer
                    ? 'bg-green-100 dark:bg-green-900'
                    : 'bg-red-100 dark:bg-red-900'
                  : 'bg-blue-100 dark:bg-blue-900'
                : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {!showResult && (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Submit Answer
        </button>
      )}
      {showResult && (
        <div className={`mt-4 p-4 rounded-md ${
          selectedAnswer === answer ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {selectedAnswer === answer ? 'Correct!' : 'Incorrect. Try again!'}
        </div>
      )}
    </div>
  );
};

export default Quiz;