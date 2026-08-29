import React from 'react';
import { Compass, Sparkles, ShoppingBag, Store, ShieldCheck } from 'lucide-react';
import { ActiveTab } from '../types';

interface MobileAppBottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  openCart: () => void;
}

export const MobileAppBottomNav: React.FC<MobileAppBottomNavProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  openCart
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#E0D5C1] px-2 py-1.5 flex items-center justify-around shadow-lg lg:hidden">
      
      <button
        id="mobile-nav-home"
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] uppercase font-sans tracking-wider transition-colors ${
          activeTab === 'home'
            ? 'text-[#3E2723] font-bold'
            : 'text-[#8D6E63] hover:text-[#3E2723]'
        }`}
      >
        <Compass className={`w-5 h-5 mb-0.5 ${activeTab === 'home' ? 'text-[#C5A059]' : 'text-[#8D6E63]'}`} />
        <span>Warisan Budaya</span>
      </button>

      <button
        id="mobile-nav-matcher"
        onClick={() => setActiveTab('matcher')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] uppercase font-sans tracking-wider transition-colors relative ${
          activeTab === 'matcher'
            ? 'text-[#3E2723] font-bold'
            : 'text-[#8D6E63] hover:text-[#3E2723]'
        }`}
      >
        <Sparkles className={`w-5 h-5 mb-0.5 ${activeTab === 'matcher' ? 'text-[#C5A059]' : 'text-[#8D6E63]'}`} />
        <span>Matcher</span>
        <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-[#C5A059]" />
      </button>

      <button
        id="mobile-nav-marketplace"
        onClick={() => setActiveTab('marketplace')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] uppercase font-sans tracking-wider transition-colors ${
          activeTab === 'marketplace'
            ? 'text-[#3E2723] font-bold'
            : 'text-[#8D6E63] hover:text-[#3E2723]'
        }`}
      >
        <ShoppingBag className={`w-5 h-5 mb-0.5 ${activeTab === 'marketplace' ? 'text-[#C5A059]' : 'text-[#8D6E63]'}`} />
        <span>Pasar</span>
      </button>

      <button
        id="mobile-nav-shops"
        onClick={() => setActiveTab('shops')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] uppercase font-sans tracking-wider transition-colors ${
          activeTab === 'shops'
            ? 'text-[#3E2723] font-bold'
            : 'text-[#8D6E63] hover:text-[#3E2723]'
        }`}
      >
        <Store className={`w-5 h-5 mb-0.5 ${activeTab === 'shops' ? 'text-[#C5A059]' : 'text-[#8D6E63]'}`} />
        <span>Toko</span>
      </button>

      <button
        id="mobile-nav-blockchain"
        onClick={() => setActiveTab('blockchain')}
        className={`flex flex-col items-center py-1 px-2 text-[10px] uppercase font-sans tracking-wider transition-colors ${
          activeTab === 'blockchain'
            ? 'text-[#3E2723] font-bold'
            : 'text-[#8D6E63] hover:text-[#3E2723]'
        }`}
      >
        <ShieldCheck className={`w-5 h-5 mb-0.5 ${activeTab === 'blockchain' ? 'text-[#C5A059]' : 'text-[#8D6E63]'}`} />
        <span>Blockchain</span>
      </button>

    </div>
  );
};
