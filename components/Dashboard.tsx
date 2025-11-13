
import React, { useMemo } from 'react';
import { JournalEntry } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardProps {
  entries: JournalEntry[];
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

const SENTIMENT_COLORS: { [key: string]: string } = {
  Positive: '#14b8a6', // teal-500
  Negative: '#f43f5e', // rose-500
  Neutral: '#94a3b8',  // slate-400
};

const Dashboard: React.FC<DashboardProps> = ({ entries }) => {

  const emotionFrequency = useMemo(() => {
    const emotionCount: { [key: string]: number } = {};
    entries.forEach(entry => {
      entry.analysis?.emotions.forEach(emotion => {
        emotionCount[emotion] = (emotionCount[emotion] || 0) + 1;
      });
    });

    return Object.entries(emotionCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, [entries]);

  const sentimentDistribution = useMemo(() => {
      const sentimentCount: { [key: string]: number } = { 'Positive': 0, 'Negative': 0, 'Neutral': 0 };
      entries.forEach(entry => {
          if (entry.analysis?.sentiment) {
              sentimentCount[entry.analysis.sentiment]++;
          }
      });
      return Object.entries(sentimentCount).map(([name, count]) => ({ name, count }));
  }, [entries]);

  if (entries.length === 0) {
    return (
        <div className="text-center py-16 px-6 bg-white dark:bg-slate-800/50 rounded-lg shadow-sm">
            <MindflowLogo className="mx-auto h-16 w-16 opacity-70" />
            <h3 className="mt-4 text-lg font-medium text-slate-900 dark:text-white">Dashboard is empty</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Write some journal entries to see your emotional trends.</p>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Your Wellness Dashboard</h2>
      
      <div className="p-6 bg-white dark:bg-slate-800/50 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Emotion Frequency</h3>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
            <BarChart data={emotionFrequency} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
                <XAxis dataKey="name" tick={{ fill: 'rgb(100 116 139)', fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fill: 'rgb(100 116 139)', fontSize: 12 }} />
                <Tooltip 
                    cursor={{fill: 'rgba(107, 114, 128, 0.1)'}}
                    contentStyle={{
                        backgroundColor: 'rgb(15 23 42 / 0.8)',
                        borderColor: 'rgb(51 65 85)',
                        color: 'rgb(226 232 240)',
                        borderRadius: '0.5rem'
                    }}
                />
                <Bar dataKey="count" fill="#0d9488" name="Count" barSize={30} radius={[4, 4, 0, 0]} />
            </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

       <div className="p-6 bg-white dark:bg-slate-800/50 rounded-xl shadow-sm">
        <h3 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Sentiment Distribution</h3>
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
            <BarChart data={sentimentDistribution} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)"/>
                <XAxis type="number" allowDecimals={false} tick={{ fill: 'rgb(100 116 139)', fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fill: 'rgb(100 116 139)', fontSize: 12 }} width={80} />
                <Tooltip
                    cursor={{fill: 'rgba(107, 114, 128, 0.1)'}}
                    contentStyle={{
                        backgroundColor: 'rgb(15 23 42 / 0.8)',
                        borderColor: 'rgb(51 65 85)',
                        color: 'rgb(226 232 240)',
                        borderRadius: '0.5rem'
                    }}
                />
                <Bar dataKey="count" name="Entries" barSize={25} radius={[0, 4, 4, 0]}>
                    {sentimentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[entry.name]} />
                    ))}
                </Bar>
            </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
