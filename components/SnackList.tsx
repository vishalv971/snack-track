
import React from 'react';
import { Snack } from '../types';
import SnackItem from './SnackItem';
import { EmptyStateIcon } from './icons';

interface SnackListProps {
  snacks: Snack[];
  onRemoveSnack: (id: number) => void;
}

const SnackList: React.FC<SnackListProps> = ({ snacks, onRemoveSnack }) => {
  if (snacks.length === 0) {
    return (
      <div className="text-center py-12 px-6 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
        <EmptyStateIcon className="w-16 h-16 mx-auto text-slate-400 dark:text-slate-500" />
        <h3 className="mt-4 text-lg font-semibold text-slate-600 dark:text-slate-400">No Snacks Logged</h3>
        <p className="mt-1 text-slate-500 dark:text-slate-400">Add a snack using the form above to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
       <h2 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Logged Snacks</h2>
      <ul className="space-y-3 max-h-[40vh] overflow-y-auto pr-2">
        {snacks.map((snack, index) => (
          <SnackItem key={snack.id} snack={snack} onRemove={() => onRemoveSnack(snack.id)} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default SnackList;
