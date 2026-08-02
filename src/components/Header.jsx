import React from 'react'
import imgDaun from '../assets/daun.png'

export default function Header({ dbConnected, screen, handleLogout, setScreen }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)]">
      <header className="px-6 pt-4 pb-7 flex items-center justify-between bg-[#02462e] text-white header-torn-bottom">
        <div 
          className="flex items-center gap-3 cursor-pointer select-none" 
          onClick={() => {
            if (screen === 'landing' || screen === 'role-selection' || screen === 'teacher-setup' || screen === 'student-setup') {
              setScreen('landing')
            }
          }}
        >
          
          {/* Stylized text logo */}
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
              className="text-xl font-extrabold bg-[#fec700] hover:bg-[#ffd000] text-[#02462e] px-4 py-2 rounded-xl transition duration-150 shadow-md cursor-pointer border-none mr-2"
            >
              Keluar Sesi
            </button>
          )}
        </div>
      </header>
    </div>
  )
}
