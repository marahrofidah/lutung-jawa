import React from 'react'

export default function StudentDiscussion({
  individualAnswers,
  currentLvlData,
  groupAnswerInput,
  setGroupAnswerInput,
  groupReasonInput,
  setGroupReasonInput,
  handleGroupSubmit,
  studentGroup
}) {
  return (
    <div className="space-y-6 pt-6 border-t-2 border-white/20 animate-slide-up text-left">
      
      <div className="flex items-center justify-between px-2">
        <h4 className="font-display font-black text-[#fec700] text-xl sm:text-2xl flex items-center gap-2">
          <svg className="w-6 h-6 text-[#fec700]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
          <span>Ruang Diskusi Kelompok</span>
        </h4>
        <span className="bg-[#fec700] text-[#02462e] text-xs font-black px-3.5 py-1.5 rounded-full font-display shadow-sm">
          Misi Level {currentLvlData.level}
        </span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 items-stretch">
        
        {/* Left Card: Individual Sticky Notes Panel */}
        <div className="xl:col-span-3 paper-container-shadow">
          <div className="card-paper paper-rough-2 p-6 space-y-4 min-h-full">
            <div className="flex items-center gap-2 border-b border-slate-200/80 pb-3">
              <svg className="w-5 h-5 text-[#02462e]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <h5 className="font-bold text-xs sm:text-sm text-[#02462e] tracking-wider font-sans">
                Gagasan Anggota (Jawaban Individu)
              </h5>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {individualAnswers.map((ans, idx) => {
                const rotationClass = idx % 2 === 0 ? 'rotate-[-1.5deg] hover:rotate-0' : 'rotate-[1.5deg] hover:rotate-0'
                
                return (
                  <div key={ans.id || idx} className="paper-container-shadow">
                    <div 
                      className={`card-paper-yellow paper-rough-1 p-5 relative transition duration-200 flex flex-col justify-between gap-3 ${rotationClass}`}
                    >
                      {/* Fake tape effect */}
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4.5 bg-[#fec700]/30 border border-[#fec700]/20 rounded-sm z-20"></div>
                      
                      <div className="flex justify-between items-start mt-1.5">
                        <span className="font-display font-extrabold text-sm sm:text-base text-[#02462e] truncate pr-2">
                          {ans.member_name}
                        </span>
                        <span className="text-[10px] font-sans font-black px-2.5 py-0.5 rounded border bg-slate-50 border-slate-200 text-lutung-orange shrink-0">
                          Pilihan: {ans.answer}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-white/60 p-3 rounded-xl border border-amber-100 font-bold">
                        &ldquo;{ans.reason}&rdquo;
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Card: Consensus Scroll Form */}
        <div className="xl:col-span-2 paper-container-shadow">
          <div className="card-paper-yellow paper-rough-2 border-2 border-[#fec700]/70 p-6 sm:p-7 flex flex-col justify-between gap-6 relative min-h-full">
            <div className="absolute right-4 top-4 text-xs font-sans text-[#02462e]/45 font-bold select-none">
              Musyawarah Kelompok
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-amber-250/60 pb-3">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h5 className="font-bold text-xs sm:text-sm text-[#02462e] tracking-wider font-sans">
                  Keputusan Akhir Resmi
                </h5>
              </div>

              <form onSubmit={handleGroupSubmit} className="space-y-4">
                <p className="text-xs text-slate-550 leading-relaxed font-semibold">
                  Diskusikan seluruh gagasan anggota di sebelah kiri. Tentukan satu kesimpulan jawaban dan alasan kelompok yang disepakati bersama.
                </p>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-sans">
                    Pilihan Akhir Kelompok
                  </label>
                  <div className="flex items-center justify-around gap-2 py-1.5">
                    {['A', 'B', 'C', 'D'].map((opt) => {
                      const isSelected = groupAnswerInput === opt
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setGroupAnswerInput(opt)}
                          className={`w-12 h-12 rounded-full font-display font-black text-lg border-2 border-dashed transition-all duration-200 shadow-md ${
                            isSelected 
                              ? 'bg-[#02462e] border-[#fec700] text-[#fec700] scale-110 shadow-lg' 
                              : 'bg-white/75 border-amber-300/80 text-[#02462e] hover:bg-white hover:scale-105 cursor-pointer'
                          }`}
                        >
                          {opt}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-sans">
                    Alasan Kesepakatan Kelompok
                  </label>
                  <textarea 
                    value={groupReasonInput}
                    onChange={(e) => setGroupReasonInput(e.target.value)}
                    placeholder="Tuliskan argumen ilmiah hasil musyawarah kelompok..."
                    rows="3"
                    className="w-full bg-white/70 border border-slate-200 text-slate-900 rounded-xl p-2.5 text-xs focus:outline-none focus:border-lutung-orange resize-none font-semibold shadow-inner"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={individualAnswers.length === 0}
                  className={`w-full font-display font-black py-3.5 rounded-xl text-xs transition duration-250 border border-transparent shadow-md ${
                    individualAnswers.length > 0 
                      ? 'bg-lutung-orange hover:bg-lutung-orange/90 text-white cursor-pointer shadow-lg' 
                      : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'
                  }`}
                >
                  Kirim Keputusan Kelompok Akhir
                </button>
              </form>
            </div>

            <div className="bg-[#fec700]/10 border border-[#fec700]/30 rounded-2xl p-4 text-xs text-[#02462e] leading-relaxed font-semibold">
              Tip: Setelah keputusan kelompok dikirim, semua anggota kelompok akan diarahkan ke video pembahasan level ini.
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
