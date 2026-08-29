export type CraftCategory = 
  | 'all'
  | 'batik-tulis'
  | 'kain-jarik'
  | 'busana-pria'
  | 'busana-wanita'
  | 'ukiran-kayu'
  | 'blangkon'
  | 'keris'
  | 'tenun'
  | 'ikat-kepala';

export type RegionOrigin = 'Yogyakarta' | 'Surakarta (Solo)' | 'Pekalongan' | 'Cirebon' | 'Lasem' | 'Jepara' | 'Madura';

export interface BatikMotif {
  id: string;
  name: string;
  javaneseName: string;
  originCity: RegionOrigin;
  category: string;
  philosophy: string;
  history: string;
  spiritualMeaning: string;
  aura: string;
  element: 'Api (Semangat)' | 'Air (Ketenangan)' | 'Tanah (Keteguhan)' | 'Udara (Kebijaksanaan)' | 'Eter (Spiritual)';
  suitableCharacters: string[];
  occasions: string[];
  image: string;
  dominantColors: string[];
  isRoyalRestricted?: boolean; // Motif Larangan Keraton (dahulu hanya raja/bangsawan)
}

export interface JavaneseCraft {
  id: string;
  name: string;
  category: 'batik' | 'ukir' | 'keris' | 'wayang' | 'tenun' | 'gerabah' | 'blangkon';
  region: RegionOrigin;
  description: string;
  materials: string[];
  culturalStatus: string;
  image: string;
  funFact: string;
}

export interface LegalInfo {
  nib: string;
  umkmCertified: boolean;
  trademarkNumber?: string;
  authenticityStatement: string;
}

export interface ArtisanShop {
  id: string;
  name: string;
  tagline: string;
  founder: string;
  city: RegionOrigin;
  address: string;
  rating: number;
  reviewsCount: number;
  foundedYear: number;
  description: string;
  avatar: string;
  banner: string;
  specialty: string;
  productsCount: number;
  blockchainWallet: string;
  isVerifiedArtisan: boolean;
  story: string;
  legalInfo?: LegalInfo;
}

export interface BlockchainProof {
  tokenId: string;
  contractAddress: string;
  hash: string;
  timestamp: string;
  blockNumber: number;
  network: string;
  masterWeaver: string;
  artisanWallet: string;
  botanicalDyeCertified: boolean;
  handCantingHours: number;
  batchNumber: string;
}

export interface IntellectualProperty {
  geographicalIndication?: string;
  isExclusiveDesign: boolean;
  copyrightNote: string;
}

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  shopId: string;
  shopName: string;
  shopCity: RegionOrigin;
  category: CraftCategory;
  price: number;
  originalPrice?: number;
  stock: number;
  motifId: string;
  motifName: string;
  philosophyShort: string;
  philosophyLong: string;
  fabricType: string;
  dyeTechnique: 'Pewarna Alami Kayu Mahoni/Tinggi/Jolawe' | 'Pewarna Alami Sogan & Indigofera' | 'Pewarna Tekstil Khusus Primissima' | 'Teknik Campur Sutra ATBM';
  dimensions: string;
  artisanName: string;
  creationDuration: string;
  images: string[];
  rating: number;
  reviewCount: number;
  isBatikTulisAsli: boolean;
  blockchain: BlockchainProof;
  intellectualProperty?: IntellectualProperty;
}

export interface PersonalityQuestion {
  id: number;
  question: string;
  javaneseWisdom: string;
  context: string;
  options: {
    id: string;
    label: string;
    description: string;
    iconName: string;
    dominantTrait: string;
    element: 'Api (Semangat)' | 'Air (Ketenangan)' | 'Tanah (Keteguhan)' | 'Udara (Kebijaksanaan)' | 'Eter (Spiritual)';
    affinityMotifs: string[]; // Motif IDs
  }[];
}

export interface QuizResult {
  motif: BatikMotif;
  characterTitle: string;
  personalitySummary: string;
  primaryEnergy: string;
  strengths: string[];
  lifeAdvice: string;
  recommendedGarment: string;
  matchingProducts: Product[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  woodenBoxPackaging?: boolean;
  customNfcSeal?: boolean;
}

export type ActiveTab = 'home' | 'matcher' | 'marketplace' | 'shops' | 'blockchain' | 'partnership';