import React from 'react'

export default function StudentSetup({ 
  groupName, 
  setGroupName, 
  classCodeInput, 
  setClassCodeInput, 
  handleStudentJoin, 
  setScreen 
}) {
  return (
    <div className="max-w-md mx-auto w-full bg-forest-900/40 backdrop-blur-md rounded-3xl border border-forest-850 p-8 shadow-2xl space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <span className="text-4xl animate-pulse">👥</span>
        <h3 className="text-2xl font-display font-extrabold text-white">Gabung Bermain</h3>
        <p className="text-xs text-slate-350">Masukkan nama kelompok Anda dan dapatkan Kode Kelas dari Guru Anda</p>
      </div>

      <form onSubmit={handleStudentJoin} className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Nama Kelompok</label>
          <input 
            type="text" 
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            placeholder="Contoh: Kelompok Harimau, Team Owa"
            className="w-full bg-forest-950/80 border border-forest-800 text-slate-100 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-lutung-orange focus:ring-1 focus:ring-lutung-orange/40"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">Kode Kelas</label>
          <input 
            type="text" 
            value={classCodeInput}
            onChange={(e) => setClassCodeInput(e.target.value)}
            placeholder="Masukkan 7 karakter kode kelas (Contoh: LTJ-ABCD)"
            className="w-full bg-forest-950/80 border border-forest-800 text-slate-100 rounded-xl px-4 py-3 text-sm font-mono tracking-wider focus:outline-none focus:border-lutung-orange focus:ring-1 focus:ring-lutung-orange/40"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-lutung-orange hover:bg-lutung-orange/90 text-white font-bold py-3.5 rounded-xl shadow-lg transition duration-200 cursor-pointer"
        >
          Masuk Kelas & Mulai Bermain
        </button>
      </form>

      <div className="text-center">
        <button 
          onClick={() => setScreen('role-selection')}
          className="text-xs text-slate-455 hover:text-white underline cursor-pointer"
        >
          Ganti Pilihan Peran
        </button>
      </div>
    </div>
  )
}
