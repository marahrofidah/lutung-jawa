import React from 'react'
import imgGuru from '../assets/guru.png'
import imgMurid from '../assets/murid.png'

export default function RoleSelection({ setScreen }) {
  return (
    <div className="w-full relative min-h-[85vh] flex flex-col justify-between py-6 animate-fade-in text-forest-950 px-4 md:px-8 max-w-5xl mx-auto">
      
      {/* Decorative Forest Leaves in Corners for added parallax depth */}
      <div className="absolute -top-4 -left-12 text-4xl opacity-20 pointer-events-none select-none animate-float hidden lg:block">🌿</div>
      <div className="absolute -bottom-4 -right-12 text-5xl opacity-20 pointer-events-none select-none animate-float hidden lg:block" style={{ animationDelay: '-2s' }}>🌴</div>
      <div className="absolute top-1/4 -right-16 text-3xl opacity-15 pointer-events-none select-none animate-float hidden lg:block" style={{ animationDelay: '-4s' }}>🍃</div>
      <div className="absolute bottom-1/3 -left-16 text-4xl opacity-15 pointer-events-none select-none animate-float hidden lg:block" style={{ animationDelay: '-1s' }}>🍀</div>

      {/* Floating Back Button (Top-Left Fixed, matching mockup and breaking out of max-w-7xl container) */}
      <button 
        onClick={() => setScreen('landing')}
        className="fixed top-6 left-6 md:left-10 lg:left-12 z-30 flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-bold px-5 py-2.5 rounded-full shadow-md transition duration-155 cursor-pointer text-xl"
      >
        <span className="text-wrap font-semibold"></span>Kembali ke Beranda
      </button>

      {/* Main Title Area (Centered, styled matching mockup) */}
      <div className="text-center space-y-1 mb-10 mt-14 md:mt-10 select-none">
        <h3 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight flex items-center justify-center gap-2">
          <span className="text-[#165c43]">Pilih</span> <span className="text-[#ffbe0b]">Peranmu</span>
        </h3>
        <p className="text-xs sm:text-2xl text-slate-500 font-bold tracking-wide">
          Siapa kamu hari ini?
        </p>
      </div>

      {/* Cards Grid (Clean vertical cards with hexagon badges) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto w-full items-stretch relative z-10 px-4 mb-20">
        
        {/* Option Teacher */}
        <div 
          onClick={() => setScreen('teacher-setup')}
          className="bg-white rounded-[28px] p-6 pb-8 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-100/50 flex flex-col justify-between items-center relative text-center min-h-[400px] md:min-h-[420px] w-full max-w-[330px] mx-auto group transition-all duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.28)] hover:-translate-y-1.5 hover:scale-[1.02] cursor-pointer"
        >
          {/* Hexagon Badge (Polygon Clip-path, matching mockup) */}
          <div 
            className="absolute top-5 right-5 w-11 h-11 bg-[#072a1d] flex items-center justify-center shadow-md select-none transition-transform duration-300 group-hover:scale-105"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          >
            {/* School/Board Icon */}
            <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          </div>

          {/* Illustration Container */}
          <div className="w-full flex items-center justify-center py-4 flex-1">
            <img src={imgGuru} alt="Guru Illustration" className="h-32 md:h-36 object-contain select-none transition-transform duration-300 group-hover:scale-105" />
          </div>

          {/* Card Info */}
          <div className="space-y-1 flex flex-col items-center mb-4">
            <h4 className="text-2xl font-display font-extrabold text-[#165c43]">Guru</h4>
            {/* Leaf divider */}
            <div className="text-center select-none py-1">
            </div>
            <p className="text-slate-500 text-wrap font-semibold leading-relaxed px-1 max-w-[240px]">
              Kelola kelas, pantau progres kelompok, dan lihat jawaban mereka secara real-time.
            </p>
          </div>

          {/* CTA Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setScreen('teacher-setup');
            }}
            className="w-full mt-4 bg-[#072a1d] hover:bg-[#0c402c] text-amber-400 font-extrabold py-3 px-6 rounded-full flex items-center justify-center gap-2 transition duration-200 cursor-pointer font-sans text-xl shadow-md"
          >
            <span>Masuk sebagai Guru</span>
          </button>
        </div>

        {/* Option Student */}
        <div 
          onClick={() => setScreen('student-setup')}
          className="bg-white rounded-[28px] p-6 pb-8 shadow-[0_20px_50px_rgba(0,0,0,0.18)] border border-slate-100/50 flex flex-col justify-between items-center relative text-center min-h-[400px] md:min-h-[420px] w-full max-w-[330px] mx-auto group transition-all duration-300 hover:shadow-[0_30px_60px_rgba(0,0,0,0.28)] hover:-translate-y-1.5 hover:scale-[1.02] cursor-pointer"
        >
          {/* Hexagon Badge (Polygon Clip-path, matching mockup) */}
          <div 
            className="absolute top-5 right-5 w-11 h-11 bg-[#ffbe0b] flex items-center justify-center shadow-md select-none transition-transform duration-300 group-hover:scale-105"
            style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
          >
            {/* Group icon */}
            <svg className="w-4.5 h-4.5 text-forest-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>

          {/* Illustration Container */}
          <div className="w-full flex items-center justify-center py-4 flex-1">
            <img src={imgMurid} alt="Murid Illustration" className="h-32 md:h-36 object-contain select-none transition-transform duration-300 group-hover:scale-105" />
          </div>

          {/* Card Info */}
          <div className="space-y-1.5 flex flex-col items-center mb-4">
            <h4 className="text-2xl font-display font-extrabold text-[#ffbe0b]">Murid</h4>
            {/* Leaf divider */}
            <div className="text-center select-none py-1">
            </div>
            <p className="text-slate-500 text-wrap font-semibold leading-relaxed px-1 max-w-[240px]">
              Bergabung dengan kelas, diskusi, dan selesaikan misi bersama kelompokmu!
            </p>
          </div>

          {/* CTA Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setScreen('student-setup');
            }}
            className="w-full mt-4 bg-[#ffbe0b] hover:bg-[#ffa700] text-forest-950 font-black py-3.5 px-6 rounded-full flex items-center justify-center gap-2 transition duration-200 cursor-pointer font-sans text-xl shadow-md"
          >
            <span>Masuk sebagai Murid</span>
          </button>
        </div>

      </div>

    </div>
  )
}
