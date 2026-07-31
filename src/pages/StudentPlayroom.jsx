import React from 'react'

export default function StudentPlayroom({
  studentGroup,
  levelsData,
  individualAnswers,
  groupDecision,
  memberNameInput,
  setMemberNameInput,
  memberAnswerInput,
  setMemberAnswerInput,
  memberReasonInput,
  setMemberReasonInput,
  groupAnswerInput,
  setGroupAnswerInput,
  groupReasonInput,
  setGroupReasonInput,
  handleIndividualSubmit,
  handleGroupSubmit,
  handleNextLevel,
  handleLogout
}) {
  const isLvlFinished = studentGroup.current_level > 5

  return (
    <div className="space-y-6 py-4 animate-fade-in">
      
      {/* Level & Group Title Header */}
      {!isLvlFinished && (
        <div className="bg-forest-900/40 border border-forest-850 backdrop-blur-md rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div>
            <p className="text-[10px] font-mono tracking-widest text-lutung-orange uppercase font-bold">EDUKASI KELOMPOK</p>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-white flex items-center gap-2">
              Kelompok: <span className="text-emerald-400 font-sans">{studentGroup.group_name}</span>
            </h3>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-350">Level Aktif:</span>
            <div className="bg-lutung-orange text-white font-display font-black text-sm px-4 py-2 rounded-xl shadow-md tracking-wider flex items-center gap-2">
              <span>LEVEL {studentGroup.current_level}</span>
              <span className="text-xs bg-black/20 px-2 py-0.5 rounded-md font-mono">{studentGroup.current_level}/5</span>
            </div>
          </div>
        </div>
      )}

      {/* Graduation Victory Screen */}
      {isLvlFinished ? (
        <div className="max-w-2xl mx-auto text-center space-y-8 bg-forest-900/40 border border-forest-850 p-8 sm:p-12 rounded-3xl backdrop-blur-md shadow-2xl animate-scale-up">
          <div className="space-y-4">
            <span className="text-7xl block animate-bounce">🏆🎉</span>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lutung-orange to-lutung-amber leading-tight">
              Selamat! Kelompok Anda Lulus Sebagai Pahlawan Konservasi
            </h3>
            <p className="text-slate-300 text-sm max-w-lg mx-auto">
              Anda telah menyelesaikan seluruh 5 level tantangan edukasi konservasi Lutung Jawa dengan sempurna. Kelompok Anda berhak menyandang gelar dan lencana berikut:
            </p>
          </div>

          {/* Show All Badges Earned */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {levelsData.map((lvl) => (
              <div key={lvl.level} className="bg-forest-950/60 p-3 rounded-xl border border-forest-800/80 flex flex-col items-center">
                <span className="text-3xl mb-1">{lvl.badgeIcon}</span>
                <span className="text-[10px] font-bold text-white block text-center line-clamp-1">{lvl.badgeName}</span>
                <span className="text-[8px] text-emerald-400 font-mono mt-0.5">Level {lvl.level} Selesai</span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-forest-800">
            <p className="text-xs text-slate-400 mb-4">
              Bagikan hasil ini kepada Guru Anda di depan kelas untuk verifikasi lembar nilai kelompok.
            </p>
            <button 
              onClick={handleLogout}
              className="bg-lutung-orange hover:bg-lutung-orange/90 text-white font-bold px-6 py-3 rounded-xl shadow-lg transition cursor-pointer"
            >
              Selesaikan Pembelajaran & Keluar
            </button>
          </div>
        </div>
      ) : (
        
        /* PLAY ROOM OF CURRENT LEVEL */
        (() => {
          const currentLvlData = levelsData[studentGroup.current_level - 1]
          const isDecisionSubmitted = !!groupDecision

          return (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column: Material & Question Panel */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Pinned Question Card (Stays fixed at top) */}
                <div className="sticky top-20 z-30 bg-gradient-to-r from-forest-950 to-forest-900 border border-lutung-orange/40 rounded-2xl p-5 shadow-2xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono bg-lutung-orange/15 text-lutung-orange border border-lutung-orange/20 px-2 py-0.5 rounded-full font-bold">
                      TANTANGAN LEVEL {studentGroup.current_level}
                    </span>
                    <span className="text-[10px] text-slate-450 font-mono">TETAP TER-PIN</span>
                  </div>
                  <h4 className="font-display font-extrabold text-sm sm:text-base text-white leading-relaxed">
                    {currentLvlData.question}
                  </h4>
                </div>

                {/* Section: Kenali Dulu (Materi Pengenalan) */}
                <div className="bg-forest-900/30 border border-forest-850 rounded-2xl p-5 sm:p-6 shadow-lg space-y-4">
                  <h4 className="font-display font-bold text-base text-white border-b border-forest-800 pb-2 flex items-center gap-2">
                    <span>🌳 Kenali Dulu</span>
                    <span className="text-xs text-emerald-400 font-normal">({currentLvlData.theme})</span>
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed text-justify">
                    {currentLvlData.material}
                  </p>
                </div>

                {/* Display Question Options for reference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentLvlData.options.map((opt) => (
                    <div 
                      key={opt.key} 
                      className="bg-forest-950/50 p-4 rounded-xl border border-forest-800 text-sm text-left flex items-start gap-3"
                    >
                      <span className="w-6 h-6 bg-forest-900 border border-forest-750 text-lutung-orange text-xs font-bold rounded-lg flex items-center justify-center shrink-0">
                        {opt.key}
                      </span>
                      <span className="text-xs text-slate-200 leading-tight">{opt.text}</span>
                    </div>
                  ))}
                </div>

                {/* Section: Video Umpan Balik (Appears after group decision submission) */}
                {isDecisionSubmitted && (
                  <div className="bg-forest-900/30 border border-emerald-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
                    <h4 className="font-display font-bold text-base text-white border-b border-forest-800 pb-2 flex items-center gap-2">
                      <span>🎥 Video Pembahasan & Umpan Balik</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        groupDecision.final_answer === currentLvlData.correctAnswer 
                          ? 'bg-emerald-950 text-emerald-355' 
                          : 'bg-rose-950 text-rose-350'
                      }`}>
                        {groupDecision.final_answer === currentLvlData.correctAnswer ? 'Jawaban Benar! ✅' : 'Jawaban Salah ❌'}
                      </span>
                    </h4>

                    {/* Video Embed */}
                    <div className="aspect-video w-full rounded-xl overflow-hidden border border-forest-800 bg-black">
                      <iframe 
                        src={currentLvlData.videoUrl} 
                        title="YouTube video player" 
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                      ></iframe>
                    </div>

                    <div className="bg-forest-950/60 p-4 rounded-xl border border-forest-800 text-xs text-slate-300 leading-relaxed space-y-2">
                      <span className="font-bold text-white block uppercase tracking-wide">Pembahasan Teori:</span>
                      <p>{currentLvlData.discussion}</p>
                    </div>

                    {/* Badge Award Panel */}
                    <div className="bg-gradient-to-r from-forest-950 to-forest-900 p-5 rounded-xl border border-lutung-orange/30 flex items-center gap-4">
                      <span className="text-5xl animate-bounce">{currentLvlData.badgeIcon}</span>
                      <div className="flex-1 space-y-1">
                        <span className="text-[10px] text-lutung-orange font-bold uppercase tracking-wider font-mono">Lencana Diperoleh</span>
                        <h5 className="font-bold text-white text-sm font-display">{currentLvlData.badgeName}</h5>
                        <p className="text-[11px] text-slate-300">{currentLvlData.badgeDescription}</p>
                      </div>
                    </div>

                    {/* Next Level Trigger */}
                    <button
                      onClick={handleNextLevel}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-xl shadow-lg transition duration-200 cursor-pointer"
                    >
                      {studentGroup.current_level === 5 ? '🎓 Selesaikan Pembelajaran!' : '➔ Lanjut ke Level Berikutnya'}
                    </button>
                  </div>
                )}

              </div>

              {/* Right Column: Submission Panel (Individual & Group Decisions) */}
              <div className="space-y-6">
                
                {/* Sub-section 1: Diskusi & Jawab Individu */}
                <div className="bg-forest-900/30 border border-forest-850 rounded-2xl p-5 shadow-lg space-y-4">
                  <h4 className="font-display font-bold text-sm text-white border-b border-forest-800 pb-2">
                    💬 Jawab Individu ({individualAnswers.length} Terkirim)
                  </h4>

                  {/* List Submitted Member Answers */}
                  {individualAnswers.length > 0 && (
                    <div className="space-y-2 max-h-[180px] overflow-y-auto pb-2 border-b border-forest-850">
                      {individualAnswers.map((ans, idx) => (
                        <div key={idx} className="bg-forest-950/60 p-2.5 rounded-lg border border-forest-800/80 text-xs flex justify-between items-center gap-2">
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-slate-100 block truncate">{ans.member_name}</span>
                            <p className="text-[10px] text-slate-400 truncate italic">"{ans.reason}"</p>
                          </div>
                          <span className="bg-forest-900 border border-forest-750 text-lutung-orange font-bold px-2 py-0.5 rounded text-[10px] shrink-0">
                            Pilih: {ans.answer}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Form Member Submit */}
                  {!isDecisionSubmitted ? (
                    <form onSubmit={handleIndividualSubmit} className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-300 uppercase block">Nama Anggota Kelompok</label>
                        <input 
                          type="text" 
                          value={memberNameInput}
                          onChange={(e) => setMemberNameInput(e.target.value)}
                          placeholder="Masukkan nama Anda..."
                          className="w-full bg-forest-950/80 border border-forest-800 text-slate-100 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-lutung-orange"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-300 uppercase block">Jawaban Pilihan</label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {['A', 'B', 'C', 'D'].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setMemberAnswerInput(opt)}
                              className={`py-2 text-xs font-bold rounded-lg border transition ${
                                memberAnswerInput === opt 
                                  ? 'bg-lutung-orange border-lutung-orange text-white' 
                                  : 'bg-forest-950 border-forest-800 text-slate-350 hover:bg-forest-900 cursor-pointer'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-300 uppercase block">Alasan / Argumen Jawaban</label>
                        <textarea 
                          value={memberReasonInput}
                          onChange={(e) => setMemberReasonInput(e.target.value)}
                          placeholder="Jelaskan alasan ilmiah pilihan Anda..."
                          rows="3"
                          className="w-full bg-forest-950/80 border border-forest-800 text-slate-100 rounded-lg p-2 text-xs focus:outline-none focus:border-lutung-orange resize-none"
                          required
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-forest-800 hover:bg-forest-750 text-white font-bold py-2.5 rounded-lg text-xs transition cursor-pointer"
                      >
                        Kirim Jawaban Individu ⚡
                      </button>
                    </form>
                  ) : (
                    <div className="bg-emerald-950/30 border border-emerald-500/20 p-3.5 rounded-xl text-center">
                      <p className="text-xs text-emerald-300 font-semibold">Semua jawaban individu terkunci karena Keputusan Kelompok telah dikirim.</p>
                    </div>
                  )}
                </div>

                {/* Sub-section 2: Keputusan Kelompok */}
                <div className="bg-forest-900/30 border border-forest-850 rounded-2xl p-5 shadow-lg space-y-4">
                  <h4 className="font-display font-bold text-sm text-white border-b border-forest-800 pb-2 flex items-center justify-between">
                    <span>🎯 Keputusan Kelompok</span>
                    <span className="text-[10px] bg-amber-950 text-amber-350 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono">
                      Diskusi Final
                    </span>
                  </h4>

                  {!isDecisionSubmitted ? (
                    <form onSubmit={handleGroupSubmit} className="space-y-3">
                      <p className="text-[10px] text-slate-400 leading-normal mb-2">
                        Diskusikan seluruh alasan individu di atas, lalu tentukan satu pilihan dan satu alasan kelompok resmi yang disepakati bersama.
                      </p>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-300 uppercase block">Pilihan Akhir Kelompok</label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {['A', 'B', 'C', 'D'].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setGroupAnswerInput(opt)}
                              className={`py-2 text-xs font-bold rounded-lg border transition ${
                                groupAnswerInput === opt 
                                  ? 'bg-lutung-amber border-lutung-amber text-black' 
                                  : 'bg-forest-950 border-forest-800 text-slate-350 hover:bg-forest-900 cursor-pointer'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-300 uppercase block">Alasan Kesepakatan Kelompok</label>
                        <textarea 
                          value={groupReasonInput}
                          onChange={(e) => setGroupReasonInput(e.target.value)}
                          placeholder="Jelaskan alasan resmi hasil musyawarah kelompok..."
                          rows="3"
                          className="w-full bg-forest-950/80 border border-forest-800 text-slate-100 rounded-lg p-2 text-xs focus:outline-none focus:border-lutung-orange resize-none"
                          required
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        disabled={individualAnswers.length === 0}
                        className={`w-full font-bold py-2.5 rounded-lg text-xs transition duration-200 ${
                          individualAnswers.length > 0 
                            ? 'bg-lutung-orange hover:bg-lutung-orange/90 text-white cursor-pointer shadow-md' 
                            : 'bg-forest-950 text-slate-500 border border-forest-900 cursor-not-allowed'
                        }`}
                      >
                        Kirim Keputusan Kelompok Akhir ➔
                      </button>
                      {individualAnswers.length === 0 && (
                        <p className="text-[9px] text-center text-rose-450">
                          Kirim minimal satu jawaban individu di atas terlebih dahulu untuk mengaktifkan tombol ini.
                        </p>
                      )}
                    </form>
                  ) : (
                    <div className="bg-forest-950/70 p-4 rounded-xl border border-forest-800 space-y-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Pilihan Terkirim:</span>
                        <span className="font-bold text-lutung-orange font-mono bg-lutung-orange/15 px-2 py-0.5 rounded border border-lutung-orange/30">
                          Pilihan {groupDecision.final_answer}
                        </span>
                      </div>
                      <div className="space-y-1 text-left">
                        <span className="text-[10px] text-slate-450 uppercase block font-bold">Alasan Kelompok:</span>
                        <p className="text-xs text-slate-300 leading-relaxed italic bg-forest-900/20 p-2.5 rounded border border-forest-850">
                          "{groupDecision.final_reason}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>

              </div>

            </div>
          )
        })()
      )}

    </div>
  )
}
