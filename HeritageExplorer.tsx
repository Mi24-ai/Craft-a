import React, { useState } from 'react';
import { BATIK_MOTIFS, JAVANESE_CRAFTS } from '../data/batikData';
import { BatikMotif, JavaneseCraft, ActiveTab } from '../types';
import { Sparkles, MapPin, Eye, BookOpen, Compass, ChevronRight, CheckCircle2, Flame, Droplets, Wind, Mountain, Moon } from 'lucide-react';

interface HeritageExplorerProps {
  onSelectMotif: (motif: BatikMotif) => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const HeritageExplorer: React.FC<HeritageExplorerProps> = ({ onSelectMotif, onNavigate }) => {
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedCraftTab, setSelectedCraftTab] = useState<'all' | 'batik' | 'ukir' | 'keris' | 'wayang' | 'tenun'>('all');
  const [activeMotifModal, setActiveMotifModal] = useState<BatikMotif | null>(null);

  const regions = [
    { id: 'all', name: 'Semua Wilayah Jawa' },
    { id: 'Surakarta (Solo)', name: 'Surakarta (Solo)' },
    { id: 'Yogyakarta', name: 'Yogyakarta' },
    { id: 'Cirebon', name: 'Cirebon' },
    { id: 'Pekalongan', name: 'Pekalongan' },
    { id: 'Jepara', name: 'Jepara' }
  ];

  const filteredMotifs = selectedRegion === 'all'
    ? BATIK_MOTIFS
    : BATIK_MOTIFS.filter(m => m.originCity === selectedRegion);

  const filteredCrafts = selectedCraftTab === 'all'
    ? JAVANESE_CRAFTS
    : JAVANESE_CRAFTS.filter(c => c.category === selectedCraftTab);

  const getElementIcon = (elem: string) => {
    if (elem.includes('Api')) return <Flame className="w-3.5 h-3.5 text-amber-600" />;
    if (elem.includes('Air')) return <Droplets className="w-3.5 h-3.5 text-sky-600" />;
    if (elem.includes('Udara')) return <Wind className="w-3.5 h-3.5 text-emerald-600" />;
    if (elem.includes('Tanah')) return <Mountain className="w-3.5 h-3.5 text-amber-800" />;
    return <Moon className="w-3.5 h-3.5 text-purple-600" />;
  };

