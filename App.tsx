
import React, { useState, useCallback, useEffect } from 'react';
import { JournalEntry, View, AnalysisResult } from './types';
import { analyzeJournalEntry } from './services/geminiService';
import Header from './components/Header';
import JournalInput from './components/JournalInput';
import EntryCard from './components/EntryCard';
import Dashboard from './components/Dashboard';
import Loader from './components/Loader';

interface AppError {
  message: string;
  originalText: string;
}

const MindflowLogo = ({ className }: { className: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="logo-gradient" x1="0.5" y1="0" x2="0.5" y2="1">
                <stop offset="0%" stopColor="#5EEAD4" />
                <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
        </defs>
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C12 2 4 10.1519 4 15.0118C4 19.9717 7.58172 22 12 22C16.4183 22 20 19.9717 20 15.0118C20 10.1519 12 2 12 2Z"
            fill="url(#logo-gradient)"
        />
        <g stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
            <path d="M12 7V13"/><path d="M14.5 8C15.5 8.5 16 9.5 16 10.5C16 11.5 15.5 12.5 14.5 13"/><path d="M9.5 8C8.5 8.5 8 9.5 8 10.5C8 11.5 8.5 12.5 9.5 13"/><path d="M12 13C11 13.5 10.5 14.5 10.5 15.5C10.5 16.2 10.8 17 11.5 17.5"/><path d="M12 13C13 13.5 13.5 14.5 13.5 15.5C13.5 16.2 13.2 17 12.5 17.5"/><path d="M9.5 13C9 13.5 8.5 14.2 8.5 15C8.5 16 9 17 10 17.5"/><path d="M14.5 13C15 13.5 15.5 14.2 15.5 15C15.5 16 15 17 14 17.5"/><path d="M11.5 17.5C11 18.5 10 19 9 19"/><path d="M12.5 17.5C13 18.5 14 19 15 19"/>
        </g>
    </svg>
);


export default function App() {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [view, setView] = useState<View>('journal');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    const splashElement = document.getElementById('splash');
    if (splashElement) {
      const timer = setTimeout(() => {
        splashElement.classList.add('hide');
        // Clean up the element from the DOM after the animation is over
        splashElement.addEventListener('animationend', () => {
          splashElement.remove();
        });
      }, 4500); // 4.5s delay + 0.5s animation = 5s total

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAddEntry = useCallback(async (text: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const analysis: AnalysisResult = await analyzeJournalEntry(text);
      const newEntry: JournalEntry = {
        id: new Date().toISOString(),
        date: new Date().toLocaleString(),
        text,
        analysis,
      };
      setJournalEntries(prevEntries => [newEntry, ...prevEntries]);
    } catch (err) {
      console.error(err);
      let errorMessage = 'An unexpected error occurred. Please try again later.';
      if (err instanceof Error) {
        if (err.message.includes('API key not valid') || err.message.includes('400')) {
          errorMessage = 'API key is invalid or missing. Please check your configuration.';
        } else if (err.message.includes('Failed to fetch')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else {
          errorMessage = 'Failed to analyze the entry. The AI service may be temporarily unavailable.';
        }
      }
      setError({ message: errorMessage, originalText: text });
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleRetry = useCallback(() => {
    if (error?.originalText) {
      const textToRetry = error.originalText;
      setError(null); // Clear error before retrying
      handleAddEntry(textToRetry);
    }
  }, [error, handleAddEntry]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header currentView={view} setView={setView} />
      
      <main className="container mx-auto p-4 md:p-6 lg:p-8 max-w-4xl">
        {view === 'journal' && (
          <div className="space-y-8">
            <JournalInput onAddEntry={handleAddEntry} isLoading={isLoading} />
            
            {isLoading && journalEntries.length === 0 && <Loader message="Analyzing your thoughts..." />}
            
            {error && (
              <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg relative flex flex-col sm:flex-row justify-between items-center gap-4" role="alert">
                <div>
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{error.message}</span>
                </div>
                <button
                  onClick={handleRetry}
                  disabled={isLoading}
                  className="w-full sm:w-auto flex-shrink-0 px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-100 dark:focus:ring-offset-slate-900 focus:ring-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
            
            <div className="space-y-6">
              {isLoading && journalEntries.length > 0 && <Loader message="Analyzing your new entry..." />}
              {journalEntries.map(entry => (
                <EntryCard key={entry.id} entry={entry} />
              ))}
            </div>
            
            {journalEntries.length === 0 && !isLoading && !error && (
                 <div className="text-center py-16 px-6 bg-white dark:bg-slate-800/50 rounded-lg shadow-sm">
                    <MindflowLogo className="mx-auto h-16 w-16 opacity-70" />
                    <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">Your journal awaits</h3>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Your thoughts are safe here. Start writing to see your insights.</p>
                </div>
            )}
          </div>
        )}

        {view === 'dashboard' && <Dashboard entries={journalEntries} />}
      </main>
      <footer className="text-center p-4 text-xs text-slate-400 dark:text-slate-500">
        <p>Mindflow. Your entries are processed for insights and are never stored.</p>
      </footer>
    </div>
  );
}
