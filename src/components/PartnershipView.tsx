import React, { useState } from 'react';
import {
  Handshake,
  Store,
  MapPin,
  Phone,
  Mail,
  User,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Award,
  CheckCircle2,
  ArrowRight,
  Gem,
  Crown,
  Leaf
} from 'lucide-react';

interface PartnershipFormData {
  shopName: string;
  ownerName: string;
  city: string;
  specialty: string;
  phone: string;
  email: string;
  yearsActive: string;
  description: string;
}

type TierId = 'basic' | 'heritage' | 'premium';

interface Tier {
  id: TierId;
  name: string;
  price: number;
  priceLabel: string;
  tagline: string;
  icon: React.ElementType;
  features: string[];
  highlight?: boolean;
}

const TIERS: Tier[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 250000,
    priceLabel: 'Rp250.000',
    tagline: 'Untuk pengrajin yang baru memulai perjalanan digital',
    icon: Leaf,
    features: [
      'Etalase toko digital di Craftéa',
      'Hingga 10 listing produk',
      'Dashboard pesanan standar',
      'Dukungan email'
    ]
  },
  {
    id: 'heritage',
    name: 'Heritage',
    price: 750000,
    priceLabel: 'Rp750.000',
    tagline: 'Untuk sanggar dengan identitas budaya yang ingin lebih dikenal',
    icon: Gem,
    features: [
      'Semua benefit paket Basic',
      'Hingga 30 listing produk',
      'Sertifikasi Blockchain untuk setiap karya',
      'Badge "Atelier Terverifikasi"',
      'Prioritas tampil di halaman kategori'
    ],
    highlight: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 1500000,
    priceLabel: 'Rp1.500.000',
    tagline: 'Untuk mitra strategis dengan skala produksi besar',
    icon: Crown,
    features: [
      'Semua benefit paket Heritage',
      'Listing produk tanpa batas',
      'Penempatan unggulan di halaman utama',
      'Manajer akun khusus (dedicated)',
      'Dukungan prioritas 24/7',
      'Laporan performa penjualan bulanan'
    ]
  }
];

interface PartnershipViewProps {}

