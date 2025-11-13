
import React from 'react';
import { View } from '../types';

interface HeaderProps {
  currentView: View;
  setView: (view: View) => void;
}

const NavButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactElement;
}> = ({ label, isActive, onClick, icon }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
      isActive
        ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/50 dark:text-sky-300'
        : 'text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-700'
    }`}
  >
    {icon}
    {label}
  </button>
);

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

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
            <MindflowLogo className="h-8 w-8" />
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
                Mindflow
            </h1>
        </div>
        <nav className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <NavButton
            label="Journal"
            isActive={currentView === 'journal'}
            onClick={() => setView('journal')}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>}
          />
          <NavButton
            label="Dashboard"
            isActive={currentView === 'dashboard'}
            onClick={() => setView('dashboard')}
            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
