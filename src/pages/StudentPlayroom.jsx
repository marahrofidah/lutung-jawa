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

  // Custom vector badge icon renderer to replace emoji badges
  const renderBadge = (level, size = "md") => {
    const sizeClasses = size === "lg" ? "w-16 h-16" : "w-10 h-10"
    const colorClasses = {
      1: "text-emerald-600 bg-emerald-50 border-emerald-500/25",
      2: "text-green-600 bg-green-50 border-green-500/25",
      3: "text-amber-600 bg-amber-50 border-amber-500/25",
      4: "text-orange-600 bg-orange-50 border-orange-500/25",
      5: "text-yellow-600 bg-yellow-50 border-yellow-500/25"
    }

    const icons = {
      1: ( // Habitat - Star/Globe
        <svg className="w-full h-full p-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      2: ( // Food - Leaf
        <svg className="w-full h-full p-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      3: ( // Threat - Shield
        <svg className="w-full h-full p-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      4: ( // Social - Heart
        <svg className="w-full h-full p-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      5: ( // Rescue - Trophy/Star
        <svg className="w-full h-full p-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" />
        </svg>
      )
    }

    return (
      <div className={`rounded-full border flex items-center justify-center shrink-0 ${sizeClasses} ${colorClasses[level]}`}>
        {icons[level]}
      </div>
    )
  }

  return (
    <div className="space-y-6 py-4 animate-fade-in text-forest-950">
      
      {/* Level & Group Title Header */}
      {!isLvlFinished && (
        <div className="bg-white/80 border border-emerald-500/10 backdrop-blur-md rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg text-left">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-emerald-700 uppercase font-bold">Ruang Belajar Kelompok</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-extrabold text-forest-950">
              Kelompok: <span className="text-emerald-700 font-sans">{studentGroup.group_name}</span>
            </h3>
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider font-mono">Level Aktif:</span>
            <div className="bg-lutung-orange text-white font-display font-black text-sm px-4 py-2.5 rounded-2xl shadow-md tracking-wider flex items-center gap-2">
              <span>LEVEL {studentGroup.current_level}</span>
              <span className="text-xs bg-black/20 px-2 py-0.5 rounded-lg font-mono">{studentGroup.current_level}/5</span>
            </div>
          </div>
        </div>
      )}

      {/* Graduation Victory Screen */}
      {isLvlFinished ? (
        <div className="max-w-2xl mx-auto text-center space-y-8 bg-white/85 border border-emerald-500/10 p-8 sm:p-12 rounded-3xl backdrop-blur-md shadow-2xl animate-scale-up">
          <div className="space-y-4">
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center bg-emerald-50 border border-emerald-200/50 rounded-full">
              <svg className="w-12 h-12 text-[#ffbe0b] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14a7 7 0 007-7V4H5v3a7 7 0 007 7zm0 0v5m-4 0h8m-12-8h4m10 0h4" />
              </svg>
            </div>
            <h3 className="text-3xl sm:text-4xl font-display font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lutung-orange to-lutung-amber leading-tight">
              Selamat! Kelompok Anda Lulus Sebagai Pahlawan Konservasi
            </h3>
            <p className="text-slate-650 text-sm max-w-lg mx-auto leading-relaxed">
              Anda telah menyelesaikan seluruh 5 level tantangan edukasi konservasi Lutung Jawa dengan sempurna. Kelompok Anda berhak menyandang gelar dan lencana berikut:
            </p>
          </div>

          {/* Show All Badges Earned */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
            {levelsData.map((lvl) => (
              <div key={lvl.level} className="bg-white/60 p-4 rounded-2xl border border-slate-200/80 flex flex-col items-center gap-2 shadow-sm">
                {renderBadge(lvl.level, "md")}
                <span className="text-[10px] font-bold text-forest-950 block text-center line-clamp-1">{lvl.badgeName}</span>
                <span className="text-[8px] text-emerald-700 font-mono tracking-wider">Level {lvl.level}</span>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-slate-200 space-y-4">
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Beritahu Guru Anda bahwa kelompok Anda telah berhasil menyelesaikan pembelajaran untuk verifikasi nilai.
            </p>
            <button 
              onClick={handleLogout}
              className="bg-lutung-orange hover:bg-lutung-orange/90 text-white font-extrabold px-6 py-3.5 rounded-xl shadow-lg transition duration-150 cursor-pointer"
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start text-left text-forest-950">
              
              {/* Left Column: Material & Question Panel */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Pinned Question Card (Stays fixed at top) */}
                <div className="sticky top-20 z-30 bg-gradient-to-r from-slate-50 to-white border border-lutung-orange/30 rounded-2xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-mono bg-lutung-orange/15 text-lutung-orange border border-lutung-orange/20 px-2.5 py-0.5 rounded-lg font-extrabold tracking-wider">
                      TANTANGAN LEVEL {studentGroup.current_level}
                    </span>
                    <span className="text-[9px] text-slate-450 font-mono tracking-wider font-bold">INFO PINNED</span>
                  </div>
                  <h4 className="font-display font-extrabold text-sm sm:text-base text-forest-955 leading-relaxed">
                    {currentLvlData.question}
                  </h4>
                </div>

                {/* Section: Kenali Dulu (Materi Pengenalan) */}
                <div className="bg-white/80 border border-emerald-500/10 rounded-3xl p-5 sm:p-6 shadow-md space-y-4">
                  <h4 className="font-display font-bold text-base text-forest-950 border-b border-slate-200 pb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>Materi Pembelajaran</span>
                    <span className="text-xs text-emerald-700 font-normal font-mono">({currentLvlData.theme})</span>
                  </h4>
                  <p className="text-slate-650 text-sm leading-relaxed text-justify font-medium">
                    {currentLvlData.material}
                  </p>
                </div>

                {/* Display Question Options for reference */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentLvlData.options.map((opt) => (
                    <div 
                      key={opt.key} 
                      className="bg-white/90 p-4 rounded-2xl border border-slate-200 text-sm text-left flex items-start gap-3 hover:border-emerald-500/20 transition duration-150 shadow-sm"
                    >
                      <span className="w-6 h-6 bg-slate-50 border border-slate-200 text-lutung-orange text-xs font-bold rounded-lg flex items-center justify-center shrink-0">
                        {opt.key}
                      </span>
                      <span className="text-xs text-slate-700 leading-tight font-semibold">{opt.text}</span>
                    </div>
                  ))}
                </div>

                {/* Section: Video Umpan Balik (Appears after group decision submission) */}
                {isDecisionSubmitted && (
                  <div className="bg-white/80 border border-emerald-500/15 rounded-3xl p-5 sm:p-6 shadow-md space-y-5">
                    <h4 className="font-display font-bold text-base text-forest-950 border-b border-slate-200 pb-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>Pembahasan & Umpan Balik</span>
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full border flex items-center gap-1 ${
                        groupDecision.final_answer === currentLvlData.correctAnswer 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-500/20' 
                          : 'bg-rose-50 text-rose-700 border-rose-500/20'
                      }`}>
                        {groupDecision.final_answer === currentLvlData.correctAnswer ? (
                          <>
                            <svg className="w-3 h-3 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                            </svg>
                            Jawaban Benar!
                          </>
                        ) : (
                          <>
                            <svg className="w-3 h-3 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Jawaban Salah
                          </>
                        )}
                      </span>
                    </h4>

                    {/* Video Embed */}
                    <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 bg-black shadow-md">
                      <iframe 
                        src={currentLvlData.videoUrl} 
                        title="YouTube video player" 
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        allowFullScreen
                      ></iframe>
                    </div>

                    <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 text-xs text-slate-650 leading-relaxed space-y-1.5 text-left">
                      <span className="font-bold text-forest-950 block uppercase tracking-wider font-mono text-[9px]">Pembahasan Teori:</span>
                      <p>{currentLvlData.discussion}</p>
                    </div>

                    {/* Badge Award Panel */}
                    <div className="bg-gradient-to-r from-slate-50 to-white p-5 rounded-2xl border border-lutung-orange/20 flex items-center gap-4 text-left shadow-sm">
                      {renderBadge(studentGroup.current_level, "lg")}
                      <div className="flex-1 space-y-1">
                        <span className="text-[9px] text-lutung-orange font-bold uppercase tracking-wider font-mono">Lencana Diperoleh</span>
                        <h5 className="font-bold text-forest-950 text-sm font-display">{currentLvlData.badgeName}</h5>
                        <p className="text-[11px] text-slate-500 leading-normal font-semibold">{currentLvlData.badgeDescription}</p>
                      </div>
                    </div>

                    {/* Next Level Trigger */}
                    <button
                      onClick={handleNextLevel}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 rounded-xl shadow-md transition duration-150 cursor-pointer"
                    >
                      {studentGroup.current_level === 5 ? 'Selesaikan Pembelajaran!' : 'Lanjut ke Level Berikutnya'}
                    </button>
                  </div>
                )}

              </div>

              {/* Right Column: Submission Panel (Individual & Group Decisions) */}
              <div className="space-y-6">
                
                {/* Sub-section 1: Diskusi & Jawab Individu */}
                <div className="bg-white/80 border border-emerald-500/10 rounded-3xl p-5 shadow-lg space-y-4">
                  <h4 className="font-display font-bold text-sm text-forest-950 border-b border-slate-200 pb-3.5 flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>Jawab Individu</span>
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-lg font-mono font-extrabold border border-emerald-200/50">
                      {individualAnswers.length}
                    </span>
                  </h4>

                  {/* List Submitted Member Answers */}
                  {individualAnswers.length > 0 && (
                    <div className="space-y-2 max-h-[180px] overflow-y-auto pb-2.5 border-b border-slate-200 pr-1">
                      {individualAnswers.map((ans, idx) => (
                        <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200 text-xs flex justify-between items-center gap-3 shadow-sm">
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-forest-950 block truncate">{ans.member_name}</span>
                            <p className="text-[10px] text-slate-450 truncate italic">"{ans.reason}"</p>
                          </div>
                          <span className="bg-slate-50 border border-slate-200 text-lutung-orange font-mono font-bold px-2 py-0.5 rounded-lg text-[10px] shrink-0">
                            {ans.answer}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Form Member Submit */}
                  {!isDecisionSubmitted ? (
                    <form onSubmit={handleIndividualSubmit} className="space-y-3.5">
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-450 uppercase tracking-wider block">Nama Anggota Kelompok</label>
                        <input 
                          type="text" 
                          value={memberNameInput}
                          onChange={(e) => setMemberNameInput(e.target.value)}
                          placeholder="Masukkan nama Anda..."
                          className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-lutung-orange font-semibold"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-450 uppercase tracking-wider block">Jawaban Pilihan</label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {['A', 'B', 'C', 'D'].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setMemberAnswerInput(opt)}
                              className={`py-2 text-xs font-bold rounded-lg border transition duration-150 ${
                                memberAnswerInput === opt 
                                  ? 'bg-lutung-orange border-lutung-orange text-white' 
                                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-455 uppercase tracking-wider block">Alasan / Argumen Jawaban</label>
                        <textarea 
                          value={memberReasonInput}
                          onChange={(e) => setMemberReasonInput(e.target.value)}
                          placeholder="Jelaskan alasan ilmiah pilihan Anda..."
                          rows="3"
                          className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 rounded-xl p-2.5 text-xs focus:outline-none focus:border-lutung-orange resize-none font-semibold"
                          required
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-extrabold py-2.5 rounded-xl text-xs transition duration-150 cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span>Kirim Jawaban Individu</span>
                      </button>
                    </form>
                  ) : (
                    <div className="bg-emerald-50 border border-emerald-200/40 p-4 rounded-2xl text-center">
                      <p className="text-xs text-emerald-700 font-semibold leading-relaxed">Semua jawaban individu terkunci karena Keputusan Kelompok telah dikirim.</p>
                    </div>
                  )}
                </div>

                {/* Sub-section 2: Keputusan Kelompok */}
                <div className="bg-white/80 border border-emerald-500/10 rounded-3xl p-5 shadow-lg space-y-4">
                  <h4 className="font-display font-bold text-sm text-forest-950 border-b border-slate-200 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Keputusan Kelompok</span>
                    </div>
                    <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200/50 px-2 py-0.5 rounded-lg font-mono font-extrabold">
                      Diskusi Final
                    </span>
                  </h4>

                  {!isDecisionSubmitted ? (
                    <form onSubmit={handleGroupSubmit} className="space-y-3.5">
                      <p className="text-[10px] text-slate-500 leading-relaxed text-left font-medium">
                        Diskusikan seluruh alasan individu di atas, lalu tentukan satu pilihan dan satu alasan kelompok resmi yang disepakati bersama.
                      </p>
                      
                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-450 uppercase tracking-wider block">Pilihan Akhir Kelompok</label>
                        <div className="grid grid-cols-4 gap-1.5">
                          {['A', 'B', 'C', 'D'].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setGroupAnswerInput(opt)}
                              className={`py-2 text-xs font-bold rounded-lg border transition duration-150 ${
                                groupAnswerInput === opt 
                                  ? 'bg-[#ffbe0b] border-[#ffbe0b] text-emerald-950' 
                                  : 'bg-slate-55 border-slate-200 text-slate-600 hover:bg-slate-100 cursor-pointer'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[9px] font-bold text-slate-450 uppercase tracking-wider block">Alasan Kesepakatan Kelompok</label>
                        <textarea 
                          value={groupReasonInput}
                          onChange={(e) => setGroupReasonInput(e.target.value)}
                          placeholder="Jelaskan alasan resmi hasil musyawarah kelompok..."
                          rows="3"
                          className="w-full bg-slate-50/50 border border-slate-200 text-slate-900 rounded-xl p-2.5 text-xs focus:outline-none focus:border-lutung-orange resize-none font-semibold"
                          required
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        disabled={individualAnswers.length === 0}
                        className={`w-full font-extrabold py-2.5 rounded-xl text-xs transition duration-250 ${
                          individualAnswers.length > 0 
                            ? 'bg-lutung-orange hover:bg-lutung-orange/90 text-white cursor-pointer shadow-md' 
                            : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
                        }`}
                      >
                        Kirim Keputusan Kelompok Akhir
                      </button>
                      {individualAnswers.length === 0 && (
                        <p className="text-[9px] text-center text-rose-650 leading-relaxed font-semibold">
                          Kirim minimal satu jawaban individu di atas terlebih dahulu untuk mengaktifkan tombol ini.
                        </p>
                      )}
                    </form>
                  ) : (
                    <div className="bg-white p-4.5 rounded-2xl border border-slate-200 space-y-3.5 text-left shadow-sm">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-450 font-bold uppercase tracking-wider font-mono text-[9px]">Pilihan Terkirim:</span>
                        <span className="font-bold text-lutung-orange font-mono bg-lutung-orange/15 px-2.5 py-0.5 rounded-lg border border-lutung-orange/30">
                          Pilihan {groupDecision.final_answer}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Alasan Kelompok:</span>
                        <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-3 rounded-xl border border-slate-100">
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