  return (
    <div className="space-y-16 py-8">
      
      {/* SECTION 1: Introduction to Batik & Javanese Motifs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="flex items-center justify-center gap-3">
            <div className="w-8 h-[1px] bg-[#C5A059]" />
            <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
              Ensiklopedia Ragam Budaya Jawa
            </span>
            <div className="w-8 h-[1px] bg-[#C5A059]" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#3E2723]">
            Mengenal Ragam Motif Batik & <span className="italic font-normal">Makna Filosofisnya</span>
          </h2>
          <p className="text-sm sm:text-base text-[#5D4037] font-serif leading-relaxed">
            Batik bukan sekadar corak indah di atas kain mori. Bagi masyarakat Jawa, batik adalah 
            kidung doa, cermin budi pekerti luhur, dan simbol karakter batiniah sang pemakai.
          </p>
        </div>

        {/* Regional Filter Chips */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
          {regions.map((reg) => (
            <button
              key={reg.id}
              id={`filter-region-${reg.id.replace(/\s+/g, '-').toLowerCase()}`}
              onClick={() => setSelectedRegion(reg.id)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-sans font-medium transition-all cursor-pointer ${
                selectedRegion === reg.id
                  ? 'bg-[#3E2723] text-[#FDFBF7] shadow-sm font-semibold border border-[#3E2723]'
                  : 'bg-[#F3EFE7] text-[#5D4037] border border-[#E0D5C1] hover:bg-[#E0D5C1]/60'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-[#C5A059]" />
                {reg.name}
              </span>
            </button>
          ))}
        </div>

        {/* Motifs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMotifs.map((motif) => (
            <div
              key={motif.id}
              id={`motif-card-${motif.id}`}
              className="bg-[#FDFBF7] rounded-2xl rounded-tr-[40px] overflow-hidden border border-[#E0D5C1] hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Container */}
              <div className="relative aspect-16/10 overflow-hidden bg-[#2C1810]">
                <img
                  src={motif.image}
                  alt={motif.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/95 via-transparent to-transparent" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FDFBF7]/90 backdrop-blur-sm text-[#3E2723] font-sans font-semibold shadow-xs flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C5A059]" />
                    {motif.originCity}
                  </span>
                  {motif.isRoyalRestricted && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C5A059] text-[#2C1810] font-sans font-bold shadow-xs uppercase">
                      Awisan Dalem
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-[11px] text-[#C5A059] font-serif-editorial uppercase tracking-widest">{motif.javaneseName}</p>
                  <h3 className="text-xl font-serif font-bold text-[#FDFBF7] leading-tight">
                    {motif.name}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-[#8D6E63] font-sans font-medium mb-1.5">
                    {getElementIcon(motif.element)}
                    <span>Elemen Semesta: {motif.element}</span>
                  </div>

                  <p className="text-xs text-[#5D4037] font-serif leading-relaxed line-clamp-3">
                    {motif.philosophy}
                  </p>
                </div>

                {/* Aura & Suitable Characters */}
                <div className="pt-3 border-t border-[#E0D5C1] space-y-2">
                  <div className="text-[11px] bg-[#F3EFE7] p-2.5 rounded-xl border border-[#E0D5C1]">
                    <span className="font-bold text-[#3E2723] font-serif block">Aura & Karakter:</span>
                    <span className="text-[#5D4037] font-sans">{motif.aura}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      id={`view-motif-detail-${motif.id}`}
                      onClick={() => setActiveMotifModal(motif)}
                      className="text-xs font-serif font-semibold text-[#3E2723] hover:text-[#C5A059] flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#C5A059]" />
                      Filosofi Lengkap
                    </button>

                    <button
                      id={`match-motif-btn-${motif.id}`}
                      onClick={() => {
                        onSelectMotif(motif);
                        onNavigate('marketplace');
                      }}
                      className="px-3.5 py-1.5 rounded-none bg-[#3E2723] text-[#FDFBF7] text-xs font-sans uppercase tracking-wider hover:bg-[#5D4037] transition-colors flex items-center gap-1"
                    >
                      <span>Katalog Produk</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: 6 Tahapan Pembuatan Batik Tulis Tradisional */}
      <section className="bg-[#F3EFE7] py-14 border-y border-[#E0D5C1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-sans font-bold text-[#C5A059] uppercase tracking-[0.3em]">
              Proses Tradisi Adiluhung
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#3E2723]">
              6 Langkah Kesabaran <span className="italic font-normal">Batik Tulis Asli</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5D4037] font-serif">
              Setiap helai kain batik tulis melewati meditasi kesabaran sang pembatik hingga berbulan-bulan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                step: '01',
                title: 'Nyorek (Memola)',
                desc: 'Menggambar pola ragam hias motif di atas kain mori primissima menggunakan pensil dengan memperhatikan proporsi sakral.',
                time: '1-3 Hari'
              },
              {
                step: '02',
                title: 'Nglowong (Canting Pokok)',
                desc: 'Mencantingkan lilin malam panas tembaga mengikuti garis pola utama dengan ketelitian nafas yang tenang dan stabil.',
                time: '14-30 Hari'
              },
              {
                step: '03',
                title: 'Nembok & Nyolet',
                desc: 'Menutup bagian bidang motif yang akan dibiarkan tetap putih/terang dengan malam tebal agar tidak terkena rembesan pewarna.',
                time: '7-14 Hari'
              },
              {
                step: '04',
                title: 'Medel (Pencelupan Biru)',
                desc: 'Mencelupkan kain ke dalam bejana pasta daun Indigofera alami berulang kali hingga meresap sempurna ke serat kain terdalam.',
                time: '5-10 Hari'
              },
              {
                step: '05',
                title: 'Mbabar (Pewarnaan Sogan)',
                desc: 'Pencelupan sakral ke dalam sari rebusan kulit kayu Mahoni, Tingi, dan Tegeran untuk menghasilkan warna coklat sogan keraton.',
                time: '10-20 Hari'
              },
              {
                step: '06',
                title: 'Nglorot (Pelepasan Malam)',
                desc: 'Merebus kain dalam air mendidih untuk meluruhkan seluruh malam, membilas dengan air sumur jernih, dan menjemur di angin sepoi.',
                time: '2-4 Hari'
              }
            ].map((st) => (
              <div
                key={st.step}
                className="bg-[#FDFBF7] p-6 rounded-xl rounded-tr-[30px] border border-[#E0D5C1] relative overflow-hidden shadow-xs hover:border-[#C5A059] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl font-serif italic text-[#C5A059]">
                    {st.step}
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#F3EFE7] border border-[#E0D5C1] text-[#3E2723] font-sans font-semibold">
                    ⏱️ {st.time}
                  </span>
                </div>
                <h4 className="text-base font-bold text-[#3E2723] mb-1 font-serif">
                  {st.title}
                </h4>
                <p className="text-xs text-[#5D4037] font-serif leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Kriya Luhur Jawa Lainnya */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
                Warisan Seni Rupa & Kriya
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#3E2723]">
              Kerajinan Adiluhung <span className="italic font-normal">Tanah Jawa</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5D4037] font-serif mt-1">
              Selain batik, tanah Jawa melahirkan mahakarya tatah ukir, pamor keris pusaka, wayang kulit, dan tenun lurik.
            </p>
          </div>

          {/* Craft Filter Tabs */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'all', label: 'Semua Kriya' },
              { id: 'batik', label: 'Batik Tulis' },
              { id: 'ukir', label: 'Ukir Jepara' },
              { id: 'keris', label: 'Keris Pamor' },
              { id: 'wayang', label: 'Wayang Kulit' },
              { id: 'tenun', label: 'Tenun Lurik' }
            ].map((tab) => (
              <button
                key={tab.id}
                id={`craft-tab-${tab.id}`}
                onClick={() => setSelectedCraftTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-none text-xs uppercase tracking-wider font-sans font-medium transition-all ${
                  selectedCraftTab === tab.id
                    ? 'bg-[#3E2723] text-[#FDFBF7] font-semibold border border-[#3E2723]'
                    : 'bg-[#F3EFE7] text-[#5D4037] border border-[#E0D5C1] hover:bg-[#E0D5C1]/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Crafts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrafts.map((craft) => (
            <div
              key={craft.id}
              id={`craft-card-${craft.id}`}
              className="bg-[#FDFBF7] rounded-2xl rounded-tr-[30px] overflow-hidden border border-[#E0D5C1] shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="aspect-16/10 relative overflow-hidden bg-[#2C1810]">
                <img
                  src={craft.image}
                  alt={craft.name}
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute top-3 left-3 bg-[#FDFBF7]/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-sans font-semibold text-[#3E2723]">
                  📍 {craft.region}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] text-[#C5A059] font-sans font-bold uppercase tracking-widest">
                    {craft.culturalStatus}
                  </span>
                  <h3 className="text-lg font-serif font-bold text-[#3E2723] mt-1">
                    {craft.name}
                  </h3>
                  <p className="text-xs text-[#5D4037] font-serif mt-2 leading-relaxed">
                    {craft.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E0D5C1] space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {craft.materials.map((mat, i) => (
                      <span key={i} className="text-[10px] bg-[#F3EFE7] text-[#5D4037] px-2 py-0.5 rounded-md border border-[#E0D5C1] font-sans">
                        ✓ {mat}
                      </span>
                    ))}
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#F3EFE7] border border-[#E0D5C1] text-[11px] text-[#5D4037] font-serif italic">
                    💡 "{craft.funFact}"
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL: Detail Filosofi Motif Lengkap */}
      {activeMotifModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFBF7] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#C5A059] shadow-2xl p-6 sm:p-8 space-y-6">
            
            <div className="flex items-start justify-between border-b border-[#E0D5C1] pb-4">
              <div>
                <span className="text-xs text-[#C5A059] font-serif-editorial uppercase tracking-widest">
                  {activeMotifModal.javaneseName}
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#3E2723]">
                  {activeMotifModal.name}
                </h3>
                <p className="text-xs text-[#8D6E63] mt-0.5 font-sans">
                  Asal: {activeMotifModal.originCity} • Kategori: {activeMotifModal.category}
                </p>
              </div>
              <button
                id="close-motif-modal-btn"
                onClick={() => setActiveMotifModal(null)}
                className="w-8 h-8 rounded-full bg-[#F3EFE7] text-[#3E2723] font-bold flex items-center justify-center hover:bg-[#E0D5C1] transition-colors border border-[#E0D5C1]"
              >
                ✕
              </button>
            </div>

            <div className="aspect-16/9 rounded-2xl overflow-hidden shadow-inner">
              <img
                src={activeMotifModal.image}
                alt={activeMotifModal.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#3E2723] font-serif leading-relaxed">
              <div className="p-4 rounded-xl bg-[#F3EFE7] border border-[#E0D5C1]">
                <h4 className="font-serif font-bold text-sm text-[#3E2723] mb-1">
                  Filosofi & Makna Batiniah:
                </h4>
                <p>{activeMotifModal.philosophy}</p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm text-[#3E2723] mb-1">
                  Sejarah Kelahiran Motif:
                </h4>
                <p>{activeMotifModal.history}</p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-sm text-[#3E2723] mb-1">
                  Pesan Spiritual bagi Pemakainya:
                </h4>
                <p>{activeMotifModal.spiritualMeaning}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E0D5C1]">
                  <h5 className="font-bold text-[#3E2723] text-xs mb-1 font-serif">Karakter yang Cocok:</h5>
                  <ul className="space-y-1">
                    {activeMotifModal.suitableCharacters.map((c, i) => (
                      <li key={i} className="text-xs text-[#5D4037] flex items-center gap-1.5 font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-[#FDFBF7] border border-[#E0D5C1]">
                  <h5 className="font-bold text-[#3E2723] text-xs mb-1 font-serif">Waktu & Acara Ideal:</h5>
                  <ul className="space-y-1">
                    {activeMotifModal.occasions.map((o, i) => (
                      <li key={i} className="text-xs text-[#5D4037] flex items-center gap-1.5 font-sans">
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E0D5C1] flex items-center justify-end gap-3">
              <button
                id="modal-close-action-btn"
                onClick={() => setActiveMotifModal(null)}
                className="px-4 py-2 rounded-none bg-[#F3EFE7] text-[#3E2723] border border-[#E0D5C1] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#E0D5C1] transition-colors"
              >
                Tutup
              </button>
              <button
                id="modal-find-products-btn"
                onClick={() => {
                  onSelectMotif(activeMotifModal);
                  setActiveMotifModal(null);
                  onNavigate('marketplace');
                }}
                className="px-5 py-2 rounded-none bg-[#3E2723] text-[#FDFBF7] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#5D4037] transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <span>Lihat Produk Terkait</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
