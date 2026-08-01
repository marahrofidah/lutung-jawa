import React from 'react'
import imgGuru from '../assets/guru.png'

export default function TeacherSetup({ teacherName, setTeacherName, handleTeacherSetup, setScreen }) {
  return (
    <div className="max-w-md mx-auto w-full bg-white/90 backdrop-blur-md rounded-3xl border border-emerald-500/10 p-8 shadow-2xl space-y-6 animate-fade-in text-forest-950">
      <div className="text-center space-y-2">
        <img src={imgGuru} alt="Guru Mascot" className="w-20 h-20 mx-auto object-contain select-none mb-2" />
        <h3 className="text-2xl font-display font-extrabold text-forest-950">Setup Profil Guru</h3>
        <p className="text-wrap text-slate-500 font-semibold">Masukkan nama Anda untuk masuk ke Dashboard pengelolaan kelas</p>
      </div>

      <form onSubmit={handleTeacherSetup} className="space-y-4">
        <div className="space-y-2">
          <label className="text-wrap font-bold text-forest-800 tracking-wider block">Nama Guru</label>
          <input 
            type="text" 
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Contoh: Ibu Rina, S.Pd."
            className="w-full bg-[#fbf0df]/30 border border-emerald-500/20 text-forest-950 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lutung-orange focus:ring-1 focus:ring-lutung-orange/40 font-semibold"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-gradient-to-r from-[#165c43] to-[#0e3b2b] hover:from-[#1b7253] hover:to-[#124d38] text-white font-extrabold py-3.5 rounded-xl shadow-lg transition duration-200 cursor-pointer"
        >
          Buat Kelas Baru & Lanjut
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
