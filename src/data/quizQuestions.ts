import { PersonalityQuestion } from '../types';

export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
  {
    id: 1,
    question: 'Saat menghadapi badai persoalan atau dinamika hidup yang berat, sikap batin apakah yang paling mencerminkan dirimu?',
    javaneseWisdom: '"Sura Dira Jayaningrat, Lebur Dening Pangastuti" — Keberanian menaklukkan hawa nafsu',
    context: 'Mengungkapkan energi dasar dan daya resiliensi jiwamu.',
    options: [
      {
        id: 'opt-1-a',
        label: 'Berdiri tegak memimpin di garis depan, pantang menyerah menembus badai',
        description: 'Memiliki visi kuat, keberanian mengambil risiko, dan bertekad menyelesaikan masalah hingga tuntas.',
        iconName: 'Shield',
        dominantTrait: 'Keberanian & Kepemimpinan Tegas',
        element: 'Api (Semangat)',
        affinityMotifs: ['parang-barong']
      },
      {
        id: 'opt-1-b',
        label: 'Menepi sejenak dalam keheningan, mengamati situasi dengan kepala dingin dan hati tenang',
        description: 'Mampu meredam emosi, berfikir dengan perspektif yang luas, dan tidak mudah tergesa-gesa.',
        iconName: 'CloudRain',
        dominantTrait: 'Ketenangan & Kesabaran Mendalam',
        element: 'Air (Ketenangan)',
        affinityMotifs: ['megamendung']
      },
      {
        id: 'opt-1-c',
        label: 'Menjaga keadilan, bersikap netral tanpa memihak, dan mencari jalan damai yang adil',
        description: 'Mengedepankan kejujuran, ketulusan hati nurani, dan memikirkan kebaikan bersama.',
        iconName: 'Scale',
        dominantTrait: 'Kejujuran & Kebijaksanaan Moral',
        element: 'Udara (Kebijaksanaan)',
        affinityMotifs: ['kawung']
      },
      {
        id: 'opt-1-d',
        label: 'Merangkul orang-orang terkasih dengan penuh kehangatan, menjadi pelindung bagi keluarga',
        description: 'Mengutamakan kasih sayang, kesetiaan, dan menjaga keharmonisan orang sekitar.',
        iconName: 'Heart',
        dominantTrait: 'Cinta Kasih & Kehangatan Abadi',
        element: 'Tanah (Keteguhan)',
        affinityMotifs: ['truntum', 'sidomukti']
      }
    ]
  },
  {
    id: 2,
    question: 'Bagaimana caramu membina hubungan dan berinteraksi di tengah keberagaman lingkungan sosial?',
    javaneseWisdom: '"Bhinneka Tunggal Ika Tan Hana Dharma Mangrwa" — Keindahan dalam mozaik semesta',
    context: 'Mengukur aura sosial dan orientasi harmoni dalam dirimu.',
    options: [
      {
        id: 'opt-2-a',
        label: 'Sangat menyukai keberagaman, terbuka pada perspektif baru, dan menghargai mozaik budaya',
        description: 'Mudah bergaul, artistik, ramah, dan melihat keindahan dalam setiap perbedaan latar belakang.',
        iconName: 'Sparkles',
        dominantTrait: 'Harmoni & Cinta Keberagaman',
        element: 'Udara (Kebijaksanaan)',
        affinityMotifs: ['sekar-jagad']
      },
      {
        id: 'opt-2-b',
        label: 'Menjadi teladan yang berwibawa, dihormati karena integritas dan ketegasan kata',
        description: 'Orang lain melihatmu sebagai figur yang berbobot, berwibawa, dan dapat diandalkan.',
        iconName: 'Crown',
        dominantTrait: 'Wibawa & Karisma Alami',
        element: 'Api (Semangat)',
        affinityMotifs: ['parang-barong']
      },
      {
        id: 'opt-2-c',
        label: 'Tulus dan rendah hati seperti buah kelapa aren; bermanfaat nyata tanpa mengharap pujian',
        description: 'Tidak suka pamer kekayaan atau kelebihan, selalu menjaga kemurnian niat dan tindakan.',
        iconName: 'Flower2',
        dominantTrait: 'Kesucian Hati & Kemanfaatan',
        element: 'Udara (Kebijaksanaan)',
        affinityMotifs: ['kawung']
      },
      {
        id: 'opt-2-d',
        label: 'Membangun kemakmuran bersama yang berakar pada nilai-nilai spiritual dan kemuliaan budi',
        description: 'Mencari rezeki yang berkah dan ingin membawa keluarga menuju kemuliaan hidup lahir batin.',
        iconName: 'Gem',
        dominantTrait: 'Kemuliaan & Keberkahan Hidup',
        element: 'Eter (Spiritual)',
        affinityMotifs: ['sidomukti']
      }
    ]
  },
  {
    id: 3,
    question: 'Apakah cita-cita atau warisan hidup (*legacy*) terbesar yang paling ingin kamu tinggalkan di dunia ini?',
    javaneseWisdom: '"Memayu Hayuning Bawana" — Memperindah keselamatan dunia',
    context: 'Menyelaraskan aspirasi jiwamu dengan falsafah luhur para leluhur.',
    options: [
      {
        id: 'opt-3-a',
        label: 'Mencapai kehidupan yang mulia lahir-batin (Mukti), sejahtera, serta membawa kehormatan bagi trah keluarga',
        description: 'Kesejahteraan ekonomi yang berkelanjutan dipadukan dengan kesalehan spiritual.',
        iconName: 'Compass',
        dominantTrait: 'Kemakmuran & Jiwa Mulia',
        element: 'Eter (Spiritual)',
        affinityMotifs: ['sidomukti']
      },
      {
        id: 'opt-3-b',
        label: 'Membimbing dan mencintai orang lain tanpa syarat, mewariskan cahaya kasih yang abadi',
        description: 'Menjadi orang tua, pasangan, atau sahabat yang kehangatannya selalu dikenang selamanya.',
        iconName: 'Sun',
        dominantTrait: 'Cinta Abadi & Penuntun Jiwa',
        element: 'Tanah (Keteguhan)',
        affinityMotifs: ['truntum']
      },
      {
        id: 'opt-3-c',
        label: 'Membuka wawasan orang banyak, menghadirkan karya kreatif yang menenangkan jiwa manusia',
        description: 'Karya inovatif, kebijaksanaan pemikiran, dan pengaruh positif yang menyejukkan jagad.',
        iconName: 'Feather',
        dominantTrait: 'Kedalaman Berfikir & Karya Sejuk',
        element: 'Air (Ketenangan)',
        affinityMotifs: ['megamendung']
      },
      {
        id: 'opt-3-d',
        label: 'Menciptakan terobosan besar, menaklukkan rintangan sejarah dan mencatat prestasi tak terlupakan',
        description: 'Menjadi pelopor perubahan, pembuat keputusan penting, dan pelindung kaum yang lemah.',
        iconName: 'Zap',
        dominantTrait: 'Kepeloporan & Kesatria Sejati',
        element: 'Api (Semangat)',
        affinityMotifs: ['parang-barong']
      }
    ]
  },
  {
    id: 4,
    question: 'Ketika mengenakan busana tradisional Jawa, aura apa yang paling ingin kamu pancarkan ke sekelilingmu?',
    javaneseWisdom: '"Ajining Raga Saka Busana" — Kehormatan diri terpancar dari kesantunan busana',
    context: 'Menentukan padanan estetika dan siluet busana yang paling menyatu dengan auramu.',
    options: [
      {
        id: 'opt-4-a',
        label: 'Kemegahan ningrat keraton yang anggun, tegas, dan memukau mata dengan wibawa karismatik',
        description: 'Dominasi warna sogan gelap, prada emas, dan garis diagonal tegas.',
        iconName: 'Award',
        dominantTrait: 'Agung & Ningrat',
        element: 'Api (Semangat)',
        affinityMotifs: ['parang-barong', 'sidomukti']
      },
      {
        id: 'opt-4-b',
        label: 'Keanggunan minimalis yang tenang, bersahaja namun menyimpan kedalaman intelektual tinggi',
        description: 'Pola geometris simetris yang rapi, warna krem gading dan coklat sogan natural.',
        iconName: 'CheckCircle2',
        dominantTrait: 'Minimalis & Bersahaja',
        element: 'Udara (Kebijaksanaan)',
        affinityMotifs: ['kawung']
      },
      {
        id: 'opt-4-c',
        label: 'Pesona modern kontemporer yang dinamis, artistik dengan gradasi warna yang menyejukkan',
        description: 'Siluet flowy seperti kimono outer atau kebaya modifikasi warna indigo dan biru sogan.',
        iconName: 'Palette',
        dominantTrait: 'Artistik & Kontemporer',
        element: 'Air (Ketenangan)',
        affinityMotifs: ['megamendung', 'sekar-jagad']
      },
      {
        id: 'opt-4-d',
        label: 'Kehangatan sakral penuh doa, memancarkan romantisme klasik yang menyentuh sanubari',
        description: 'Detail bintik bintang halus, selendang sutra, dan kain jarik berkilau lembut.',
        iconName: 'Star',
        dominantTrait: 'Romantis & Penuh Doa',
        element: 'Tanah (Keteguhan)',
        affinityMotifs: ['truntum', 'sidomukti']
      }
    ]
  }
];
