import React from 'react'

export default function RoleSelection({ setScreen }) {
  return (
    <div className="max-w-2xl mx-auto w-full space-y-8 text-center py-8 animate-fade-in">
      <div className="space-y-2">
        <h3 className="text-3xl font-display font-extrabold text-white">Pilih Peran Anda</h3>
        <p className="text-sm text-slate-400">Silakan pilih peran untuk memulai alur pembelajaran</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Option Teacher */}
        <div 
          onClick={() => setScreen('teacher-setup')}
          className="group cursor-pointer bg-forest-900/30 hover:bg-forest-900/60 border border-forest-800 hover:border-lutung-orange/50 p-8 rounded-2xl text-left transition-all duration-300 transform hover:-translate-y-2 shadow-xl"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">👨‍🏫</div>
          <h4 className="text-xl font-display font-bold text-white mb-2">Saya adalah GURU</h4>
          <p className="text-xs text-slate-350 leading-relaxed">
            Membuat kelas baru, memperoleh kode kelas, dan memantau jalannya diskusi & keputusan kelompok siswa secara real-time.
          </p>
        </div>

        {/* Option Student */}
        <div 
          onClick={() => setScreen('student-setup')}
          className="group cursor-pointer bg-forest-900/30 hover:bg-forest-900/60 border border-forest-800 hover:border-lutung-orange/50 p-8 rounded-2xl text-left transition-all duration-300 transform hover:-translate-y-2 shadow-xl"
        >
          <div className="text-4xl mb-4 group-hover:scale-110 transition duration-300">👥</div>
          <h4 className="text-xl font-display font-bold text-white mb-2">Kami adalah KELOMPOK MURID</h4>
          <p className="text-xs text-slate-355 leading-relaxed">
            Bergabung menggunakan kode kelas, mendiskusikan materi, menginput argumen individu, serta menyepakati keputusan kelompok.
          </p>
        </div>
      </div>

      <button 
        onClick={() => setScreen('landing')}
        className="text-xs text-slate-400 hover:text-white underline cursor-pointer mt-4"
      >
        Kembali ke halaman awal
      </button>
    </div>
  )
}
