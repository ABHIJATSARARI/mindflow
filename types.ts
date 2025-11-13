
export interface AnalysisResult {
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  emotions: string[];
  triggers: string[];
  suggestions: string[];
  summary: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  text: string;
  analysis: AnalysisResult | null;
}

export type View = 'journal' | 'dashboard';
