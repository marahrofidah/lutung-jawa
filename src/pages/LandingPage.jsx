import React, { useEffect, useState } from 'react'

// Import actual assets provided by the user
import bgHomepage from '../assets/bg-fix.webp'
import imgBelajarKelompok from '../assets/belajar_kelompok.webp'
import imgMateriInteraktif from '../assets/materi_interaktif.webp'
import imgForumDiskusi from '../assets/forum_diskusi.webp'
import imgVideoPembahasan from '../assets/video_pembahasan.webp'
import imgKumpulkanBadge from '../assets/kumpulkan_badge.webp'
import imgLutungJalan from '../assets/lutung-jalan.webp'
import imgLutungMelambai from '../assets/lutung-melambai.webp'

// Leaf color palette (natural jungle tones)
const LEAF_COLORS = [
  '#165c43', // Forest Dark Green
  '#1c7c59', // Forest Light Green
  '#84cc16', // Jungle Lime
  '#fca311', // Amber/Yellow
  '#ff7826', // Orange
];

// Leaf helper to generate fixed random leaves
const leavesData = Array.from({ length: 15 }).map((_, i) => {
  const color = LEAF_COLORS[i % LEAF_COLORS.length];
  const scale = 0.4 + (i % 6) * 0.1; // 0.4 to 0.9
  const left = `${5 + (i * 7) % 90}%`; // Distribute across width
  const delay = `${i * 1.5}s`; // Staggered entry
  const duration = `${12 + (i % 5) * 2}s`; // 12s to 20s
  const swayDuration = `${4.5 + (i % 4) * 0.8}s`; // 4.5s to 6.9s
  const isSway1 = i % 2 === 0;

  return {
    id: i,
    color,
    scale,
    left,
    delay,
    duration,
    swayDuration,
    isSway1
  };
});

