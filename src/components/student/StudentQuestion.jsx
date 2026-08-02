import React, { useState } from 'react'

export default function StudentQuestion({
  currentLvlData,
  memberNameInput,
  setMemberNameInput,
  memberAnswerInput,
  setMemberAnswerInput,
  memberReasonInput,
  setMemberReasonInput,
  handleIndividualSubmit,
  individualAnswers,
  onStartDiscussion,
  showDiscussion
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  // Drag handlers
  const handleDragStart = (e, key) => {
    e.dataTransfer.setData('text/plain', key)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const key = e.dataTransfer.getData('text/plain')
    if (key) {
      setMemberAnswerInput(key)
    }
  }

  return (
    <div className="space-y-8 py-4 animate-scale-up text-left font-sans max-w-6xl mx-auto">
      
      {/* Case Study Reading Sheet */}
      {currentLvlData.caseStudy && (
        <div className="paper-container-shadow max-w-4xl mx-auto transform rotate-[0.4deg] hover:rotate-0 transition-transform duration-300">
          <div className="card-paper-yellow paper-rough-2 p-6 sm:p-8 space-y-5 relative overflow-hidden border-2 border-amber-300">
            {/* Red thumbtack decoration */}
            <div className="absolute top-2 left-8 w-4 h-4 bg-rose-600 rounded-full border border-white shadow-md flex items-center justify-center z-10 select-none pointer-events-none">
              <div className="w-1.2 h-1.2 bg-white/40 rounded-full"></div>
            </div>
            
            <div className="border-b border-[#02462e]/10 pb-3">
              <h4 className="font-display font-black text-xl sm:text-2xl text-[#02462e] mt-3">
                {currentLvlData.caseStudy.title}
              </h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1.5 font-sans">
                {currentLvlData.caseStudy.instruction}
              </p>
            </div>
            
            {/* Story content */}
            <div className="text-slate-800 text-sm sm:text-base leading-relaxed font-semibold space-y-4 text-justify">
              {currentLvlData.caseStudy.story.split('\n\n').map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>
            
            <div className="bg-[#02462e]/5 border-l-4 border-[#02462e] p-3 text-xs text-[#02462e] font-bold rounded-r-xl">
              {currentLvlData.caseStudy.conclusion}
            </div>
          </div>
        </div>
      )}

      {/* 1. Large Top Sheet: The Field Challenge Question */}
      <div className="paper-container-shadow max-w-4xl mx-auto transform rotate-[-0.8deg] hover:rotate-0 transition-transform duration-300">
        <div className="card-paper-green paper-rough-1 p-6 sm:p-8 space-y-4 relative overflow-hidden">
          {/* Binder Clip at the top to simulate paper board */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5.5 bg-slate-350/90 rounded-b-xl border-b border-slate-400 shadow-inner flex items-center justify-center">
            <div className="w-10 h-1.5 bg-slate-500 rounded-full"></div>
          </div>
          
          <div className="border-b border-[#02462e]/10 pb-3 pt-4">
            <span className="text-[12px] font-sans bg-[#02462e] text-[#fec700] border border-[#fec700]/30 px-3 py-1 rounded-lg font-extrabold tracking-wider">
              Tahap 2: Tantangan Utama
            </span>
            <h4 className="font-display font-black text-xl sm:text-2xl text-[#02462e] mt-3">
              Tantangan Level {currentLvlData.level}
            </h4>
          </div>
          
          <p className="text-slate-800 text-base sm:text-lg leading-relaxed font-bold">
            {currentLvlData.question}
          </p>
        </div>
      </div>

      {/* 2. Workspace: Options Stack & Form Clipboard side-by-side but scattered */}
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        
        {/* Left Side: Scattered Post-it Option Stack */}
        <div className="w-full lg:w-3/5 space-y-5">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block pl-2 font-sans">
            Pilihan Jawaban (Seret atau Ketuk Kartu):
          </span>
          
          <div className="space-y-5">
            {currentLvlData.options.map((opt, idx) => {
              const isSelected = memberAnswerInput === opt.key
              
              // Custom characteristics for each card to look like a collection of different paper scraps
              const cardStyles = [
                {
                  bgClass: 'bg-[#fcf8f2] border-l-4 border-amber-700/40',
                  clipPath: 'polygon(0% 1.5%, 98.5% 0%, 100% 98.5%, 1.5% 100%)',
                  tiltClass: 'rotate-[-1.5deg] hover:rotate-0 translate-x-1',
                  customPattern: null,
                  // Translucent sticky tape decoration
                  deco: (
                    <div 
                      className="absolute -top-2 left-1/3 w-14 h-4.5 bg-white/40 border border-white/20 backdrop-blur-[2px] shadow-sm select-none pointer-events-none z-10"
                      style={{ transform: 'rotate(-4deg)' }}
                    ></div>
                  )
                },
                {
                  bgClass: 'bg-[#f5f9f6] border-l-4 border-emerald-700/40',
                  clipPath: 'polygon(1% 0%, 100% 2%, 98.5% 98%, 0% 100%)',
                  tiltClass: 'rotate-[1.2deg] hover:rotate-0 -translate-x-1',
                  // Graph dot grid pattern
                  customPattern: {
                    backgroundImage: 'radial-gradient(#d1fae5 1.5px, transparent 1.5px)',
                    backgroundSize: '14px 14px'
                  },
                  // Steel paperclip decoration on the side
                  deco: (
                    <div 
                      className="absolute -top-3 left-8 w-3 h-8 border-2 border-slate-400 rounded-full select-none pointer-events-none z-10 bg-slate-300/10 shadow-sm"
                      style={{ transform: 'rotate(15deg)' }}
                    >
                      <div className="absolute top-1 left-0.5 right-0.5 bottom-1.5 border border-slate-400 rounded-full"></div>
                    </div>
                  )
                },
                {
                  bgClass: 'bg-[#fffdf0] border-l-4 border-yellow-500/40',
                  clipPath: 'polygon(0.5% 0.5%, 99% 1.5%, 98% 97%, 1.5% 99%)',
                  tiltClass: 'rotate-[-1deg] hover:rotate-0 translate-x-2',
                  customPattern: null,
                  // Red drawing pin decoration
                  deco: (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-rose-600 rounded-full border border-white shadow-md flex items-center justify-center z-10 select-none pointer-events-none">
                      <div className="w-1.2 h-1.2 bg-white/40 rounded-full"></div>
                    </div>
                  )
                },
                {
                  bgClass: 'bg-[#FAF7EE] border-l-4 border-amber-800/30',
                  // Jagged torn bottom edge clip path
                  clipPath: 'polygon(0% 0%, 100% 0%, 99% 91%, 96% 94%, 93.5% 90%, 90% 95%, 86.5% 91%, 83% 94%, 79% 90%, 75% 94%, 71.5% 90%, 67% 94%, 62.5% 90%, 58% 94%, 53.5% 90%, 49% 94%, 44% 90%, 39% 94%, 34.5% 90%, 30.5% 94%, 26% 90%, 21% 94%, 16.5% 90%, 12% 94%, 7% 90%, 3% 94%, 0% 91%)',
                  tiltClass: 'rotate-[2deg] hover:rotate-0 -translate-x-2',
                  customPattern: null,
                  // Small forest green pin decoration
                  deco: (
                    <div className="absolute -top-2.5 left-1/4 w-4 h-4 bg-[#02462e] rounded-full border border-[#fec700]/30 shadow-md flex items-center justify-center z-10 select-none pointer-events-none">
                      <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                    </div>
                  )
                }
              ]

              const currentStyle = cardStyles[idx % cardStyles.length]

              return (
                <div 
                  key={opt.key} 
                  draggable="true"
                  onDragStart={(e) => handleDragStart(e, opt.key)}
                  onClick={() => setMemberAnswerInput(opt.key)}
                  className={`paper-container-shadow cursor-grab active:cursor-grabbing transition-all duration-300 transform hover:-translate-y-1.5 hover:rotate-0 ${currentStyle.tiltClass} ${
                    isSelected ? 'scale-[1.01] ring-2 ring-[#fec700] rounded-xl' : ''
                  }`}
                >
                  <div 
                    className={`p-5.5 relative flex items-start gap-4 min-h-[96px] transition-colors duration-200 ${currentStyle.bgClass} ${
                      isSelected ? 'bg-emerald-50/50' : 'hover:brightness-98'
                    }`}
                    style={{ 
                      clipPath: currentStyle.clipPath,
                      ...currentStyle.customPattern
                    }}
                  >
                    {/* Metal Thumbtack/Pushpin for Selected Card */}
                    {isSelected && (
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5.5 h-5.5 bg-rose-600 rounded-full border-2 border-white shadow-md flex items-center justify-center z-25 animate-scale-up">
                        <div className="w-1.5 h-1.5 bg-amber-400 rounded-full"></div>
                      </div>
                    )}
                    
                    {/* Paper attachment decoration (tape, clip, pin) */}
                    {!isSelected && currentStyle.deco}
                    
                    {/* Grip handle & Wood log slice choice badge */}
                    <div className="flex items-center gap-2 shrink-0 relative z-10">
                      <div className="flex flex-col gap-0.5 text-slate-400/80 select-none">
                        <span className="w-1.2 h-1.2 bg-slate-400/70 rounded-full"></span>
                        <span className="w-1.2 h-1.2 bg-slate-400/70 rounded-full"></span>
                        <span className="w-1.2 h-1.2 bg-slate-400/70 rounded-full"></span>
                      </div>
                      
                      {/* Wood slice circle */}
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center shadow-inner font-display font-black text-base transition-all border-2 ${
                        isSelected 
                          ? 'bg-[#02462e] border-[#fec700] text-[#fec700] scale-105' 
                          : 'bg-[#ffbe0b] border-[#5c3a21]/20 text-[#02462e]'
                      }`}>
                        {opt.key}
                      </span>
                    </div>
                    
                    <span className="text-xs sm:text-sm text-slate-700 font-bold leading-relaxed pt-1 select-none text-left relative z-10 pr-2">
                      {opt.text}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right Side: Layered Tilted Spiral Journal Page */}
        <div className="w-full lg:w-2/5 space-y-6">
          <div className="paper-container-shadow transform rotate-[1.8deg] hover:rotate-0 transition-transform duration-300">
            <div className="card-paper-yellow paper-rough-2 p-6 pl-9 pt-8 relative overflow-hidden shadow-2xl min-h-[480px]">
              
              {/* 3D Spiral Binder Rings on the left edge */}
              <div className="absolute left-0 top-0 bottom-0 w-4 flex flex-col justify-around py-6 z-20 pointer-events-none">
                {[...Array(9)].map((_, i) => (
                  <div 
                    key={i} 
                    className="w-5.5 h-2 bg-gradient-to-r from-slate-400 via-slate-350 to-slate-200 rounded-full border border-slate-500 shadow-sm -ml-2.5"
                    style={{ transform: 'rotate(-5deg)' }}
                  ></div>
                ))}
              </div>
              
              {/* Mini decorative forest leaf icon on top right */}
              <div className="absolute top-3 right-4 opacity-15 select-none pointer-events-none">
                <svg className="w-8 h-8 text-[#02462e]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 8C8 8 4 12 3 21C6 15 11 15 15 17C18 18 20 15 21 12C22 9 20 8 17 8Z" />
                </svg>
              </div>
              
              <h4 className="font-display font-black text-2xl text-[#02462e] border-b border-[#02462e]/10 pb-3 flex items-center gap-2 pt-2">
                <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>Jawab Individu</span>
              </h4>

              <form onSubmit={handleIndividualSubmit} className="space-y-6 mt-5">
                
                {/* Name Input - Ruled Line Style */}
                <div className="space-y-1 text-left">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block font-sans">
                    Nama Anggota Kelompok
                  </label>
                  <input 
                    type="text" 
                    value={memberNameInput}
                    onChange={(e) => setMemberNameInput(e.target.value)}
                    placeholder="Masukkan nama Anda..."
                    className="w-full bg-transparent border-b-2 border-dashed border-[#02462e]/30 text-slate-800 focus:outline-none focus:border-[#02462e] py-1.5 px-1 font-sans font-extrabold text-base placeholder-slate-400"
                    required
                  />
                </div>

                {/* Dropzone with Wax Seal Display */}
                <div className="space-y-1 text-left">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block font-sans">
                    Pilihan Terpilih (Seret atau Ketuk Kartu)
                  </label>
                  
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`transition-all duration-300 rounded-2xl flex items-center justify-center min-h-[82px] p-3 border-2 ${
                      isDragOver
                        ? 'border-[#fec700] bg-[#fec700]/10 scale-102 shadow-lg border-dashed'
                        : memberAnswerInput
                          ? 'border-[#02462e]/10 bg-[#02462e]/5 border-solid'
                          : 'border-dashed border-amber-300/80 bg-amber-50/20'
                    }`}
                  >
                    {isDragOver ? (
                      <span className="text-sm text-[#02462e] font-display font-black animate-pulse">
                        📥 Lepaskan Kartu Di Sini
                      </span>
                    ) : memberAnswerInput ? (
                      <div className="flex items-center gap-3.5 w-full justify-start pl-2 animate-scale-up">
                        {/* Red Wax Stamp Seal */}
                        <div className="w-13 h-13 rounded-full bg-rose-700 text-[#fec700] border-4 border-double border-rose-500/80 flex items-center justify-center font-display font-black text-2xl shadow-lg shrink-0 transform rotate-[-6deg] hover:rotate-0 transition duration-150 select-none">
                          {memberAnswerInput}
                        </div>
                        <div className="text-left">
                          <span className="text-xs bg-rose-100 text-rose-800 border border-rose-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider block w-max">
                            Segel Sah
                          </span>
                          <span className="text-sm text-slate-700 font-bold mt-1 block">Telah dikunci di jurnal</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1 py-1">
                        <span className="text-sm text-amber-800/80 font-bold italic">
                          ✍️ Taruh jawaban di sini
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          (Seret kartu kuis atau ketuk kartu di kiri)
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Reason Textarea - Ruled Notebook Line Style */}
                <div className="space-y-1 text-left">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-wider block font-sans">
                    Alasan / Argumen Jawaban
                  </label>
                  <textarea 
                    value={memberReasonInput}
                    onChange={(e) => setMemberReasonInput(e.target.value)}
                    placeholder="Jelaskan alasan ilmiah pilihan Anda..."
                    rows="4"
                    className="w-full bg-transparent border-b-2 border-slate-350 focus:border-[#02462e] text-slate-800 focus:outline-none px-1 font-bold text-base placeholder-slate-400 resize-none"
                    style={{
                      backgroundImage: 'linear-gradient(rgba(2, 70, 46, 0.12) 1px, transparent 1px)',
                      backgroundSize: '100% 28px',
                      lineHeight: '28px',
                      paddingTop: '2px'
                    }}
                    required
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit"
                  disabled={!memberAnswerInput}
                  className={`w-full font-display font-black py-3.5 rounded-2xl text-sm transition duration-150 flex items-center justify-center gap-2 shadow-md border-2 ${
                    memberAnswerInput 
                      ? 'bg-[#02462e] hover:bg-[#fec700] text-white hover:text-[#02462e] border-[#02462e] cursor-pointer shadow-lg hover:scale-102' 
                      : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Kirim Jawaban Individu</span>
                </button>
              </form>
            </div>
          </div>

          {/* Start Discussion Trigger (appears if discussion not active yet) */}
          {!showDiscussion && (
            <div className="paper-container-shadow animate-bounce">
              <button
                onClick={onStartDiscussion}
                className="w-full bg-[#fec700] hover:bg-[#ffd000] text-[#02462e] font-display font-black py-4 px-6 rounded-2xl transition duration-150 cursor-pointer shadow-lg flex items-center justify-center gap-2 border border-[#fec700]"
              >
                <span>Mulai Diskusi Kelompok</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
