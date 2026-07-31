import React from 'react'

export default function TeacherSetup({ teacherName, setTeacherName, handleTeacherSetup, setScreen }) {
  return (
    <div className="max-w-md mx-auto w-full bg-forest-900/40 backdrop-blur-md rounded-3xl border border-forest-850 p-8 shadow-2xl space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <span className="text-4xl">👨‍🏫</span>
        <h3 className="text-2xl font-display font-extrabold text-white">Setup Profil Guru</h3>
        <p className="text-xs text-slate-350">Masukkan nama Anda untuk masuk ke Dashboard pengelolaan kelas</p>
      </div>

      <form onSubmit={handleTeacherSetup} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Nama Guru</label>
          <input 
            type="text" 
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            placeholder="Contoh: Ibu Rina, S.Pd."
            className="w-full bg-forest-950/80 border border-forest-800 text-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lutung-orange focus:ring-1 focus:ring-lutung-orange/40"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-lutung-orange hover:bg-lutung-orange/90 text-white font-bold py-3.5 rounded-xl shadow-lg transition duration-200 cursor-pointer"
        >
          Buat Kelas Baru & Lanjut
        </button>
      </form>

      <div className="text-center">
        <button 
          onClick={() => setScreen('role-selection')}
          className="text-xs text-slate-450 hover:text-white underline cursor-pointer"
        >
          Ganti Pilihan Peran
        </button>
      </div>
    </div>
  )
}