function Leaf({ color, scale, left, delay, duration, swayDuration, isSway1 }) {
  return (
    <div 
      className={`absolute top-0 pointer-events-none z-10 ${isSway1 ? 'animate-sway-1' : 'animate-sway-2'}`}
      style={{
        left,
        animationDelay: delay,
        '--leaf-sway': swayDuration,
        width: `${scale * 32}px`,
        height: `${scale * 32}px`,
      }}
    >
      <div 
        className="w-full h-full animate-leaf-fall"
        style={{
          animationDelay: delay,
          '--leaf-duration': duration,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M2 22C2 22 6 20 9 16C12 12 16 11 22 2C22 2 13 4 9 9C5 14 2 18 2 22Z" 
            fill={color} 
            fillOpacity="0.7"
          />
          <path 
            d="M2 22C6 18 10 15 15 11" 
            stroke="#05140f" 
            strokeWidth="1.2" 
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

// FactButton Component
const FactButton = () => {
  const [showFact, setShowFact] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2">
      <button 
        onClick={(e) => { e.stopPropagation(); setShowFact(!showFact); }}
        className="px-4 py-2 bg-[#165c43] hover:bg-[#123e32] text-white font-bold rounded-full text-xs shadow-md active:scale-95 transition-all cursor-pointer"
      >
        {showFact ? 'Sembunyikan' : 'Buka Fakta Unik'}
      </button>
      {showFact && (
        <p className="text-xs text-slate-800 font-semibold bg-white p-2.5 rounded-xl border border-emerald-500/20 text-center max-w-[240px] shadow-sm">
          "Bayi Lutung Jawa lahir dengan bulu berwarna oranye terang, lalu berubah menjadi hitam saat dewasa!"
        </p>
      )}
    </div>
  );
};

// VideoButton Component
const VideoButton = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <div className="relative w-40 h-24 bg-black rounded-xl overflow-hidden shadow-lg border border-forest-900 flex items-center justify-center">
        {isPlaying ? (
          <div className="flex flex-col items-center justify-center text-white space-y-1">
            <span className="text-[10px] animate-pulse text-emerald-400">Video sedang diputar...</span>
            <button 
              onClick={(e) => { e.stopPropagation(); setIsPlaying(false); }}
              className="text-[10px] underline hover:text-[#ffbe0b] cursor-pointer"
            >
              Stop
            </button>
          </div>
        ) : (
          <button 
            onClick={(e) => { e.stopPropagation(); setIsPlaying(true); }}
            className="w-10 h-10 rounded-full bg-[#ffbe0b] hover:bg-[#ffb300] flex items-center justify-center text-forest-950 font-bold text-sm shadow-md transition transform hover:scale-110 active:scale-95 cursor-pointer pl-0.5"
          >
            ▶
          </button>
        )}
      </div>
    </div>
  );
};

export default function LandingPage({ setScreen }) {
  const [isLutungHovered, setIsLutungHovered] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  
  // Feeding Game States
  const [satiety, setSatiety] = useState(0)
  const [flyingFood, setFlyingFood] = useState(null)
  const [feedbackMsg, setFeedbackMsg] = useState(null)
  const [isFeedingCompleted, setIsFeedingCompleted] = useState(false)

  const feedLutung = (foodType, emoji) => {
    if (satiety >= 100 && foodType !== 'plastic') return

    // Trigger flight animation
    setFlyingFood(emoji)
    
    // Determine feedback and satiety impact
    let satietyGain = 0
    let msg = ""

    if (foodType === 'leaf') {
      satietyGain = 25
      msg = "Nyam-nyam! Pucuk daun muda ini segar dan kaya serat! Makanan terfavoritku!"
    } else if (foodType === 'fruit') {
      satietyGain = 25
      msg = "Wah, buah hutan manis sekali! Ini sumber energi yang sangat lezat!"
    } else if (foodType === 'flower') {
      satietyGain = 25
      msg = "Hmm! Bunga ini renyah dan wangi. Terima kasih ya!"
    } else if (foodType === 'plastic') {
      satietyGain = -20
      msg = "Aduh! Ini sampah plastik! Aku tidak bisa mencernanya, ini sangat berbahaya!"
    }

    setFeedbackMsg(msg)

    // Calculate new satiety
    setSatiety(prev => {
      const next = Math.max(0, Math.min(100, prev + satietyGain))
      if (next >= 100) {
        setIsFeedingCompleted(true)
      }
      return next
    })

    // Reset flying food after animation completes
    setTimeout(() => {
      setFlyingFood(null)
    }, 800)
  }

  const resetFeedingGame = () => {
    setSatiety(0)
    setFeedbackMsg(null)
    setIsFeedingCompleted(false)
  }

  // Helper to scroll smoothly to a section ID
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Scroll Reveal Intersection Observer Hook
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -45px 0px'
      }
    );

    const elements = document.querySelectorAll('.reveal-element');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const STEPS_DATA = [
    {
      title: "Belajar Kelompok",
      shortDesc: "Diskusi, berbagi ide, and ambil keputusan bersama.",
      longDesc: "Kamu akan masuk ke dalam playroom bersama teman kelompokmu. Diskusikan dan pecahkan studi kasus menarik seputar konservasi Lutung Jawa secara real-time.",
      preview: (
        <div className="bg-[#123e32]/10 border border-[#123e32]/20 p-5 rounded-2xl space-y-3">
          <p className="text-[10px] font-bold text-forest-900 uppercase tracking-wider">Simulasi Diskusi Kelompok:</p>
          <div className="space-y-2 font-sans text-xs">
            <div className="flex items-start gap-2 bg-white/70 p-2 rounded-xl max-w-[80%] shadow-sm">
              <span className="font-bold text-[#ffbe0b]">Budi:</span>
              <span>"Aku rasa Lutung Jawa itu memakan pucuk daun muda deh!"</span>
            </div>
            <div className="flex items-start gap-2 bg-white/70 p-2 rounded-xl max-w-[80%] ml-auto shadow-sm text-right">
              <span>"Iya betul, karena pencernaannya cocok dengan serat daun."</span>
              <span className="font-bold text-emerald-600">Siti:</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Materi Interaktif",
      shortDesc: "Kenali Lutung Jawa lewat materi yang menarik dan mudah dipahami.",
      longDesc: "Setiap misi menyajikan materi komprehensif, mulai dari pengenalan ciri fisik, sebaran habitat asli, ancaman kepunahan, hingga aksi nyata konservasi.",
      preview: <FactButton />
    },
    {
      title: "Forum Diskusi",
      shortDesc: "Jawab soal secara individu, diskusi dalam forum kelompok.",
      longDesc: "Sebelum kelompok mengambil keputusan final, setiap anggota dapat memilih jawaban mereka sendiri dan saling bertukar pendapat di forum internal.",
      preview: (
        <div className="bg-[#123e32]/10 border border-[#123e32]/20 p-5 rounded-2xl space-y-3">
          <p className="text-[10px] font-bold text-forest-900 uppercase tracking-wider">Simulasi Polling Kelompok:</p>
          <div className="space-y-2 font-sans">
            <div className="bg-white/80 p-2.5 rounded-xl shadow-sm text-xs space-y-1">
              <div className="flex justify-between font-bold text-forest-950">
                <span>Pilihan A: Melindungi Hutan</span>
                <span>75%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full w-[75%]" />
              </div>
            </div>
            <div className="bg-white/80 p-2.5 rounded-xl shadow-sm text-xs space-y-1">
              <div className="flex justify-between font-bold text-forest-950">
                <span>Pilihan B: Membiarkan Saja</span>
                <span>25%</span>
              </div>
              <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full w-[25%]" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Video Pembahasan",
      shortDesc: "Dapatkan penjelasan menarik setelah menentukan jawaban akhir.",
      longDesc: "Setelah jawaban akhir kelompok dikirim, tonton video edukasi interaktif yang membedah jawaban studi kasus berdasarkan tinjauan ilmiah konservasi.",
      preview: <VideoButton />
    },
    {
      title: "Kumpulkan Badge",
      shortDesc: "Selesaikan setiap level dan kumpulkan badge keren sebagai pencapaianmu!",
      longDesc: "Selesaikan tantangan di setiap level untuk mendapatkan badge pencapaian. Koleksi kelima badge untuk membuktikan kepedulian kelompokmu terhadap kelestarian alam!",
      preview: (
        <div className="bg-[#123e32]/10 border border-[#123e32]/20 p-5 rounded-2xl flex flex-col justify-center items-center space-y-2 min-h-[120px] cursor-pointer group/badge">
          <p className="text-[10px] font-bold text-forest-900 uppercase tracking-wider">Arahkan kursor ke badge:</p>
          <div className="relative w-16 h-16 transform group-hover/badge:scale-110 group-hover/badge:rotate-12 transition duration-300">
            <img src={imgKumpulkanBadge} alt="Badge" className="w-full h-full object-contain filter drop-shadow-md" />
            <span className="absolute top-0 right-0 text-xl animate-pulse">✨</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="w-full text-slate-100 flex flex-col font-sans bg-[#f6f5ee]">
      
      <div 
        className="w-full bg-cover bg-[position:35%_center] md:bg-center bg-no-repeat relative min-h-[700px] md:min-h-[820px] lg:min-h-[900px] flex flex-col overflow-hidden"
        style={{ backgroundImage: `url(${bgHomepage})` }}
      >
        {/* Falling Leaves Effect */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {leavesData.map((leaf) => (
            <Leaf key={leaf.id} {...leaf} />
          ))}
        </div>

        {/* 1. ABSOLUTE TRANSPARENT HEADER */}
        <header className="w-full px-4 sm:px-6 py-4 flex items-center justify-between z-40">
          <div className="flex items-center gap-3 cursor-pointer select-none">
            <div>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-forest-950 flex items-center gap-2">
                LUTUNG JAWA
              </h1>
              <p className="text-xs sm:text-[15px] text-forest-800 font-mono tracking-widest uppercase">Edukasi Konservasi</p>
            </div>
          </div>

          {/* Hanging Wooden Signs Navigation */}
          <div className="hidden md:flex items-start gap-6 select-none relative -mt-6">
            {/* Hanging sign 1: Petunjuk */}
            <div className="flex flex-col items-center group">
              {/* Rope vectors */}
              <div className="flex gap-20 justify-between w-28 h-6 mb-[-2px]">
                <div className="w-[3.5px] h-full bg-[#5c3a21]"></div>
                <div className="w-[3.5px] h-full bg-[#5c3a21]"></div>
              </div>
              <button 
                onClick={() => scrollToSection('langkah-bermain')}
                className="bg-gradient-to-b from-[#8b5a2b] to-[#5c3a21] hover:from-[#9c6a3b] hover:to-[#6c4a31] border-2 border-[#3d2516] text-[#f7e7d0] hover:text-white px-8 py-3.5 rounded-2xl text-xl font-medium font-display shadow-lg hover:shadow-xl transition-all transform hover:translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <span>Petunjuk</span>
              </button>
            </div>

            {/* Hanging sign 2: Profil */}
            <div className="flex flex-col items-center group">
              {/* Rope vectors */}
              <div className="flex gap-36 justify-between w-48 h-6 mb-[-2px]">
                <div className="w-[3.5px] h-full bg-[#5c3a21]"></div>
                <div className="w-[3.5px] h-full bg-[#5c3a21]"></div>
              </div>
              <button 
                onClick={() => scrollToSection('sekilas-lutung')}
                className="bg-gradient-to-b from-[#8b5a2b] to-[#5c3a21] hover:from-[#9c6a3b] hover:to-[#6c4a31] border-2 border-[#3d2516] text-[#f7e7d0] hover:text-white px-8 py-3.5 rounded-2xl text-xl font-display font-medium shadow-lg hover:shadow-xl transition-all transform hover:translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <span>Profil Lutung Jawa</span>
              </button>
            </div>
          </div>

          {/* Mulai Bermain CTA */}
          <div>
            <button 
              onClick={() => setScreen('role-selection')}
              className="flex items-center gap-2 sm:gap-3.5 bg-[#ffbe0b] hover:bg-[#ffb300] border-2 border-[#cc8d00] text-forest-950 font-medium px-4 py-2 sm:px-7 sm:py-3 rounded-full text-xs sm:text-lg transition duration-200 transform hover:scale-105 shadow-md cursor-pointer"
            >
              <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-forest-800 text-[10px] sm:text-xs shadow-inner font-mono shrink-0">▶</span>
              <span className="font-display">Mulai Bermain</span>
            </button>
          </div>
        </header>

        {/* 2. HERO CONTENT OVERLAY */}
        <div className="flex-1 max-w-7xl mx-auto w-full px-6 py-8 md:py-16 flex flex-col justify-between relative z-10">
          
          {/* Main Hero grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mt-8 md:mt-12">
            
            {/* Left Content Side */}
            <div className="space-y-6 text-left max-w-xl">
              
              {/* Speech Bubble */}
              <div className="inline-flex items-center gap-2 bg-white text-forest-950 px-4 py-2 sm:px-6 sm:py-3 rounded-2xl shadow-xl border border-emerald-500/10 relative animate-float">
                <div>
                  <p className="text-xs sm:text-base font-bold font-display leading-tight">Hai, teman-teman!</p>
                  <p className="text-[10px] sm:text-sm text-slate-500 font-semibold leading-none mt-1">Yuk bantu aku menjaga hutan!</p>
                </div>
                {/* Pointer */}
                <div className="absolute left-6 sm:left-8 -bottom-2 w-3.5 h-3.5 bg-white transform rotate-45 border-r border-b border-emerald-500/5"></div>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl sm:text-5xl lg:text-7xl font-display font-extrabold text-forest-950 leading-tight drop-shadow-sm">
                  Belajar Seru,<br />
                  Selamatkan<br />
                  <span className="text-[#123e32]">Lutung Jawa!</span>
                </h2>
                <p className="text-forest-900 text-sm sm:text-lg max-w-[260px] sm:max-w-lg leading-relaxed font-semibold">
                  Belajar bersama kelompokmu melalui 5 level misi seru untuk mengenal, memahami, dan melindungi Lutung Jawa.
                </p>
              </div>

              {/* CTA Play Button */}
              <button 
                onClick={() => setScreen('role-selection')}
                className="flex items-center justify-between gap-4 bg-[#ffbe0b] hover:bg-[#ffb300] border-2 border-[#cc8d00] text-forest-950 font-medium px-5 py-2.5 sm:px-6 sm:py-3 rounded-full shadow-lg transition duration-200 transform hover:-translate-y-0.5 cursor-pointer w-fit text-xs sm:text-2xl"
              >
                <span className="font-display text-start tracking-wide text-xs sm:text-sm">Mulai Petualangan</span>
                <span className="w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-forest-850 text-[8px] sm:text-[10px] shadow-md shrink-0">▶</span>
              </button>
            </div>



          </div>

        </div>
      </div>

      {/* 3. SECTION: KENAPA BELAJAR DI SINI SERU? */}
      <section id="fitur-seru" className="w-full bg-[#f6f5ee] text-forest-950 py-12 px-6 rounded-t-[40px] sm:rounded-t-[100px] relative z-10 -mt-16 sm:-mt-25">
        <div className="max-w-6xl mx-auto space-y-12 reveal-element">
          
          <div className="text-center space-y-2">
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-forest-950 flex items-center justify-center gap-2">
              <span> Kenapa belajar di sini seru? </span>
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
              Metode interaktif berkelompok yang membuat proses pembelajaran menjadi aktif dan kolaboratif.
            </p>
          </div>

          {/* Connected Steps Grid */}
          <div className="relative grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            
            {/* Connection Line with running dots animation */}
            <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-4 z-0 pointer-events-none">
              <svg className="w-full h-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
                <line 
                  x1="0" 
                  y1="8" 
                  x2="100%" 
                  y2="8" 
                  stroke="#165c43" 
                  strokeWidth="3" 
                  strokeDasharray="8 8" 
                  className="animated-dash-line opacity-30" 
                />
              </svg>
            </div>

            {/* Step 1: Belajar Kelompok */}
            <div 
              onClick={() => setActiveStep(0)}
              onMouseEnter={() => setActiveStep(0)}
              className={`flex flex-col items-center text-center space-y-4 relative z-10 group cursor-pointer p-4 rounded-3xl transition-all duration-300 ${
                activeStep === 0 ? 'bg-[#123e32]/8 border border-[#123e32]/15 shadow-md -translate-y-1 scale-[1.03]' : 'opacity-70 hover:opacity-100 hover:scale-[1.02]'
              }`}
            >
              <img 
                src={imgBelajarKelompok} 
                alt="Belajar Kelompok" 
                className={`w-24 h-24 object-contain transition-transform duration-300 ${activeStep === 0 ? 'scale-110' : 'group-hover:scale-105'}`}
              />
              <div>
                <h4 className="font-display font-bold text-base text-forest-950">Belajar Kelompok</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-[180px] leading-relaxed font-semibold">
                  Diskusi, berbagi ide, and ambil keputusan bersama.
                </p>
              </div>
            </div>

            {/* Step 2: Materi Interaktif */}
            <div 
              onClick={() => setActiveStep(1)}
              onMouseEnter={() => setActiveStep(1)}
              className={`flex flex-col items-center text-center space-y-4 relative z-10 group cursor-pointer p-4 rounded-3xl transition-all duration-300 ${
                activeStep === 1 ? 'bg-[#123e32]/8 border border-[#123e32]/15 shadow-md -translate-y-1 scale-[1.03]' : 'opacity-70 hover:opacity-100 hover:scale-[1.02]'
              }`}
            >
              <img 
                src={imgMateriInteraktif} 
                alt="Materi Interaktif" 
                className={`w-24 h-24 object-contain transition-transform duration-300 ${activeStep === 1 ? 'scale-110' : 'group-hover:scale-105'}`}
              />
              <div>
                <h4 className="font-display font-bold text-base text-forest-950">Materi Interaktif</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-[180px] leading-relaxed font-semibold">
                  Kenali Lutung Jawa lewat materi yang menarik dan mudah dipahami.
                </p>
              </div>
            </div>

            {/* Step 3: Forum Diskusi */}
            <div 
              onClick={() => setActiveStep(2)}
              onMouseEnter={() => setActiveStep(2)}
              className={`flex flex-col items-center text-center space-y-4 relative z-10 group cursor-pointer p-4 rounded-3xl transition-all duration-300 ${
                activeStep === 2 ? 'bg-[#123e32]/8 border border-[#123e32]/15 shadow-md -translate-y-1 scale-[1.03]' : 'opacity-70 hover:opacity-100 hover:scale-[1.02]'
              }`}
            >
              <img 
                src={imgForumDiskusi} 
                alt="Forum Diskusi" 
                className={`w-24 h-24 object-contain transition-transform duration-300 ${activeStep === 2 ? 'scale-110' : 'group-hover:scale-105'}`}
              />
              <div>
                <h4 className="font-display font-bold text-base text-forest-950">Forum Diskusi</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-[180px] leading-relaxed font-semibold">
                  Jawab soal secara individu, diskusi dalam forum kelompok.
                </p>
              </div>
            </div>

            {/* Step 4: Video Pembahasan */}
            <div 
              onClick={() => setActiveStep(3)}
              onMouseEnter={() => setActiveStep(3)}
              className={`flex flex-col items-center text-center space-y-4 relative z-10 group cursor-pointer p-4 rounded-3xl transition-all duration-300 ${
                activeStep === 3 ? 'bg-[#123e32]/8 border border-[#123e32]/15 shadow-md -translate-y-1 scale-[1.03]' : 'opacity-70 hover:opacity-100 hover:scale-[1.02]'
              }`}
            >
              <img 
                src={imgVideoPembahasan} 
                alt="Video Pembahasan" 
                className={`w-24 h-24 object-contain transition-transform duration-300 ${activeStep === 3 ? 'scale-110' : 'group-hover:scale-105'}`}
              />
              <div>
                <h4 className="font-display font-bold text-base text-forest-950">Video Pembahasan</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-[180px] leading-relaxed font-semibold">
                  Dapatkan penjelasan menarik setelah menentukan jawaban akhir.
                </p>
              </div>
            </div>

            {/* Step 5: Kumpulkan Badge */}
            <div 
              onClick={() => setActiveStep(4)}
              onMouseEnter={() => setActiveStep(4)}
              className={`flex flex-col items-center text-center space-y-4 relative z-10 group cursor-pointer p-4 rounded-3xl transition-all duration-300 ${
                activeStep === 4 ? 'bg-[#123e32]/8 border border-[#123e32]/15 shadow-md -translate-y-1 scale-[1.03]' : 'opacity-70 hover:opacity-100 hover:scale-[1.02]'
              }`}
            >
              <img 
                src={imgKumpulkanBadge} 
                alt="Kumpulkan Badge" 
                className={`w-24 h-24 object-contain transition-transform duration-300 ${activeStep === 4 ? 'scale-110' : 'group-hover:scale-105'}`}
              />
              <div>
                <h4 className="font-display font-bold text-base text-forest-950">Kumpulkan Badge</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-[180px] leading-relaxed font-semibold">
                  Selesaikan setiap level dan kumpulkan badge keren sebagai pencapaianmu!
                </p>
              </div>
            </div>

          </div>

          {/* Active Step Detailed Presentation Panel */}
          <div className="paper-container-shadow max-w-4xl mx-auto mt-12 transform rotate-[-0.3deg]">
            <div className="card-paper paper-rough-2 p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center min-h-[190px] border border-amber-250/20 text-slate-800">
              {/* Left Description */}
              <div className="flex-1 text-left space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{STEPS_DATA[activeStep].emoji}</span>
                  <h4 className="font-display font-black text-xl text-[#02462e]">
                    {STEPS_DATA[activeStep].title}
                  </h4>
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-bold">
                  {STEPS_DATA[activeStep].longDesc}
                </p>
              </div>
              {/* Right Interactive Preview */}
              <div className="w-full md:w-80 shrink-0">
                {STEPS_DATA[activeStep].preview}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. SECTION: LANGKAH BERMAIN */}
      <section id="langkah-bermain" className="w-full bg-forest-950 py-16 px-6 text-center border-t border-forest-900/50">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="space-y-2 reveal-element">
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white flex items-center justify-center gap-2">
              <span>Langkah Bermain</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-md mx-auto">
              Ikuti petunjuk di bawah ini untuk memulai petualangan konservasimu!
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { num: 1, text: "Amati gambar, data, atau informasi yang diberikan.", paper: "card-paper", rough: "paper-rough-1", rot: "rotate-[-1deg]", delay: "delay-100" },
              { num: 2, text: "Bacalah studi kasus yang tersedia pada setiap level dengan teliti.", paper: "card-paper-yellow", rough: "paper-rough-2", rot: "rotate-[0.8deg]", delay: "delay-200" },
              { num: 3, text: "Kerjakan setiap misi sesuai petunjuk pada level tersebut.", paper: "card-paper", rough: "paper-rough-1", rot: "rotate-[-0.5deg]", delay: "delay-300" },
              { num: 4, text: "Jawab pertanyaan berdasarkan hasil pengamatan dan analisismu.", paper: "card-paper-yellow", rough: "paper-rough-2", rot: "rotate-[1.2deg]", delay: "delay-400" },
              { num: 5, text: "Selesaikan seluruh level secara berurutan.", paper: "card-paper", rough: "paper-rough-1", rot: "rotate-[-0.8deg]", delay: "delay-500" },
              { num: 6, text: "Setelah menyelesaikan semua level, lihat skor, badge yang diperoleh, dan refleksi pembelajaran.", paper: "card-paper-yellow", rough: "paper-rough-2", rot: "rotate-[0.5deg]", delay: "delay-[600ms]" }
            ].map((step) => (
              <div key={step.num} className={`paper-container-shadow transform ${step.rot} hover:rotate-0 hover:scale-102 transition-all duration-200 reveal-element ${step.delay}`}>
                <div className={`${step.paper} ${step.rough} p-6 min-h-[150px] text-left flex flex-col justify-between gap-4 shadow-sm`}>
                  <div className="space-y-3">
                    <span className="w-8 h-8 bg-[#02462e] text-[#fec700] font-bold rounded-full flex items-center justify-center text-sm font-mono shadow-md select-none">
                      {step.num}
                    </span>
                    <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-bold">
                      {step.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tips Banner */}
          <div className="paper-container-shadow max-w-4xl mx-auto mt-10 relative overflow-hidden reveal-element">
            <div className="card-paper-yellow paper-rough-2 p-6 sm:p-8 text-left relative pl-10">
              <div className="absolute left-2.5 top-0 bottom-0 w-1 bg-amber-400/20 border-r border-dashed border-amber-400/35"></div>
              <div className="absolute right-4 bottom-2 opacity-15 text-6xl select-none">💡</div>
              <div className="space-y-1.5 text-slate-800">
                <h4 className="font-display font-black text-lg text-amber-700">Tips:</h4>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-bold">
                  Bacalah setiap informasi dengan cermat. Tidak semua masalah memiliki satu jawaban yang sama. Berikan alasan yang logis berdasarkan konsep IPA dan kondisi pada studi kasus.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. SECTION: SEKILAS TENTANG LUTUNG JAWA */}
      <section id="sekilas-lutung" className="w-full bg-[#f6f5ee] text-forest-950 py-16 px-6 rounded-b-[50px] shadow-inner relative z-20 overflow-hidden">
        {/* Sunbeams ambient background */}
        <div className="sunbeams-bg pointer-events-none">
          <div className="sunbeam"></div>
          <div className="sunbeam sunbeam-2"></div>
        </div>

        <div className="max-w-6xl mx-auto space-y-12 relative z-10">
          
          {/* Section Heading */}
          <div className="text-center space-y-2 reveal-element">
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-forest-950 flex items-center justify-center gap-2">
              <span>Profil Lutung Jawa</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-500 font-display italic">
              (Trachypithecus auratus)
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Visual Column with dynamic guides */}
            <div className="flex-1 flex flex-col items-center justify-center relative min-w-[280px] lg:min-w-[320px] reveal-element">
              
              {/* Flying Food Overlay */}
              {flyingFood && (
                <span className="flying-food-emoji select-none">
                  {flyingFood}
                </span>
              )}

              {/* Dynamic Speech Bubble */}
              <div className="bg-white text-forest-950 px-5 py-3.5 rounded-2xl shadow-xl border border-emerald-500/10 relative mb-4 animate-float max-w-[280px] text-center select-none min-h-[75px] flex items-center justify-center">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-bold">
                  {feedbackMsg ? feedbackMsg : (
                    isFeedingCompleted 
                      ? "Horeee! Aku kenyang dan sehat! Kamu adalah Sahabat Konservasi Sejati!" 
                      : "Ayo beri aku makan di kartu Makanan di sebelah kanan!"
                  )}
                </p>
                {/* Bubble Pointer */}
                <div className="absolute left-1/2 -bottom-2 w-3.5 h-3.5 bg-white transform -translate-x-1/2 rotate-45 border-r border-b border-emerald-500/5"></div>
              </div>

              <div 
                onMouseEnter={() => setIsLutungHovered(true)}
                onMouseLeave={() => setIsLutungHovered(false)}
                className="relative w-64 h-64 sm:w-80 sm:h-80 cursor-pointer group"
              >
                <img 
                  src={(isLutungHovered || flyingFood) ? imgLutungJalan : imgLutungMelambai} 
                  alt="Profil Lutung Jawa" 
                  className="w-full h-full object-contain transition-transform duration-300 transform scale-100 hover:scale-105" 
                />
                <div className="absolute inset-x-0 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center pointer-events-none">
                  <span className="bg-forest-950/85 text-white font-display text-xs px-4 py-2 rounded-full shadow-xl border border-emerald-500/10 backdrop-blur-sm">
                    {(isLutungHovered || flyingFood) ? 'Nyam, Lezat!' : 'Sahabat Hutan Kita'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Information Column */}
            <div className="flex-1 w-full space-y-6 reveal-element delay-200">
              
              {/* Card 3: Makanan */}
              <div className="paper-container-shadow">
                <div className="card-paper paper-rough-1 p-5 border border-slate-200/50 text-slate-800 text-left">
                  <h4 className="font-display font-black text-base sm:text-lg text-[#02462e] flex items-center gap-2">
                    Makanan & Game Beri Makan
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-bold">
                    Lutung Jawa adalah herbivor. Klik makanan sehat di bawah untuk memberinya makan, dan hindari sampah berbahaya!
                  </p>

                {/* Satiety Progress Bar */}
                <div className="mt-4 bg-slate-100 p-3 rounded-xl border border-slate-200/50 space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                    <span className="flex items-center gap-1">
                      {isFeedingCompleted ? 'Kenyang Maksimal!' : 'Satiety (Tingkat Kenyang):'}
                    </span>
                    <span className={isFeedingCompleted ? 'text-emerald-600 animate-pulse font-extrabold' : ''}>
                      {satiety}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden relative">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isFeedingCompleted 
                          ? 'bg-gradient-to-r from-emerald-400 to-green-500 animate-pulse' 
                          : satiety > 50 
                            ? 'bg-emerald-500' 
                            : satiety > 20 
                              ? 'bg-amber-500' 
                              : 'bg-rose-500'
                      }`}
                      style={{ width: `${satiety}%` }}
                    />
                  </div>
                </div>

                {/* Feeding Options Grid */}
                <div className="grid grid-cols-2 gap-2.5 mt-4">
                  <button
                    onClick={() => feedLutung('leaf', '🍃')}
                    disabled={isFeedingCompleted}
                    className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-emerald-800 font-bold bg-amber-300 hover:bg-amber-300/30 px-3 py-2 rounded-xl active:scale-95 transition cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
                  >
                    <span></span>Daun Muda
                  </button>
                  <button
                    onClick={() => feedLutung('fruit', '🍎')}
                    disabled={isFeedingCompleted}
                    className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-emerald-800 font-bold bg-amber-300 hover:bg-amber-300/30 px-3 py-2 rounded-xl active:scale-95 transition cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
                  >
                    <span></span>Buah Hutan
                  </button>
                  <button
                    onClick={() => feedLutung('flower', '🌸')}
                    disabled={isFeedingCompleted}
                    className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-emerald-800 font-bold bg-amber-300 hover:bg-amber-300/30 px-3 py-2 rounded-xl active:scale-95 transition cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
                  >
                    <span></span>Bunga Hutan
                  </button>
                  <button
                    onClick={() => feedLutung('plastic', '🗑️')}
                    className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-emerald-800 font-bold bg-amber-300 hover:bg-amber-300/30 px-3 py-2 rounded-xl active:scale-95 transition cursor-pointer"
                  >
                    <span></span>Sampah Plastik
                  </button>
                </div>

                {/* Reset Button when Completed */}
                {isFeedingCompleted && (
                  <button
                    onClick={resetFeedingGame}
                    className="w-full mt-3 py-2 bg-[#165c43] hover:bg-[#123e32] text-white font-display rounded-xl text-xs shadow-md transition active:scale-98 cursor-pointer"
                  >
                    Main Lagi / Reset Game
                  </button>
                )}
              </div>
            </div>

              {/* Card 1: Persebaran */}
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-500/10 p-5 rounded-2xl shadow-md hover:shadow-lg transition">
                <h4 className="font-display font-bold text-base sm:text-lg text-forest-900 flex items-center gap-2">
                  <span className="text-lg"></span>Persebaran
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed font-semibold text-justify">
                  Lutung Jawa merupakan satwa endemik Indonesia yang hidup di Pulau Jawa, Bali, dan sebagian Pulau Lombok. Satwa ini banyak ditemukan di kawasan hutan yang masih memiliki vegetasi yang baik.
                </p>
              </div>

              {/* Card 2: Habitat */}
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-500/10 p-5 rounded-2xl shadow-md hover:shadow-lg transition">
                <h4 className="font-display font-bold text-base sm:text-lg text-forest-900 flex items-center gap-2">
                  <span className="text-lg"></span>Habitat
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed font-semibold text-justify">
                  Lutung Jawa hidup di hutan hujan tropis, hutan pegunungan, hutan mangrove, dan hutan jati. Mereka menghabiskan sebagian besar waktunya di atas pohon untuk mencari makan, beristirahat, dan berlindung.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION CARD */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full relative z-10">
        <div className="bg-gradient-to-r from-forest-900 to-forest-950 border border-forest-850 p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden reveal-element">
          
          <div className="absolute -left-10 -bottom-10 opacity-10 text-9xl">🌿</div>
          <div className="absolute -right-10 -top-10 opacity-10 text-9xl">🌴</div>

          {/* Left Text */}
          <div className="text-left space-y-6 relative z-10">
            <div className="space-y-2">
              <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight">
                Belajar hari ini,<br />
                Selamatkan mereka <span className="text-[#ffbe0b]">esok hari.</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-300 max-w-lg leading-relaxed font-semibold">
                Bersama kita jaga kelestarian hutan, bersama kita selamatkan populasi Lutung Jawa dari kepunahan.
              </p>
            </div>
            
            <button 
              onClick={() => setScreen('role-selection')}
              className="flex items-center justify-between gap-5 bg-[#ffbe0b] hover:bg-[#ffb300] border-2 border-[#cc8d00] text-forest-950 font-extrabold px-8 py-4.5 rounded-full shadow-lg transition duration-200 transform hover:scale-105 cursor-pointer"
            >
              <span className="font-display text-base sm:text-lg">Mulai Petualangan Sekarang</span>
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-forest-800 text-xs shadow-md shrink-0">▶</span>
            </button>
          </div>

          {/* Right Mascot Illustration */}
          <div className="relative flex flex-col items-center md:items-end gap-3 z-10">
            {/* Bubble */}
            <div className="bg-amber-100 text-forest-950 px-4 py-2 rounded-2xl shadow-xl text-xs font-bold font-display relative animate-float">
              Yuk mulai dari petualangan pertamamu!
              <div className="absolute bottom-[-6px] right-8 w-3 h-3 bg-amber-100 transform rotate-45"></div>
            </div>
            {/* Mascot circular avatar */}
            <div className="w-28 h-28 rounded-full border-4 border-forest-800 bg-forest-950/50 flex items-center justify-center overflow-hidden">
              <img src="/lutung_circle.png" alt="Mascot Avatar" className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="w-full border-t border-forest-900 bg-forest-950 py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-left text-slate-400 text-xs">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <h4 className="font-display font-extrabold text-sm text-white">LUTUNG JAWA</h4>
            </div>
            <p className="leading-relaxed text-slate-500">
              Belajar seru tentang konservasi Lutung Jawa melalui misi kelompok yang interaktif dan menyenangkan.
            </p>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white font-display">Menu</h5>
            <ul className="space-y-2">
              <li><button onClick={() => scrollToSection('fitur-seru')} className="hover:text-white cursor-pointer transition">Petunjuk</button></li>
              <li><button onClick={() => scrollToSection('sekilas-lutung')} className="hover:text-white cursor-pointer transition">Profil Lutung Jawa</button></li>
              <li><button onClick={() => setScreen('role-selection')} className="hover:text-white cursor-pointer transition">Mulai Bermain</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white font-display">Informasi</h5>
            <ul className="space-y-2">
              <li className="hover:text-white cursor-pointer transition">Tentang Kami</li>
              <li className="hover:text-white cursor-pointer transition">Kebijakan Privasi</li>
              <li className="hover:text-white cursor-pointer transition">Syarat & Ketentuan</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-white font-display">Kontak</h5>
            <ul className="space-y-2 text-slate-500">
              <li>Email: <a href="mailto:hello@lutungjawa.id" className="hover:text-white transition">hello@lutungjawa.id</a></li>
            </ul>
          </div>

        </div>
        
        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t text-center text-[10px] text-stone-50">
          <p>© 2026 Lutung Jawa. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}
