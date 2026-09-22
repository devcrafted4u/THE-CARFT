import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { ThemeMode } from '../types';

interface ThemeToggleProps {
  theme: ThemeMode;
  onToggle: () => void;
  id?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle, id = 'theme-toggle-btn' }) => {
  const isDark = theme === 'dark';

  return (
    <button
      id={id}
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 ${
        isDark
          ? 'bg-neutral-900 border-neutral-700 text-neutral-200 hover:border-neutral-500 focus:ring-neutral-400'
          : 'bg-white border-neutral-200 text-neutral-800 hover:border-neutral-400 shadow-sm focus:ring-black'
      }`}
    >
      <div
        className={`w-4 h-4 transition-transform duration-300 ${
          isDark ? 'rotate-90 text-amber-300' : 'rotate-0 text-amber-600'
        }`}
      >
        {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </div>
      <span className="text-xs uppercase tracking-widest font-medium select-none">
        {isDark ? 'Dark' : 'Light'}
      </span>
      <div
        className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
          isDark ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'bg-neutral-800'
        }`}
      />
    </button>
  );
};
