import React, { useState, useEffect } from 'react';
import { ActiveTab, Product, BatikMotif, CartItem } from './types';
import { PRODUCTS } from './data/batikData';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { HeritageExplorer } from './components/HeritageExplorer';
import { PersonalityMatcher } from './components/PersonalityMatcher';
import { Marketplace } from './components/Marketplace';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BlockchainVerifier } from './components/BlockchainVerifier';
import { ArtisanShopsView } from './components/ArtisanShopsView';
import { CartDrawer } from './components/CartDrawer';
import { AIBatikConsultant } from './components/AIBatikConsultant';
import { MobileAppBottomNav } from './components/MobileAppBottomNav';
import { Footer } from './components/Footer';
import { PartnershipView } from './components/PartnershipView';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedMotifFilter, setSelectedMotifFilter] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('swarna_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState<boolean>(false);
  const [blockchainTokenToInspect, setBlockchainTokenToInspect] = useState<string | null>(null);

  // Save cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('swarna_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  const handleAddToCart = (
    product: Product,
    options?: { woodenBox?: boolean; nfcSeal?: boolean }
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.product.id === product.id);
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        if (options?.woodenBox !== undefined) copy[existingIdx].woodenBoxPackaging = options.woodenBox;
        return copy;
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          woodenBoxPackaging: options?.woodenBox || false,
          customNfcSeal: options?.nfcSeal || true
        }
      ];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleSelectMotifFromHeritage = (motif: BatikMotif) => {
    setSelectedMotifFilter(motif.id);
  };

  const handleOpenBlockchainPassport = (tokenId: string) => {
    setBlockchainTokenToInspect(tokenId);
    setActiveTab('blockchain');
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#3E2723] flex flex-col font-serif selection:bg-[#C5A059]/30">

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
        openAiChat={() => setIsAiChatOpen(true)}
      />

      <main className="flex-1 pb-16 lg:pb-0">
        {activeTab === 'home' && (
          <>
            <HeroBanner onNavigate={setActiveTab} />
            <HeritageExplorer
              onSelectMotif={handleSelectMotifFromHeritage}
              onNavigate={setActiveTab}
            />
          </>
        )}

        {activeTab === 'matcher' && (
          <PersonalityMatcher
            onSelectProduct={(p) => setSelectedProduct(p)}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'marketplace' && (
          <Marketplace
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={handleAddToCart}
            onNavigate={setActiveTab}
            selectedMotifFilter={selectedMotifFilter}
          />
        )}

        {activeTab === 'shops' && (
          <ArtisanShopsView
            onSelectProduct={(p) => setSelectedProduct(p)}
            onNavigate={setActiveTab}
          />
        )}

        {activeTab === 'blockchain' && (
          <BlockchainVerifier
            initialTokenId={blockchainTokenToInspect}
            onSelectProduct={(p) => setSelectedProduct(p)}
          />
        )}

        {activeTab === 'partnership' && (
          <PartnershipView />
        )}
      </main>

      <Footer onNavigate={setActiveTab} />

      {/* Bottom Nav for mobile screens */}
      <MobileAppBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOpen(true)}
      />

      {/* MODALS AND DRAWERS */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onNavigate={setActiveTab}
        onOpenBlockchainPassport={handleOpenBlockchainPassport}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <AIBatikConsultant
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
      />

    </div>
  );
}