import React from 'react'
import imgMurid from '../assets/murid.webp'

export default function StudentSetup({ 
  groupName, 
  setGroupName, 
  classCodeInput, 
  setClassCodeInput, 
  handleStudentJoin, 
  setScreen 
}) {
  return (
    <div className="max-w-md mx-auto w-full bg-white/90 backdrop-blur-md rounded-3xl border border-emerald-500/10 p-8 shadow-2xl space-y-6 animate-fade-in text-forest-950">
      <div className="text-center space-y-2">
        <img src={imgMurid} alt="Murid Mascot" className="w-20 h-20 mx-auto object-contain select-none mb-2" />
        <h3 className="text-2xl font-display font-extrabold text-forest-950">Gabung Bermain</h3>
        <p className="text-wrap text-slate-500 font-semibold">Masukkan nama kelompok Anda dan dapatkan Kode Kelas dari Guru Anda</p>
      </div>

      <form onSubmit={handleStudentJoin} className="space-y-4">
        <div className="space-y-2">
          <label className="text-wrap font-bold text-forest-800 tracking-wider block">Nama Kelompok</label>
          <input 
            type="text" 
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Contoh: Kelompok Harimau, Team Owa"
            className="w-full bg-[#fbf0df]/30 border border-emerald-500/20 text-forest-950 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lutung-orange focus:ring-1 focus:ring-lutung-orange/40 font-semibold"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-wrap font-bold text-forest-800 tracking-wider block">Kode Kelas</label>
          <input 
            type="text" 
            value={classCodeInput}
            onChange={(e) => setClassCodeInput(e.target.value)}
            placeholder="Contoh: LTJ-ABCD"
            className="w-full bg-[#fbf0df]/30 border border-emerald-500/20 text-forest-950 rounded-xl px-4 py-3 text-sm font-mono tracking-wider focus:outline-none focus:border-lutung-orange focus:ring-1 focus:ring-lutung-orange/40 font-semibold"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-[#ffbe0b] to-[#ffbe0b] hover:from-[#ffd000] hover:to-[#e69d00] text-emerald-950 font-black py-3.5 rounded-xl shadow-lg transition duration-200 cursor-pointer"
        >
          Masuk Kelas & Mulai Bermain
        </button>
      </form>

      <div className="text-center">
        <button 
          onClick={() => setScreen('role-selection')}
          className="text-xs text-slate-500 hover:text-forest-950 underline cursor-pointer font-bold"
        >
          Ganti Pilihan Peran
        </button>
      </div>
    </div>
  )
}
