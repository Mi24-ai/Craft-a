import React, { useState } from 'react';
import { ARTISAN_SHOPS, PRODUCTS } from '../data/batikData';
import { ArtisanShop, Product, ActiveTab } from '../types';
import { 
  Store, 
  MapPin, 
  Star, 
  ShieldCheck, 
  Calendar, 
  Sparkles, 
  ChevronRight, 
  ArrowLeft,
  FileCheck2,
  BadgeCheck,
  Scale
} from 'lucide-react';

interface ArtisanShopsViewProps {
  onSelectProduct: (product: Product) => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const ArtisanShopsView: React.FC<ArtisanShopsViewProps> = ({
  onSelectProduct,
  onNavigate
}) => {
  const [selectedShop, setSelectedShop] = useState<ArtisanShop | null>(null);

  const shopProducts = selectedShop
    ? PRODUCTS.filter(p => p.shopId === selectedShop.id)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Header */}
      {!selectedShop && (
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Store className="w-4 h-4 text-[#C5A059]" />
            <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
              Sanggar & Rumah Produksi Mitra Resmi
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#3E2723]">
            Toko Pengrajin <span className="italic font-normal">& Atelier Keraton</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#5D4037] font-serif leading-relaxed">
            Mengenal lebih dekat para maestro pelestari tradisi adiluhung Jawa. 
            Setiap toko merupakan sanggar resmi yang menjaga standar canting malam murni dan pahatan kayu pusaka.
          </p>
        </div>
      )}

