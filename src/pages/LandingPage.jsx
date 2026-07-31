import React, { useEffect } from 'react'

// Import actual assets provided by the user
import bgHomepage from '../assets/bg_homepage.png'
import imgBelajarKelompok from '../assets/belajar_kelompok.png'
import imgMateriInteraktif from '../assets/materi_interaktif.png'
import imgForumDiskusi from '../assets/forum_diskusi.png'
import imgVideoPembahasan from '../assets/video_pembahasan.png'
import imgKumpulkanBadge from '../assets/kumpulkan_badge.png'

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

export default function LandingPage({ setScreen }) {
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

  return (
    <div className="w-full text-slate-100 flex flex-col font-sans bg-[#f6f5ee]">
      
      {/* HERO WRAPPER with bg_homepage.png covering the top section */}
      <div 
        className="w-full bg-cover bg-center bg-no-repeat relative min-h-[700px] md:min-h-[820px] lg:min-h-[900px] flex flex-col overflow-hidden"
        style={{ backgroundImage: `url(${bgHomepage})` }}
      >
        {/* Falling Leaves Effect */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {leavesData.map((leaf) => (
            <Leaf key={leaf.id} {...leaf} />
          ))}
        </div>

        {/* 1. ABSOLUTE TRANSPARENT HEADER */}
        <header className="w-full px-6 py-4 flex items-center justify-between z-40">
          <div className="flex items-center gap-3 cursor-pointer select-none">
            <div>
              <h1 className="font-display font-extrabold text-xl tracking-tight text-forest-950 flex items-center gap-2">
                LUTUNG JAWA
              </h1>
              <p className="text-[10px] text-forest-800 font-mono tracking-widest uppercase">Edukasi Konservasi</p>
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
                onClick={() => scrollToSection('fitur-seru')}
                className="bg-gradient-to-b from-[#8b5a2b] to-[#5c3a21] hover:from-[#9c6a3b] hover:to-[#6c4a31] border-2 border-[#3d2516] text-[#f7e7d0] hover:text-white px-8 py-3.5 rounded-2xl text-base font-bold font-display shadow-lg hover:shadow-xl transition-all transform hover:translate-y-0.5 flex items-center gap-2 cursor-pointer"
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
                className="bg-gradient-to-b from-[#8b5a2b] to-[#5c3a21] hover:from-[#9c6a3b] hover:to-[#6c4a31] border-2 border-[#3d2516] text-[#f7e7d0] hover:text-white px-8 py-3.5 rounded-2xl text-base font-bold font-display shadow-lg hover:shadow-xl transition-all transform hover:translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <span>Profil Lutung Jawa</span>
              </button>
            </div>
          </div>

          {/* Mulai Bermain CTA */}
          <div>
            <button 
              onClick={() => setScreen('role-selection')}
              className="flex items-center gap-3.5 bg-[#ffbe0b] hover:bg-[#ffb300] border-2 border-[#cc8d00] text-forest-950 font-bold px-7 py-3 rounded-full text-base transition duration-200 transform hover:scale-105 shadow-md cursor-pointer"
            >
              <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-forest-800 text-xs shadow-inner font-mono">▶</span>
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
              <div className="inline-flex items-center gap-2 bg-white text-forest-950 px-6 py-3 rounded-2xl shadow-xl border border-emerald-500/10 relative animate-float">
                <div>
                  <p className="text-sm sm:text-base font-bold font-display leading-tight">Hai, teman-teman!</p>
                  <p className="text-xs sm:text-sm text-slate-500 font-semibold leading-none mt-1">Yuk bantu aku menjaga hutan!</p>
                </div>
                {/* Pointer */}
                <div className="absolute left-8 -bottom-2 w-4 h-4 bg-white transform rotate-45 border-r border-b border-emerald-500/5"></div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl lg:text-7xl font-display font-extrabold text-forest-950 leading-tight drop-shadow-sm">
                  Belajar Seru,<br />
                  Selamatkan<br />
                  <span className="text-[#123e32]">Lutung Jawa!</span>
                </h2>
                <p className="text-forest-900 text-base sm:text-lg max-w-lg leading-relaxed font-semibold">
                  Belajar bersama kelompokmu melalui 5 level misi seru untuk mengenal, memahami, dan melindungi Lutung Jawa.
                </p>
              </div>

              {/* CTA Play Button */}
              <button 
                onClick={() => setScreen('role-selection')}
                className="flex items-center justify-between gap-6 bg-[#ffbe0b] hover:bg-[#ffb300] border-2 border-[#cc8d00] text-forest-950 font-extrabold px-6 py-3 rounded-full shadow-lg transition duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span className="font-display text-sm tracking-wide">Mulai Petualangan</span>
                <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center text-forest-850 text-[10px] shadow-md shrink-0">▶</span>
              </button>
            </div>

            {/* Right Side Info Box (positioned to not block the background monkey on branch) */}
            <div className="flex justify-end lg:mt-16">
              <div className="max-w-[210px] bg-[#4a3525]/95 border-2 border-[#6b4e37] text-[#fbf0df] p-4.5 rounded-2xl shadow-2xl space-y-1.5 text-left transform rotate-1">
                <span className="text-xs font-black text-[#ffbe0b] block font-display tracking-wider">Tahukah kamu?</span>
                <p className="text-[11px] text-slate-200 leading-relaxed font-medium">
                  Lutung Jawa hanya dapat ditemukan di Pulau Jawa dan kini terancam punah.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 3. SECTION: KENAPA BELAJAR DI SINI SERU? */}
      <section id="fitur-seru" className="w-full bg-[#f6f5ee] text-forest-950 py-16 px-6 rounded-t-[100px] relative z-10 -mt-25">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-2 reveal-element">
            <h3 className="text-3xl font-display font-extrabold text-forest-950 flex items-center justify-center gap-2">
              <span> Kenapa belajar di sini seru? </span>
            </h3>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
              Metode interaktif berkelompok yang membuat proses pembelajaran menjadi aktif dan kolaboratif.
            </p>
          </div>

          {/* Connected Steps Grid */}
          <div className="relative grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-[52px] left-[12%] right-[12%] h-0.5 border-t-2 border-dashed border-[#165c43]/20 z-0"></div>

            {/* Step 1: Belajar Kelompok */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10 group reveal-element delay-100">
              <img 
                src={imgBelajarKelompok} 
                alt="Belajar Kelompok" 
                className="w-24 h-24 object-contain transition duration-200 group-hover:scale-105"
              />
              <div>
                <h4 className="font-display font-bold text-base text-forest-950">Belajar Kelompok</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-[180px] leading-relaxed font-semibold">
                  Diskusi, berbagi ide, and ambil keputusan bersama.
                </p>
              </div>
            </div>

            {/* Step 2: Materi Interaktif */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10 group reveal-element delay-200">
              <img 
                src={imgMateriInteraktif} 
                alt="Materi Interaktif" 
                className="w-24 h-24 object-contain transition duration-200 group-hover:scale-105"
              />
              <div>
                <h4 className="font-display font-bold text-base text-forest-950">Materi Interaktif</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-[180px] leading-relaxed font-semibold">
                  Kenali Lutung Jawa lewat materi yang menarik dan mudah dipahami.
                </p>
              </div>
            </div>

            {/* Step 3: Forum Diskusi */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10 group reveal-element delay-300">
              <img 
                src={imgForumDiskusi} 
                alt="Forum Diskusi" 
                className="w-24 h-24 object-contain transition duration-200 group-hover:scale-105"
              />
              <div>
                <h4 className="font-display font-bold text-base text-forest-950">Forum Diskusi</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-[180px] leading-relaxed font-semibold">
                  Jawab soal secara individu, diskusi dalam forum kelompok.
                </p>
              </div>
            </div>

            {/* Step 4: Video Pembahasan */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10 group reveal-element delay-400">
              <img 
                src={imgVideoPembahasan} 
                alt="Video Pembahasan" 
                className="w-24 h-24 object-contain transition duration-200 group-hover:scale-105"
              />
              <div>
                <h4 className="font-display font-bold text-base text-forest-950">Video Pembahasan</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-[180px] leading-relaxed font-semibold">
                  Dapatkan penjelasan menarik setelah menentukan jawaban akhir.
                </p>
              </div>
            </div>

            {/* Step 5: Kumpulkan Badge */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10 group reveal-element delay-500">
              <img 
                src={imgKumpulkanBadge} 
                alt="Kumpulkan Badge" 
                className="w-24 h-24 object-contain transition duration-200 group-hover:scale-105"
              />
              <div>
                <h4 className="font-display font-bold text-base text-forest-950">Kumpulkan Badge</h4>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-[180px] leading-relaxed font-semibold">
                  Selesaikan setiap level dan kumpulkan badge keren sebagai pencapaianmu!
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. SECTION: LANGKAH BERMAIN */}
      <section className="w-full bg-forest-950 py-16 px-6 text-center border-t border-forest-900/50">
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
            
            {/* Step 1 */}
            <div className="bg-forest-900/40 border border-forest-850 p-6 rounded-2xl text-left hover:border-lutung-orange/40 transition duration-205 shadow-lg flex flex-col justify-between reveal-element delay-100">
              <div className="space-y-3">
                <span className="w-8 h-8 bg-[#ffbe0b] text-forest-950 font-bold rounded-full flex items-center justify-center text-sm font-mono shadow-md">1</span>
                <p className="text-base text-slate-200 leading-relaxed font-semibold">
                  Amati gambar, data, atau informasi yang diberikan.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-forest-900/40 border border-forest-850 p-6 rounded-2xl text-left hover:border-lutung-orange/40 transition duration-205 shadow-lg flex flex-col justify-between reveal-element delay-200">
              <div className="space-y-3">
                <span className="w-8 h-8 bg-[#ffbe0b] text-forest-950 font-bold rounded-full flex items-center justify-center text-sm font-mono shadow-md">2</span>
                <p className="text-base text-slate-200 leading-relaxed font-semibold">
                  Bacalah studi kasus yang tersedia pada setiap level dengan teliti.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-forest-900/40 border border-forest-850 p-6 rounded-2xl text-left hover:border-lutung-orange/40 transition duration-205 shadow-lg flex flex-col justify-between reveal-element delay-300">
              <div className="space-y-3">
                <span className="w-8 h-8 bg-[#ffbe0b] text-forest-950 font-bold rounded-full flex items-center justify-center text-sm font-mono shadow-md">3</span>
                <p className="text-base text-slate-200 leading-relaxed font-semibold">
                  Kerjakan setiap misi sesuai petunjuk pada level tersebut.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-forest-900/40 border border-forest-850 p-6 rounded-2xl text-left hover:border-lutung-orange/40 transition duration-205 shadow-lg flex flex-col justify-between reveal-element delay-400">
              <div className="space-y-3">
                <span className="w-8 h-8 bg-[#ffbe0b] text-forest-950 font-bold rounded-full flex items-center justify-center text-sm font-mono shadow-md">4</span>
                <p className="text-base text-slate-200 leading-relaxed font-semibold">
                  Jawab pertanyaan berdasarkan hasil pengamatan dan analisismu.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="bg-forest-900/40 border border-forest-850 p-6 rounded-2xl text-left hover:border-lutung-orange/40 transition duration-205 shadow-lg flex flex-col justify-between reveal-element delay-500">
              <div className="space-y-3">
                <span className="w-8 h-8 bg-[#ffbe0b] text-forest-950 font-bold rounded-full flex items-center justify-center text-sm font-mono shadow-md">5</span>
                <p className="text-base text-slate-200 leading-relaxed font-semibold">
                  Selesaikan seluruh level secara berurutan.
                </p>
              </div>
            </div>

            {/* Step 6 */}
            <div className="bg-forest-900/40 border border-forest-850 p-6 rounded-2xl text-left hover:border-lutung-orange/40 transition duration-205 shadow-lg flex flex-col justify-between reveal-element delay-[600ms]">
              <div className="space-y-3">
                <span className="w-8 h-8 bg-[#ffbe0b] text-forest-950 font-bold rounded-full flex items-center justify-center text-sm font-mono shadow-md">6</span>
                <p className="text-base text-slate-200 leading-relaxed font-semibold">
                  Setelah menyelesaikan semua level, lihat skor, badge yang diperoleh, dan refleksi pembelajaran.
                </p>
              </div>
            </div>

          </div>

          {/* Tips Banner */}
          <div className="bg-amber-950/40 border border-lutung-orange/30 p-6 sm:p-8 rounded-3xl text-left max-w-4xl mx-auto mt-10 relative overflow-hidden reveal-element">
            <div className="absolute -right-6 -bottom-6 opacity-10 text-8xl select-none">💡</div>
            <div className="flex items-start gap-4">
              <span className="text-3xl shrink-0 select-none">💡</span>
              <div className="space-y-1.5">
                <h4 className="font-display font-bold text-lg text-[#ffbe0b]">Tips:</h4>
                <p className="text-base text-amber-100/90 leading-relaxed font-semibold">
                  Bacalah setiap informasi dengan cermat. Tidak semua masalah memiliki satu jawaban yang sama. Berikan alasan yang logis berdasarkan konsep IPA dan kondisi pada studi kasus.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. SECTION: SEKILAS TENTANG LUTUNG JAWA */}
      <section id="sekilas-lutung" className="w-full bg-[#f6f5ee] text-forest-950 py-16 px-6 rounded-b-[50px] shadow-inner relative z-20">
        <div className="max-w-6xl mx-auto space-y-12">
          
          {/* Section Heading */}
          <div className="text-center space-y-2 reveal-element">
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-forest-950 flex items-center justify-center gap-2">
              <span>🦍 Profil Lutung Jawa</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-500 font-display italic">
              (Trachypithecus auratus)
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Visual Column */}
            <div className="flex-1 flex items-center justify-center reveal-element">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-8 border-white shadow-2xl overflow-hidden group">
                <img 
                  src="/lutung_circle.png" 
                  alt="Profil Lutung Jawa" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <span className="text-white font-display text-sm font-semibold tracking-wider">Sahabat Hutan Kita</span>
                </div>
              </div>
            </div>

            {/* Right Information Column */}
            <div className="flex-1 w-full space-y-6 reveal-element delay-200">
              
              {/* Card 1: Persebaran */}
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-500/10 p-5 rounded-2xl shadow-md hover:shadow-lg transition">
                <h4 className="font-display font-bold text-base sm:text-lg text-forest-900 flex items-center gap-2">
                  <span className="text-lg">🌍</span> Persebaran
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed font-semibold text-justify">
                  Lutung Jawa merupakan satwa endemik Indonesia yang hidup di Pulau Jawa, Bali, dan sebagian Pulau Lombok. Satwa ini banyak ditemukan di kawasan hutan yang masih memiliki vegetasi yang baik.
                </p>
              </div>

              {/* Card 2: Habitat */}
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-500/10 p-5 rounded-2xl shadow-md hover:shadow-lg transition">
                <h4 className="font-display font-bold text-base sm:text-lg text-forest-900 flex items-center gap-2">
                  <span className="text-lg">🌳</span> Habitat
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed font-semibold text-justify">
                  Lutung Jawa hidup di hutan hujan tropis, hutan pegunungan, hutan mangrove, dan hutan jati. Mereka menghabiskan sebagian besar waktunya di atas pohon untuk mencari makan, beristirahat, dan berlindung.
                </p>
              </div>

              {/* Card 3: Makanan */}
              <div className="bg-white/80 backdrop-blur-sm border border-emerald-500/10 p-5 rounded-2xl shadow-md hover:shadow-lg transition">
                <h4 className="font-display font-bold text-base sm:text-lg text-forest-900 flex items-center gap-2">
                  <span className="text-lg">🍃</span> Makanan
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed font-semibold">
                  Lutung Jawa termasuk hewan herbivor. Makanan utamanya adalah:
                </p>
                <div className="grid grid-cols-2 gap-2 mt-3 pl-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-semibold">
                    <span className="text-emerald-500 text-xs">●</span> Daun muda
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-semibold">
                    <span className="text-emerald-500 text-xs">●</span> Buah-buahan
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-semibold">
                    <span className="text-emerald-500 text-xs">●</span> Bunga
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-semibold">
                    <span className="text-emerald-500 text-xs">●</span> Tunas dan biji
                  </div>
                </div>
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
              <span className="text-2xl">🐒</span>
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
              <li className="flex gap-3 text-lg pt-1">
                <span className="cursor-pointer hover:text-white">📷</span>
                <span className="cursor-pointer hover:text-white">🎥</span>
                <span className="cursor-pointer hover:text-white">💬</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="max-w-6xl mx-auto pt-8 mt-8 border-t border-forest-900 text-center text-[10px] text-slate-500">
          <p>© 2026 Lutung Jawa. All rights reserved.</p>
        </div>
      </footer>

    </div>
  )
}
