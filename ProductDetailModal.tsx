import React, { useState } from 'react';
import { Product, ActiveTab } from '../types';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  MapPin, 
  ShoppingBag, 
  Store, 
  ExternalLink,
  BadgeCheck,
  Copyright,
  FileCheck2
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, options?: { woodenBox?: boolean; nfcSeal?: boolean }) => void;
  onNavigate: (tab: ActiveTab) => void;
  onOpenBlockchainPassport: (tokenId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onNavigate,
  onOpenBlockchainPassport
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [includeWoodenBox, setIncludeWoodenBox] = useState<boolean>(false);
  const [includeNfcSeal, setIncludeNfcSeal] = useState<boolean>(true);
  const [isAddedToast, setIsAddedToast] = useState<boolean>(false);

  if (!product) return null;

  const handleAddToCart = () => {
    onAddToCart(product, {
      woodenBox: includeWoodenBox,
      nfcSeal: includeNfcSeal
    });
    setIsAddedToast(true);
    setTimeout(() => setIsAddedToast(false), 2000);
  };

  const totalPrice = product.price + (includeWoodenBox ? 250000 : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-[#FDFBF7] rounded-3xl rounded-tr-[48px] max-w-4xl w-full max-h-[92vh] overflow-y-auto border border-[#C5A059] shadow-2xl relative my-auto">
        
        {/* Close Button */}
        <button
          id="close-product-modal-top-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#3E2723] text-[#FDFBF7] hover:bg-[#5D4037] flex items-center justify-center transition-colors cursor-pointer border border-[#E0D5C1]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8">
          
          {/* Left Visual Gallery & Blockchain Hologram */}
          <div className="md:col-span-6 space-y-4">
            
            {/* Main Featured Image */}
            <div className="relative aspect-4/3 sm:aspect-square rounded-2xl rounded-tr-[36px] overflow-hidden bg-[#2C1810] border border-[#E0D5C1] shadow-md group">
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#FDFBF7]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold text-[#3E2723] shadow-xs">
                Motif: {product.motifName}
              </div>

              {product.isBatikTulisAsli && (
                <div className="absolute bottom-3 left-3 bg-[#C5A059] text-[#2C1810] px-3 py-1 rounded-none text-[10px] font-sans font-bold uppercase tracking-wider shadow-md">
                  ✨ 100% Canting Tulis Asli
                </div>
              )}
            </div>

            {/* Thumbnail Selectors */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    id={`thumb-img-${idx}`}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx
                        ? 'border-[#3E2723] ring-2 ring-[#C5A059]/40 scale-105'
                        : 'border-[#E0D5C1] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Blockchain Authenticity Badge Box */}
            <div className="bg-[#2C1810] rounded-2xl rounded-tr-[30px] p-4 text-[#FDFBF7] border border-[#C5A059]/40 space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-xs font-sans font-bold text-[#C5A059] tracking-wider uppercase">
                    Paspor Digital Blockchain
                  </span>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#3E2723] text-[#C5A059] border border-[#C5A059]/30 font-sans uppercase tracking-wider">
                  Polygon L2 Proof
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-[#D7CCC8]">
                <div>
                  <span className="text-[#8D6E63] block font-sans text-[10px]">Token ID:</span>
                  <span className="text-[#FDFBF7] font-semibold">{product.blockchain.tokenId}</span>
                </div>
                <div>
                  <span className="text-[#8D6E63] block font-sans text-[10px]">Jam Canting:</span>
                  <span className="text-[#FDFBF7] font-semibold">{product.blockchain.handCantingHours} Jam Manual</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[#8D6E63] block font-sans text-[10px]">Master Weaver / Pengrajin:</span>
                  <span className="text-[#C5A059] font-sans font-semibold">{product.blockchain.masterWeaver}</span>
                </div>
              </div>

              <button
                id="btn-inspect-blockchain-modal"
                onClick={() => {
                  onClose();
                  onOpenBlockchainPassport(product.blockchain.tokenId);
                }}
                className="w-full py-2.5 rounded-none bg-[#3E2723] hover:bg-[#5D4037] text-[#FDFBF7] text-xs font-sans uppercase tracking-wider font-semibold border border-[#5D4037] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Periksa Paspor Keaslian Lengkap</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
            </div>

            {/* Intellectual Property / HKI Box */}
            {product.intellectualProperty && (
              <div className="bg-[#F3EFE7] rounded-2xl rounded-tr-[30px] p-4 border border-[#E0D5C1] space-y-2.5">
                <div className="flex items-center gap-2">
                  <Copyright className="w-4 h-4 text-[#C5A059]" />
                  <span className="text-xs font-sans font-bold text-[#3E2723] tracking-wider uppercase">
                    Perlindungan Kekayaan Intelektual
                  </span>
                </div>

                {product.intellectualProperty.geographicalIndication && (
                  <div className="flex items-start gap-2 bg-[#E9F5EC] border border-[#B7DFC4] rounded-xl p-2.5">
                    <BadgeCheck className="w-4 h-4 text-[#2F8F4E] shrink-0 mt-0.5" />
                    <div className="text-[11px] font-sans">
                      <span className="block font-bold text-[#1E5C34]">Indikasi Geografis Terdaftar</span>
                      <span className="text-[#3E2723]">{product.intellectualProperty.geographicalIndication}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-2">
                  <FileCheck2 className="w-3.5 h-3.5 text-[#8D6E63] shrink-0 mt-0.5" />
                  <p className="text-[11px] text-[#5D4037] font-serif leading-relaxed">
                    {product.intellectualProperty.isExclusiveDesign ? (
                      <><strong className="text-[#3E2723]">Motif/Desain Eksklusif.</strong> {product.intellectualProperty.copyrightNote}</>
                    ) : (
                      <><strong className="text-[#3E2723]">Motif Tradisional Komunal.</strong> {product.intellectualProperty.copyrightNote}</>
                    )}
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Right Product Details & Philosophy */}
          <div className="md:col-span-6 space-y-5">
            
            <div>
              {/* Atelier info */}
              <div className="flex items-center gap-2 text-xs text-[#8D6E63] mb-1 font-sans">
                <Store className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="font-semibold text-[#3E2723]">{product.shopName}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#C5A059]" />
                  {product.shopCity}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#3E2723] leading-tight">
                {product.title}
              </h2>
              <p className="text-xs text-[#8D6E63] mt-0.5 font-sans">
                {product.subtitle}
              </p>
            </div>

            {/* Price */}
            <div className="p-4 rounded-xl bg-[#F3EFE7] border border-[#E0D5C1] flex items-baseline justify-between">
              <div>
                <span className="text-[10px] text-[#8D6E63] uppercase tracking-wider font-sans font-semibold block">
                  Nilai Mahakarya
                </span>
                <span className="text-2xl font-serif font-bold text-[#3E2723]">
                  Rp {totalPrice.toLocaleString('id-ID')}
                </span>
              </div>
              <span className="text-xs text-[#3E2723] font-sans font-semibold bg-[#E0D5C1] px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
                Stok Terbatas ({product.stock} Tersisa)
              </span>
            </div>

            {/* DEEP PHILOSOPHY SECTION */}
            <div className="p-4 rounded-xl bg-[#F3EFE7] border border-[#E0D5C1] space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#3E2723] font-serif">
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Filosofi & Makna Sakral Motif {product.motifName}</span>
              </div>
              <p className="text-xs text-[#5D4037] font-serif leading-relaxed">
                {product.philosophyLong}
              </p>
            </div>

            {/* Specifications & Craft Details */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E0D5C1]">
                <span className="text-[10px] text-[#8D6E63] font-sans block">Bahan & Kain:</span>
                <span className="font-serif font-semibold text-[#3E2723]">{product.fabricType}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E0D5C1]">
                <span className="text-[10px] text-[#8D6E63] font-sans block">Pewarnaan:</span>
                <span className="font-serif font-semibold text-[#3E2723]">{product.dyeTechnique}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E0D5C1]">
                <span className="text-[10px] text-[#8D6E63] font-sans block">Dimensi / Ukuran:</span>
                <span className="font-serif font-semibold text-[#3E2723]">{product.dimensions}</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E0D5C1]">
                <span className="text-[10px] text-[#8D6E63] font-sans block">Lama Pengerjaan:</span>
                <span className="font-serif font-semibold text-[#3E2723]">{product.creationDuration}</span>
              </div>
            </div>

            {/* Custom Packaging Add-ons */}
            <div className="space-y-2 pt-2 border-t border-[#E0D5C1]">
              <span className="text-xs font-serif font-bold text-[#3E2723]">Pilihan Kemasan Pusaka & Paspor:</span>
              
              <label 
                id="checkbox-wooden-box-label"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FDFBF7] border border-[#E0D5C1] cursor-pointer hover:border-[#C5A059]"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeWoodenBox}
                    onChange={(e) => setIncludeWoodenBox(e.target.checked)}
                    className="rounded text-[#3E2723] focus:ring-[#3E2723]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#3E2723] font-serif block">Kotak Kayu Jati Ukir Jepara</span>
                    <span className="text-[#8D6E63] font-sans text-[11px]">Kotak pusaka kayu solid bergravir sertifikat</span>
                  </div>
                </div>
                <span className="text-xs font-sans font-bold text-[#3E2723]">+Rp 250.000</span>
              </label>

              <label 
                id="checkbox-nfc-seal-label"
                className="flex items-center justify-between p-3 rounded-xl bg-[#FDFBF7] border border-[#E0D5C1] cursor-pointer hover:border-[#C5A059]"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeNfcSeal}
                    onChange={(e) => setIncludeNfcSeal(e.target.checked)}
                    className="rounded text-[#3E2723] focus:ring-[#3E2723]"
                  />
                  <div className="text-xs">
                    <span className="font-bold text-[#3E2723] font-serif block">Segel Fisik NFC Chip & Paspor Web3</span>
                    <span className="text-[#8D6E63] font-sans text-[11px]">Ditanam di tepi kain untuk pemindaian smartphone</span>
                  </div>
                </div>
                <span className="text-xs font-sans font-bold text-[#C5A059] uppercase tracking-wider text-[10px]">Included</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex items-center gap-3">
              <button
                id="btn-add-to-cart-modal"
                onClick={handleAddToCart}
                className="flex-1 py-3.5 rounded-none bg-[#3E2723] text-[#FDFBF7] font-sans uppercase tracking-wider font-bold text-xs sm:text-sm hover:bg-[#5D4037] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#3E2723]/20 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{isAddedToast ? '✓ Berhasil Ditambahkan!' : 'Tambahkan ke Keranjang'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};