
import React, { useState } from 'react';

interface JournalInputProps {
  onAddEntry: (text: string) => void;
  isLoading: boolean;
}

const JournalInput: React.FC<JournalInputProps> = ({ onAddEntry, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onAddEntry(text.trim());
      setText('');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800/50 p-4 sm:p-6 rounded-xl shadow-sm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="journal-entry" className="block text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
          What's on your mind?
        </label>
        <textarea
          id="journal-entry"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Let your thoughts flow freely..."
          className="w-full h-40 p-3 bg-slate-100 dark:bg-slate-800 border-2 border-transparent focus:border-teal-500 focus:ring-teal-500 rounded-lg transition duration-200 resize-none placeholder-slate-400 dark:placeholder-slate-500"
          disabled={isLoading}
        />
        <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-500 dark:text-slate-400">
                Your privacy is paramount. Entries are analyzed on the fly and never saved.
            </p>
            <button
              type="submit"
              disabled={isLoading || !text.trim()}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg shadow-md hover:from-cyan-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:bg-slate-400 disabled:dark:bg-slate-600 disabled:from-slate-400 disabled:to-slate-400 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                  <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analyzing...
                  </>
              ) : (
                  'Analyze Entry'
              )}
            </button>
        </div>
      </form>
    </div>
  );
};

export default JournalInput;
