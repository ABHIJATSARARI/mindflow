
import React from 'react';
import { JournalEntry } from '../types';

const sentimentStyles = {
  Positive: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300',
  Negative: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-300',
  Neutral: 'bg-slate-100 text-slate-800 dark:bg-slate-700/50 dark:text-slate-300 border-slate-300',
};

const InsightSection: React.FC<{ title: string; icon: React.ReactElement; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div>
        <h4 className="flex items-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
            {icon}
            {title}
        </h4>
        {children}
    </div>
);

const EntryCard: React.FC<{ entry: JournalEntry }> = ({ entry }) => {
  if (!entry.analysis) {
    return null; // Or show a loading/error state within the card
  }

  const { sentiment, emotions, triggers, suggestions, summary } = entry.analysis;

  return (
    <article className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="p-4 sm:p-6">
        <header className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4 border-b border-slate-200 dark:border-slate-700 pb-4">
          <time className="text-sm text-slate-500 dark:text-slate-400">{entry.date}</time>
          <div className={`text-sm font-bold px-3 py-1 rounded-full border ${sentimentStyles[sentiment]}`}>
            {sentiment}
          </div>
        </header>

        <div>
            <blockquote className="text-slate-600 dark:text-slate-300 whitespace-pre-wrap font-serif italic mb-6 border-l-4 border-sky-200 dark:border-sky-800 pl-4">
              {entry.text}
            </blockquote>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-lg space-y-5">
                <InsightSection title="Summary" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" /></svg>}>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{summary}</p>
                </InsightSection>

                <InsightSection title="Detected Emotions" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>
                    <div className="flex flex-wrap gap-2">
                        {emotions.map(emotion => (
                            <span key={emotion} className="px-2.5 py-1 text-xs font-medium bg-sky-100 text-sky-800 dark:bg-sky-900/50 dark:text-sky-300 rounded-full">{emotion}</span>
                        ))}
                    </div>
                </InsightSection>

                 <InsightSection title="Potential Triggers" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}>
                    <div className="flex flex-wrap gap-2">
                        {triggers.map(trigger => (
                            <span key={trigger} className="px-2.5 py-1 text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 rounded-full">{trigger}</span>
                        ))}
                    </div>
                </InsightSection>

                <InsightSection title="Wellness Suggestions" icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>}>
                    <ul className="space-y-2 text-sm list-disc list-inside text-slate-700 dark:text-slate-300">
                        {suggestions.map((suggestion, index) => (
                            <li key={index}>{suggestion}</li>
                        ))}
                    </ul>
                </InsightSection>
            </div>
        </div>
      </div>
    </article>
  );
};

export default EntryCard;
