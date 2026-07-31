import React, { useState } from 'react'

export default function LandingPage({ setScreen }) {
  const [activeTab, setActiveTab] = useState('petunjuk')

  return (
    <div className="max-w-4xl mx-auto w-full text-center space-y-12 py-8 animate-fade-in">
      <div className="space-y-4">
        <span className="text-xs font-bold text-lutung-orange font-mono bg-lutung-orange/10 px-3 py-1 rounded-full uppercase tracking-wider">
          Edukasi Interaktif Abad 21
        </span>
        <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white leading-tight">
          Selamatkan <span className="text-transparent bg-clip-text bg-gradient-to-r from-lutung-orange to-lutung-amber">Lutung Jawa</span>,<br />
          Mulai Dari Kelompokmu!
        </h2>
        <p className="text-slate-305 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
          Platform pembelajaran kolaboratif real-time mengenai konservasi Lutung Jawa (*Trachypithecus auratus*). Selesaikan tantangan dan kumpulkan lencana konservasi bersama tim Anda!
        </p>
      </div>

      {/* Main Action Button */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button 
          onClick={() => setScreen('role-selection')}
          className="w-full sm:w-auto px-8 py-4 bg-lutung-orange hover:bg-lutung-orange/90 text-white font-bold rounded-xl shadow-lg shadow-lutung-orange/20 transition-all transform hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-3"
        >
          <span>Mulai Bermain</span>
          <span className="text-xl">➔</span>
        </button>
      </div>

      {/* TAB SYSTEM: PETUNJUK vs PROFIL */}
      <div className="bg-forest-900/40 backdrop-blur-md rounded-2xl border border-forest-850 p-6 sm:p-8 text-left space-y-6">
        <div className="flex border-b border-forest-800 gap-4">
          <button 
            onClick={() => setActiveTab('petunjuk')}
            className={`pb-3 font-display font-bold text-sm sm:text-base border-b-2 transition duration-200 cursor-pointer ${
              activeTab === 'petunjuk' ? 'border-lutung-orange text-lutung-orange' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            📖 Petunjuk Penggunaan
          </button>
          <button 
            onClick={() => setActiveTab('profil')}
            className={`pb-3 font-display font-bold text-sm sm:text-base border-b-2 transition duration-200 cursor-pointer ${
              activeTab === 'profil' ? 'border-lutung-orange text-lutung-orange' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            🌳 Mengenal Lutung Jawa
          </button>
        </div>

        {/* Tab 1: Petunjuk */}
        {activeTab === 'petunjuk' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-forest-950/60 p-5 rounded-xl border border-forest-800/80">
              <span className="text-3xl block mb-3">👨‍🏫</span>
              <h4 className="font-bold text-white mb-2 font-display">1. Guru Membuat Kelas</h4>
              <p className="text-xs text-slate-350 leading-relaxed">
                Guru masuk sebagai role Guru, menginput nama, membuat kelas, dan mendapatkan **Kode Kelas** unik untuk dibagikan ke murid.
              </p>
            </div>
            <div className="bg-forest-950/60 p-5 rounded-xl border border-forest-800/80">
              <span className="text-3xl block mb-3">👥</span>
              <h4 className="font-bold text-white mb-2 font-display">2. Kelompok Masuk</h4>
              <p className="text-xs text-slate-355 leading-relaxed">
                Murid membentuk kelompok (satu perangkat per kelompok), lalu masuk menggunakan nama kelompok dan **Kode Kelas** dari guru.
              </p>
            </div>
            <div className="bg-forest-950/60 p-5 rounded-xl border border-forest-800/80">
              <span className="text-3xl block mb-3">🏅</span>
              <h4 className="font-bold text-white mb-2 font-display">3. Selesaikan 5 Level</h4>
              <p className="text-xs text-slate-355 leading-relaxed">
                Setiap level memiliki pengenalan materi, **jawaban individu** dari anggota, **keputusan final kelompok**, video umpan balik, dan lencana pencapaian.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Profil Lutung Jawa */}
        {activeTab === 'profil' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-300">
              <div className="space-y-3">
                <p>🌳 <strong className="text-white">Habitat:</strong> Hutan hujan tropis primer dan sekunder, hutan bakau/mangrove, serta hutan dataran tinggi.</p>
                <p>🗺️ <strong className="text-white">Sebaran:</strong> Spesies endemik Indonesia. Hanya ditemukan di Pulau Jawa, Bali, dan Lombok.</p>
                <p>🥗 <strong className="text-white">Makanan:</strong> Daun-daunan (terutama daun muda), kuncup bunga, buah-buahan, biji, dan nektar.</p>
              </div>
              <div className="space-y-3">
                <p>🔴 <strong className="text-white">Status IUCN:</strong> *Vulnerable* (Rentan). Masuk dalam daftar satwa yang terancam punah.</p>
                <p>🔥 <strong className="text-white">Ancaman Terbesar:</strong> Deforestasi hutan, fragmentasi habitat, dan perburuan liar untuk perdagangan ilegal peliharaan.</p>
                <p>✨ <strong className="text-white">Fakta Unik:</strong> Bayi Lutung Jawa lahir dengan rambut berwarna oranye terang benderang yang akan berubah hitam pekat setelah 3-5 bulan.</p>
              </div>
            </div>
            <div className="bg-lutung-orange/10 border border-lutung-orange/30 p-4 rounded-xl text-xs text-slate-350 flex items-center gap-3">
              <span className="text-2xl">💡</span>
              <p>
                Tahukah kamu? Nama ilmiah Lutung Jawa adalah <strong>Trachypithecus auratus</strong>. Di alam bebas, mereka hidup berkoloni dengan sistem sosial dominasi jantan tunggal (harem).
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
