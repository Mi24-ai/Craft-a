import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PERSONALITY_QUESTIONS } from '../data/quizQuestions';
import { BATIK_MOTIFS, PRODUCTS } from '../data/batikData';
import { BatikMotif, Product, ActiveTab } from '../types';
import { 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2, 
  Gem, 
  Heart, 
  Compass, 
  Share2, 
  Flame, 
  Droplets, 
  Wind, 
  Mountain, 
  Moon,
  ExternalLink
} from 'lucide-react';

interface PersonalityMatcherProps {
  onSelectProduct: (product: Product) => void;
  onNavigate: (tab: ActiveTab) => void;
}

export const PersonalityMatcher: React.FC<PersonalityMatcherProps> = ({
  onSelectProduct,
  onNavigate
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [matchedMotif, setMatchedMotif] = useState<BatikMotif | null>(null);
  const [resultArchetype, setResultArchetype] = useState<{
    title: string;
    description: string;
    auraColors: string[];
    wisdomQuote: string;
    advice: string;
    element: string;
  } | null>(null);

  const handleSelectOption = (questionId: number, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleNext = () => {
    if (currentStep < PERSONALITY_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateResult();
    }
  };

  const calculateResult = () => {
    setIsAnalyzing(true);

    setTimeout(() => {
      // Tally motif affinities based on user answers
      const motifScores: Record<string, number> = {
        'parang-barong': 0,
        'kawung': 0,
        'megamendung': 0,
        'truntum': 0,
        'sekar-jagad': 0,
        'sidomukti': 0
      };

      PERSONALITY_QUESTIONS.forEach((q) => {
        const selectedOptId = answers[q.id];
        const option = q.options.find(o => o.id === selectedOptId);
        if (option) {
          option.affinityMotifs.forEach((mId) => {
            if (motifScores[mId] !== undefined) {
              motifScores[mId] += 1;
            }
          });
        }
      });

      // Find top motif
      let bestMotifId = 'parang-barong';
      let maxScore = -1;
      Object.entries(motifScores).forEach(([mId, score]) => {
        if (score > maxScore) {
          maxScore = score;
          bestMotifId = mId;
        }
      });

      const matched = BATIK_MOTIFS.find(m => m.id === bestMotifId) || BATIK_MOTIFS[0];
      setMatchedMotif(matched);

      // Construct Archetype details
      let archetype = {
        title: 'Sang Satria Luhur (The Resilient Leader)',
        description: 'Jiwamu memancarkan keteguhan baja, keberanian mengambil keputusan strategis, dan wibawa alami yang dihormati di sekelilingmu.',
        auraColors: ['#382013 (Sogan)', '#D4AF37 (Emas Prada)'],
        wisdomQuote: '"Sura Dira Jayaningrat, Lebur Dening Pangastuti" — Segala angkara murka akan luluh oleh kelembutan budi pekerti yang teguh.',
        advice: 'Kenakan Batik Parang Barong saat memimpin rapat besar, upacara resmi, atau momen di mana kamu membutuhkan fokus dan wibawa paripurna.',
        element: matched.element
      };

      if (matched.id === 'kawung') {
        archetype = {
          title: 'Sang Pamong Resi (The Wise & Pure Soul)',
          description: 'Kamu adalah pribadi yang tulus, jujur, dan rendah hati. Seperti buah aren yang seluruh bagiannya berguna, kehadiranmu selalu membawa berkah dan keseimbangan bagi sesama.',
          auraColors: ['#F5EFEB (Krem Gading)', '#68462B (Coklat Sogan)'],
          wisdomQuote: '"Urip Iku Urup" — Hidup itu hendaknya menyala dan memberi terang bagi sekitarmu tanpa pamrih.',
          advice: 'Batik Kawung akan menguatkan auramu dalam ruang negosiasi damai, pertemuan keluarga, dan pengabdian masyarakat.',
          element: matched.element
        };
      } else if (matched.id === 'megamendung') {
        archetype = {
          title: 'Sang Samudra Ketenangan (The Calm Visionary)',
          description: 'Pikiranmu luas bak angkasa biru dan emosimu sedingin air hujan pegunungan. Kamu mahir menyelesaikan krisis rumit dengan kepala dingin dan wawasan kreatif yang menawan.',
          auraColors: ['#1B2A4A (Indigo)', '#F8F5EE (Awan Krem)'],
          wisdomQuote: '"Ngluruk Tanpa Bala, Menang Tanpa Ngasorake" — Berjuang dengan ketenangan budi, menang tanpa merendahkan pihak lain.',
          advice: 'Batik Megamendung sangat cocok untuk acara seni budaya kontemporer, forum internasional, dan perjumpaan santai elegan.',
          element: matched.element
        };
      } else if (matched.id === 'truntum') {
        archetype = {
          title: 'Sang Bintang Penuntun Kasih (The Eternal Guardian)',
          description: 'Hatimu dipenuhi cinta kasih sejati yang tulus. Kamu adalah pilar kehangatan keluarga yang setia, senantiasa membimbing dan melindungi generasi berikutnya dengan kasih tanpa syarat.',
          auraColors: ['#18110D (Malam Gelap)', '#E6C280 (Taburan Bintang)'],
          wisdomQuote: '"Tresna Jalaran Saka Kulina, Langgeng Marganing Swarga" — Kasih yang bersemi dari ketulusan harian akan abadi menuntun menuju kemuliaan.',
          advice: 'Batik Truntum merupakan busana sakral paling luhur untuk perayaan cinta, pernikahan, lamaran, dan syukuran keluarga besar.',
          element: matched.element
        };
      } else if (matched.id === 'sekar-jagad') {
        archetype = {
          title: 'Sang Duta Harmoni Nusantara (The Harmonious Connector)',
          description: 'Kamu adalah jembatan persahabatan yang ceria, artistik, dan mencintai keberagaman. Karaktermu mampu merajut berbagai perbedaan menjadi satu simfoni keindahan yang mempesona.',
          auraColors: ['#8C552A (Sogan Pesisir)', '#B85B35 (Terracotta)'],
          wisdomQuote: '"Bhinneka Tunggal Ika" — Berbeda dalam ragam bunga, namun bersatu dalam satu keindahan semesta jagad raya.',
          advice: 'Batik Sekar Jagad memancarkan pesona ramah dan dinamis dalam festival, forum silaturahmi, dan aktivitas kreatif harian.',
          element: matched.element
        };
      } else if (matched.id === 'sidomukti') {
        archetype = {
          title: 'Sang Pembawa Kemakmuran (The Noble Benefactor)',
          description: 'Jiwamu ditakdirkan untuk meraih kemuliaan derajat dan kemakmuran rezeki yang melimpah, diimbangi dengan kedermawanan hati yang gemar membahagiakan orang lain.',
          auraColors: ['#D4AF37 (Prada Emas)', '#3B2215 (Sogan Pekat)'],
          wisdomQuote: '"Mukti Wibawa Hayu" — Kemakmuran sejati adalah ketika rezeki beriringan dengan keluhuran akhlak dan keselamatan dunia-akhirat.',
          advice: 'Kenakan Batik Sidomukti pada prosesi ijab kabul, syukuran pencapaian karier, dan momentum pembuka lembaran hidup baru.',
          element: matched.element
        };
      }

      setResultArchetype(archetype);
      setIsAnalyzing(false);

      // Trigger celebration confetti!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#C5A059', '#8B4513', '#F5EFEB']
        });
      } catch (e) {
        // Safe fallback if confetti blocked
      }
    }, 1200);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setMatchedMotif(null);
    setResultArchetype(null);
  };

  const matchedProducts = matchedMotif 
    ? PRODUCTS.filter(p => p.motifId === matchedMotif.id || p.category === 'batik-tulis')
    : [];

  const currentQ = PERSONALITY_QUESTIONS[currentStep];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
        <div className="flex items-center justify-center gap-3">
          <div className="w-8 h-[1px] bg-[#C5A059]" />
          <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
            Diagnosis Kepribadian & Aura Kamu
          </span>
          <div className="w-8 h-[1px] bg-[#C5A059]" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#3E2723]">
          Temukan Motif Batik yang <span className="italic font-normal">Selaras dengan Jiwamu</span>
        </h2>
        <p className="text-sm sm:text-base text-[#5D4037] font-serif leading-relaxed">
          Kami percaya bahwa motif batik yang selaras dengan getaran batin pemakainya 
          akan memancarkan aura wibawa, ketenangan, dan keselamatan hidup yang berlipat ganda.
        </p>
      </div>

      {/* QUIZ INTERFACE (When result not calculated yet) */}
      {!matchedMotif && !isAnalyzing && (
        <div className="bg-[#FDFBF7] rounded-3xl rounded-tr-[48px] p-6 sm:p-10 border border-[#E0D5C1] shadow-lg relative overflow-hidden">
          
          {/* Progress Bar & Indicators */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-sans font-semibold text-[#3E2723] mb-2">
              <span className="uppercase tracking-wider">Pertanyaan {currentStep + 1} dari {PERSONALITY_QUESTIONS.length}</span>
              <span className="text-[#C5A059]">{Math.round(((currentStep + 1) / PERSONALITY_QUESTIONS.length) * 100)}% Selesai</span>
            </div>
            <div className="w-full h-1.5 bg-[#F3EFE7] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#C5A059] transition-all duration-500 rounded-full"
                style={{ width: `${((currentStep + 1) / PERSONALITY_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Box */}
          <div className="space-y-3 mb-8">
            <div className="p-3.5 rounded-xl bg-[#F3EFE7] border border-[#E0D5C1] text-xs text-[#5D4037] font-serif italic flex items-center gap-2">
              <span className="text-[#C5A059] font-bold font-sans">ꦥꦼꦥꦝꦁ :</span>
              {currentQ.javaneseWisdom}
            </div>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-[#3E2723] leading-snug">
              {currentQ.question}
            </h3>
            <p className="text-xs text-[#8D6E63] font-serif">
              {currentQ.context}
            </p>
          </div>

          {/* Options Grid */}
          <div className="space-y-3 mb-8">
            {currentQ.options.map((opt) => {
              const isSelected = answers[currentQ.id] === opt.id;
              return (
                <div
                  key={opt.id}
                  id={`option-${opt.id}`}
                  onClick={() => handleSelectOption(currentQ.id, opt.id)}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-[#F3EFE7] border-[#3E2723] shadow-sm ring-1 ring-[#3E2723]'
                      : 'bg-[#FDFBF7] border-[#E0D5C1] hover:border-[#C5A059] hover:bg-[#F3EFE7]/60'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border shrink-0 mt-0.5 ${
                    isSelected
                      ? 'bg-[#3E2723] border-[#3E2723] text-[#FDFBF7]'
                      : 'border-[#E0D5C1] text-transparent'
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <h4 className="text-sm sm:text-base font-bold text-[#3E2723] font-serif">
                      {opt.label}
                    </h4>
                    <p className="text-xs text-[#5D4037] font-serif leading-relaxed">
                      {opt.description}
                    </p>
                    <div className="inline-block text-[10px] font-sans font-semibold uppercase tracking-wider text-[#C5A059] pt-1">
                      ✦ Sifat Dominan: {opt.dominantTrait}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-between pt-4 border-t border-[#E0D5C1]">
            <button
              id="quiz-prev-btn"
              disabled={currentStep === 0}
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              className={`px-4 py-2 rounded-none text-xs font-sans uppercase tracking-wider font-semibold transition-colors ${
                currentStep === 0
                  ? 'opacity-30 cursor-not-allowed text-[#8D6E63]'
                  : 'text-[#3E2723] hover:bg-[#F3EFE7]'
              }`}
            >
              Sebelumnya
            </button>

            <button
              id="quiz-next-btn"
              disabled={!answers[currentQ.id]}
              onClick={handleNext}
              className={`px-6 py-2.5 rounded-none font-sans uppercase tracking-wider font-bold text-xs flex items-center gap-2 transition-all shadow-sm ${
                answers[currentQ.id]
                  ? 'bg-[#3E2723] text-[#FDFBF7] hover:bg-[#5D4037] cursor-pointer'
                  : 'bg-[#E0D5C1] text-[#8D6E63] cursor-not-allowed'
              }`}
            >
              <span>{currentStep === PERSONALITY_QUESTIONS.length - 1 ? 'Lihat Hasil Aura Batik' : 'Lanjut'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      )}

      {/* LOADING STATE */}
      {isAnalyzing && (
        <div className="bg-[#FDFBF7] rounded-3xl p-12 border border-[#E0D5C1] shadow-lg text-center space-y-6">
          <div className="relative w-20 h-20 mx-auto">
            <div className="w-20 h-20 rounded-full border-4 border-[#E0D5C1] border-t-[#3E2723] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center font-serif text-[#3E2723] text-xl font-bold">
              ꦧ
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-serif text-[#3E2723]">
              Menyelaraskan Getaran Jiwa dengan Falsafah Luhur...
            </h3>
            <p className="text-xs text-[#5D4037] font-serif">
              Membaca resonansi elemen, kepemimpinan batin, dan kidung doa leluhur Jawa.
            </p>
          </div>
        </div>
      )}

      {/* RESULT DISPLAY (Soul Card & Product Recommendations) */}
      {matchedMotif && resultArchetype && (
        <div className="space-y-12">
          
          {/* Main Soul Card */}
          <div className="bg-[#2C1810] text-[#FDFBF7] rounded-3xl rounded-tr-[48px] p-6 sm:p-10 border border-[#C5A059] shadow-2xl relative overflow-hidden">
            
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
            
            {/* Top Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#3E2723] pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#C5A059]">
                  Kartu Jiwa Nusantara (Soul Match Proof)
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-[#3E2723] text-[#C5A059] border border-[#C5A059]/40 font-sans uppercase tracking-wider text-[10px]">
                  Elemen: {resultArchetype.element}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Motif Visual & Certificate Hologram */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative rounded-2xl rounded-tr-[30px] overflow-hidden aspect-4/3 border-2 border-[#C5A059]/40 shadow-xl group">
                  <img
                    src={matchedMotif.image}
                    alt={matchedMotif.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810] via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-[10px] text-[#C5A059] font-serif-editorial uppercase tracking-widest">{matchedMotif.javaneseName}</p>
                    <h3 className="text-xl font-serif font-bold text-[#FDFBF7]">
                      {matchedMotif.name}
                    </h3>
                    <p className="text-[11px] text-[#D7CCC8] font-sans">
                      Asal: {matchedMotif.originCity}
                    </p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#24130A] border border-[#3E2723] flex items-center justify-between text-xs text-[#D7CCC8]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C5A059]" />
                    <span className="font-sans">Resonansi Keselarasan Jiwa</span>
                  </div>
                  <span className="font-bold text-[#C5A059] font-sans">98.4% Match</span>
                </div>
              </div>

              {/* Right Personality Breakdown */}
              <div className="lg:col-span-7 space-y-4">
                <div>
                  <span className="text-xs text-[#C5A059] font-sans font-bold uppercase tracking-[0.2em]">
                    Arketipe Kepribadianmu:
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#FDFBF7] mt-0.5">
                    {resultArchetype.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#D7CCC8] font-serif leading-relaxed">
                  {resultArchetype.description}
                </p>

                <div className="p-4 rounded-xl bg-[#24130A] border border-[#3E2723] space-y-1.5">
                  <span className="text-[10px] text-[#C5A059] font-sans font-bold uppercase tracking-widest block">
                    Falsafah Luhur Jawa:
                  </span>
                  <p className="text-xs sm:text-sm text-[#FDFBF7] font-serif italic">
                    {resultArchetype.wisdomQuote}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-sans font-semibold text-[#C5A059] uppercase tracking-wider">
                    Saran Pemakaian Busana:
                  </span>
                  <p className="text-xs text-[#D7CCC8] font-serif">
                    {resultArchetype.advice}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#3E2723]">
                  <button
                    id="quiz-reset-btn"
                    onClick={handleReset}
                    className="px-4 py-2 rounded-none bg-[#3E2723] text-[#FDFBF7] border border-[#5D4037] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#5D4037] transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Ulangi Tes</span>
                  </button>

                  <button
                    id="quiz-explore-matching-products-btn"
                    onClick={() => onNavigate('marketplace')}
                    className="px-5 py-2 rounded-none bg-[#C5A059] text-[#2C1810] text-xs font-sans uppercase tracking-wider font-bold hover:bg-[#D4AF37] transition-all flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <Compass className="w-4 h-4" />
                    <span>Jelajahi Koleksi {matchedMotif.name}</span>
                  </button>
                </div>

              </div>

            </div>
          </div>

          {/* Recommended Curated Products for this Motif */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-serif font-light text-[#3E2723]">
                  Rekomendasi Busana & <span className="italic font-normal">Karya Selaras</span>
                </h3>
                <p className="text-xs text-[#5D4037] font-serif">
                  Karya asli dari pengrajin terverifikasi yang mengusung motif jiwamu.
                </p>
              </div>
              <button
                id="view-all-marketplace-btn"
                onClick={() => onNavigate('marketplace')}
                className="text-xs font-sans uppercase tracking-wider font-semibold text-[#3E2723] hover:text-[#C5A059] flex items-center gap-1"
              >
                <span>Katalog Lengkap</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {matchedProducts.map((prod) => (
                <div
                  key={prod.id}
                  id={`match-product-${prod.id}`}
                  className="bg-[#FDFBF7] rounded-2xl rounded-tr-[30px] overflow-hidden border border-[#E0D5C1] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
                  onClick={() => onSelectProduct(prod)}
                >
                  <div className="aspect-4/3 relative overflow-hidden bg-[#2C1810]">
                    <img
                      src={prod.images[0]}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5 bg-[#FDFBF7]/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold text-[#3E2723]">
                      {prod.motifName}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 bg-[#2C1810]/90 text-[#C5A059] text-[9px] font-sans uppercase tracking-widest px-2 py-0.5 rounded-none border border-[#C5A059]/40">
                      Polygon Verified
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <p className="text-[10px] text-[#8D6E63] font-sans uppercase tracking-wider">{prod.shopName}</p>
                      <h4 className="text-base font-serif font-bold text-[#3E2723] line-clamp-1 mt-0.5">
                        {prod.title}
                      </h4>
                      <p className="text-xs text-[#5D4037] font-serif line-clamp-2 mt-1 italic">
                        "{prod.philosophyShort}"
                      </p>
                    </div>

                    <div className="pt-2 border-t border-[#E0D5C1] flex items-center justify-between">
                      <div>
                        <span className="text-sm font-sans font-bold text-[#3E2723]">
                          Rp {prod.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <button
                        id={`btn-view-match-prod-${prod.id}`}
                        className="px-3 py-1.5 rounded-none bg-[#3E2723] text-[#FDFBF7] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#5D4037] transition-colors"
                      >
                        Detail
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
