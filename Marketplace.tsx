import React, { useState } from 'react';
import { PRODUCTS, ARTISAN_SHOPS } from '../data/batikData';
import { Product, CraftCategory, RegionOrigin, ActiveTab } from '../types';
import { 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  MapPin, 
  ShoppingBag, 
  Eye, 
  Clock, 
  Store,
  ChevronRight,
  BadgeCheck
} from 'lucide-react';

interface MarketplaceProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onNavigate: (tab: ActiveTab) => void;
  selectedMotifFilter?: string | null;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  onSelectProduct,
  onAddToCart,
  onNavigate,
  selectedMotifFilter
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<CraftCategory>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'duration'>('recommended');

  const categories: { id: CraftCategory; label: string }[] = [
    { id: 'all', label: 'Semua Koleksi' },
    { id: 'batik-tulis', label: 'Batik Tulis Sutra' },
    { id: 'busana-pria', label: 'Kemeja Pria' },
    { id: 'busana-wanita', label: 'Busana Wanita' },
    { id: 'kain-jarik', label: 'Kain Jarik Sakral' },
    { id: 'ukiran-kayu', label: 'Kriya Ukir Kayu' },
    { id: 'blangkon', label: 'Blangkon' },
    { id: 'keris', label: 'Keris Pusaka' },
    { id: 'tenun', label: 'Tenun Lurik' },
    { id: 'ikat-kepala', label: 'Ikat Kepala Etnik' }
  ];

  const regions: string[] = ['all', 'Surakarta (Solo)', 'Yogyakarta', 'Cirebon', 'Jepara'];

  // Filtering
  const filteredProducts = PRODUCTS.filter((p) => {
    // Search query
    const matchesSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.motifName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.philosophyShort.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;

    // Region filter
    const matchesRegion = selectedRegion === 'all' || p.shopCity === selectedRegion;

    // Motif filter from parent (if set from matcher or heritage)
    const matchesMotif = !selectedMotifFilter || p.motifId === selectedMotifFilter;

    return matchesSearch && matchesCategory && matchesRegion && matchesMotif;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'duration') return b.rating - a.rating;
    return 0; // default recommendation
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Banner & Header */}
      <div className="bg-[#2C1810] rounded-3xl rounded-tr-[48px] p-6 sm:p-10 text-[#FDFBF7] border border-[#C5A059]/50 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
                Pasar Pengrajin & Toko Keraton Terkurasi
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#FDFBF7]">
              Katalog Mahakarya <span className="italic font-normal">Wastra & Kriya Jawa</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#D7CCC8] font-serif leading-relaxed">
              Langsung dari sanggar maestro pembatik dan pengrajin terkemuka di Solo, Jogja, Cirebon, dan Jepara. 
              Setiap pembelian dilengkapi dengan sertifikat keaslian Web3 dan garansi keaslian 100%.
            </p>
          </div>

          <button
            id="view-curated-shops-banner-btn"
            onClick={() => onNavigate('shops')}
            className="px-6 py-3 rounded-none bg-[#C5A059] text-[#2C1810] font-sans font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37] transition-all shrink-0 flex items-center gap-2 shadow-md cursor-pointer"
          >
            <Store className="w-4 h-4" />
            <span>Profil Toko & Sanggar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-[#FDFBF7] rounded-2xl p-6 border border-[#E0D5C1] shadow-xs space-y-5">
        
        {/* Search Bar & Sort */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8D6E63] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="marketplace-search-input"
              type="text"
              placeholder="Cari motif (Parang, Kawung, Megamendung), produk, pengrajin, atau kota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-none border border-[#E0D5C1] bg-[#F3EFE7] text-xs sm:text-sm text-[#3E2723] focus:outline-none focus:border-[#3E2723] transition-colors font-sans"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              id="marketplace-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-2.5 rounded-none border border-[#E0D5C1] bg-[#F3EFE7] text-xs font-medium text-[#3E2723] focus:outline-none focus:border-[#3E2723] cursor-pointer font-sans uppercase tracking-wider"
            >
              <option value="recommended">Urutkan: Kurasi Terbaik</option>
              <option value="price-low">Harga: Terendah ke Tertinggi</option>
              <option value="price-high">Harga: Tertinggi ke Terendah</option>
              <option value="duration">Rating Pengrajin Tertinggi</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`cat-btn-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-none text-xs uppercase tracking-wider font-sans font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#3E2723] text-[#FDFBF7] font-semibold border border-[#3E2723]'
                  : 'bg-[#F3EFE7] text-[#5D4037] border border-[#E0D5C1] hover:bg-[#E0D5C1]/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-2 flex-wrap pt-3 border-t border-[#E0D5C1]">
          <span className="text-[11px] font-sans font-bold text-[#C5A059] uppercase tracking-wider flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Wilayah Pengrajin:
          </span>
          {regions.map((reg) => (
            <button
              key={reg}
              id={`region-btn-${reg.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedRegion(reg)}
              className={`text-[11px] font-sans px-3 py-1 rounded-full transition-colors cursor-pointer ${
                selectedRegion === reg
                  ? 'bg-[#3E2723] text-[#FDFBF7] font-semibold border border-[#3E2723]'
                  : 'bg-[#F3EFE7] text-[#5D4037] border border-[#E0D5C1] hover:bg-[#E0D5C1]'
              }`}
            >
              {reg === 'all' ? 'Semua Daerah' : reg}
            </button>
          ))}
        </div>

      </div>

      {/* Products Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-xs text-[#5D4037] font-sans">
            Menampilkan <span className="font-bold text-[#3E2723]">{filteredProducts.length}</span> karya terkurasi
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-[#FDFBF7] rounded-3xl p-12 text-center border border-[#E0D5C1] space-y-3">
            <Sparkles className="w-10 h-10 text-[#C5A059] mx-auto" />
            <h3 className="text-2xl font-serif text-[#3E2723]">
              Karya Tidak Ditemukan
            </h3>
            <p className="text-xs text-[#5D4037] font-serif">
              Coba gunakan kata kunci pencarian lain atau pilih filter wilayah yang berbeda.
            </p>
            <button
              id="reset-marketplace-filters-btn"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedRegion('all');
              }}
              className="px-5 py-2.5 rounded-none bg-[#3E2723] text-[#FDFBF7] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#5D4037] transition-colors mt-2 cursor-pointer"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                className="bg-[#FDFBF7] rounded-2xl rounded-tr-[30px] overflow-hidden border border-[#E0D5C1] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Image Container with Badges */}
                <div 
                  className="relative aspect-4/3 overflow-hidden bg-[#2C1810] cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5">
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FDFBF7]/90 backdrop-blur-xs text-[#3E2723] font-sans font-bold shadow-xs">
                      Motif: {product.motifName}
                    </span>
                    {product.isBatikTulisAsli && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C5A059] text-[#2C1810] font-sans font-bold shadow-xs uppercase">
                        100% Tulis Asli
                      </span>
                    )}
                  </div>

                  {/* Blockchain Tag */}
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-[#2C1810]/90 text-[#C5A059] text-[9px] font-sans uppercase tracking-widest px-2 py-0.5 rounded-none border border-[#C5A059]/40 backdrop-blur-xs">
                    <ShieldCheck className="w-3 h-3 text-[#C5A059]" />
                    <span>{product.blockchain.tokenId.split('-')[1]}</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-[#8D6E63] font-sans">
                      <span className="font-medium flex items-center gap-1">
                        <Store className="w-3 h-3 text-[#C5A059]" />
                        {product.shopName}
                      </span>
                      <span className="flex items-center gap-1 text-[#C5A059] font-semibold">
                        <Star className="w-3 h-3 fill-[#C5A059] text-[#C5A059]" />
                        {product.rating} ({product.reviewCount})
                      </span>
                    </div>

                    <h3 
                      className="text-base font-serif font-bold text-[#3E2723] line-clamp-1 group-hover:text-[#C5A059] transition-colors cursor-pointer"
                      onClick={() => onSelectProduct(product)}
                    >
                      {product.title}
                    </h3>

                    {/* Philosophy Quote */}
                    <p className="text-xs text-[#5D4037] font-serif line-clamp-2 italic bg-[#F3EFE7] p-2.5 rounded-xl border border-[#E0D5C1]">
                      "{product.philosophyShort}"
                    </p>

                    {/* IG / HKI Badge (if applicable) */}
                    {product.intellectualProperty?.geographicalIndication && (
                      <div className="flex items-center gap-1.5 text-[10px] text-[#3E2723] font-sans font-semibold bg-[#E9F5EC] border border-[#B7DFC4] px-2.5 py-1 rounded-full w-fit">
                        <BadgeCheck className="w-3 h-3 text-[#2F8F4E]" />
                        <span>IG Terdaftar: {product.intellectualProperty.geographicalIndication.split(' - ')[0]}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-3 text-[11px] text-[#8D6E63] font-sans pt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C5A059]" />
                        Proses: {product.creationDuration}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#C5A059]" />
                        {product.shopCity}
                      </span>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-[#E0D5C1] flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-[#8D6E63] uppercase tracking-wider font-sans font-semibold">Harga Resmi</p>
                      <p className="text-lg font-serif font-bold text-[#3E2723]">
                        Rp {product.price.toLocaleString('id-ID')}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        id={`btn-detail-${product.id}`}
                        onClick={() => onSelectProduct(product)}
                        className="p-2 rounded-none bg-[#F3EFE7] text-[#3E2723] border border-[#E0D5C1] hover:bg-[#E0D5C1] transition-colors cursor-pointer"
                        title="Lihat Detail & Filosofi"
                      >
                        <Eye className="w-4 h-4 text-[#3E2723]" />
                      </button>

                      <button
                        id={`btn-add-cart-${product.id}`}
                        onClick={() => onAddToCart(product)}
                        className="px-3.5 py-2 rounded-none bg-[#3E2723] text-[#FDFBF7] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#5D4037] transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Beli</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};