import React, { useState } from 'react'
import { supabase } from '../supabaseClient'

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
  const [activeTab, setActiveTab] = useState('monitoring') // 'monitoring' | 'summary'

  // Supabase deletion handler to clean up unused groups
  const handleDeleteGroup = async (groupId, groupName) => {
    const confirmDelete = window.confirm(`Apakah Anda yakin ingin menghapus kelompok "${groupName}"? Semua data jawaban dan keputusan kelompok ini akan dihapus secara permanen.`)
    if (!confirmDelete) return

    try {
      // 1. Delete associated individual answers
      const { error: iaError } = await supabase
        .from('individual_answers')
        .delete()
        .eq('group_id', groupId)
      if (iaError) throw iaError

      // 2. Delete associated group decisions
      const { error: gdError } = await supabase
        .from('group_decisions')
        .delete()
        .eq('group_id', groupId)
      if (gdError) throw gdError

      // 3. Delete the group itself
      const { error: gError } = await supabase
        .from('groups')
        .delete()
        .eq('id', groupId)
      if (gError) throw gError

      triggerAlert('success', `Kelompok "${groupName}" berhasil dihapus dari kelas.`)
      
      // Reset selected group state if we deleted the currently viewed group
      if (selectedGroupDetails?.id === groupId) {
        setSelectedGroupDetails(null)
      }
    } catch (err) {
      console.error("Gagal menghapus kelompok:", err)
      triggerAlert('error', `Gagal menghapus kelompok: ${err.message}`)
    }
  }

  // Calculate class summary stats
  const totalGroups = groups.length
  const averageLevel = totalGroups > 0 
    ? (groups.reduce((acc, g) => acc + g.current_level, 0) / totalGroups).toFixed(1) 
    : '0.0'
  const totalIndAnswers = groups.reduce((acc, g) => acc + (g.individualAnswers?.length || 0), 0)
  const totalGroupDecisions = groups.reduce((acc, g) => acc + (g.groupDecisions?.length || 0), 0)

  return (
    <div className="space-y-8 py-6 animate-fade-in text-forest-950 font-sans">
      
      {/* Top Banner Control Desk */}
      <div className="bg-white border-l-8 border-l-[#fec700] rounded-3xl p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl border-t border-r border-b border-slate-200/80 text-left">
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-display font-black text-[#02462e] flex flex-wrap items-center gap-2">
            Kelas Guru: <span className="bg-[#02462e] text-[#fec700] px-4 py-1.5 rounded-2xl text-xl sm:text-2xl font-black font-display">{teacherName}</span>
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200 shadow-inner w-full lg:w-auto justify-between sm:justify-start">
          <div className="text-left font-sans">
            <span className="text-xs text-slate-500 block tracking-wide font-bold">Kode Kelas (Bagikan ke Murid)</span>
            <span className="text-2xl sm:text-3xl font-display font-bold text-[#02462e] tracking-widest">{currentClass.class_code}</span>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(currentClass.class_code)
              triggerAlert('success', 'Kode kelas berhasil disalin ke clipboard!')
            }}
            className="bg-[#02462e] hover:bg-[#fec700] text-white hover:text-[#02462e] px-5 py-3.5 rounded-xl border border-[#02462e] transition duration-150 cursor-pointer flex items-center gap-2 font-display font-bold shadow-md"
            title="Salin Kode Kelas"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012 2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            <span className="text-xs font-bold font-display">Salin</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation (Teacher Dashboard Pages) */}
      <div className="flex border-b border-white/20 gap-2">
        <button
          onClick={() => setActiveTab('monitoring')}
          className={`px-6 py-3 rounded-t-2xl font-display font-bold text-sm transition duration-150 cursor-pointer flex items-center gap-2 ${
            activeTab === 'monitoring'
              ? 'bg-white text-[#02462e] shadow-sm'
              : 'bg-[#02462e]/40 text-white/80 hover:bg-[#02462e]/60'
          }`}
        >
         
          <span>Daftar Kelompok</span>
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`px-6 py-3 rounded-t-2xl font-display font-bold text-sm transition duration-150 cursor-pointer flex items-center gap-2 ${
            activeTab === 'summary'
              ? 'bg-white text-[#02462e] shadow-sm'
              : 'bg-[#02462e]/40 text-white/80 hover:bg-[#02462e]/60'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
          </svg>
          <span>Ringkasan Kelas & Statistik</span>
        </button>
      </div>

      {activeTab === 'monitoring' ? (
        /* ================= PAGE 1: MONITORING REAL-TIME ================= */
        <div className="space-y-6">
          {/* Horizontal Group Track */}
          <div className="space-y-3 text-left">
            <div className="flex items-center justify-between px-2">
              <h4 className="font-display font-black text-[#ffffff] text-lg sm:text-xl flex items-center gap-2">
                <svg className="w-5 h-5 text-[#fec700]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Kelompok Bergabung</span>
              </h4>
              <span className="bg-[#fec700] text-[#02462e] text-xs font-black px-3.5 py-1 rounded-full font-display shadow-sm">
                {groups.length}
              </span>
            </div>

            {groups.length === 0 ? (
              <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-4 font-sans">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center animate-pulse">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#02462e]"></div>
                </div>
                <p className="text-base font-bold text-slate-600 leading-relaxed">Menunggu kelompok murid bergabung menggunakan kode kelas...</p>
              </div>
            ) : (
              /* Horizontal Flex Deck */
              <div className="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-thin">
                {groups.map((group) => {
                  const isSelected = selectedGroupDetails?.id === group.id
                  const percentage = (group.current_level / 5) * 100
                  
                  return (
                    <div
                      key={group.id}
                      onClick={() => {
                        setSelectedGroupDetails(group)
                        setTeacherSelectedLevel(group.current_level)
                      }}
                      className={`min-w-[280px] sm:min-w-[320px] p-5 rounded-3xl border cursor-pointer transition duration-200 relative overflow-hidden flex flex-col justify-between gap-3 shadow-md hover:-translate-y-1 ${
                        isSelected 
                          ? 'bg-white border-4 border-[#fec700] scale-102 shadow-lg shadow-black/10' 
                          : 'bg-white/90 border-slate-200 hover:bg-white'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#fec700]"></div>
                      )}
                      
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold font-sans">Kelompok</span>
                          <h5 className="font-display font-extrabold text-base text-[#02462e] line-clamp-1">{group.group_name}</h5>
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-sans font-bold px-2.5 py-1 rounded-lg border ${
                            isSelected 
                              ? 'bg-[#02462e] text-[#fec700] border-[#fec700]' 
                              : 'bg-slate-100 text-slate-650 border-slate-200'
                          }`}>
                            Level {group.current_level}
                          </span>
                          {/* Trash Delete Group Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteGroup(group.id, group.group_name)
                            }}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition cursor-pointer"
                            title="Hapus Kelompok"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Tiny progress visualizer */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-bold text-slate-400">
                          <span>Progres Petualangan</span>
                          <span>{Math.round(percentage)}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-emerald-600 to-[#02462e] h-full rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Main Workspace Board */}
          {selectedGroupDetails ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-left">
              
              {/* Level Pathway Journey Picker */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 relative overflow-hidden">
                <div className="text-xs text-slate-400 font-bold block mb-4 text-center font-sans">Lihat Level:</div>
                
                <div className="relative flex items-center justify-between max-w-2xl mx-auto py-4">
                  {/* Connection Line */}
                  <div className="absolute left-0 right-0 h-1.5 bg-slate-200 top-1/2 -translate-y-1/2 z-0 rounded-full">
                    <div 
                      className="bg-gradient-to-r from-[#fec700] to-emerald-600 h-full rounded-full transition-all duration-300"
                      style={{ width: `${((selectedGroupDetails.current_level - 1) / 4) * 100}%` }}
                    ></div>
                  </div>

                  {[1, 2, 3, 4, 5].map((lvl) => {
                    const isCurrent = lvl === teacherSelectedLevel
                    const isLevelUnlocked = lvl <= selectedGroupDetails.current_level
                    const themeName = levelsData[lvl - 1].theme.split(' - ')[0]

                    return (
                      <div key={lvl} className="flex flex-col items-center gap-2 z-10 relative">
                        <button
                          onClick={() => isLevelUnlocked && setTeacherSelectedLevel(lvl)}
                          className={`w-12 h-12 rounded-full font-display font-black text-sm transition-all duration-200 flex items-center justify-center border-4 ${
                            isCurrent 
                              ? 'bg-[#02462e] text-[#fec700] border-[#fec700] scale-110 shadow-md ring-4 ring-[#02462e]/10' 
                              : isLevelUnlocked 
                                ? 'bg-[#fec700] text-[#02462e] border-[#02462e] hover:scale-105 cursor-pointer shadow-sm' 
                                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                          }`}
                          disabled={!isLevelUnlocked}
                          title={isLevelUnlocked ? `Level ${lvl}` : `Belum dicapai kelompok`}
                        >
                          {lvl}
                        </button>
                        <span className={`text-xs font-bold tracking-tight ${isCurrent ? 'text-[#02462e]' : 'text-slate-400'}`}>
                          {themeName}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Level Theme & Question Card */}
              <div className="bg-[#eaf3f0]/50 p-6 rounded-2xl border border-[#02462e]/10 relative overflow-hidden flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="space-y-1">
                  <h4 className="font-display font-black text-lg sm:text-xl text-[#02462e]">
                    Monitoring: {selectedGroupDetails.group_name}
                  </h4>
                  <p className="text-slate-500 text-sm font-semibold">
                    Sedang di level: <strong className="text-[#02462e] font-extrabold">Level {selectedGroupDetails.current_level}</strong>
                  </p>
                  <div className="pt-2 border-t border-[#02462e]/10 mt-2.5">
                    <span className="text-xs font-sans text-lutung-orange font-bold">
                      Tema Level {teacherSelectedLevel}: {levelsData[teacherSelectedLevel - 1].theme}
                    </span>
                    <p className="text-slate-700 text-base leading-relaxed font-bold max-w-3xl mt-1.5">{levelsData[teacherSelectedLevel - 1].question}</p>
                  </div>
                </div>
              </div>

              {/* Workspace Board Layout */}
              <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 items-stretch">
                
                {/* Left Side: Sticky Notes (Post-its) of Student Answers */}
                <div className="xl:col-span-3 bg-slate-50 border border-slate-200 rounded-3xl p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                    <svg className="w-5 h-5 text-[#02462e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <h5 className="font-bold text-xs sm:text-sm text-[#02462e] tracking-wider font-sans">Jawaban Anggota (Individu)</h5>
                  </div>

                  {(() => {
                    const answers = selectedGroupDetails.individualAnswers.filter(
                      (ans) => ans.level_number === teacherSelectedLevel
                    )
                    
                    if (answers.length === 0) {
                      return (
                        <div className="text-center py-20 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
                          <p className="text-sm font-bold italic">Belum ada anggota kelompok yang mengirimkan jawaban individu.</p>
                        </div>
                      )
                    }

                    return (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {answers.map((ans, idx) => {
                          const isCorrect = ans.answer === levelsData[teacherSelectedLevel - 1].correctAnswer
                          const rotationClass = idx % 2 === 0 ? 'rotate-[-1.5deg] hover:rotate-0' : 'rotate-[1.5deg] hover:rotate-0'
                          
                          return (
                            <div 
                              key={ans.id} 
                              className={`bg-[#fffef0] border border-amber-200/80 p-5 rounded-2xl relative shadow-md hover:shadow-lg transition duration-200 flex flex-col justify-between gap-3 ${rotationClass}`}
                            >
                              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-4.5 bg-[#fec700]/30 border border-[#fec700]/20 rounded-sm"></div>
                              
                              <div className="flex justify-between items-start mt-1.5">
                                <span className="font-display font-extrabold text-sm sm:text-base text-[#02462e] truncate pr-2">{ans.member_name}</span>
                                <span className={`text-[11px] font-sans font-bold px-2.5 py-0.5 rounded border ${
                                  isCorrect 
                                    ? 'bg-emerald-55 text-emerald-800 border-emerald-350' 
                                    : 'bg-rose-50 text-rose-800 border-rose-350'
                                }`}>
                                  Pilihan: {ans.answer}
                                </span>
                              </div>

                              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic bg-[#ffffff]/60 p-3 rounded-xl border border-amber-100 font-bold">
                                &ldquo;{ans.reason}&rdquo;
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    )
                  })()}
                </div>

                {/* Right Side: Parchment Consensus Scroll */}
                <div className="xl:col-span-2 bg-[#fdfaf2] border-2 border-[#fec700] rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col justify-between gap-6 relative">
                  <div className="absolute right-4 top-4 text-xs font-sans text-[#02462e]/45 font-bold select-none">Musyawarah Resmi</div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 border-b border-amber-200/60 pb-3">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h5 className="font-bold text-xs sm:text-sm text-[#02462e] tracking-wider font-sans">Keputusan Akhir Kelompok</h5>
                    </div>

                    {(() => {
                      const decision = selectedGroupDetails.groupDecisions.find(
                        (dec) => dec.level_number === teacherSelectedLevel
                      )

                      if (!decision) {
                        return (
                          <div className="text-center py-20 text-slate-455 space-y-4">
                            <div className="w-10 h-10 mx-auto rounded-full border-2 border-dashed border-amber-300 flex items-center justify-center animate-spin">
                              <div className="w-2 h-2 rounded-full bg-[#fec700]"></div>
                            </div>
                            <p className="text-xs sm:text-sm font-bold italic text-amber-800">Kelompok belum menyepakati & mengirimkan keputusan akhir level ini.</p>
                          </div>
                        )
                      }

                      const isCorrect = decision.final_answer === levelsData[teacherSelectedLevel - 1].correctAnswer

                      return (
                        <div className="space-y-5">
                          <div className="flex items-center justify-between">
                            <div className="text-left">
                              <span className="text-[10px] text-slate-500 font-bold font-sans block">Keputusan</span>
                              <span className="text-3xl font-bold text-[#02462e] font-display">{decision.final_answer}</span>
                            </div>

                            {/* Large Verification Stamp */}
                            <div className={`border-4 rounded-xl px-4 py-2 rotate-[-8deg] font-display font-black tracking-widest text-xs sm:text-sm inline-block shadow-sm ${
                              isCorrect 
                                ? 'text-emerald-700 border-emerald-600 bg-emerald-50/50' 
                                : 'text-rose-700 border-rose-600 bg-rose-50/50'
                            }`}>
                              {isCorrect ? '✓ Benar' : '✗ Salah'}
                            </div>
                          </div>

                          <div className="space-y-1.5 text-left">
                            <span className="text-[10px] text-slate-505 font-bold tracking-wider block font-sans">Alasan Kesepakatan:</span>
                            <div className="bg-white/80 p-4.5 rounded-2xl border border-amber-200/50 text-sm sm:text-base text-slate-700 leading-relaxed italic font-bold">
                              &ldquo;{decision.final_reason}&rdquo;
                            </div>
                          </div>
                        </div>
                      )
                    })()}
                  </div>

                  <div className="bg-[#fec700]/10 border border-[#fec700]/30 rounded-2xl p-4 text-xs text-[#02462e] leading-relaxed font-bold">
                    Tip: Guru dapat melacak level riwayat dengan menekan angka lingkaran di atas untuk memantau proses musyawarah murid.
                  </div>
                </div>
              </div>

            </div>
          ) : (
            /* Empty State */
            <div className="bg-white border border-slate-200 rounded-3xl p-16 shadow-xl flex flex-col items-center justify-center text-slate-400 py-20 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-50 border border-[#02462e]/30 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-[#02462e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z" />
                </svg>
              </div>
              <div className="space-y-1">
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-[340px] font-bold font-sans">Pilih salah satu kelompok di atas untuk memantau data secara detail.</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* ================= PAGE 2: RINGKASAN KELAS & STATISTIK ================= */
        <div className="space-y-8 animate-fade-in">
          
          {/* Stats Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="bg-white border-l-4 border-l-[#fec700] rounded-3xl p-5 shadow-lg border border-slate-200/80 space-y-1">
              <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider block font-sans">Total Kelompok</span>
              <span className="text-3xl font-display font-black text-[#02462e] block">{totalGroups}</span>
              <p className="text-xs text-slate-400 font-bold">Stasiun kelompok yang aktif bermain</p>
            </div>
            <div className="bg-white border-l-4 border-l-emerald-600 rounded-3xl p-5 shadow-lg border border-slate-200/80 space-y-1">
              <span className="text-[10px] text-slate-455 uppercase font-bold tracking-wider block font-sans">Kemajuan Rata-Rata</span>
              <span className="text-3xl font-display font-black text-[#02462e] block">Level {averageLevel}</span>
              <p className="text-xs text-slate-400 font-bold">Tingkat misi rata-rata kelas</p>
            </div>
            <div className="bg-white border-l-4 border-l-lutung-orange rounded-3xl p-5 shadow-lg border border-slate-200/80 space-y-1">
              <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider block font-sans">Gagasan Kelas (Individu)</span>
              <span className="text-3xl font-display font-black text-[#02462e] block">{totalIndAnswers}</span>
              <p className="text-xs text-slate-400 font-bold">Total tanggapan mandiri murid</p>
            </div>
            <div className="bg-white border-l-4 border-l-purple-600 rounded-3xl p-5 shadow-lg border border-slate-200/80 space-y-1">
              <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider block font-sans">Keputusan Konsensus</span>
              <span className="text-3xl font-display font-black text-[#02462e] block">{totalGroupDecisions}</span>
              <p className="text-xs text-slate-400 font-bold">Kesepakatan akhir level yang dikirim</p>
            </div>
          </div>

          {/* Detailed Classroom Manager Table */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl text-left">
            <div className="border-b border-slate-100 pb-4 mb-4">
              <h4 className="font-display font-black text-[#02462e] text-lg sm:text-xl">Manajer Kelompok & Partisipasi</h4>
              <p className="text-xs text-slate-450 font-bold">Kelola kelompok, pantau keaktifan siswa, dan rapikan kelompok yang tidak aktif.</p>
            </div>

            {groups.length === 0 ? (
              <div className="py-12 text-center text-slate-400">
                <p className="text-sm font-bold">Belum ada data kelompok untuk dirangkum.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-sans">
                  <thead>
                    <tr className="border-b border-slate-200 text-xs font-bold text-slate-500 tracking-wider">
                      <th className="py-3 px-4">Nama Kelompok</th>
                      <th className="py-3 px-4">Kemajuan Level</th>
                      <th className="py-3 px-4 text-center">Partisipasi (Individu)</th>
                      <th className="py-3 px-4 text-center">Kesepakatan (Group)</th>
                      <th className="py-3 px-4 text-center">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((group) => (
                      <tr key={group.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition">
                        <td className="py-4.5 px-4">
                          <span className="font-display font-extrabold text-base text-[#02462e]">{group.group_name}</span>
                          <span className="block text-xs text-slate-400 font-bold mt-0.5 font-sans">Dibuat: {new Date(group.created_at).toLocaleDateString('id-ID')}</span>
                        </td>
                        <td className="py-4.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-sans font-black px-2 py-0.5 rounded bg-emerald-50 border border-emerald-250 text-[#02462e]">Level {group.current_level}/5</span>
                            <div className="w-20 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-[#02462e] h-full" style={{ width: `${(group.current_level / 5) * 100}%` }}></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4.5 px-4 text-center">
                          <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">{group.individualAnswers?.length || 0} Tanggapan</span>
                        </td>
                        <td className="py-4.5 px-4 text-center">
                          <span className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">{group.groupDecisions?.length || 0} Level</span>
                        </td>
                        <td className="py-4.5 px-4 text-center">
                          <button
                            onClick={() => handleDeleteGroup(group.id, group.group_name)}
                            className="bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 font-display font-bold text-xs px-3.5 py-2 rounded-xl transition duration-150 cursor-pointer flex items-center gap-1.5 mx-auto border border-rose-200/60"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1v3M4 7h16" />
                            </svg>
                            <span>Hapus Kelompok</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
