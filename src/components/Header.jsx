import React from 'react'

export default function Header({ dbConnected, screen, handleLogout, setScreen }) {
  const isCream = screen === 'role-selection' || screen === 'teacher-setup' || screen === 'student-setup';

  return (
    <header className="border-b border-[#02462e]/20 bg-[#02462e] sticky top-0 z-40 px-6 py-4 flex items-center justify-between text-white shadow-md">
      <div 
        className="flex items-center gap-3 cursor-pointer select-none" 
        onClick={() => {
          if (screen === 'landing' || screen === 'role-selection' || screen === 'teacher-setup' || screen === 'student-setup') {
            setScreen('landing')
          }
        }}
      >
        {/* Stylized vector leaf icon representing Wira Lutung conservation */}
        <div className="text-left">
          <h1 className="font-display font-extrabold text-3xl tracking-tight flex items-center gap-2 text-white">
            Lutung Jawa
          </h1>
          <p className="text-[14px] font-extrabold tracking-widest text-[#fec700]">Edukasi Konservasi</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Exit Button for active play/dashboard */}
        {(screen === 'teacher-dashboard' || screen === 'student-playroom') && (
          <button 
            onClick={handleLogout}
            className="text-xl font-extrabold bg-[#fec700] hover:bg-[#ffd000] text-[#02462e] px-4 py-2 rounded-xl transition duration-150 shadow-sm cursor-pointer border-none"
          >
            Keluar Sesi
          </button>
        )}
      </div>
    </header>
  )
}
