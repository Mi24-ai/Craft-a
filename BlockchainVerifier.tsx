import React, { useState } from 'react';
import { PRODUCTS, BLOCKCHAIN_RECENT_MINTS } from '../data/batikData';
import { Product } from '../types';
import { 
  ShieldCheck, 
  Search, 
  QrCode, 
  Smartphone, 
  Cpu, 
  FileCheck2, 
  Hash, 
  Layers, 
  Clock, 
  Award, 
  Leaf, 
  ExternalLink,
  CheckCircle,
  RefreshCw,
  Sparkles,
  Lock
} from 'lucide-react';

interface BlockchainVerifierProps {
  initialTokenId?: string | null;
  onSelectProduct?: (product: Product) => void;
}

export const BlockchainVerifier: React.FC<BlockchainVerifierProps> = ({
  initialTokenId,
  onSelectProduct
}) => {
  const [searchToken, setSearchToken] = useState<string>(initialTokenId || 'SWARNA-NFT-08492');
  const [isScanningNfc, setIsScanningNfc] = useState<boolean>(false);
  const [activeProofProduct, setActiveProofProduct] = useState<Product | null>(() => {
    return PRODUCTS.find(p => p.blockchain.tokenId === (initialTokenId || 'SWARNA-NFT-08492')) || PRODUCTS[0];
  });

  const handleSearch = (token: string) => {
    const found = PRODUCTS.find(
      p => p.blockchain.tokenId.toLowerCase() === token.trim().toLowerCase() ||
           p.blockchain.batchNumber.toLowerCase() === token.trim().toLowerCase()
    );
    if (found) {
      setActiveProofProduct(found);
    } else {
      setActiveProofProduct(PRODUCTS[0]);
    }
  };

  const simulateNfcScan = () => {
    setIsScanningNfc(true);
    setTimeout(() => {
      setIsScanningNfc(false);
      // Pick random product
      const randomProd = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
      setActiveProofProduct(randomProd);
      setSearchToken(randomProd.blockchain.tokenId);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
          <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
            Blockchain Provenance & Anti-Pemalsuan
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#3E2723]">
          Paspor Digital Batik <span className="italic font-normal">& Blockchain</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#5D4037] font-serif leading-relaxed">
          Setiap helai karya Swarna Nusantara tercatat dengan Smart Contract di jaringan 
          Polygon L2. Menjamin 100% keaslian canting tulis tangan, transparansi jam kerja pembatik, 
          dan formula pewarna alami yang kekal tercatat di buku besar digital.
        </p>
      </div>

      {/* Verification Action Bar (NFC / QR / Token Search) */}
      <div className="bg-[#FDFBF7] rounded-3xl rounded-tr-[48px] p-6 sm:p-8 border border-[#E0D5C1] shadow-md max-w-4xl mx-auto space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#8D6E63] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="blockchain-token-search-input"
              type="text"
              placeholder="Masukkan Token ID (contoh: SWARNA-NFT-08492)..."
              value={searchToken}
              onChange={(e) => setSearchToken(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchToken)}
              className="w-full pl-10 pr-4 py-3 rounded-none border border-[#E0D5C1] bg-[#F3EFE7] text-xs sm:text-sm font-mono text-[#3E2723] focus:outline-none focus:border-[#3E2723]"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              id="btn-verify-token"
              onClick={() => handleSearch(searchToken)}
              className="flex-1 md:flex-initial px-6 py-3 rounded-none bg-[#3E2723] text-[#FDFBF7] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#5D4037] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-[#C5A059]" />
              <span>Verifikasi</span>
            </button>

            <button
              id="btn-simulate-nfc"
              onClick={simulateNfcScan}
              disabled={isScanningNfc}
              className="flex-1 md:flex-initial px-5 py-3 rounded-none bg-[#F3EFE7] border border-[#E0D5C1] text-[#3E2723] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#E0D5C1] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              title="Simulasi Tempel Smartphone ke Chip NFC Kain"
            >
              <Smartphone className={`w-4 h-4 text-[#C5A059] ${isScanningNfc ? 'animate-bounce' : ''}`} />
              <span>{isScanningNfc ? 'Memindai...' : 'Pindai Chip NFC'}</span>
            </button>
          </div>

        </div>

        {/* Quick select chips */}
        <div className="flex items-center gap-2 flex-wrap pt-4 border-t border-[#E0D5C1] text-xs">
          <span className="text-[#8D6E63] text-[11px] font-sans">Coba Token Sampel:</span>
          {PRODUCTS.slice(0, 3).map((p) => (
            <button
              key={p.blockchain.tokenId}
              id={`chip-token-${p.blockchain.tokenId}`}
              onClick={() => {
                setSearchToken(p.blockchain.tokenId);
                setActiveProofProduct(p);
              }}
              className="px-3 py-1 rounded-full bg-[#F3EFE7] border border-[#E0D5C1] font-mono text-[11px] text-[#3E2723] hover:border-[#3E2723] cursor-pointer"
            >
              {p.blockchain.tokenId}
            </button>
          ))}
        </div>
      </div>

      {/* ACTIVE CERTIFICATE DISPLAY CARD */}
      {activeProofProduct && (
        <div className="max-w-5xl mx-auto bg-[#2C1810] rounded-3xl rounded-tr-[56px] p-6 sm:p-10 border border-[#C5A059] shadow-2xl text-[#FDFBF7] relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Certificate Header Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#3E2723] pb-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#8B4513] flex items-center justify-center text-[#2C1810] font-bold text-xl shadow-lg border border-[#C5A059]">
                <ShieldCheck className="w-7 h-7 text-[#2C1810]" />
              </div>
              <div>
                <span className="text-[10px] px-2 py-0.5 rounded-none bg-[#C5A059]/20 text-[#C5A059] font-sans uppercase tracking-widest border border-[#C5A059]/30">
                  SMART CONTRACT VERIFIED • POLYGON L2
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#FDFBF7] mt-1">
                  Sertifikat Paspor Digital Wastra Luhur
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#1C0E07] px-4 py-2 rounded-none border border-[#C5A059]/40">
              <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse" />
              <span className="text-xs font-sans uppercase tracking-wider text-[#C5A059] font-bold">
                100% Immutable & Authentic
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Product Visual & Holographic Gold Seal */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-4/3 rounded-2xl rounded-tr-[36px] overflow-hidden border-2 border-[#C5A059]/50 shadow-xl group">
                <img
                  src={activeProofProduct.images[0]}
                  alt={activeProofProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] text-[#C5A059] font-sans uppercase tracking-wider">
                    {activeProofProduct.shopName}
                  </span>
                  <h4 className="text-sm font-serif font-bold text-[#FDFBF7] leading-tight">
                    {activeProofProduct.title}
                  </h4>
                </div>
              </div>

              {/* Hologram Box */}
              <div className="p-4 rounded-xl bg-[#1C0E07] border border-[#3E2723] space-y-2">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[#8D6E63]">Status Pewarna:</span>
                  <span className="text-[#C5A059] font-semibold flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-[#C5A059]" /> 100% Nabati Alami (Eco Certified)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[#8D6E63]">Metode:</span>
                  <span className="text-[#FDFBF7] font-semibold">Canting Bolak-Balik</span>
                </div>
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[#8D6E63]">Durasi Tangan:</span>
                  <span className="text-[#C5A059] font-semibold">{activeProofProduct.blockchain.handCantingHours} Jam Kerja Teliti</span>
                </div>
              </div>
            </div>

            {/* Right Smart Contract Provenance Table */}
            <div className="lg:col-span-7 space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-3.5 rounded-xl bg-[#1C0E07] border border-[#3E2723]">
                  <span className="text-[#8D6E63] text-[10px] uppercase font-sans block">Token ID:</span>
                  <span className="text-[#C5A059] font-bold text-sm">{activeProofProduct.blockchain.tokenId}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1C0E07] border border-[#3E2723]">
                  <span className="text-[#8D6E63] text-[10px] uppercase font-sans block">Nomor Batch Pusaka:</span>
                  <span className="text-[#FDFBF7] font-bold">{activeProofProduct.blockchain.batchNumber}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1C0E07] border border-[#3E2723] sm:col-span-2">
                  <span className="text-[#8D6E63] text-[10px] uppercase font-sans block">Smart Contract Address:</span>
                  <span className="text-[#D7CCC8] break-all text-[11px]">{activeProofProduct.blockchain.contractAddress}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1C0E07] border border-[#3E2723] sm:col-span-2">
                  <span className="text-[#8D6E63] text-[10px] uppercase font-sans block">Digital Fabric Hash (SHA-256):</span>
                  <span className="text-[#C5A059] break-all text-[11px]">{activeProofProduct.blockchain.hash}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1C0E07] border border-[#3E2723]">
                  <span className="text-[#8D6E63] text-[10px] uppercase font-sans block">Master Weaver / Pembatik:</span>
                  <span className="text-[#FDFBF7] font-semibold text-xs font-serif">{activeProofProduct.blockchain.masterWeaver}</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#1C0E07] border border-[#3E2723]">
                  <span className="text-[#8D6E63] text-[10px] uppercase font-sans block">Waktu Pencatatan Balik:</span>
                  <span className="text-[#FDFBF7] font-semibold text-xs">{activeProofProduct.blockchain.timestamp}</span>
                </div>
              </div>

              {/* Philosophy & Provenance Note */}
              <div className="p-4 rounded-xl bg-[#1C0E07] border border-[#C5A059]/30 space-y-1 text-xs">
                <span className="text-[#C5A059] font-bold font-serif uppercase tracking-wider block">
                  Jaminan Keaslian Leluhur:
                </span>
                <p className="text-[#D7CCC8] font-serif leading-relaxed">
                  Kain ini telah diverifikasi secara fisik dan digital oleh Dewan Kurasi Swarna Nusantara. 
                  Tidak dapat diduplikasi, dicetak mesin (printing), ataupun dipalsukan tanpa merusak hash kriptografis kain.
                </p>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* RECENT BLOCKCHAIN MINTS FEED */}
      <div className="max-w-5xl mx-auto space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#C5A059]" />
            <h3 className="text-xl font-serif text-[#3E2723]">
              Aktivitas Buku Besar Blockchain Terkini
            </h3>
          </div>
          <span className="text-xs text-[#8D6E63] font-sans flex items-center gap-1">
            <RefreshCw className="w-3 h-3 text-[#C5A059]" /> Live Sync
          </span>
        </div>

        <div className="bg-[#FDFBF7] rounded-2xl border border-[#E0D5C1] overflow-hidden shadow-xs divide-y divide-[#E0D5C1]">
          {BLOCKCHAIN_RECENT_MINTS.map((m, idx) => (
            <div key={idx} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-none bg-[#F3EFE7] border border-[#E0D5C1] flex items-center justify-center font-mono text-[#3E2723] font-bold">
                  #
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#3E2723] font-mono">{m.tokenId}</span>
                    <span className="text-[10px] px-2 py-0.2 rounded-full bg-[#E0D5C1] text-[#3E2723] font-sans uppercase font-medium">
                      {m.status}
                    </span>
                  </div>
                  <p className="text-[#5D4037] font-serif">{m.item} • {m.artisan}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4 text-[11px] text-[#8D6E63] font-mono">
                <span>TX: {m.txHash}</span>
                <span>⏱️ {m.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