      {/* SHOP LIST VIEW */}
      {!selectedShop ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ARTISAN_SHOPS.map((shop) => (
            <div
              key={shop.id}
              id={`shop-card-${shop.id}`}
              className="bg-[#FDFBF7] rounded-3xl rounded-tr-[48px] overflow-hidden border border-[#E0D5C1] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              onClick={() => setSelectedShop(shop)}
            >
              {/* Banner with Avatar */}
              <div className="relative h-52 overflow-hidden bg-[#2C1810]">
                <img
                  src={shop.banner}
                  alt={shop.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-4 left-4 bg-[#FDFBF7]/90 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-sans font-bold text-[#3E2723] flex items-center gap-1.5 shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  {shop.city}
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#2C1810]/90 text-[#C5A059] text-xs px-3 py-1 rounded-none border border-[#C5A059]/40 font-sans uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Verified Atelier</span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                  <div>
                    <h3 className="text-xl font-serif text-[#FDFBF7]">
                      {shop.name}
                    </h3>
                    <p className="text-xs text-[#E0D5C1] font-serif italic">
                      "{shop.tagline}"
                    </p>
                  </div>
                  <div className="flex items-center gap-1 bg-[#C5A059] text-[#2C1810] px-2.5 py-0.5 rounded-none text-xs font-sans font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{shop.rating}</span>
                  </div>
                </div>
              </div>

              {/* Shop Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-xs text-[#8D6E63] font-sans">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
                      Didirikan: {shop.foundedYear}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                      Keahlian: {shop.specialty}
                    </span>
                  </div>

                  <p className="text-xs text-[#5D4037] font-serif leading-relaxed line-clamp-3">
                    {shop.description}
                  </p>

                  {shop.legalInfo?.umkmCertified && (
                    <div className="flex items-center gap-1.5 text-[10px] text-[#1E5C34] font-sans font-semibold bg-[#E9F5EC] border border-[#B7DFC4] px-2.5 py-1 rounded-full w-fit">
                      <BadgeCheck className="w-3 h-3 text-[#2F8F4E]" />
                      <span>UMKM & Legalitas Usaha Terverifikasi</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#E0D5C1] flex items-center justify-between">
                  <div className="text-xs text-[#3E2723] font-sans font-semibold">
                    {shop.productsCount} Karya Tersedia
                  </div>
                  <button
                    id={`btn-view-atelier-${shop.id}`}
                    className="px-4 py-2 rounded-none bg-[#3E2723] text-[#FDFBF7] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#5D4037] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Kunjungi Toko & Produk</span>
                    <ChevronRight className="w-4 h-4 text-[#C5A059]" />
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        /* SINGLE SHOP DETAIL & CATALOG VIEW */
        <div className="space-y-8">
          
          <button
            id="back-to-all-shops-btn"
            onClick={() => setSelectedShop(null)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-none bg-[#F3EFE7] text-[#3E2723] text-xs font-sans uppercase tracking-wider font-semibold border border-[#E0D5C1] hover:bg-[#E0D5C1] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Sanggar</span>
          </button>

          {/* Shop Hero Card */}
          <div className="bg-[#2C1810] text-[#FDFBF7] rounded-3xl rounded-tr-[56px] p-6 sm:p-10 border border-[#C5A059] shadow-xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-none bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/30 font-sans uppercase tracking-widest">
                    OFFICIAL ATELIER ID • EST. {selectedShop.foundedYear}
                  </span>
                  <span className="text-xs text-[#D7CCC8] font-sans flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" /> {selectedShop.address}
                  </span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#FDFBF7]">
                  {selectedShop.name}
                </h2>
                <p className="text-sm text-[#C5A059] font-serif italic">
                  "{selectedShop.tagline}"
                </p>

                <p className="text-xs sm:text-sm text-[#D7CCC8] font-serif leading-relaxed">
                  {selectedShop.story}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#D7CCC8]">
                  <span>Pendiri: <strong className="text-[#FDFBF7] font-serif font-semibold">{selectedShop.founder}</strong></span>
                  <span>•</span>
                  <span>Wallet: <strong className="text-[#C5A059]">{selectedShop.blockchainWallet}</strong></span>
                </div>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="rounded-2xl rounded-tr-[36px] overflow-hidden aspect-4/3 w-full border-2 border-[#C5A059]/40 shadow-lg">
                  <img src={selectedShop.banner} alt={selectedShop.name} className="w-full h-full object-cover" />
                </div>
              </div>

            </div>
          </div>

          {/* Legalitas & Perlindungan Karya Section */}
          {selectedShop.legalInfo && (
            <div className="bg-[#FDFBF7] rounded-2xl p-6 border border-[#E0D5C1] shadow-xs space-y-4">
              <div className="flex items-center gap-2">
                <Scale className="w-4 h-4 text-[#C5A059]" />
                <h3 className="text-sm font-serif font-bold text-[#3E2723] uppercase tracking-wider">
                  Legalitas Usaha & Perlindungan Karya
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#F3EFE7] border border-[#E0D5C1]">
                  <span className="text-[10px] text-[#8D6E63] font-sans block">Nomor Induk Berusaha (NIB):</span>
                  <span className="font-mono font-semibold text-[#3E2723]">{selectedShop.legalInfo.nib || '—'}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F3EFE7] border border-[#E0D5C1]">
                  <span className="text-[10px] text-[#8D6E63] font-sans block">Status UMKM:</span>
                  <span className="font-sans font-semibold text-[#3E2723] flex items-center gap-1.5">
                    {selectedShop.legalInfo.umkmCertified ? (
                      <>
                        <BadgeCheck className="w-3.5 h-3.5 text-[#2F8F4E]" />
                        Terverifikasi
                      </>
                    ) : (
                      'Belum Terverifikasi'
                    )}
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#F3EFE7] border border-[#E0D5C1]">
                  <span className="text-[10px] text-[#8D6E63] font-sans block">Merek Dagang (DJKI):</span>
                  <span className="font-mono font-semibold text-[#3E2723]">{selectedShop.legalInfo.trademarkNumber || 'Dalam Proses Pendaftaran'}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 pt-2 border-t border-[#E0D5C1]">
                <FileCheck2 className="w-3.5 h-3.5 text-[#8D6E63] shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#5D4037] font-serif leading-relaxed">
                  {selectedShop.legalInfo.authenticityStatement}
                </p>
              </div>
            </div>
          )}

          {/* Shop's Products */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-[#3E2723]">
              Karya Unggulan dari {selectedShop.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shopProducts.map((prod) => (
                <div
                  key={prod.id}
                  id={`shop-prod-${prod.id}`}
                  className="bg-[#FDFBF7] rounded-2xl rounded-tr-[30px] overflow-hidden border border-[#E0D5C1] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
                  onClick={() => onSelectProduct(prod)}
                >
                  <div className="aspect-4/3 relative overflow-hidden bg-[#2C1810]">
                    <img src={prod.images[0]} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute top-2.5 left-2.5 bg-[#FDFBF7]/90 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold text-[#3E2723]">
                      Motif: {prod.motifName}
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h4 className="text-base font-serif font-bold text-[#3E2723] line-clamp-1">{prod.title}</h4>
                      <p className="text-xs text-[#5D4037] font-serif line-clamp-2 mt-1">"{prod.philosophyShort}"</p>
                    </div>

                    <div className="pt-3 border-t border-[#E0D5C1] flex items-center justify-between">
                      <span className="text-base font-serif font-bold text-[#3E2723]">Rp {prod.price.toLocaleString('id-ID')}</span>
                      <button className="px-3.5 py-1.5 rounded-none bg-[#3E2723] text-[#FDFBF7] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#5D4037]">
                        Lihat Filosofi
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};