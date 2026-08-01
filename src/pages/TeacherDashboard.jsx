import React from 'react'

export default function TeacherDashboard({ 
  teacherName, 
  currentClass, 
  groups, 
  selectedGroupDetails, 
  setSelectedGroupDetails, 
  teacherSelectedLevel, 
  setTeacherSelectedLevel, 
  levelsData, 
  triggerAlert 
}) {
  return (
    <div className="space-y-6 py-4 animate-fade-in text-forest-950">
      {/* Class Stats / Top Info */}
      <div className="bg-white/80 border border-emerald-500/10 backdrop-blur-md rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg">
        <div className="flex flex-col gap-1 text-left">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-emerald-700 uppercase font-bold">Status: Real-Time Monitoring</span>
          </div>
          <h3 className="text-2xl font-display font-extrabold text-forest-950">
            Kelas Guru: <span className="text-emerald-700">{teacherName}</span>
          </h3>
        </div>

        <div className="flex items-center gap-4 bg-slate-50/80 px-5 py-3 rounded-2xl border border-slate-200/80">
          <div className="text-left">
            <span className="text-[9px] font-mono text-slate-500 uppercase block tracking-wider">KODE KELAS (BAGIKAN KE MURID)</span>
            <span className="text-xl font-mono font-bold text-lutung-orange tracking-widest">{currentClass.class_code}</span>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(currentClass.class_code)
              triggerAlert('success', 'Kode kelas berhasil disalin ke clipboard!')
            }}
            className="bg-emerald-55 hover:bg-emerald-100 text-emerald-700 p-2.5 rounded-xl border border-emerald-200/60 hover:text-emerald-900 transition duration-150 cursor-pointer flex items-center gap-1.5 font-bold"
            title="Salin Kode Kelas"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span className="text-xs font-bold font-mono">Salin</span>
          </button>
        </div>
      </div>

      {/* Dashboard Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sidebar: Groups Joined */}
        <div className="bg-white/80 border border-emerald-500/10 rounded-3xl p-5 shadow-lg space-y-4 text-left">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-3.5">
            <h4 className="font-display font-extrabold text-forest-950 flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Kelompok Bergabung</span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-lg font-mono font-extrabold border border-emerald-200/50">
                {groups.length}
              </span>
            </h4>
          </div>

          {groups.length === 0 ? (
            <div className="text-center py-16 text-slate-400 flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200/60 flex items-center justify-center animate-pulse">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-slate-600 font-bold">Menunggu Kelompok</p>
                <p className="text-[10px] text-slate-500 max-w-[200px] mx-auto leading-relaxed">Bagikan kode kelas di atas kepada murid agar mereka dapat bergabung.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {groups.map((group) => {
                const isSelected = selectedGroupDetails?.id === group.id
                return (
                  <div 
                    key={group.id}
                    onClick={() => {
                      setSelectedGroupDetails(group)
                      setTeacherSelectedLevel(group.current_level)
                    }}
                    className={`p-4 rounded-2xl border text-left cursor-pointer transition duration-150 relative overflow-hidden ${
                      isSelected 
                        ? 'bg-emerald-50/50 border-emerald-500/40 shadow-sm' 
                        : 'bg-white/60 border-slate-200/60 hover:bg-emerald-50/20 hover:border-emerald-500/20'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                    )}
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm text-forest-950">{group.group_name}</span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-lg border ${
                        isSelected 
                          ? 'bg-emerald-100/50 text-emerald-700 border-emerald-300/40' 
                          : 'bg-slate-100 text-slate-500 border-slate-200/80'
                      }`}>
                        Level {group.current_level}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-semibold">
                      Aktif: {new Date(group.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Main Area: Detailed Responses Grid */}
        <div className="lg:col-span-2 bg-white/80 border border-emerald-500/10 rounded-3xl p-6 shadow-lg min-h-[400px] flex flex-col text-left text-forest-950">
          {selectedGroupDetails ? (
            <div className="space-y-6 flex-1 flex flex-col">
              
              {/* Header Group Selected */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/80 pb-4 gap-4">
                <div>
                  <h4 className="font-display font-extrabold text-xl text-forest-950">
                    Pemantauan: {selectedGroupDetails.group_name}
                  </h4>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <p className="text-xs text-slate-500">
                      Misi Aktif: <strong className="text-emerald-700 font-extrabold">Level {selectedGroupDetails.current_level}</strong>
                    </p>
                  </div>
                </div>
                
                {/* Level selector for Guru to inspect history */}
                <div className="flex items-center gap-1.5 bg-slate-55/80 p-1.5 rounded-2xl border border-slate-200/80">
                  <span className="text-[9px] text-slate-500 font-bold uppercase px-1.5 tracking-wider">Pilih Level:</span>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((lvl) => {
                      const isCurrent = lvl === teacherSelectedLevel
                      const isLevelUnlocked = lvl <= selectedGroupDetails.current_level
                      return (
                        <button
                          key={lvl}
                          onClick={() => isLevelUnlocked && setTeacherSelectedLevel(lvl)}
                          className={`w-7 h-7 text-xs font-bold rounded-lg transition duration-150 ${
                            isCurrent 
                              ? 'bg-lutung-orange text-white shadow-md shadow-lutung-orange/20' 
                              : isLevelUnlocked 
                                ? 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 cursor-pointer border border-emerald-200/50' 
                                : 'bg-slate-100/60 text-slate-400 cursor-not-allowed border border-slate-200/40'
                          }`}
                          disabled={!isLevelUnlocked}
                          title={isLevelUnlocked ? `Level ${lvl}` : `Belum dicapai kelompok`}
                        >
                          {lvl}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Content Detail Level */}
              <div className="space-y-6 flex-1">
                
                {/* Level Question Summary */}
                <div className="bg-emerald-50/40 p-4.5 rounded-2xl border border-emerald-500/10 space-y-1.5 text-left relative overflow-hidden">
                  <div className="absolute right-4 top-4 text-[9px] font-mono tracking-widest text-emerald-700/50 uppercase font-bold">Misi Pembelajaran</div>
                  <span className="font-display font-extrabold text-sm text-forest-950 block tracking-wide">
                    Level {teacherSelectedLevel}: {levelsData[teacherSelectedLevel - 1].theme}
                  </span>
                  <p className="text-slate-600 text-xs font-semibold leading-relaxed max-w-xl">{levelsData[teacherSelectedLevel - 1].question}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Column: Individual Submissions */}
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <h5 className="font-bold text-xs text-slate-500 uppercase tracking-wider font-mono">Jawaban Anggota (Individu)</h5>
                    </div>
                    
                    {(() => {
                      const answers = selectedGroupDetails.individualAnswers.filter(
                        (ans) => ans.level_number === teacherSelectedLevel
                      )
                      
                      if (answers.length === 0) {
                        return (
                          <div className="text-center py-12 px-4 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200/80">
                            <p className="text-xs text-slate-450 font-semibold">Belum ada jawaban dari anggota kelompok.</p>
                          </div>
                        )
                      }

                      return (
                        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                          {answers.map((ans) => {
                            const isCorrect = ans.answer === levelsData[teacherSelectedLevel - 1].correctAnswer
                            return (
                              <div key={ans.id} className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-500/20 transition duration-150 space-y-2 shadow-sm">
                                <div className="flex justify-between items-center">
                                  <span className="font-bold text-xs text-forest-950">{ans.member_name}</span>
                                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-lg border flex items-center gap-1 ${
                                    isCorrect 
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-500/20' 
                                      : 'bg-rose-50 text-rose-700 border-rose-500/20'
                                  }`}>
                                    {isCorrect ? (
                                      <>
                                        <svg className="w-2.5 h-2.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Pilihan: {ans.answer}
                                      </>
                                    ) : (
                                      <>
                                        <svg className="w-2.5 h-2.5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        Pilihan: {ans.answer}
                                      </>
                                    )}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                                  &ldquo;{ans.reason}&rdquo;
                                </p>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })()}
                  </div>

                  {/* Column: Group Final Decision */}
                  <div className="space-y-3.5">
                    <div className="flex items-center gap-2 border-b border-slate-200/80 pb-2">
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h5 className="font-bold text-xs text-slate-500 uppercase tracking-wider font-mono">Keputusan Akhir Kelompok</h5>
                    </div>
                    
                    {(() => {
                      const decision = selectedGroupDetails.groupDecisions.find(
                        (dec) => dec.level_number === teacherSelectedLevel
                      )

                      if (!decision) {
                        return (
                          <div className="text-center py-12 px-4 bg-slate-55/50 rounded-2xl border border-dashed border-slate-200/80">
                            <p className="text-xs text-slate-455 font-semibold">Menunggu kesepakatan akhir kelompok.</p>
                          </div>
                        )
                      }

                      const isCorrect = decision.final_answer === levelsData[teacherSelectedLevel - 1].correctAnswer

                      return (
                        <div className={`p-4.5 rounded-2xl border transition duration-150 space-y-3.5 bg-white shadow-sm ${
                          isCorrect 
                            ? 'border-emerald-500/20 shadow-emerald-500/5' 
                            : 'border-rose-500/20 shadow-rose-500/5'
                        }`}>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider font-mono">Keputusan</span>
                            <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border flex items-center gap-1 ${
                              isCorrect 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-500/20' 
                                : 'bg-rose-50 text-rose-750 border-rose-500/20'
                            }`}>
                              {isCorrect ? (
                                <>
                                  <svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                  </svg>
                                  BENAR (Pilihan {decision.final_answer})
                                </>
                              ) : (
                                <>
                                  <svg className="w-3 h-3 text-rose-550" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  SALAH (Pilihan {decision.final_answer})
                                </>
                              )}
                            </span>
                          </div>
                          <div className="space-y-1 text-left">
                            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Alasan Kesepakatan:</span>
                            <p className="text-xs text-slate-650 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100 italic">
                              &ldquo;{decision.final_reason}&rdquo;
                            </p>
                          </div>
                        </div>
                      )
                    })()}
                  </div>

                </div>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400 py-12 space-y-4">
              <div className="relative w-20 h-20 flex items-center justify-center">
                {/* Scanning radar effect */}
                <div className="absolute inset-0 rounded-full border border-emerald-500/20 animate-ping"></div>
                <div className="absolute inset-2 rounded-full border border-emerald-500/40 animate-pulse"></div>
                <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-500/30 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                  </svg>
                </div>
              </div>
              <div className="space-y-1">
                <h5 className="text-forest-950 font-bold text-sm">Monitoring Real-Time Aktif</h5>
                <p className="text-xs text-slate-500 leading-relaxed max-w-[280px]">Pilih salah satu kelompok di panel kiri untuk mulai memantau pengisian jawaban.</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
