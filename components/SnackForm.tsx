
import React, { useState } from 'react';
import { PlusIcon } from './icons';

interface SnackFormProps {
  onAddSnack: (name: string, calories: number) => void;
}

const SnackForm: React.FC<SnackFormProps> = ({ onAddSnack }) => {
  const [name, setName] = useState<string>('');
  const [calories, setCalories] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const calorieNum = parseInt(calories, 10);
    if (name.trim() && !isNaN(calorieNum) && calorieNum >= 0) {
      onAddSnack(name.trim(), calorieNum);
      setName('');
      setCalories('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <label htmlFor="snack-name" className="sr-only">Snack Name</label>
        <input
          id="snack-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Apple slices"
          required
          className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-emerald-500 focus:ring-emerald-500 transition-colors duration-300 outline-none"
        />
      </div>
      <div>
        <label htmlFor="snack-calories" className="sr-only">Calories</label>
        <input
          id="snack-calories"
          type="number"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
          placeholder="e.g., 95"
          required
          min="0"
          className="w-full px-4 py-3 rounded-lg bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-emerald-500 focus:ring-emerald-500 transition-colors duration-300 outline-none"
        />
      </div>
      <button
        type="submit"
        className="md:col-span-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-emerald-500 text-white font-semibold hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 dark:focus:ring-offset-slate-800 transition-all duration-300 transform hover:scale-105 active:scale-100"
      >
        <PlusIcon className="w-5 h-5" />
        Log Snack
      </button>
    </form>
  );
};

export default SnackForm;
