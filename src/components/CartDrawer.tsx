import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ShieldCheck, 
  Gift, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  Layers
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [isSuccessCheckout, setIsSuccessCheckout] = useState<boolean>(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => {
    const boxCost = item.woodenBoxPackaging ? 250000 : 0;
    return acc + (item.product.price + boxCost) * item.quantity;
  }, 0);

  const shippingCost = subtotal > 0 ? 50000 : 0;
  const blockchainFee = subtotal > 0 ? 0 : 0; // Free minting promo
  const grandTotal = subtotal + shippingCost + blockchainFee;

  const handleCompleteOrder = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setIsSuccessCheckout(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#D4AF37', '#8B4513', '#F5EFEB', '#C5A059']
        });
      } catch (e) {}
    }, 1800);
  };

  const handleFinishSuccess = () => {
    setIsSuccessCheckout(false);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FDFBF7] w-full max-w-md h-full flex flex-col shadow-2xl border-l border-[#C5A059] relative">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#E0D5C1] flex items-center justify-between bg-[#FDFBF7]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C5A059]" />
            <h3 className="font-serif text-xl text-[#3E2723]">
              Keranjang ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
            </h3>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F3EFE7] text-[#3E2723] hover:bg-[#E0D5C1] flex items-center justify-center transition-colors cursor-pointer border border-[#E0D5C1]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body */}
        {!isSuccessCheckout ? (
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#C5A059] mx-auto opacity-70" />
                <h4 className="font-serif text-xl text-[#3E2723]">Keranjang Masih Kosong</h4>
                <p className="text-xs text-[#5D4037] font-serif max-w-xs mx-auto">
                  Silakan jelajahi katalog wastra dan temukan mahakarya yang beresonansi dengan sifat jiwamu.
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  id={`cart-item-${item.product.id}`}
                  className="p-4 rounded-xl bg-[#FDFBF7] border border-[#E0D5C1] shadow-xs space-y-3"
                >
                  <div className="flex gap-3">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#2C1810] shrink-0 border border-[#E0D5C1]">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-serif font-bold text-[#3E2723] truncate">
                        {item.product.title}
                      </h4>
                      <p className="text-[11px] font-sans text-[#8D6E63]">Motif: {item.product.motifName}</p>
                      <p className="text-xs font-serif font-bold text-[#3E2723] mt-0.5">
                        Rp {item.product.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Packaging Options summary */}
                  {item.woodenBoxPackaging && (
                    <div className="text-[10px] bg-[#F3EFE7] p-2 rounded-none border border-[#E0D5C1] text-[#5D4037] flex items-center gap-1 font-sans">
                      <Gift className="w-3 h-3 text-[#C5A059]" />
                      <span>+ Kotak Kayu Jati Jepara (+Rp 150.000)</span>
                    </div>
                  )}

                  {/* Quantity & Delete */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#E0D5C1]">
                    <div className="flex items-center gap-2 bg-[#F3EFE7] rounded-none border border-[#E0D5C1] px-2 py-0.5 font-sans">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="text-xs font-bold text-[#3E2723] hover:text-[#C5A059] px-1 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-[#3E2723] px-2">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="text-xs font-bold text-[#3E2723] hover:text-[#C5A059] px-1 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-xs text-[#8D6E63] hover:text-red-700 font-sans flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          /* SUCCESS ORDER & BLOCKCHAIN CERTIFICATE MINTED VIEW */
          <div className="flex-1 overflow-y-auto p-6 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#F3EFE7] border border-[#C5A059] text-[#C5A059] flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] px-2.5 py-0.5 rounded-none bg-[#C5A059]/20 text-[#3E2723] font-bold uppercase tracking-wider font-sans border border-[#C5A059]/40">
                TRANSACTION #SW-2026-9912 SUCCESS
              </span>
              <h3 className="text-2xl font-serif text-[#3E2723]">
                Pesanan Berhasil Diproses!
              </h3>
              <p className="text-xs text-[#5D4037] font-serif leading-relaxed">
                Mahakarya wastra sedang dipersiapkan oleh toko mitra dengan kemasan sakral dan sertifikat blockchain fisik.
              </p>
            </div>

            {/* Minted NFT Card Simulation */}
            <div className="bg-[#2C1810] rounded-2xl rounded-tr-[36px] p-5 text-[#FDFBF7] border border-[#C5A059] text-left space-y-3 shadow-xl font-mono text-xs">
              <div className="flex items-center justify-between border-b border-[#3E2723] pb-2">
                <span className="text-[#C5A059] font-sans font-bold uppercase tracking-wider text-[11px]">SMART CONTRACT MINTED</span>
                <span className="text-[9px] text-[#C5A059] font-sans uppercase">Polygon L2 Verified</span>
              </div>
              <div className="text-[11px] text-[#D7CCC8] space-y-1">
                <p>Contract: <span className="text-[#C5A059]">0x7F2B...c94A0</span></p>
                <p>Gas Fee: <span className="text-[#C5A059]">0.0021 POL (Covered)</span></p>
                <p>Status: <span className="text-[#FDFBF7] font-sans font-semibold">100% Genuine Batik Tulis</span></p>
              </div>
            </div>

            <button
              id="finish-order-btn"
              onClick={handleFinishSuccess}
              className="w-full py-3.5 rounded-none bg-[#3E2723] text-[#FDFBF7] font-sans uppercase tracking-wider font-bold text-xs hover:bg-[#5D4037] transition-colors cursor-pointer"
            >
              Selesai & Lanjut Eksplorasi
            </button>
          </div>
        )}

        {/* Drawer Footer & Checkout */}
        {!isSuccessCheckout && cartItems.length > 0 && (
          <div className="p-5 bg-[#FDFBF7] border-t border-[#E0D5C1] space-y-3">
            <div className="space-y-1.5 text-xs text-[#5D4037] font-sans">
              <div className="flex justify-between">
                <span>Subtotal Produk:</span>
                <span className="font-semibold text-[#3E2723]">
                  Rp {subtotal.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Ongkos Kirim Asuransi:</span>
                <span className="font-semibold text-[#3E2723]">
                  Rp {shippingCost.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Sertifikasi Blockchain Polygon:</span>
                <span className="font-semibold text-[#C5A059] uppercase tracking-wider text-[10px]">Gratis (Included)</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#E0D5C1] text-sm font-bold text-[#3E2723]">
                <span>Total Pembayaran:</span>
                <span className="text-lg font-serif text-[#3E2723]">
                  Rp {grandTotal.toLocaleString('id-ID')}
                </span>
              </div>
            </div>

            <button
              id="checkout-order-btn"
              disabled={isCheckingOut}
              onClick={handleCompleteOrder}
              className="w-full py-3.5 rounded-none bg-[#3E2723] text-[#FDFBF7] font-sans uppercase tracking-wider font-bold text-xs hover:bg-[#5D4037] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#3E2723]/20 cursor-pointer disabled:opacity-50"
            >
              {isCheckingOut ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Memproses Smart Contract & Pesanan...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span>Checkout & Paspor Digital</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
