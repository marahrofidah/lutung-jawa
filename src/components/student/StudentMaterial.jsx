import React, { useState } from 'react'
import imgLv1 from '../../assets/lv-1.png'
import imgTaukah from '../../assets/taukah.png'

export default function StudentMaterial({ currentLvlData, onNext }) {
  const isLevel1 = Number(currentLvlData?.level) === 1

  // Interactive hotspots states for Level 1
  const [activeInfo, setActiveInfo] = useState(null)
  const [discovered, setDiscovered] = useState([])

  const hotspots = {
    lutung: {
      id: 'lutung',
      index: 1,
      name: 'Lutung Jawa',
      type: 'Biotik (Makhluk Hidup)',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Lutung Jawa merupakan primata endemik Pulau Jawa yang berperan sebagai konsumen primer. Satwa ini memakan daun muda, buah, bunga, dan biji. Lutung Jawa bergantung pada hutan yang sehat untuk mendapatkan makanan, tempat tinggal, dan perlindungan.',
      top: '33%',
      left: '70%'
    },
    ficus: {
      id: 'ficus',
      index: 2,
      name: 'Pohon Ficus (Pohon Ara)',
      type: 'Biotik (Makhluk Hidup)',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Pohon Ficus menghasilkan buah yang menjadi salah satu sumber makanan penting bagi Lutung Jawa dan berbagai satwa lainnya. Pohon ini juga membantu menjaga keseimbangan ekosistem hutan dengan menyediakan makanan sepanjang tahun.',
      top: '42%',
      left: '42%'
    },
    pohon: {
      id: 'pohon',
      index: 3,
      name: 'Pohon Besar',
      type: 'Biotik (Makhluk Hidup)',
      color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Pohon-pohon besar menjadi tempat berlindung, beristirahat, dan berpindah bagi Lutung Jawa. Kanopi pohon yang saling terhubung memudahkan lutung bergerak tanpa harus turun ke tanah.',
      top: '55%',
      left: '82%'
    },
    sungai: {
      id: 'sungai',
      index: 4,
      name: 'Sungai',
      type: 'Abiotik (Benda Tak Hidup)',
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      description: 'Sungai menyediakan air yang dibutuhkan oleh tumbuhan, hewan, dan makhluk hidup lainnya. Air juga membantu menjaga kelembapan lingkungan sehingga ekosistem tetap seimbang.',
      top: '78%',
      left: '25%'
    },
    matahari: {
      id: 'matahari',
      index: 5,
      name: 'Cahaya Matahari',
      type: 'Abiotik (Benda Tak Hidup)',
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      description: 'Cahaya matahari merupakan sumber energi bagi tumbuhan untuk melakukan fotosintesis. Hasil fotosintesis menghasilkan makanan dan oksigen yang dibutuhkan oleh makhluk hidup lainnya.',
      top: '10%',
      left: '10%'
    },
    tanah: {
      id: 'tanah',
      index: 6,
      name: 'Tanah',
      type: 'Abiotik (Benda Tak Hidup)',
      color: 'bg-blue-100 text-blue-800 border-blue-300',
      description: 'Tanah menjadi tempat tumbuh berbagai jenis tumbuhan. Selain menyediakan unsur hara dan air, tanah juga menjadi habitat bagi banyak organisme kecil yang membantu menjaga kesuburannya.',
      top: '90%',
      left: '58%'
    }
  }

  const handleHotspotClick = (key) => {
    setActiveInfo(hotspots[key])
    if (!discovered.includes(key)) {
      setDiscovered([...discovered, key])
    }
  }

  const allDiscovered = discovered.length === 6

  if (isLevel1) {
    return (
      <div className="space-y-6 py-4 animate-scale-up text-left max-w-6xl mx-auto font-sans">
        
        {/* Title and Instruction Card */}
        <div className="paper-container-shadow">
          <div className="card-paper-green paper-rough-1 px-8 sm:px-12 py-5 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[12px] font-sans bg-[#02462e] text-[#fec700] border border-[#fec700]/30 px-3 py-1 rounded-lg font-extrabold tracking-wider">
                Tahap 1: Materi Pembelajaran
              </span>
              <h4 className="font-display font-black text-2xl text-[#02462e] mt-1.5 flex items-center gap-2">
                <span>Eksplorasi Habitat</span>
              </h4>
            </div>
            
            {/* Progress Badge */}
            <div className="bg-[#02462e] text-[#fec700] font-black text-xl px-4 py-2.5 rounded-xl flex items-center gap-2 border border-[#fec700]/20 w-max shadow-inner">
              <span>Info Ditemukan:</span>
              <span className="bg-black/20 px-2 py-0.5 rounded-lg font-mono text-xl">{discovered.length}/6</span>
            </div>
          </div>
        </div>

        {/* Workspace: Image Map (Left) & Notebook detail (Right) */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">
          
          {/* Left Clipboard: Responsive Hotspot Map */}
          <div className="w-full lg:w-3/5 paper-container-shadow">
            <div className="card-paper paper-rough-2 p-4 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
              
              {/* Binder clip overlay */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-slate-350 rounded-b-xl border-b border-slate-400 shadow-inner z-10 flex items-center justify-center">
                <div className="w-10 h-1.5 bg-slate-500 rounded-full"></div>
              </div>
              
              {/* Interactive Image Container */}
              <div className="relative w-full rounded-xl overflow-hidden border border-slate-200 shadow-md bg-emerald-950 mt-4 select-none">
                <img 
                  src={imgLv1} 
                  alt="Habitat Lutung Jawa" 
                  className="w-full h-auto object-cover opacity-90"
                />
                
                {/* Overlay Hotspots */}
                {Object.keys(hotspots).map((key) => {
                  const h = hotspots[key]
                  const isClicked = discovered.includes(key)
                  const isActive = activeInfo?.id === key
                  
                  return (
                    <button
                      key={h.id}
                      onClick={() => handleHotspotClick(key)}
                      className={`absolute w-9 h-9 rounded-full border-2 border-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-125 cursor-pointer z-30 ${
                        isActive
                          ? 'bg-[#fec700] text-[#02462e] scale-110 ring-4 ring-[#fec700]/30'
                          : isClicked
                            ? 'bg-[#02462e] text-[#fec700] opacity-80'
                            : 'bg-rose-600 text-white animate-bounce'
                      }`}
                      style={{ top: h.top, left: h.left }}
                    >
                      {/* Bouncing radar ring */}
                      {!isClicked && (
                        <span className="absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75 animate-ping"></span>
                      )}
                      
                      {isClicked ? (
                        <svg className="w-5 h-5 font-black" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span className="font-display font-black text-sm">{h.index}</span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Clipboard: Rule notebook page containing details */}
          <div className="w-full lg:w-2/5 paper-container-shadow flex flex-col justify-between">
            <div className="card-paper-yellow paper-rough-1 p-6 pl-9 pt-8 relative overflow-hidden shadow-xl min-h-[400px] flex flex-col justify-between">
              
              {/* Spiral rings on the left edge */}
              <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-around py-6 z-20 pointer-events-none">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-5 h-1.5 bg-gradient-to-r from-slate-400 via-slate-350 to-slate-200 rounded-full border border-slate-500 shadow-sm -ml-2.5"
                    style={{ transform: 'rotate(-4deg)' }}
                  ></div>
                ))}
              </div>
              
              {/* Notepad content */}
              <div className="space-y-4 text-left">
                {activeInfo ? (
                  /* Info Display */
                  <div className="space-y-4 animate-scale-up">
                    <div className="flex items-center gap-3 border-b border-[#02462e]/10 pb-3.5">
                      <span className="text-3xl select-none">{activeInfo.emoji}</span>
                      <div>
                        <h5 className="font-display font-black text-xl text-[#02462e]">{activeInfo.name}</h5>
                        <span className={`inline-block text-[9px] font-sans font-extrabold uppercase px-2.5 py-0.5 rounded-full border mt-1 ${activeInfo.color}`}>
                          {activeInfo.type}
                        </span>
                      </div>
                    </div>
                    
                    <p 
                      className="text-slate-800 text-sm leading-relaxed text-justify font-semibold"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(2, 70, 46, 0.08) 1px, transparent 1px)',
                        backgroundSize: '100% 28px',
                        lineHeight: '28px',
                        paddingTop: '2px'
                      }}
                    >
                      {activeInfo.description}
                    </p>
                  </div>
                ) : (
                  /* Instruction/Guideline */
                  <div className="space-y-5 py-8 text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-amber-100 flex items-center justify-center text-amber-700 animate-pulse border border-amber-200">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.000 12.000a3.000 3.000 0 11-6.000 0 3.000 3.000 0 016.000 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    
                    <div className="space-y-2 max-w-xs mx-auto">
                      <h5 className="font-display font-black text-sm text-[#02462e] uppercase tracking-wider">Petunjuk Eksplorasi</h5>
                      <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                        Klik atau ketuk setiap pin merah bernomor pada ilustrasi habitat Lutung Jawa untuk mempelajari perannya dalam ekosistem.
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Bottom discovery tip */}
              {!allDiscovered && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-800 leading-relaxed font-bold text-center mt-6">
                  Temukan semua 6 komponen ekosistem di peta sebelah kiri untuk melanjutkan petualangan!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3. Lapis Lanjutan: Tahukah Kamu? Section (Only appears after discovering all 6) */}
        {allDiscovered && (
          <div className="paper-container-shadow animate-scale-up">
            <div className="card-paper-yellow paper-rough-2 border-2 border-amber-400 p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
              
              {/* Illustration and text layout */}
              
              <div className="flex-1 text-left space-y-2">
                <h5 className="font-display font-black text-[#02462e] text-lg flex items-center gap-1.5">
                  <span>Tahukah Kamu?</span>
                </h5>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-bold italic">
                  Semua komponen di dalam ekosistem saling berhubungan. Komponen biotik membutuhkan komponen abiotik untuk bertahan hidup. Jika salah satu komponen terganggu, keseimbangan ekosistem juga dapat terganggu.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. Navigation trigger */}
        <div className="flex justify-end pt-4">
          <button
            onClick={onNext}
            disabled={!allDiscovered}
            className={`font-black font-black px-10 py-4 rounded-2xl shadow-lg transition duration-150 border flex items-center gap-2 text-base ${
              allDiscovered
                ? 'bg-[#02462e] hover:bg-[#fec700] text-white hover:text-[#02462e] border-[#02462e] cursor-pointer'
                : 'bg-slate-200 text-slate-400 border-slate-350 cursor-not-allowed shadow-none'
            }`}
          >
            <span>Selanjutnya</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

      </div>
    )
  }

  // Fallback for Level 2, 3, 4, 5 Standard text materials
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 animate-scale-up text-left">
      <div className="paper-container-shadow">
        <div className="card-paper-green paper-rough-1 p-6 sm:p-10 relative overflow-hidden space-y-6">
          <div className="border-b border-[#02462e]/10 pb-4">
            <span className="text-[10px] font-sans bg-emerald-100 text-emerald-800 border border-emerald-300/40 px-3 py-1 rounded-lg font-extrabold tracking-wider">
              Tahap 1: Matei Pembelajaran
            </span>
            <h4 className="font-display font-black text-2xl sm:text-3xl text-[#02462e] mt-3">
              {currentLvlData.theme}
            </h4>
          </div>

          <p className="text-slate-700 text-base sm:text-lg leading-relaxed text-justify font-medium">
            {currentLvlData.material}
          </p>

          <div className="pt-4 border-t border-[#02462e]/10 flex justify-end">
            <button
              onClick={onNext}
              className="bg-[#02462e] hover:bg-[#fec700] text-white hover:text-[#02462e] font-display font-black px-8 py-3.5 rounded-2xl shadow-md transition duration-150 cursor-pointer border border-[#02462e] flex items-center gap-2 text-sm sm:text-base"
            >
              <span>Selanjutnya</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
