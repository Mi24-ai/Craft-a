import React from 'react';
import { Sparkles, ShoppingBag, ShieldCheck, Compass, Store, Bot, Handshake } from 'lucide-react';
import { ActiveTab } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  openCart: () => void;
  openAiChat: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart,
  openAiChat,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E0D5C1] transition-all duration-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

{/* Logo & Brand Identity */}
<div
  id="brand-logo-btn"
  onClick={() => setActiveTab('home')}
  className="flex items-center gap-3 cursor-pointer group"
>
  <div className="w-11 h-11 rounded-lg overflow-hidden shadow-md border border-[#C5A059]/40 group-hover:scale-105 transition-transform">
    <img
      src="/image/Craftea.jpg"
      alt="Craftéa Logo"
      className="w-full h-full object-cover"
    />
  </div>
  <div>
    <div className="flex items-center gap-2">
      <span className="font-serif font-bold text-lg md:text-xl tracking-wider text-[#3E2723]">
        Craftéa
      </span>
    </div>
    <p className="text-[10px] text-[#8D6E63] font-serif-editorial tracking-[0.2em] uppercase">
    </p>
  </div>
</div>
          {/* Desktop Navigation Links (Artistic Flair Editorial Style) */}
          <nav className="hidden lg:flex items-center space-x-2">
            <button
              id="nav-home-btn"
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 text-xs font-sans uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 ${
                activeTab === 'home'
                  ? 'text-[#3E2723] font-bold border-b-2 border-[#3E2723]'
                  : 'text-[#5D4037]/80 hover:text-[#3E2723] border-b-2 border-transparent'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
              Craftéa Heritage
            </button>

            <button
              id="nav-matcher-btn"
              onClick={() => setActiveTab('matcher')}
              className={`px-3 py-2 text-xs font-sans uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 ${
                activeTab === 'matcher'
                  ? 'text-[#3E2723] font-bold border-b-2 border-[#3E2723]'
                  : 'text-[#5D4037]/80 hover:text-[#3E2723] border-b-2 border-transparent'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              Craftéa Matcher
            </button>

            <button
              id="nav-marketplace-btn"
              onClick={() => setActiveTab('marketplace')}
              className={`px-3 py-2 text-xs font-sans uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 ${
                activeTab === 'marketplace'
                  ? 'text-[#3E2723] font-bold border-b-2 border-[#3E2723]'
                  : 'text-[#5D4037]/80 hover:text-[#3E2723] border-b-2 border-transparent'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#C5A059]" />
              Craftéa Market
            </button>

            <button
              id="nav-shops-btn"
              onClick={() => setActiveTab('shops')}
              className={`px-3 py-2 text-xs font-sans uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 ${
                activeTab === 'shops'
                  ? 'text-[#3E2723] font-bold border-b-2 border-[#3E2723]'
                  : 'text-[#5D4037]/80 hover:text-[#3E2723] border-b-2 border-transparent'
              }`}
            >
              <Store className="w-3.5 h-3.5 text-[#C5A059]" />
              Craftéa Store
            </button>

            <button
              id="nav-blockchain-btn"
              onClick={() => setActiveTab('blockchain')}
              className={`px-3 py-2 text-xs font-sans uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 ${
                activeTab === 'blockchain'
                  ? 'text-[#3E2723] font-bold border-b-2 border-[#3E2723]'
                  : 'text-[#5D4037]/80 hover:text-[#3E2723] border-b-2 border-transparent'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              Craftéa Heritage Proof
            </button>

            <button
              id="nav-partnership-btn"
              onClick={() => setActiveTab('partnership')}
              className={`px-3 py-2 text-xs font-sans uppercase tracking-[0.2em] transition-all flex items-center gap-1.5 ${
                activeTab === 'partnership'
                  ? 'text-[#3E2723] font-bold border-b-2 border-[#3E2723]'
                  : 'text-[#5D4037]/80 hover:text-[#3E2723] border-b-2 border-transparent'
              }`}
            >
              <Handshake className="w-3.5 h-3.5 text-[#C5DA059]" />
              Craftéa Partnership
            </button>
          </nav>

          {/* Right Action Icons & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* AI Batik Advisor Button */}
            <button
              id="open-ai-consultant-btn"
              onClick={openAiChat}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#3E2723] text-[#FDFBF7] text-xs font-sans tracking-wider uppercase hover:bg-[#5D4037] shadow-xs transition-all border border-[#C5A059]/40 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Dalang AI</span>
            </button>

            {/* Cart Button */}
            <button
              id="open-cart-drawer-btn"
              onClick={openCart}
              className="relative p-2.5 rounded-full bg-[#F3EFE7] border border-[#E0D5C1] text-[#3E2723] hover:bg-[#E0D5C1]/60 transition-colors cursor-pointer"
              aria-label="Keranjang Belanja"
            >
              <ShoppingBag className="w-4 h-4 text-[#3E2723]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#3E2723] text-[#C5A059] border border-[#C5A059] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
