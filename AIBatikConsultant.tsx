import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, BookOpen, Compass, ShieldCheck } from 'lucide-react';

interface AIBatikConsultantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  recommendations?: string[];
}

export const AIBatikConsultant: React.FC<AIBatikConsultantProps> = ({
  isOpen,
  onClose
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: 'Sugeng rawuh! Saya Sang Dalang AI, konsultan budaya & wastra Nusantara. Anda dapat bertanya tentang filosofi motif batik, tata cara busana sakral adat Jawa (Pakem Busana), rekomendasi motif untuk acara tertentu, ataupun cara perawatan batik tulis alami.',
      timestamp: 'Baru saja'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Motif apa yang cocok untuk acara lamaran / nikah?',
    'Bagaimana cara mencuci batik tulis dengan buah lerak?',
    'Apa beda Batik Sogan Solo dan Batik Jogja?',
    'Bolehkah saya memakai Parang Barong ke kondangan?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Baru saja'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponseText = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('lamaran') || qLower.includes('nikah') || qLower.includes('pernikahan') || qLower.includes('pengantin')) {
        aiResponseText = 'Untuk momentum sakral pernikahan adat Jawa:\n\n1. Batik Sidomukti: Sangat dianjurkan untuk mempelai karena bermakna doa kemakmuran lahir batin dan keluhuran budi.\n2. Batik Truntum: Wajib dikenakan oleh orang tua pengantin sebagai lambang cinta kasih tulus yang terus bersemi dan menjadi penuntun bagi anak-cucu.\n3. Batik Sido Asih / Sido Luhur: Alternatif utama untuk prosesi siraman dan midodareni.';
      } else if (qLower.includes('cuci') || qLower.includes('merawat') || qLower.includes('lerak') || qLower.includes('luntur')) {
        aiResponseText = 'Perawatan Batik Tulis Alami:\n\n1. Gunakan Buah Lerak: Jangan gunakan detergen kimia keras. Gunakan cairan sari buah lerak atau shampoo bayi lembut.\n2. Jangan Diperas Kasar: Cukup celup perlahan dan kibaskan.\n3. Jemur di Tempat Teduh: Angin-anginkan di tempat yang tidak terkena sinar matahari terik langsung agar warna sogan alami tetap awet ratusan tahun.\n4. Simpan dengan Merica / Akar Wangi: Hindari kapur barus langsung agar lilin malam alami tidak mengeras.';
      } else if (qLower.includes('solo') || qLower.includes('jogja') || qLower.includes('beda')) {
        aiResponseText = 'Perbedaan Khas Batik Keraton Solo vs Jogja:\n\n• Batik Surakarta (Solo): Latar belakang kain cenderung berwarna krem kekuningan (sogan prada), goresan canting lebih luwes dan gemulai, dipengaruhi keanggunan budaya Bengawan Solo.\n• Batik Ngayogyakarta (Jogja): Latar belakang berwarna putih bersih (pethak) dengan motif coklat sogan tua hingga hitam pekat yang kontras, geometris tegas dan kokoh mencerminkan jiwa ksatria Mataram.';
      } else if (qLower.includes('parang') || qLower.includes('kondangan') || qLower.includes('larangan')) {
        aiResponseText = 'Motif Parang Barong pada masa lalu adalah Awisan Dalem (motif larangan) yang hanya boleh dikenakan Sri Sultan di dalam keraton.\n\nDalam etika modern, Anda boleh mengenakannya untuk acara kenegaraan atau formal kepemimpinan, namun saat menghadiri resepsi pernikahan keraton dianjurkan mengenakan motif Kawung, Sidomukti, atau Sekar Jagad agar selaras dengan tata krama budaya.';
      } else {
        aiResponseText = `Pertanyaan yang sangat mendalam mengenai "${query}". Dalam khazanah falsafah Jawa, setiap motif adalah lambang cermin diri ("Ajining Diri Saka Lathi, Ajining Raga Saka Busana"). Jika Anda ingin mencocokkan karakter kepribadian dengan motif yang tepat, cobalah fitur "Tes Karakter Batik" di menu atas!`;
      }

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiResponseText,
        timestamp: 'Baru saja'
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FDFBF7] rounded-3xl rounded-tr-[48px] max-w-xl w-full h-[600px] flex flex-col border border-[#C5A059] shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#2C1810] text-[#FDFBF7] flex items-center justify-between border-b border-[#C5A059]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C5A059] flex items-center justify-center text-[#2C1810] shadow-md">
              <Bot className="w-5 h-5 text-[#2C1810]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-base font-semibold text-[#FDFBF7]">
                  Sang Dalang AI
                </h3>
                <span className="text-[9px] px-2 py-0.5 rounded-none bg-[#C5A059]/20 text-[#C5A059] font-sans uppercase tracking-widest border border-[#C5A059]/30">
                  Batik Expert
                </span>
              </div>
              <p className="text-[11px] text-[#D7CCC8] font-serif italic">
                Konsultan Budaya, Adat Sakral, & Filosofi jawa
              </p>
            </div>
          </div>

          <button
            id="close-ai-chat-btn"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#3E2723] text-[#FDFBF7] hover:bg-[#5D4037] flex items-center justify-center transition-colors cursor-pointer border border-[#C5A059]/30"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-[#FDFBF7]">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs font-serif leading-relaxed shadow-xs ${
                  m.sender === 'user'
                    ? 'bg-[#3E2723] text-[#FDFBF7] rounded-tr-none'
                    : 'bg-[#F3EFE7] text-[#3E2723] border border-[#E0D5C1] rounded-tl-none whitespace-pre-line'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-[#F3EFE7] rounded-2xl rounded-tl-none p-3.5 border border-[#E0D5C1] text-xs text-[#8D6E63] flex items-center gap-2 font-serif italic">
                <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 rounded-full bg-[#C5A059] animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px]">Sang Dalang sedang merangkai petuah...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Question Prompts */}
        <div className="p-3 bg-[#F3EFE7] border-t border-[#E0D5C1] overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              className="text-[11px] px-3.5 py-1.5 rounded-none bg-[#FDFBF7] border border-[#E0D5C1] text-[#5D4037] hover:border-[#C5A059] hover:text-[#3E2723] transition-colors shrink-0 cursor-pointer font-serif italic"
            >
              💬 {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3.5 bg-[#FDFBF7] border-t border-[#E0D5C1] flex items-center gap-2">
          <input
            id="ai-consultant-input"
            type="text"
            placeholder="Tanyakan makna motif, tata krama busana adat, atau tips..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 px-4 py-2.5 rounded-none border border-[#E0D5C1] bg-[#F3EFE7] text-xs text-[#3E2723] font-serif focus:outline-none focus:border-[#C5A059]"
          />
          <button
            id="ai-consultant-send-btn"
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="p-2.5 rounded-none bg-[#3E2723] text-[#FDFBF7] hover:bg-[#5D4037] disabled:opacity-40 transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#C5A059]" />
          </button>
        </div>

      </div>
    </div>
  );
};