export const PartnershipView: React.FC<PartnershipViewProps> = () => {
  const [selectedTier, setSelectedTier] = useState<TierId | null>(null);
  const [formData, setFormData] = useState<PartnershipFormData>({
    shopName: '',
    ownerName: '',
    city: '',
    specialty: '',
    phone: '',
    email: '',
    yearsActive: '',
    description: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showTierWarning, setShowTierWarning] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTier) {
      setShowTierWarning(true);
      // gulir ke bagian pemilihan paket agar terlihat oleh pengguna
      document.getElementById('partnership-tier-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);
    // TODO: sambungkan ke backend / API pendaftaran mitra di sini
    // payload contoh: { ...formData, tier: selectedTier, tierPrice: currentTier?.price }
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  const currentTier = TIERS.find((t) => t.id === selectedTier);

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Perluasan Pasar Digital',
      desc: 'Jangkau kolektor dan pecinta wastra di seluruh Indonesia hingga mancanegara.'
    },
    {
      icon: ShieldCheck,
      title: 'Sertifikasi Blockchain Gratis*',
      desc: 'Karya mitra Heritage & Premium mendapat paspor digital Web3 tanpa biaya tambahan.'
    },
    {
      icon: Award,
      title: 'Status Atelier Terverifikasi',
      desc: 'Badge resmi yang meningkatkan kepercayaan pembeli terhadap sanggar Anda.'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#F3EFE7] border border-[#C5A059] text-[#C5A059] flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h2 className="text-3xl font-serif font-light text-[#3E2723]">
          Pendaftaran Berhasil Dikirim!
        </h2>
        <p className="text-sm text-[#5D4037] font-serif leading-relaxed max-w-lg mx-auto">
          Terima kasih, <strong>{formData.shopName || 'Sanggar Anda'}</strong>. Anda mendaftar
          paket <strong>{currentTier?.name}</strong> ({currentTier?.priceLabel}). Tim kurasi Craftéa
          akan meninjau data toko Anda dan mengirimkan instruksi pembayaran serta menghubungi
          melalui kontak yang diberikan dalam 3-5 hari kerja.
        </p>
        <button
          id="partnership-submit-another-btn"
          onClick={() => {
            setIsSubmitted(false);
            setSelectedTier(null);
            setShowTierWarning(false);
            setFormData({
              shopName: '', ownerName: '', city: '', specialty: '',
              phone: '', email: '', yearsActive: '', description: ''
            });
          }}
          className="px-6 py-3 rounded-none bg-[#3E2723] text-[#FDFBF7] text-xs font-sans uppercase tracking-wider font-semibold hover:bg-[#5D4037] transition-colors cursor-pointer"
        >
          Ajukan Pendaftaran Lain
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="flex items-center justify-center gap-2">
          <Handshake className="w-4 h-4 text-[#C5A059]" />
          <span className="text-[#C5A059] uppercase tracking-[0.3em] text-xs font-sans font-semibold">
            Bergabung Sebagai Mitra Resmi
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#3E2723]">
          Craftéa <span className="italic font-normal">Partnership</span>
        </h2>
        <p className="text-xs sm:text-sm text-[#5D4037] font-serif leading-relaxed">
          Daftarkan sanggar atau toko pengrajin Anda untuk bergabung dengan ekosistem Craftéa
          dan hadirkan mahakarya Anda ke lebih banyak pecinta wastra Nusantara.
        </p>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map((b, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl rounded-tr-[30px] bg-[#FDFBF7] border border-[#E0D5C1] shadow-xs space-y-3"
          >
            <div className="w-10 h-10 rounded-full bg-[#F3EFE7] border border-[#E0D5C1] flex items-center justify-center text-[#C5A059]">
              <b.icon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-serif font-bold text-[#3E2723]">{b.title}</h3>
            <p className="text-xs text-[#5D4037] font-serif leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>

      {/* Tier Selection */}
      <div id="partnership-tier-section" className="max-w-6xl mx-auto space-y-5">
        <div className="text-center space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3E2723]">
            Pilih Paket Kemitraan
          </h3>
          <p className="text-xs sm:text-sm text-[#5D4037] font-serif">
            Sesuaikan paket dengan skala dan kebutuhan sanggar Anda.
          </p>
        </div>

        {showTierWarning && !selectedTier && (
          <p className="text-center text-xs font-sans font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg py-2 px-4 max-w-md mx-auto">
            Silakan pilih salah satu paket terlebih dahulu sebelum melanjutkan.
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((tier) => {
            const isSelected = selectedTier === tier.id;
            return (
              <button
                type="button"
                key={tier.id}
                id={`partnership-tier-${tier.id}`}
                onClick={() => {
                  setSelectedTier(tier.id);
                  setShowTierWarning(false);
                }}
                className={`relative text-left p-6 rounded-2xl rounded-tr-[30px] border transition-all cursor-pointer flex flex-col gap-4
                  ${isSelected
                    ? 'bg-[#3E2723] border-[#3E2723] shadow-xl scale-[1.02]'
                    : 'bg-[#FDFBF7] border-[#E0D5C1] hover:border-[#C5A059] hover:shadow-md'
                  }`}
              >
                {tier.highlight && (
                  <span className="absolute -top-3 right-5 bg-[#C5A059] text-[#FDFBF7] text-[10px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Paling Populer
                  </span>
                )}

                <div className={`w-11 h-11 rounded-full flex items-center justify-center border
                  ${isSelected ? 'bg-[#5D4037] border-[#C5A059] text-[#C5A059]' : 'bg-[#F3EFE7] border-[#E0D5C1] text-[#C5A059]'}`}
                >
                  <tier.icon className="w-5 h-5" />
                </div>

                <div className="space-y-1">
                  <h4 className={`text-lg font-serif font-bold ${isSelected ? 'text-[#FDFBF7]' : 'text-[#3E2723]'}`}>
                    {tier.name}
                  </h4>
                  <p className={`text-xs font-serif leading-relaxed ${isSelected ? 'text-[#E0D5C1]' : 'text-[#5D4037]'}`}>
                    {tier.tagline}
                  </p>
                </div>

                <div className={`text-2xl font-serif font-light ${isSelected ? 'text-[#C5A059]' : 'text-[#3E2723]'}`}>
                  {tier.priceLabel}
                  <span className={`text-xs font-sans ml-1 ${isSelected ? 'text-[#E0D5C1]' : 'text-[#5D4037]'}`}>
                    /pendaftaran
                  </span>
                </div>

                <ul className="space-y-2 flex-1">
                  {tier.features.map((f, i) => (
                    <li key={i} className={`flex items-start gap-2 text-xs font-serif ${isSelected ? 'text-[#FDFBF7]' : 'text-[#5D4037]'}`}>
                      <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${isSelected ? 'text-[#C5A059]' : 'text-[#C5A059]'}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <div className={`w-full py-2 text-center text-xs font-sans font-bold uppercase tracking-wider rounded-none border
                  ${isSelected
                    ? 'bg-[#C5A059] border-[#C5A059] text-[#3E2723]'
                    : 'bg-transparent border-[#E0D5C1] text-[#3E2723]'
                  }`}
                >
                  {isSelected ? 'Terpilih' : 'Pilih Paket Ini'}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Registration Form */}
      <div className="max-w-3xl mx-auto bg-[#FDFBF7] rounded-3xl rounded-tr-[48px] p-6 sm:p-10 border border-[#E0D5C1] shadow-md">
        <h3 className="text-xl font-serif font-bold text-[#3E2723] mb-6 flex items-center gap-2">
          <Store className="w-5 h-5 text-[#C5A059]" />
          Formulir Pendaftaran Mitra
        </h3>

        {currentTier && (
          <div className="mb-6 flex items-center justify-between gap-3 bg-[#F3EFE7] border border-[#E0D5C1] rounded-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <currentTier.icon className="w-4 h-4 text-[#C5A059]" />
              <span className="text-xs font-sans font-semibold text-[#3E2723]">
                Paket dipilih: <strong>{currentTier.name}</strong>
              </span>
            </div>
            <span className="text-sm font-serif font-bold text-[#3E2723]">{currentTier.priceLabel}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-[#5D4037] flex items-center gap-1.5">
                <Store className="w-3.5 h-3.5 text-[#C5A059]" /> Nama Toko / Sanggar
              </label>
              <input
                id="partnership-shop-name"
                name="shopName"
                type="text"
                required
                value={formData.shopName}
                onChange={handleChange}
                placeholder="Contoh: Sanggar Batik Danar Hadi"
                className="w-full px-4 py-2.5 rounded-none border border-[#E0D5C1] bg-[#F3EFE7] text-xs sm:text-sm text-[#3E2723] focus:outline-none focus:border-[#3E2723]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-[#5D4037] flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#C5A059]" /> Nama Pemilik / Penanggung Jawab
              </label>
              <input
                id="partnership-owner-name"
                name="ownerName"
                type="text"
                required
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Nama lengkap"
                className="w-full px-4 py-2.5 rounded-none border border-[#E0D5C1] bg-[#F3EFE7] text-xs sm:text-sm text-[#3E2723] focus:outline-none focus:border-[#3E2723]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-[#5D4037] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#C5A059]" /> Kota / Wilayah
              </label>
              <input
                id="partnership-city"
                name="city"
                type="text"
                required
                value={formData.city}
                onChange={handleChange}
                placeholder="Contoh: Surakarta"
                className="w-full px-4 py-2.5 rounded-none border border-[#E0D5C1] bg-[#F3EFE7] text-xs sm:text-sm text-[#3E2723] focus:outline-none focus:border-[#3E2723]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-[#5D4037] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" /> Keahlian / Spesialisasi
              </label>
              <input
                id="partnership-specialty"
                name="specialty"
                type="text"
                required
                value={formData.specialty}
                onChange={handleChange}
                placeholder="Contoh: Batik Tulis Sogan"
                className="w-full px-4 py-2.5 rounded-none border border-[#E0D5C1] bg-[#F3EFE7] text-xs sm:text-sm text-[#3E2723] focus:outline-none focus:border-[#3E2723]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-[#5D4037] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" /> Nomor WhatsApp / Telepon
              </label>
              <input
                id="partnership-phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                className="w-full px-4 py-2.5 rounded-none border border-[#E0D5C1] bg-[#F3EFE7] text-xs sm:text-sm text-[#3E2723] focus:outline-none focus:border-[#3E2723]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-sans font-semibold text-[#5D4037] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#C5A059]" /> Email Aktif
              </label>
              <input
                id="partnership-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="nama@email.com"
                className="w-full px-4 py-2.5 rounded-none border border-[#E0D5C1] bg-[#F3EFE7] text-xs sm:text-sm text-[#3E2723] focus:outline-none focus:border-[#3E2723]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-sans font-semibold text-[#5D4037]">
              Lama Beroperasi (Tahun)
            </label>
            <input
              id="partnership-years-active"
              name="yearsActive"
              type="text"
              value={formData.yearsActive}
              onChange={handleChange}
              placeholder="Contoh: 15 tahun"
              className="w-full px-4 py-2.5 rounded-none border border-[#E0D5C1] bg-[#F3EFE7] text-xs sm:text-sm text-[#3E2723] focus:outline-none focus:border-[#3E2723]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-sans font-semibold text-[#5D4037]">
              Ceritakan Tentang Sanggar Anda
            </label>
            <textarea
              id="partnership-description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              placeholder="Sejarah singkat, keunikan produk, jumlah pengrajin, dsb."
              className="w-full px-4 py-2.5 rounded-none border border-[#E0D5C1] bg-[#F3EFE7] text-xs sm:text-sm text-[#3E2723] focus:outline-none focus:border-[#3E2723] resize-none"
            />
          </div>

          <button
            id="partnership-submit-btn"
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-none bg-[#3E2723] text-[#FDFBF7] font-sans uppercase tracking-wider font-bold text-xs sm:text-sm hover:bg-[#5D4037] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#3E2723]/20 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                <span>Mengirim Pendaftaran...</span>
              </>
            ) : (
              <>
                <Handshake className="w-4 h-4 text-[#C5A059]" />
                <span>
                  {currentTier ? `Ajukan Kemitraan — ${currentTier.priceLabel}` : 'Ajukan Kemitraan'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>

    </div>
  );
};
