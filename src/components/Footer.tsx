import React, { useState } from 'react';
import { ThemeMode } from '../types';
import { Mail, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface FooterProps {
  theme: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({ theme }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const isDark = theme === 'dark';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer
      id="main-site-footer"
      className={`border-t transition-colors ${
        isDark
          ? 'bg-neutral-950 border-neutral-800 text-neutral-400'
          : 'bg-[#FAF9F6] border-neutral-200 text-neutral-600'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="md:col-span-1 space-y-3">
            <h3
              className={`font-serif-luxury text-2xl uppercase tracking-[0.2em] font-normal ${
                isDark ? 'text-white' : 'text-neutral-950'
              }`}
            >
              L'AURA
            </h3>
            <p className="text-xs font-sans-clean leading-relaxed text-neutral-500">
              Master fine jewellers since 1928. Sculpted by hand in 18-karat gold and certified diamonds. Presented on pure white backdrops for immaculate inspection.
            </p>
            <div className="pt-2 text-[11px] text-neutral-400">
              <span>Paris • New York • London</span>
            </div>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4
              className={`text-xs uppercase tracking-widest font-semibold font-sans-clean ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}
            >
              The Collections
            </h4>
            <ul className="space-y-2 text-xs font-sans-clean">
              <li><a href="#jewellery-catalog" className="hover:text-amber-600 transition-colors">Solitaire Engagement Rings</a></li>
              <li><a href="#jewellery-catalog" className="hover:text-amber-600 transition-colors">High Diamond Tennis Bracelets</a></li>
              <li><a href="#jewellery-catalog" className="hover:text-amber-600 transition-colors">Emerald & Pear Cut Pendants</a></li>
              <li><a href="#jewellery-catalog" className="hover:text-amber-600 transition-colors">Japanese Akoya & Baroque Pearls</a></li>
              <li><a href="#jewellery-catalog" className="hover:text-amber-600 transition-colors">High Fine Jewellery Editions</a></li>
            </ul>
          </div>

          {/* Concierge & Client Care */}
          <div className="space-y-3">
            <h4
              className={`text-xs uppercase tracking-widest font-semibold font-sans-clean ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}
            >
              Concierge Services
            </h4>
            <ul className="space-y-2 text-xs font-sans-clean">
              <li><span className="cursor-pointer hover:text-amber-600">Bespoke Diamond Commissions</span></li>
              <li><span className="cursor-pointer hover:text-amber-600">Complimentary Ring Sizer</span></li>
              <li><span className="cursor-pointer hover:text-amber-600">GIA Certificate Verification</span></li>
              <li><span className="cursor-pointer hover:text-amber-600">Complimentary Insured Shipping</span></li>
              <li><span className="cursor-pointer hover:text-amber-600">Lifetime Ultrasonic Cleaning</span></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4
              className={`text-xs uppercase tracking-widest font-semibold font-sans-clean ${
                isDark ? 'text-white' : 'text-neutral-900'
              }`}
            >
              The Atelier Gazette
            </h4>
            <p className="text-xs text-neutral-500 font-sans-clean">
              Private previews of high-carat arrivals and bespoke private salon invitations.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-3 py-2 text-xs font-sans-clean rounded-l-xs border border-r-0 transition-colors focus:outline-none ${
                    isDark
                      ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-500 focus:border-amber-400'
                      : 'bg-white border-neutral-300 text-black placeholder-neutral-400 focus:border-black'
                  }`}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black text-xs font-medium uppercase tracking-wider rounded-r-xs hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
                >
                  {subscribed ? <Check className="w-4 h-4" /> : 'Join'}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-600 flex items-center gap-1">
                  <Check className="w-3 h-3" />
                  Welcome to the Private Salon.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-200/60 dark:border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <p>© 2026 L'Aura Fine Jewellery SA. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Ethical Sourcing Protocol</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
