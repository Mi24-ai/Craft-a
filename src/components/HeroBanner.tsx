import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Gem, Compass } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeroBannerProps {
  onNavigate: (tab: ActiveTab) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden bg-[#FDFBF7] text-[#3E2723] py-12 md:py-20 border-b border-[#E0D5C1]">
      {/* Background Decorative Subtle Motif */}
      <div className="absolute inset-0 bg-batik-pattern opacity-15 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Artistic Flair Editorial Copy & Teaser */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
                Mahakarya Masyarakat Jawa
              </span>
              <div className="w-8 h-[1px] bg-[#C5A059]" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[#3E2723] leading-[1.05] tracking-tight">
              Harmoni Filosofi Batik & <br />
              <span className="italic font-normal text-[#C5A059]">Kriya Luhur Jawa</span>
            </h1>

            <div className="w-16 h-[1px] bg-[#3E2723]/30 my-4" />

            <p className="text-base sm:text-lg text-[#5D4037] font-serif leading-relaxed max-w-2xl">
              Setiap goresan canting malam dan pahatan kayu jati menyimpan kidung doa, 
              falsafah kehidupan, dan kebijaksanaan leluhur. Temukan motif batik yang paling 
              selaras dengan sifat jiwamu, jelajahi toko pengrajin asli, serta miliki karya otentik 
              berpaspor sertifikasi blockchain.
            </p>

            {/* Interactive Personality Teaser Box with Artistic Rounded Corner */}
            <div className="bg-[#F3EFE7] p-6 sm:p-8 rounded-tr-[60px] border-l-4 border-[#C5A059] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-[#8D6E63] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  AI Batik Character Matcher
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E0D5C1] text-[#3E2723] font-sans font-semibold">
                  5 Pertanyaan Jiwa
                </span>
              </div>
              <p className="text-sm font-serif text-[#3E2723] italic">
                "Karakter batiniahmu memancarkan aura tersendiri. Biarkan kearifan leluhur memilih motif yang menyatu dengan jiwamu."
              </p>
              
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  id="hero-quiz-cta-btn"
                  onClick={() => onNavigate('matcher')}
                  className="px-6 py-3 rounded-none bg-[#3E2723] text-[#FDFBF7] hover:bg-[#5D4037] text-xs uppercase tracking-widest font-sans font-semibold transition-all shadow-md flex items-center gap-2.5 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#C5A059]" />
                  <span>Mulai Pencocokan Motif</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  id="hero-marketplace-cta-btn"
                  onClick={() => onNavigate('marketplace')}
                  className="px-5 py-3 rounded-none border border-[#3E2723] text-[#3E2723] hover:bg-[#3E2723] hover:text-[#FDFBF7] text-xs uppercase tracking-widest font-sans font-medium transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#C5A059]" />
                  <span>Jelajahi Pasar</span>
                </button>
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#E0D5C1] text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F3EFE7] border border-[#E0D5C1] flex items-center justify-center text-[#C5A059]">
                  <Gem className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-serif font-bold text-[#3E2723]">100% Canting Tulis</h4>
                  <p className="text-[11px] text-[#8D6E63] font-sans">Malam Alami</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F3EFE7] border border-[#E0D5C1] flex items-center justify-center text-[#C5A059]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-serif font-bold text-[#3E2723]">Filosofi Mendalam</h4>
                  <p className="text-[11px] text-[#8D6E63] font-sans">Kidung Leluhur</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F3EFE7] border border-[#E0D5C1] flex items-center justify-center text-[#00FF88]">
                  <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                </div>
                <div>
                  <h4 className="text-xs font-serif font-bold text-[#3E2723]">Blockchain</h4>
                  <p className="text-[11px] text-[#8D6E63] font-sans">Polygon Certified</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dark Asymmetrical Showcase Canvas */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-[#2C1810] text-[#FDFBF7] p-6 sm:p-7 rounded-bl-[80px] sm:rounded-bl-[100px] rounded-tr-[30px] border border-[#C5A059]/40 shadow-2xl shadow-[#2C1810]/40 flex flex-col justify-between space-y-5">
              
              {/* Header Badges */}
              <div className="flex items-center justify-between border-b border-[#5D4037] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00FF88] shadow-[0_0_8px_#00FF88]" />
                  <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-[#E0D5C1]">
                    Mahakarya Terverifikasi
                  </span>
                </div>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#3E2723] text-[#C5A059] border border-[#C5A059]/40 font-mono">
                  Blockchain
                </span>
              </div>

              {/* Masterpiece Showcase Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-4/3 group border border-[#5D4037]/60">
                <img
                  src="/image/sogan solo.jpg"
                  alt="Batik Tulis Sogan Jawa"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D06] via-transparent to-transparent" />
                
                <div className="absolute bottom-3 left-3 right-3 p-3.5 rounded-xl bg-[#2C1810]/95 backdrop-blur-md border border-[#C5A059]/40">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] text-[#C5A059] font-serif uppercase tracking-widest">Motif Parang Barong</p>
                      <h4 className="text-base font-serif font-bold text-[#FAF7F2]">
                        Mahakarya Sogan Solo
                      </h4>
                    </div>
                    <span className="text-sm font-sans font-bold text-[#C5A059]">
                      Rp 4.850.000
                    </span>
                  </div>
                  <p className="text-[11px] text-[#D5C4B3] mt-1.5 font-serif italic line-clamp-1">
                    "Simbol kesatria dan wibawa kepemimpinan yang teguh menghadapi samudra."
                  </p>
                </div>
              </div>

              {/* Atelier Provenance Highlight */}
              <div className="p-3.5 rounded-xl bg-[#3E2723]/80 border border-[#5D4037] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#E0D5C1]">
  <img
    src="/image/logo nadar.jpg"
    alt="Sanggar Danar Hadi Logo"
    className="w-full h-full object-cover"
  />
</div>                  <div>
                    <h5 className="font-serif font-bold text-[#FAF7F2]">Sanggar Danar Hadi</h5>
                    <p className="text-[10px] text-[#C5A059] font-sans">Surakarta • Terakreditasi</p>
                  </div>
                </div>

                <button
                  id="preview-quick-view-btn"
                  onClick={() => onNavigate('shops')}
                  className="px-3 py-1.5 rounded-full border border-[#C5A059]/60 text-[#FAF7F2] text-[10px] uppercase font-sans font-semibold hover:bg-[#C5A059] hover:text-[#2C1810] transition-colors"
                >
                  Profil Toko
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                <button
                  id="preview-quick-shop-btn"
                  onClick={() => onNavigate('marketplace')}
                  className="py-2.5 px-3 rounded-none bg-[#3E2723] hover:bg-[#5D4037] text-[#E0D5C1] text-center text-xs uppercase font-sans tracking-widest font-semibold border border-[#5D4037] transition-colors"
                >
                  Beli Karya Ini
                </button>
                <button
                  id="preview-quick-match-btn"
                  onClick={() => onNavigate('matcher')}
                  className="py-2.5 px-3 rounded-none bg-[#C5A059] hover:bg-[#D4AF37] text-[#2C1810] text-center text-xs uppercase font-sans tracking-widest font-bold transition-colors shadow-xs"
                >
                  Cek Keselarasan
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
