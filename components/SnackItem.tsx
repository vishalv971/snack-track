
import React from 'react';
import { Snack } from '../types';
import { TrashIcon } from './icons';

interface SnackItemProps {
  snack: Snack;
  onRemove: () => void;
  index: number;
}

const SnackItem: React.FC<SnackItemProps> = ({ snack, onRemove, index }) => {
  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <li 
      className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg shadow-sm animate-fade-in"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex-1">
        <p className="font-semibold text-slate-800 dark:text-slate-100">{snack.name}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400">{timeFormatter.format(snack.createdAt)}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-bold text-lg text-emerald-500 dark:text-emerald-400">{snack.calories}
          <span className="text-sm font-normal text-slate-500 dark:text-slate-400 ml-1">kcal</span>
        </span>
        <button
          onClick={onRemove}
          aria-label={`Remove ${snack.name}`}
          className="p-2 rounded-full text-slate-400 hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-500/20 dark:hover:text-red-400 transition-colors duration-200"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
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
    </li>
  );
};

export default SnackItem;
