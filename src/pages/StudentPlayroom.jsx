import React, { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'
import StudentMaterial from '../components/student/StudentMaterial'
import StudentQuestion from '../components/student/StudentQuestion'
import StudentDiscussion from '../components/student/StudentDiscussion'
import StudentVideo from '../components/student/StudentVideo'
import StudentBadge from '../components/student/StudentBadge'

export default function StudentPlayroom({
  studentGroup,
  setStudentGroup,
  levelsData,
  handleLogout,
  triggerAlert
}) {
  const isLvlFinished = studentGroup.current_level > 5

  // Local Student States
  const [individualAnswers, setIndividualAnswers] = useState([])
  const [groupDecision, setGroupDecision] = useState(null)

  const [memberNameInput, setMemberNameInput] = useState('')
  const [memberAnswerInput, setMemberAnswerInput] = useState('')
  const [memberReasonInput, setMemberReasonInput] = useState('')

  const [groupAnswerInput, setGroupAnswerInput] = useState('')
  const [groupReasonInput, setGroupReasonInput] = useState('')

  // Game Loop stages: 'material' | 'question' | 'video' | 'badge'
  const [stage, setStage] = useState('material')
  const [showDiscussion, setShowDiscussion] = useState(false)

  // Fetch Playroom Data
  const fetchStudentLevelData = async () => {
    if (!studentGroup) return
    try {
      const level = studentGroup.current_level

      const { data: indData } = await supabase
        .from('individual_answers')
        .select('*')
        .eq('group_id', studentGroup.id)
        .eq('level_number', level)

      const { data: decData } = await supabase
        .from('group_decisions')
        .select('*')
        .eq('group_id', studentGroup.id)
        .eq('level_number', level)
        .maybeSingle()

      setIndividualAnswers(indData || [])
      setGroupDecision(decData || null)
      
      if (decData) {
        setGroupAnswerInput(decData.final_answer)
        setGroupReasonInput(decData.final_reason)
      } else {
        setGroupAnswerInput('')
        setGroupReasonInput('')
      }
    } catch (err) {
      console.error("Gagal mengambil data level:", err)
    }
  }

  // Load and Subscribe locally to changes
  useEffect(() => {
    if (!studentGroup) return

    fetchStudentLevelData()

    const channel = supabase.channel(`group-play-${studentGroup.id}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'individual_answers', 
        filter: `group_id=eq.${studentGroup.id}` 
      }, () => {
        fetchStudentLevelData()
      })
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'group_decisions', 
        filter: `group_id=eq.${studentGroup.id}` 
      }, () => {
        fetchStudentLevelData()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [studentGroup?.current_level, studentGroup?.id])

  // Reset stage to 'material' whenever the active level changes
  useEffect(() => {
    setStage('material')
    setShowDiscussion(false)
  }, [studentGroup.current_level])

  // Auto-advance to explanation video if group decision is already submitted
  useEffect(() => {
    if (groupDecision) {
      setStage('video')
    }
  }, [groupDecision])

  // Handle individual answer submit
  const handleIndividualSubmit = async (e) => {
    e.preventDefault()
    if (!memberNameInput.trim() || !memberAnswerInput || !memberReasonInput.trim()) {
      triggerAlert('error', 'Semua kolom jawaban individu wajib diisi!')
      return
    }

    try {
      const { error } = await supabase
        .from('individual_answers')
        .insert([{
          group_id: studentGroup.id,
          level_number: studentGroup.current_level,
          member_name: memberNameInput.trim(),
          answer: memberAnswerInput,
          reason: memberReasonInput.trim()
        }])

      if (error) throw error

      setMemberNameInput('')
      setMemberAnswerInput('')
      setMemberReasonInput('')
      triggerAlert('success', 'Jawaban individu Anda berhasil dikirim!')
      await fetchStudentLevelData()
    } catch (err) {
      console.error(err)
      triggerAlert('error', `Gagal mengirim jawaban: ${err.message}`)
    }
  }

  // Handle group final consensus decision submit
  const handleGroupSubmit = async (e) => {
    e.preventDefault()
    if (!groupAnswerInput || !groupReasonInput.trim()) {
      triggerAlert('error', 'Kolom keputusan akhir kelompok wajib diisi!')
      return
    }

    try {
      const { data, error } = await supabase
        .from('group_decisions')
        .insert([{
          group_id: studentGroup.id,
          level_number: studentGroup.current_level,
          final_answer: groupAnswerInput,
          final_reason: groupReasonInput.trim()
        }])
        .select()
        .single()

      if (error) throw error

      setGroupDecision(data)
      triggerAlert('success', 'Keputusan akhir kelompok berhasil dikirim!')
      await fetchStudentLevelData()
    } catch (err) {
      console.error(err)
      triggerAlert('error', `Gagal mengirim keputusan: ${err.message}`)
    }
  }

  // Advance group to the next level
  const handleNextLevel = async () => {
    const nextLvl = studentGroup.current_level + 1
    
    try {
      const { data: updatedGroup, error } = await supabase
        .from('groups')
        .update({ current_level: nextLvl })
        .eq('id', studentGroup.id)
        .select()
        .single()

      if (error) throw error

      setStudentGroup(updatedGroup)
      localStorage.setItem('student_group', JSON.stringify(updatedGroup))
      
      if (nextLvl <= 5) {
        triggerAlert('success', `Naik ke Level ${nextLvl}!`)
      }
    } catch (err) {
      console.error(err)
      triggerAlert('error', `Gagal naik level: ${err.message}`)
    }
  }

  // Custom vector badge icon renderer for final graduation screen
  const renderBadge = (level, size = "md") => {
    const sizeClasses = size === "lg" ? "w-16 h-16" : "w-10 h-10"
    const colorClasses = {
      1: "text-[#02462e] bg-emerald-50 border-emerald-500/25",
      2: "text-green-700 bg-green-50 border-green-500/25",
      3: "text-amber-700 bg-amber-50 border-amber-500/25",
      4: "text-orange-700 bg-orange-50 border-orange-500/25",
      5: "text-yellow-700 bg-yellow-50 border-yellow-500/25"
    }

    const icons = {
      1: ( // Habitat - Star/Globe
        <svg className="w-full h-full p-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      2: ( // Food - Leaf
        <svg className="w-full h-full p-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      3: ( // Threat - Shield
        <svg className="w-full h-full p-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      4: ( // Social - Heart
        <svg className="w-full h-full p-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      5: ( // Rescue - Trophy/Star
        <svg className="w-full h-full p-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20" />
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
    <div className="space-y-8 py-6 animate-fade-in text-forest-950 font-sans">
      
      {/* Level & Group Title Header */}
      {!isLvlFinished && (
        <div className="paper-container-shadow">
          <div className="card-paper paper-rough-2 p-6 pl-9 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-left relative">
            <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-[#fec700] z-20"></div>
            
            <div className="flex flex-col gap-1.5 relative z-10">
              <h3 className="text-xl sm:text-2xl font-display font-extrabold text-[#02462e]">
                Kelompok: <span className="bg-[#02462e] text-[#fec700] px-3.5 py-1 rounded-xl text-base sm:text-lg font-black font-sans">{studentGroup.group_name}</span>
              </h3>
            </div>
            
            <div className="flex items-center gap-3 relative z-10">
              <span className="text-xs text-slate-500 font-boldtracking-wider font-sans">Level Aktif:</span>
              <div className="bg-[#02462e] text-[#fec700] font-display font-black text-sm px-4 py-2.5 rounded-2xl shadow-sm tracking-wider flex items-center gap-2 border border-[#fec700]/30">
                <span>LEVEL {studentGroup.current_level}</span>
                <span className="text-xs bg-black/20 px-2 py-0.5 rounded-lg font-display">{studentGroup.current_level}/5</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Graduation Victory Screen */}
      {isLvlFinished ? (
        <div className="max-w-2xl mx-auto paper-container-shadow">
          <div className="card-paper-yellow paper-rough-1 p-8 sm:p-12 text-center space-y-8 relative">
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#fec700]/30 border border-[#fec700]/20 rounded-sm z-20"></div>
            
            <div className="space-y-4 relative z-10">
              <div className="relative w-24 h-24 mx-auto flex items-center justify-center bg-emerald-50 border border-emerald-250/40 rounded-full shadow-inner">
                <svg className="w-12 h-12 text-[#fec700] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 14a7 7 0 007-7V4H5v3a7 7 0 007 7zm0 0v5m-4 0h8m-12-8h4m10 0h4" />
                </svg>
              </div>
              <h3 className="text-3xl sm:text-4xl font-display font-black text-[#02462e] leading-tight">
                Selamat! Kelompok Anda Lulus Sebagai Pahlawan Konservasi
              </h3>
              <p className="text-slate-655 text-sm sm:text-base max-w-lg mx-auto leading-relaxed font-semibold">
                Anda telah menyelesaikan seluruh 5 level tantangan edukasi konservasi Lutung Jawa dengan sempurna. Kelompok Anda berhak menyandang gelar dan lencana berikut:
              </p>
            </div>

            {/* Show All Badges Earned */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 relative z-10">
              {levelsData.map((lvl) => (
                <div key={lvl.level} className="bg-white/60 p-4 rounded-2xl border border-amber-200/50 flex flex-col items-center gap-2 shadow-sm">
                  {renderBadge(lvl.level, "md")}
                  <span className="text-[10px] font-bold text-forest-950 block text-center line-clamp-1">{lvl.badgeName}</span>
                  <span className="text-[8px] text-emerald-700 font-sans tracking-wider">Level {lvl.level}</span>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-350/60 space-y-4 relative z-10">
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-semibold">
                Beritahu Guru Anda bahwa kelompok Anda telah berhasil menyelesaikan pembelajaran untuk verifikasi nilai.
              </p>
              <button 
                onClick={handleLogout}
                className="bg-lutung-orange hover:bg-lutung-orange/90 text-white font-display font-black px-8 py-4 rounded-2xl shadow-md transition duration-150 cursor-pointer"
              >
                Selesaikan Pembelajaran & Keluar
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* PLAY ROOM GAME LOOP OF CURRENT LEVEL */
        (() => {
          const currentLvlData = levelsData[studentGroup.current_level - 1]

          return (
            <div className="space-y-8">
              
              {/* STAGE 1: Study Material */}
              {stage === 'material' && (
                <StudentMaterial 
                  currentLvlData={currentLvlData} 
                  onNext={() => setStage('question')}
                />
              )}

              {/* STAGE 2 & 3: Question and choices with expandable Discussion Section */}
              {stage === 'question' && (
                <div className="space-y-8">
                  <StudentQuestion
                    currentLvlData={currentLvlData}
                    memberNameInput={memberNameInput}
                    setMemberNameInput={setMemberNameInput}
                    memberAnswerInput={memberAnswerInput}
                    setMemberAnswerInput={setMemberAnswerInput}
                    memberReasonInput={memberReasonInput}
                    setMemberReasonInput={setMemberReasonInput}
                    handleIndividualSubmit={handleIndividualSubmit}
                    individualAnswers={individualAnswers}
                    onStartDiscussion={() => setShowDiscussion(true)}
                    showDiscussion={showDiscussion}
                  />

                  {showDiscussion && (
                    <StudentDiscussion
                      individualAnswers={individualAnswers}
                      currentLvlData={currentLvlData}
                      groupAnswerInput={groupAnswerInput}
                      setGroupAnswerInput={setGroupAnswerInput}
                      groupReasonInput={groupReasonInput}
                      setGroupReasonInput={setGroupReasonInput}
                      handleGroupSubmit={handleGroupSubmit}
                      studentGroup={studentGroup}
                    />
                  )}
                </div>
              )}

              {/* STAGE 4: Explanation Video */}
              {stage === 'video' && (
                <StudentVideo
                  currentLvlData={currentLvlData}
                  onNext={() => setStage('badge')}
                />
              )}

              {/* STAGE 5: Badge Reward Screen */}
              {stage === 'badge' && (
                <StudentBadge
                  studentGroup={studentGroup}
                  currentLvlData={currentLvlData}
                  groupDecision={groupDecision}
                  handleNextLevel={handleNextLevel}
                />
              )}

            </div>
          )
        })()
      )}

    </div>
  )
}
