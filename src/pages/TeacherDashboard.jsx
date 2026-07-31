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
    <div className="space-y-6 py-4 animate-fade-in">
      {/* Class Stats / Top Info */}
      <div className="bg-forest-900/40 border border-forest-850 backdrop-blur-md rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div>
          <p className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">Status Dashboard Real-Time</p>
          <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            Kelas Guru: <span className="text-slate-300">{teacherName}</span>
          </h3>
        </div>

        <div className="flex items-center gap-4 bg-forest-950/80 px-5 py-3 rounded-xl border border-forest-800">
          <div>
            <span className="text-[10px] font-mono text-slate-400 uppercase block">KODE KELAS (BAGIKAN KE MURID)</span>
            <span className="text-xl font-mono font-bold text-lutung-orange tracking-wider">{currentClass.class_code}</span>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(currentClass.class_code)
              triggerAlert('success', 'Kode kelas berhasil disalin ke clipboard!')
            }}
            className="bg-forest-900 hover:bg-forest-800 text-slate-350 p-2 rounded-lg text-xs border border-forest-800 hover:text-white transition cursor-pointer"
            title="Salin Kode Kelas"
          >
            📋 Salin
          </button>
        </div>
      </div>

      {/* Dashboard Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sidebar: Groups Joined */}
        <div className="bg-forest-900/30 border border-forest-850 rounded-2xl p-5 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-forest-800/80 pb-3">
            <h4 className="font-display font-bold text-white flex items-center gap-2">
              <span>👥 Kelompok Bergabung</span>
              <span className="bg-emerald-950 text-emerald-300 text-xs px-2 py-0.5 rounded-full font-mono font-bold">
                {groups.length}
              </span>
            </h4>
          </div>

          {groups.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-3">
              <span className="text-4xl block animate-bounce">⏳</span>
              <p className="text-xs">Menunggu kelompok murid bergabung menggunakan kode kelas...</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {groups.map((group) => {
                const isSelected = selectedGroupDetails?.id === group.id
                return (
                  <div 
                    key={group.id}
                    onClick={() => {
                      setSelectedGroupDetails(group)
                      setTeacherSelectedLevel(group.current_level)
                    }}
                    className={`p-3.5 rounded-xl border text-left cursor-pointer transition duration-155 ${
                      isSelected 
                        ? 'bg-lutung-orange/10 border-lutung-orange/50 shadow-md shadow-lutung-orange/5' 
                        : 'bg-forest-950/40 border-forest-800/60 hover:bg-forest-900/40 hover:border-forest-800'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-sm text-white">{group.group_name}</span>
                      <span className="bg-forest-855 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded-full">
                        Lvl {group.current_level}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      Aktif: {new Date(group.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Main Area: Detailed Responses Grid */}
        <div className="lg:col-span-2 bg-forest-900/30 border border-forest-850 rounded-2xl p-5 shadow-lg min-h-[400px] flex flex-col">
          {selectedGroupDetails ? (
            <div className="space-y-6 flex-1 flex flex-col">
              
              {/* Header Group Selected */}
              <div className="flex items-center justify-between border-b border-forest-800/80 pb-4">
                <div>
                  <h4 className="font-display font-extrabold text-xl text-white">
                    Monitoring: {selectedGroupDetails.group_name}
                  </h4>
                  <p className="text-xs text-slate-350">
                    Sedang di level: <strong className="text-emerald-400">Level {selectedGroupDetails.current_level}</strong>
                  </p>
                </div>
                
                {/* Level selector for Guru to inspect history */}
                <div className="flex items-center gap-1.5 bg-forest-950/80 px-2 py-1 rounded-xl border border-forest-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase px-1.5">LIHAT LEVEL:</span>
                  {[1, 2, 3, 4, 5].map((lvl) => {
                    const isCurrent = lvl === teacherSelectedLevel
                    const isLevelUnlocked = lvl <= selectedGroupDetails.current_level
                    return (
                      <button
                        key={lvl}
                        onClick={() => isLevelUnlocked && setTeacherSelectedLevel(lvl)}
                        className={`w-7 h-7 text-xs font-bold rounded-lg transition ${
                          isCurrent 
                            ? 'bg-lutung-orange text-white' 
                            : isLevelUnlocked 
                              ? 'bg-forest-900 hover:bg-forest-800 text-slate-200 cursor-pointer' 
                              : 'bg-forest-950 text-slate-600 cursor-not-allowed'
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

              {/* Content Detail Level */}
              <div className="space-y-6 flex-1">
                
                {/* Level Question Summary */}
                <div className="bg-forest-950/50 p-4 rounded-xl border border-forest-800 text-xs">
                  <span className="font-bold text-lutung-orange block mb-1 uppercase font-mono tracking-wider">
                    Tema Level {teacherSelectedLevel}: {levelsData[teacherSelectedLevel - 1].theme}
                  </span>
                  <p className="text-slate-300 font-semibold">{levelsData[teacherSelectedLevel - 1].question}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Column: Individual Submissions */}
                  <div className="space-y-3">
                    <h5 className="font-bold text-sm text-slate-350 border-b border-forest-800 pb-1 flex items-center gap-2">
                      <span>💬 Jawaban Anggota (Individu)</span>
                    </h5>
                    
                    {(() => {
                      const answers = selectedGroupDetails.individualAnswers.filter(
                        (ans) => ans.level_number === teacherSelectedLevel
                      )
                      
                      if (answers.length === 0) {
                        return <p className="text-xs text-slate-400 italic py-6 text-center bg-forest-950/20 rounded-xl border border-dashed border-forest-800">Belum ada anggota kelompok yang mengirimkan jawaban individu.</p>
                      }

                      return (
                        <div className="space-y-3 max-h-[300px] overflow-y-auto">
                          {answers.map((ans) => (
                            <div key={ans.id} className="bg-forest-950/40 p-3.5 rounded-xl border border-forest-800/60">
                              <div className="flex justify-between items-center mb-1.5">
                                <span className="font-bold text-xs text-white">{ans.member_name}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                  ans.answer === levelsData[teacherSelectedLevel - 1].correctAnswer 
                                    ? 'bg-emerald-950/80 text-emerald-350 border border-emerald-500/30' 
                                    : 'bg-rose-950/80 text-rose-350 border border-rose-500/30'
                                }`}>
                                  Pilihan: {ans.answer}
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed bg-forest-950/50 p-2 rounded-lg border border-forest-900">
                                &ldquo;{ans.reason}&rdquo;
                              </p>
                            </div>
                          ))}
                        </div>
                      )
                    })()}
                  </div>

                  {/* Column: Group Final Decision */}
                  <div className="space-y-3">
                    <h5 className="font-bold text-sm text-slate-350 border-b border-forest-800 pb-1">
                      🎯 Keputusan Akhir Kelompok
                    </h5>
                    
                    {(() => {
                      const decision = selectedGroupDetails.groupDecisions.find(
                        (dec) => dec.level_number === teacherSelectedLevel
                      )

                      if (!decision) {
                        return <p className="text-xs text-slate-400 italic py-6 text-center bg-forest-950/20 rounded-xl border border-dashed border-forest-800">Kelompok belum menyepakati & mengirimkan keputusan akhir level ini.</p>
                      }

                      const isCorrect = decision.final_answer === levelsData[teacherSelectedLevel - 1].correctAnswer

                      return (
                        <div className="bg-forest-950/60 p-4 rounded-xl border border-forest-800 shadow-inner space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">Keputusan</span>
                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                              isCorrect 
                                ? 'bg-emerald-950 text-emerald-355 border-emerald-500/30' 
                                : 'bg-rose-950 text-rose-350 border-rose-500/30'
                            }`}>
                              {isCorrect ? '✅ BENAR (Pilihan ' + decision.final_answer + ')' : '❌ SALAH (Pilihan ' + decision.final_answer + ')'}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Alasan Kesepakatan:</span>
                            <p className="text-xs text-slate-300 leading-relaxed bg-forest-950/60 p-3 rounded-lg border border-forest-855 italic">
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
              <span className="text-5xl">📊</span>
              <p className="text-sm font-medium">Pilih salah satu kelompok di kolom kiri untuk memantau data secara detail.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
