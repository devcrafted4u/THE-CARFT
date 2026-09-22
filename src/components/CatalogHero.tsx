import React from 'react';
import { Sparkles, Diamond, ShieldCheck, Award } from 'lucide-react';
import { ThemeMode } from '../types';

interface CatalogHeroProps {
  theme: ThemeMode;
}

export const CatalogHero: React.FC<CatalogHeroProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section
      id="catalog-hero-section"
      className="relative pt-8 pb-6 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto"
    >
      {/* Subtle Eyebrow */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-300/70 dark:border-neutral-800 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xs mb-4">
        <Diamond className="w-3 h-3 text-amber-600 dark:text-amber-400" />
        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium text-neutral-700 dark:text-neutral-300 font-sans-clean">
          The 2026 High Jewellery Atelier
        </span>
      </div>

      {/* Main Heading in Cormorant Garamond */}
      <h2
        className={`font-serif-luxury text-3xl sm:text-5xl lg:text-6xl font-light tracking-wide leading-[1.15] mb-4 transition-colors ${
          isDark ? 'text-white' : 'text-neutral-950'
        }`}
      >
        Pure Form, <span className="italic font-normal">Infinite Brilliance</span>
      </h2>

      {/* Narrative */}
      <p
        className={`max-w-2xl mx-auto text-sm sm:text-base font-sans-clean leading-relaxed font-light transition-colors ${
          isDark ? 'text-neutral-400' : 'text-neutral-600'
        }`}
      >
        Presented on pure white studio showcases to reveal every facet, hallmark, and hand-polished curve. Explore exceptional diamonds, 18-karat solid gold, and rare gemstones crafted for generations.
      </p>

      {/* Atelier Values */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
        <div
          className={`p-3 rounded-xs border text-left transition-colors ${
            isDark
              ? 'bg-neutral-900/50 border-neutral-800 text-neutral-300'
              : 'bg-white/70 border-neutral-200/80 text-neutral-700 shadow-xs'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-600 mb-1" />
          <div className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider font-sans-clean">
            Pure White Studio
          </div>
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Unobscured jewellery focus
          </div>
        </div>

        <div
          className={`p-3 rounded-xs border text-left transition-colors ${
            isDark
              ? 'bg-neutral-900/50 border-neutral-800 text-neutral-300'
              : 'bg-white/70 border-neutral-200/80 text-neutral-700 shadow-xs'
          }`}
        >
          <Diamond className="w-4 h-4 text-amber-600 mb-1" />
          <div className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider font-sans-clean">
            GIA & IGI Certified
          </div>
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Natural conflict-free stones
          </div>
        </div>

        <div
          className={`p-3 rounded-xs border text-left transition-colors ${
            isDark
              ? 'bg-neutral-900/50 border-neutral-800 text-neutral-300'
              : 'bg-white/70 border-neutral-200/80 text-neutral-700 shadow-xs'
          }`}
        >
          <Award className="w-4 h-4 text-amber-600 mb-1" />
          <div className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider font-sans-clean">
            18K Solid Gold
          </div>
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
            100% Recycled & hallmarked
          </div>
        </div>

        <div
          className={`p-3 rounded-xs border text-left transition-colors ${
            isDark
              ? 'bg-neutral-900/50 border-neutral-800 text-neutral-300'
              : 'bg-white/70 border-neutral-200/80 text-neutral-700 shadow-xs'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-600 mb-1" />
          <div className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider font-sans-clean">
            Insured Shipping
          </div>
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Complimentary white-glove
          </div>
        </div>
      </div>
    </section>
  );
};
