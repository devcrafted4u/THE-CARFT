import React from 'react';
import { ThemeMode } from '../types';
import { Award, Compass, Eye, Shield } from 'lucide-react';

interface StorySectionProps {
  theme: ThemeMode;
}

export const StorySection: React.FC<StorySectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section
      id="atelier-story"
      className={`py-16 px-4 sm:px-6 lg:px-8 border-t transition-colors ${
        isDark
          ? 'bg-neutral-950 border-neutral-800 text-neutral-200'
          : 'bg-[#F6F5F2] border-neutral-200/80 text-neutral-900'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Visual: Pure White Studio Showcase */}
          <div className="relative">
            <div className="relative aspect-4/3 bg-white border border-neutral-200 shadow-xl rounded-xs p-8 flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85"
                alt="L'Aura Master Jeweller Diamond Ring"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.1)] transition-transform duration-700 hover:scale-110"
              />
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 border border-neutral-200 text-black text-[11px] font-sans-clean font-semibold tracking-wider uppercase shadow-xs">
                Pure White Studio Presentation
              </div>
            </div>
          </div>

          {/* Right Text */}
          <div className="space-y-5 text-left">
            <span className="text-xs uppercase tracking-[0.3em] text-amber-700 dark:text-amber-400 font-semibold">
              The Philosophy of Clarity
            </span>

            <h3
              className={`font-serif-luxury text-3xl sm:text-4xl font-normal tracking-wide leading-tight ${
                isDark ? 'text-white' : 'text-neutral-950'
              }`}
            >
              Every stone unmasked. <br />
              <span className="italic">Every millimeter deliberate.</span>
            </h3>

            <p
              className={`text-sm sm:text-base font-sans-clean leading-relaxed ${
                isDark ? 'text-neutral-400' : 'text-neutral-600'
              }`}
            >
              We believe fine jewellery should never hide behind cluttered sets or artificial filters. By capturing each heirloom piece on pure white backdrops with microscope-grade optics, we invite you to examine the precision of our hand-sculpted prongs, the crystalline purity of our diamonds, and the warmth of solid 18-karat gold.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black dark:text-white font-sans-clean">
                  <Shield className="w-3.5 h-3.5 text-amber-600" />
                  <span>Conflict-Free</span>
                </div>
                <p className="text-xs text-neutral-500">Kimberley Process compliant natural diamonds.</p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-black dark:text-white font-sans-clean">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  <span>Antwerp Atelier</span>
                </div>
                <p className="text-xs text-neutral-500">Master jewellers with three generations of expertise.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
