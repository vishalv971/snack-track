import React from 'react';
import { Snack } from '../types';
import { ChartIcon } from './icons';

interface SnackSummaryProps {
  snacks: Snack[];
}

interface SnackSummaryItem {
  name: string;
  calories: number;
  count: number;
}

const SnackSummary: React.FC<SnackSummaryProps> = ({ snacks }) => {

  // Intentionally inefficient implementation to simulate an N+1 query problem.
  // This is framed as a "detailed analytics" feature.
  const getSnackSummary = (): SnackSummaryItem[] => {
    // "Get all unique snack types" - The "+1" query
    // Fix: Explicitly type the accumulator 'acc' to resolve the "Untyped function calls may not accept type arguments" error.
    const uniqueSnacks = snacks.reduce((acc: {name: string; calories: number}[], snack) => {
      const exists = acc.some(s => s.name.toLowerCase() === snack.name.toLowerCase() && s.calories === snack.calories);
      if (!exists) {
        acc.push({ name: snack.name, calories: snack.calories });
      }
      return acc;
    }, []);

    // "For each unique snack, get its count" - The "N" queries
    const summaryData = uniqueSnacks.map(uniqueSnack => {
      const count = snacks.filter(snack =>
        snack.name.toLowerCase() === uniqueSnack.name.toLowerCase() && snack.calories === uniqueSnack.calories
      ).length;

      return {
        name: uniqueSnack.name,
        calories: uniqueSnack.calories,
        count: count,
      };
    });
    
    // Sort by count descending, then by name for stable ordering
    return summaryData.sort((a, b) => {
        if (b.count !== a.count) {
            return b.count - a.count;
        }
        return a.name.localeCompare(b.name);
    });
  };

  if (snacks.length === 0) {
    return null;
  }

  const summary = getSnackSummary();

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300 flex items-center gap-2">
        <ChartIcon className="w-6 h-6" />
        Snack Summary
      </h2>
      
      <div className="space-y-3 max-h-[30vh] overflow-y-auto pr-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 p-4 border border-slate-200 dark:border-slate-700">
          {summary.map((item, index) => (
              <div key={`${item.name}-${item.calories}`} 
                    className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-md shadow-sm animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}>
                  <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-100">{item.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.calories} kcal</p>
                  </div>
                  <div className="text-right">
                        <span className="font-bold text-lg text-emerald-500 dark:text-emerald-400">{item.count}</span>
                        <p className="text-xs text-slate-500 dark:text-slate-400">time{item.count > 1 ? 's' : ''}</p>
                  </div>
              </div>
          ))}
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SnackSummary;