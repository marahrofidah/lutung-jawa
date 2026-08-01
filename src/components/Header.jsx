import React from 'react'

export default function Header({ dbConnected, screen, handleLogout, setScreen }) {
  const isCream = screen === 'role-selection' || screen === 'teacher-setup' || screen === 'student-setup';

  return (
    <header className={`border-b sticky top-0 z-40 px-6 py-4 flex items-center justify-between transition-colors duration-300 ${
      isCream 
        ? 'border-emerald-500/10 bg-[#f6f5ee]/95 backdrop-blur-md text-forest-950 shadow-sm' 
        : 'border-forest-800 bg-forest-950/70 backdrop-blur-md text-white'
    }`}>
      <div 
        className="flex items-center gap-3 cursor-pointer select-none" 
        onClick={() => {
          if (screen === 'landing' || screen === 'role-selection' || screen === 'teacher-setup' || screen === 'student-setup') {
            setScreen('landing')
          }
        }}
      >
        <span className="text-3xl">🐒</span>
        <div>
          <h1 className={`font-display font-extrabold text-xl tracking-tight flex items-center gap-2 transition-colors ${
            isCream ? 'text-forest-950' : 'text-white'
          }`}>
            Wira Lutung <span className="text-xs bg-lutung-orange text-white px-2 py-0.5 rounded-full font-mono font-normal">PRO</span>
          </h1>
          <p className={`text-[10px] font-mono tracking-widest uppercase transition-colors ${
            isCream ? 'text-emerald-800' : 'text-emerald-400'
          }`}>Konservasi Real-Time</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* DB Connection Indicator */}
        <div className={`hidden sm:flex items-center gap-2 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
          isCream 
            ? 'bg-white/80 border-emerald-500/10' 
            : 'bg-forest-900/60 border-forest-800'
        }`}>
          <span className={`w-2.5 h-2.5 rounded-full inline-block ${dbConnected ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-amber-500 animate-pulse'}`}></span>
          <span className={`font-mono text-[10px] transition-colors ${isCream ? 'text-forest-900' : 'text-slate-350'}`}>{dbConnected ? 'Supabase Connected' : 'Connecting DB...'}</span>
        </div>

        {/* Exit Button for active play/dashboard */}
        {(screen === 'teacher-dashboard' || screen === 'student-playroom') && (
          <button 
            onClick={handleLogout}
            className="text-xs font-semibold bg-forest-850 hover:bg-rose-900/50 hover:border-rose-500/30 text-slate-350 hover:text-white px-3 py-1.5 rounded-lg border border-forest-800 transition duration-200 cursor-pointer"
          >
            Keluar Sesi
          </button>
        )}
      </div>
    </header>
  )
}
