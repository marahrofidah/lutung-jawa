import React, { useState } from 'react'

export default function LandingPage({ setScreen }) {
  // Helper to scroll smoothly to a section ID
  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="w-full text-slate-100 flex flex-col font-sans -mx-4 sm:-mx-6 lg:-mx-8">
      
      {/* 1. CUSTOM LANDING HEADER */}
      <header className="w-full px-6 py-4 flex items-center justify-between bg-forest-950/40 backdrop-blur-md sticky top-0 z-40 border-b border-forest-900/50">
        <div className="flex items-center gap-3 cursor-pointer select-none">
          <span className="text-3xl">🐒</span>
          <div>
            <h1 className="font-display font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
              LUTUNG JAWA
            </h1>
            <p className="text-[10px] text-emerald-400 font-mono tracking-widest uppercase">Edukasi Konservasi</p>
          </div>
        </div>

        {/* Hanging Wooden Signs Navigation */}
        <div className="hidden md:flex items-start gap-6 select-none relative -mt-3">
          {/* Hanging sign 1: Petunjuk */}
          <div className="flex flex-col items-center group">
            <div className="w-[1.5px] h-4 bg-amber-800/80 mb-[-1px]"></div>
            <button 
              onClick={() => scrollToSection('fitur-seru')}
              className="bg-amber-900/90 hover:bg-amber-800 border-2 border-amber-950 text-amber-100 hover:text-white px-4 py-2 rounded-xl text-xs font-bold font-display shadow-lg hover:shadow-xl transition-all transform hover:translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <span>📖</span>
              <span>Petunjuk</span>
            </button>
          </div>

          {/* Hanging sign 2: Profil */}
          <div className="flex flex-col items-center group">
            <div className="w-[1.5px] h-4 bg-amber-800/80 mb-[-1px]"></div>
            <button 
              onClick={() => scrollToSection('sekilas-lutung')}
              className="bg-amber-900/90 hover:bg-amber-800 border-2 border-amber-950 text-amber-100 hover:text-white px-4 py-2 rounded-xl text-xs font-bold font-display shadow-lg hover:shadow-xl transition-all transform hover:translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <span>🌳</span>
              <span>Profil Lutung Jawa</span>
            </button>
          </div>
        </div>

        {/* Mulai Bermain CTA */}
        <div>
          <button 
            onClick={() => setScreen('role-selection')}
            className="px-5 py-2.5 bg-lutung-amber hover:bg-lutung-orange text-forest-950 hover:text-white font-bold rounded-full text-sm transition-all transform hover:scale-105 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>▶️</span>
            <span>Mulai Bermain</span>
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative px-6 py-12 md:py-24 bg-gradient-to-b from-forest-900/50 via-forest-950/20 to-transparent flex flex-col md:flex-row items-center justify-between gap-12 max-w-7xl mx-auto w-full">
        
        {/* Left Text Panel */}
        <div className="flex-1 space-y-8 text-left">
          
          {/* Floating Bubble */}
          <div className="inline-flex items-center gap-2.5 bg-white text-forest-950 px-4.5 py-2 rounded-2xl shadow-xl border border-emerald-500/20 relative animate-float">
            <span className="text-lg">👋</span>
            <div>
              <p className="text-xs font-bold font-display leading-tight">Hai, teman!</p>
              <p className="text-[10px] text-slate-500 font-semibold leading-none">Yuk bantu aku menjaga hutan!</p>
            </div>
            {/* Speech bubble pointer */}
            <div className="absolute left-6 -bottom-2 w-4 h-4 bg-white transform rotate-45 border-r border-b border-emerald-500/10"></div>
          </div>

          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-white leading-tight">
              Belajar Seru,<br />
              Selamatkan<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lutung-amber via-lutung-orange to-amber-500">Lutung Jawa!</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed">
              Belajar bersama kelompokmu melalui 5 level misi seru untuk mengenal, memahami, dan melindungi Lutung Jawa.
            </p>
          </div>

          {/* Action Button */}
          <button 
            onClick={() => setScreen('role-selection')}
            className="inline-flex items-center gap-3 px-6 py-4 bg-lutung-amber hover:bg-lutung-orange text-forest-950 hover:text-white font-extrabold rounded-full transition-all transform hover:-translate-y-1 shadow-lg shadow-lutung-amber/20 cursor-pointer"
          >
            <span>Mulai Petualangan</span>
            <span className="w-6 h-6 bg-white text-forest-950 font-bold rounded-full flex items-center justify-center text-xs">▶</span>
          </button>
        </div>

        {/* Right Media Panel */}
        <div className="flex-1 relative flex justify-center items-center">
          
          {/* Hero Illustration */}
          <div className="relative w-full max-w-[420px] aspect-square rounded-full bg-forest-900/20 border border-forest-800/40 p-4 flex items-center justify-center overflow-hidden">
            <img 
              src="/lutung_hero.png" 
              alt="Lutung Jawa Maskot" 
              className="w-4/5 object-contain relative z-10 animate-float"
            />
          </div>

          {/* Sidebar Info Board (Hanging wood style) */}
          <div className="absolute right-0 top-10 md:top-20 max-w-[200px] bg-amber-950/90 border-2 border-amber-900 text-amber-100 p-4.5 rounded-2xl shadow-2xl space-y-1.5 text-left transform rotate-2">
            <span className="text-xs font-black uppercase text-lutung-amber block font-display tracking-wide">Tahukah kamu?</span>
            <p className="text-[11px] text-slate-205 leading-relaxed font-medium">
              Lutung Jawa hanya dapat ditemukan di Pulau Jawa dan kini terancam punah.
            </p>
          </div>

        </div>
      </section>

      {/* 3. SECTION: KENAPA BELAJAR DI SINI SERU? */}
      <section id="fitur-seru" className="w-full bg-[#f6f5ee] text-forest-950 py-16 px-6 rounded-t-[50px] shadow-inner relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-2">
            <h3 className="text-3xl font-display font-extrabold text-forest-950 flex items-center justify-center gap-2">
              <span>🌿</span> Kenapa belajar di sini seru? <span>🌿</span>
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Metode interaktif berkelompok yang membuat proses pembelajaran menjadi aktif dan kolaboratif.
            </p>
          </div>

          {/* Connected Steps Grid */}
          <div className="relative grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            
            {/* Decorative Connection Line (Desktop only) */}
            <div className="hidden lg:block absolute top-14 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-emerald-700/30 z-0"></div>

            {/* Step 1: Belajar Kelompok */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10 group">
              <div className="w-20 h-20 bg-amber-100 rounded-full border-2 border-amber-200 shadow-md flex items-center justify-center text-3xl transition-transform group-hover:scale-110">
                👥
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-forest-950">Belajar Kelompok</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[160px] leading-relaxed">
                  Diskusi, berbagi ide, dan ambil keputusan bersama.
                </p>
              </div>
            </div>

            {/* Step 2: Materi Interaktif */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10 group">
              <div className="w-20 h-20 bg-emerald-100 rounded-full border-2 border-emerald-200 shadow-md flex items-center justify-center text-3xl transition-transform group-hover:scale-110">
                📖
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-forest-950">Materi Interaktif</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[160px] leading-relaxed">
                  Kenali Lutung Jawa lewat materi menarik dan mudah dipahami.
                </p>
              </div>
            </div>

            {/* Step 3: Forum Diskusi */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10 group">
              <div className="w-20 h-20 bg-amber-100 rounded-full border-2 border-amber-200 shadow-md flex items-center justify-center text-3xl transition-transform group-hover:scale-110">
                💬
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-forest-950">Forum Diskusi</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[160px] leading-relaxed">
                  Jawab soal secara individu, diskusi dalam forum kelompok.
                </p>
              </div>
            </div>

            {/* Step 4: Video Pembahasan */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10 group">
              <div className="w-20 h-20 bg-emerald-100 rounded-full border-2 border-emerald-200 shadow-md flex items-center justify-center text-3xl transition-transform group-hover:scale-110">
                🎥
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-forest-950">Video Pembahasan</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[160px] leading-relaxed">
                  Dapatkan penjelasan menarik setelah keputusan akhir.
                </p>
              </div>
            </div>

            {/* Step 5: Kumpulkan Badge */}
            <div className="flex flex-col items-center text-center space-y-4 relative z-10 group">
              <div className="w-20 h-20 bg-amber-100 rounded-full border-2 border-amber-200 shadow-md flex items-center justify-center text-3xl transition-transform group-hover:scale-110">
                🏅
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-forest-950">Kumpulkan Badge</h4>
                <p className="text-[11px] text-slate-500 mt-1 max-w-[160px] leading-relaxed">
                  Selesaikan setiap level dan dapatkan lencana keren!
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. SECTION: 5 LEVEL PETUALANGAN */}
      <section className="w-full bg-forest-950 py-16 px-6 text-center border-t border-forest-900/50">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="space-y-2">
            <h3 className="text-3xl font-display font-extrabold text-white flex items-center justify-center gap-2">
              <span>🍃</span> 5 Level Petualangan <span>🍃</span>
            </h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto">
              Selesaikan semua misi dan jadilah sahabat hutan!
            </p>
          </div>

          {/* Levels Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            
            {/* Level 1 Card */}
            <div className="bg-forest-900/40 border border-forest-850 p-5 rounded-2xl text-left space-y-4 hover:border-lutung-orange/40 transition duration-200 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="w-7 h-7 bg-lutung-amber text-forest-950 font-bold rounded-full flex items-center justify-center text-xs font-mono">1</span>
                <span className="text-[10px] text-lutung-amber font-bold font-mono tracking-wider">LEVEL 1</span>
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">Pengenalan</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Kenali Lutung Jawa lebih dekat dan pelajari sebaran habitatnya.
                </p>
              </div>
              <div className="text-2xl text-center pt-2">🐒</div>
            </div>

            {/* Level 2 Card */}
            <div className="bg-forest-900/40 border border-forest-850 p-5 rounded-2xl text-left space-y-4 hover:border-lutung-orange/40 transition duration-200 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="w-7 h-7 bg-lutung-amber text-forest-950 font-bold rounded-full flex items-center justify-center text-xs font-mono">2</span>
                <span className="text-[10px] text-lutung-amber font-bold font-mono tracking-wider">LEVEL 2</span>
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">Habitat</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Pelajari habitat Lutung Jawa di dalam rimbunnya hutan pulau Jawa.
                </p>
              </div>
              <div className="text-2xl text-center pt-2">🌳</div>
            </div>

            {/* Level 3 Card */}
            <div className="bg-forest-900/40 border border-forest-850 p-5 rounded-2xl text-left space-y-4 hover:border-lutung-orange/40 transition duration-200 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="w-7 h-7 bg-lutung-amber text-forest-950 font-bold rounded-full flex items-center justify-center text-xs font-mono">3</span>
                <span className="text-[10px] text-lutung-amber font-bold font-mono tracking-wider">LEVEL 3</span>
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">Ancaman</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Kenali ancaman besar yang mengintai kehidupan koloni mereka.
                </p>
              </div>
              <div className="text-2xl text-center pt-2">⚠️</div>
            </div>

            {/* Level 4 Card */}
            <div className="bg-forest-900/40 border border-forest-850 p-5 rounded-2xl text-left space-y-4 hover:border-lutung-orange/40 transition duration-200 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="w-7 h-7 bg-lutung-amber text-forest-950 font-bold rounded-full flex items-center justify-center text-xs font-mono">4</span>
                <span className="text-[10px] text-lutung-amber font-bold font-mono tracking-wider">LEVEL 4</span>
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">Konservasi</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Cari tahu aksi dan cara kita melestarikan keberadaan mereka.
                </p>
              </div>
              <div className="text-2xl text-center pt-2">🛡️</div>
            </div>

            {/* Level 5 Card */}
            <div className="bg-forest-900/40 border border-forest-850 p-5 rounded-2xl text-left space-y-4 hover:border-lutung-orange/40 transition duration-200 shadow-lg">
              <div className="flex justify-between items-center">
                <span className="w-7 h-7 bg-lutung-amber text-forest-950 font-bold rounded-full flex items-center justify-center text-xs font-mono">5</span>
                <span className="text-[10px] text-lutung-amber font-bold font-mono tracking-wider">LEVEL 5</span>
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-white">Aksi Nyata</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Saatnya bergerak! Lakukan langkah nyata untuk melestarikan hutan.
                </p>
              </div>
              <div className="text-2xl text-center pt-2">🏆</div>
            </div>

          </div>

        </div>
      </section>

      {/* 5. SECTION: SEKILAS TENTANG LUTUNG JAWA */}
      <section id="sekilas-lutung" className="w-full bg-[#f6f5ee] text-forest-950 py-16 px-6 rounded-b-[50px] shadow-inner relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Left Text Column */}
          <div className="flex-1 space-y-6 text-left">
            <div className="space-y-3">
              <h3 className="text-3xl font-display font-extrabold text-forest-950 flex items-center gap-2">
                Sekilas Tentang Lutung Jawa 🐒
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed text-justify">
                Lutung Jawa (*Trachypithecus auratus*) adalah primata endemik Pulau Jawa yang hidup berkelompok di rimbunnya tajuk hutan tropis. Mereka berperan penting menjaga keanekaragaman hayati dan keseimbangan ekosistem hutan melalui penyebaran biji buah-buahan secara alami.
              </p>
            </div>
            
            <button 
              onClick={() => scrollToSection('fitur-seru')}
              className="inline-flex items-center gap-2 px-5 py-3 border-2 border-forest-900 hover:bg-forest-900 text-forest-900 hover:text-white font-bold rounded-full text-xs transition duration-200 cursor-pointer"
            >
              <span>Pelajari Lebih Lanjut</span>
              <span>➔</span>
            </button>
          </div>

          {/* Right Satellite Layout Column */}
          <div className="flex-1 relative flex items-center justify-center py-6 min-h-[360px] w-full max-w-[500px]">
            
            {/* Center circular photo */}
            <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden relative z-20">
              <img src="/lutung_circle.png" alt="Detail Lutung Jawa" className="w-full h-full object-cover" />
            </div>

            {/* Satellite 1: Persebaran */}
            <div className="absolute top-2 left-6 bg-white border border-emerald-500/10 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-3 text-left max-w-[180px] z-10 hover:scale-105 transition">
              <span className="text-xl">📍</span>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Persebaran</p>
                <p className="text-[11px] font-bold text-forest-950 leading-tight">Jawa Tengah dan Jawa Timur</p>
              </div>
            </div>

            {/* Satellite 2: Habitat */}
            <div className="absolute top-4 right-6 bg-white border border-emerald-500/10 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-3 text-left max-w-[180px] z-10 hover:scale-105 transition">
              <span className="text-xl">🌲</span>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Habitat</p>
                <p className="text-[11px] font-bold text-forest-950 leading-tight">Hutan hujan tropis dan pegunungan</p>
              </div>
            </div>

            {/* Satellite 3: Status IUCN */}
            <div className="absolute bottom-6 left-2 bg-white border border-emerald-500/10 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-3 text-left max-w-[180px] z-10 hover:scale-105 transition">
              <span className="text-xl">🚨</span>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Status IUCN</p>
                <p className="text-[11px] font-bold text-rose-600 leading-tight">Endangered (Terancam Punah)</p>
              </div>
            </div>

            {/* Satellite 4: Makanan */}
            <div className="absolute bottom-4 right-2 bg-white border border-emerald-500/10 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-3 text-left max-w-[180px] z-10 hover:scale-105 transition">
              <span className="text-xl">🍃</span>
              <div>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Makanan</p>
                <p className="text-[11px] font-bold text-forest-950 leading-tight">Daun muda, buah, bunga, dan biji</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. BOTTOM CALL TO ACTION CARD */}
      <section className="px-6 py-12 max-w-6xl mx-auto w-full relative z-10">
        <div className="bg-gradient-to-r from-forest-900 to-forest-950 border border-forest-850 p-8 sm:p-12 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          
          {/* Decorative background plants */}
          <div className="absolute -left-10 -bottom-10 opacity-10 text-9xl">🌿</div>
          <div className="absolute -right-10 -top-10 opacity-10 text-9xl">🌴</div>

          {/* Left Text */}
          <div className="text-left space-y-6 relative z-10">
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                Belajar hari ini,<br />
                Selamatkan mereka <span className="text-lutung-amber">esok hari.</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-350 max-w-md leading-relaxed">
                Bersama kita jaga kelestarian hutan, bersama kita selamatkan populasi Lutung Jawa dari kepunahan.
              </p>
            </div>
            
            <button 
              onClick={() => setScreen('role-selection')}
              className="inline-flex items-center gap-3 px-6 py-3.5 bg-lutung-amber hover:bg-lutung-orange text-forest-950 hover:text-white font-extrabold rounded-full transition-all transform hover:-translate-y-0.5 shadow-lg cursor-pointer"
            >
              <span>Mulai Petualangan Sekarang</span>
              <span className="w-5 h-5 bg-white text-forest-950 font-bold rounded-full flex items-center justify-center text-[10px]">▶</span>
            </button>
          </div>

          {/* Right Mascot Illustration */}
          <div className="relative flex flex-col items-center md:items-end gap-3 z-10">
            {/* Bubble */}
            <div className="bg-amber-100 text-forest-950 px-4 py-2 rounded-2xl shadow-xl text-xs font-bold font-display relative animate-float">
              Yuk mulai dari petualangan pertamamu!
              <div className="absolute bottom-[-6px] right-8 w-3 h-3 bg-amber-100 transform rotate-45"></div>
            </div>
            {/* Mascot Avatar */}
            <div className="w-32 h-32 rounded-full border-4 border-forest-800 bg-forest-950/50 flex items-center justify-center overflow-hidden">
              <img src="/lutung_hero.png" alt="Mascot Lutung" className="w-4/5 object-contain mt-2" />
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
            <p className="leading-relaxed text-slate-450">
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
            <ul className="space-y-2 text-slate-450">
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
