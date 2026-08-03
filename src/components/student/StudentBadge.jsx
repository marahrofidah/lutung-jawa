import React, { useState, useEffect } from 'react'
import imgSobatHutan from '../../assets/sobat-hutan.webp'
import imgPecintaDaun from '../../assets/pecinta-daun.webp'

export default function StudentBadge({
  studentGroup,
  currentLvlData,
  groupDecision,
  handleNextLevel
}) {
  const isCorrect = groupDecision?.final_answer === currentLvlData.correctAnswer
  const [showCelebration, setShowCelebration] = useState(isCorrect)

  useEffect(() => {
    if (isCorrect) {
      // Play sparkle/cling chime sound
      const playChime = () => {
        const audio = new Audio('/cling.mp3')
        audio.volume = 0.5
        audio.play().catch(() => {
          // Fallback to online royalty-free chime WAV sound if local mp3 is missing
          const fallback = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-84.wav')
          fallback.volume = 0.4
          fallback.play().catch(err => console.log("Sound autoplay blocked:", err))
        })
      }
      playChime()

      // Automatically transition to the standard badge info page after 3.2 seconds
      const timer = setTimeout(() => {
        setShowCelebration(false)
      }, 3200)

      return () => clearTimeout(timer)
    }
  }, [isCorrect])

  // Custom vector badge icon renderer
  const renderBadge = (level) => {
    const colorClasses = {
      1: "text-[#02462e] bg-emerald-50 border-emerald-500/25",
      2: "text-green-700 bg-green-50 border-green-500/25",
      3: "text-amber-700 bg-amber-50 border-amber-500/25",
      4: "text-orange-700 bg-orange-50 border-orange-500/25",
      5: "text-yellow-700 bg-yellow-50 border-yellow-500/25"
    }

    const icons = {
      1: ( // Habitat - Sobat Hutan Image Badge
        <img 
          src={imgSobatHutan} 
          alt="Lencana Sobat Hutan" 
          className="w-full h-full object-contain p-1 select-none"
        />
      ),
      2: ( // Food - Leaf
        <img 
          src={imgPecintaDaun} 
          alt="Lencana Pecinta Daun" 
          className="w-full h-full object-contain p-1 select-none"
        />
      ),
      3: ( // Threat - Shield
        <svg className="w-full h-full p-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      4: ( // Social - Heart
        <svg className="w-full h-full p-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      5: ( // Rescue - Trophy
        <svg className="w-full h-full p-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" />
        </svg>
      )
    }

    if (Number(level) === 1) {
      return (
        <img 
          src={imgSobatHutan} 
          alt="Lencana Sobat Hutan" 
          className="w-28 h-28 mx-auto object-contain select-none"
        />
      )
    }

    if (Number(level) === 2) {
      return (
        <img 
          src={imgPecintaDaun} 
          alt="Lencana Pecinta Daun" 
          className="w-28 h-28 mx-auto object-contain select-none"
        />
      )
    }

    return (
      <div className={`w-28 h-28 mx-auto rounded-full border-4 flex items-center justify-center shrink-0 shadow-lg ${colorClasses[level]}`}>
        {icons[level]}
      </div>
    )
  }

  if (showCelebration) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#022c22]/95 via-[#011f18]/97 to-[#01140f]/98 backdrop-blur-lg overflow-hidden animate-fade-in">
        
        {/* Soft elegant static golden ambient glow in background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Outer card wrapping badge and text to make it feel cohesive */}
        <div className="relative z-10 flex flex-col items-center gap-8 max-w-md w-full px-6 text-center select-none">
          
          {/* Badge Container with Spring Pop-up Animation and a beautiful golden ring */}
          <div className="animate-spring-pop">
            <div className="relative p-6 rounded-full bg-white/5 border border-yellow-400/30 shadow-[0_0_50px_rgba(254,199,0,0.25)] backdrop-blur-md">
              {renderBadge(studentGroup.current_level)}
              
              {/* Corner accent sparkles (static decoration) */}
              <div className="absolute -top-1 -right-1 text-lg">✨</div>
              <div className="absolute -bottom-1 -left-1 text-lg">✨</div>
            </div>
          </div>

          {/* Text panel sliding up after a short delay */}
          <div className="space-y-3 animate-slide-up-fade opacity-0 fill-mode-forwards" style={{ animationDelay: '0.25s' }}>
            <span className="text-[11px] text-[#fec700] font-black uppercase tracking-[0.25em] font-mono block drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              Lencana Baru Diperoleh!
            </span>
            <h3 className="font-display font-black text-3xl text-white tracking-wide leading-tight drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
              {currentLvlData.badgeName}
            </h3>
            <p className="text-sm text-emerald-100/85 font-semibold max-w-sm px-4 leading-relaxed font-sans">
              {currentLvlData.badgeDescription}
            </p>
          </div>

        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6 py-4 animate-scale-up text-center">
      <div className="paper-container-shadow">
        
        {isCorrect ? (
          /* CORRECT ANSWER VIEW */
          <div className="card-paper-green paper-rough-1 p-8 sm:p-12 space-y-6 relative overflow-hidden">
            
            <div className="space-y-4">
              <h3 className="text-3xl font-display font-black text-[#02462e] tracking-tight leading-tight">
                Jawaban Benar!
              </h3>
              <p className="text-slate-655 text-sm sm:text-base font-semibold leading-relaxed max-w-md mx-auto">
                Kerja sama yang luar biasa! Kelompok Anda berhasil memecahkan tantangan sains Lutung Jawa di Level {studentGroup.current_level} ini.
              </p>
            </div>

            {/* Awarded Badge Panel */}
            <div className="py-4 space-y-4">
              {renderBadge(studentGroup.current_level)}
              
              <div className="space-y-1">
                <span className="text-[10px] text-lutung-orange font-bold uppercase tracking-wider block font-sans">
                  Lencana Diperoleh:
                </span>
                <h4 className="font-display font-black text-xl text-[#02462e]">{currentLvlData.badgeName}</h4>
                <p className="text-xs sm:text-sm text-slate-500 font-semibold max-w-sm mx-auto leading-normal">
                  {currentLvlData.badgeDescription}
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-[#02462e]/10">
              <button
                onClick={handleNextLevel}
                className="w-full bg-[#02462e] hover:bg-[#fec700] text-white hover:text-[#02462e] font-display font-black py-4 rounded-2xl shadow-md transition duration-150 cursor-pointer border border-[#02462e] text-base"
              >
                {studentGroup.current_level === 5 ? 'Selesaikan Petualangan!' : 'Lanjut ke Level Berikutnya'}
              </button>
            </div>

          </div>
        ) : (
          /* INCORRECT ANSWER VIEW */
          <div className="card-paper-yellow paper-rough-1 p-8 sm:p-12 space-y-6 relative overflow-hidden">
            
            <div className="space-y-4">
              <h3 className="text-3xl font-display font-black text-rose-700 tracking-tight leading-tight">
                Yah, Jawaban Kurang Tepat!
              </h3>
              <p className="text-slate-655 text-sm sm:text-base font-semibold leading-relaxed max-w-md mx-auto">
                Jangan berkecil hati! Jawaban kelompok Anda untuk level ini kurang tepat, sehingga kelompok Anda belum berhak mendapatkan lencana <strong>{currentLvlData.badgeName}</strong>.
              </p>
            </div>

            <div className="bg-white/80 p-5 rounded-2xl border border-amber-200/50 text-xs sm:text-sm text-slate-600 leading-relaxed font-bold max-w-md mx-auto text-left italic">
              "Tetap semangat! Pelajari pembahasan teori yang ada di video sebelumnya dengan saksama untuk mempersiapkan diri menghadapi tantangan di tingkat berikutnya."
            </div>

            <div className="pt-6 border-t border-amber-200/60">
              <button
                onClick={handleNextLevel}
                className="w-full bg-[#02462e] hover:bg-[#fec700] text-white hover:text-[#02462e] font-display font-black py-4 rounded-2xl shadow-md transition duration-150 cursor-pointer border border-[#02462e] text-base"
              >
                {studentGroup.current_level === 5 ? 'Selesaikan Petualangan!' : 'Lanjut ke Level Berikutnya'}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}
