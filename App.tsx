import React, { useState, useCallback } from 'react';
import { Snack } from './types';
import SnackForm from './components/SnackForm';
import SnackList from './components/SnackList';
import SnackSummary from './components/SnackSummary';
import { LeafIcon } from './components/icons';

const App: React.FC = () => {
  const [snacks, setSnacks] = useState<Snack[]>([]);

  const handleAddSnack = useCallback((name: string, calories: number) => {
    const newSnack: Snack = {
      id: Date.now(),
      name,
      calories,
      createdAt: new Date(),
    };
    setSnacks(prevSnacks => [newSnack, ...prevSnacks]);
  }, []);

  const handleRemoveSnack = useCallback((id: number) => {
    setSnacks(prevSnacks => prevSnacks.filter(snack => snack.id !== id));
  }, []);

  return (
    <div className="min-h-screen font-sans text-slate-800 dark:text-slate-200 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <main className="w-full max-w-2xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl shadow-slate-200 dark:shadow-slate-950/50 overflow-hidden">
          <header className="p-6 md:p-8 bg-emerald-500 dark:bg-emerald-600 text-white flex items-center gap-4">
            <LeafIcon className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold tracking-tight">SnackTrack</h1>
              <p className="text-emerald-100 dark:text-emerald-200">Log your daily snacks effortlessly.</p>
            </div>
          </header>
          
          <div className="p-6 md:p-8">
            <h2 className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300">Add a New Snack</h2>
            <SnackForm onAddSnack={handleAddSnack} />
          </div>

          <div className="px-6 md:px-8 pb-6 md:pb-8">
            <SnackList snacks={snacks} onRemoveSnack={handleRemoveSnack} />
            <SnackSummary snacks={snacks} />
          </div>
        </div>

        <footer className="text-center mt-8 text-slate-500 dark:text-slate-400 text-sm">
          <p>Created with efficiency and simplicity in mind.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
