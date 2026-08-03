import { useState, useEffect, useRef } from 'react'
import { supabase } from './supabaseClient'
import { levelsData } from './data/levelsData'
import imgDaunCursor from './assets/daun.webp'
import imgBgRole from './assets/bg-role.webp'
import imgBgDashboard from './assets/bg-dashboard.webp'

// Import Components & Pages
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import RoleSelection from './pages/RoleSelection'
import TeacherSetup from './pages/TeacherSetup'
import TeacherDashboard from './pages/TeacherDashboard'
import StudentSetup from './pages/StudentSetup'
import StudentPlayroom from './pages/StudentPlayroom'

function App() {
  // Navigation & Role States
  // 'landing', 'role-selection', 'teacher-setup', 'teacher-dashboard', 'student-setup', 'student-playroom'
  const [screen, setScreen] = useState('landing')
  
  // Real-time Connection State
  const [dbConnected, setDbConnected] = useState(false)

  // Teacher States
  const [teacherName, setTeacherName] = useState('')
  const [currentClass, setCurrentClass] = useState(null)
  const [groups, setGroups] = useState([])
  const [selectedGroupDetails, setSelectedGroupDetails] = useState(null)
  const [teacherSelectedLevel, setTeacherSelectedLevel] = useState(1)

  // Student States
  const [groupName, setGroupName] = useState('')
  const [classCodeInput, setClassCodeInput] = useState('')
  const [studentClass, setStudentClass] = useState(null)
  const [studentGroup, setStudentGroup] = useState(null)
  // Show status alerts
  const [alertMsg, setAlertMsg] = useState({ type: '', text: '' })

  // Background music states
  const audioRef = useRef(null)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(0.4) // default 40% volume

  // Sync volume state to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Custom cursor state
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 })
  const [isHovered, setIsHovered] = useState(false)
  const [isCursorVisible, setIsCursorVisible] = useState(false)

  // Custom leaf cursor mouse listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      
      // Hide if mouse goes near the viewport boundaries (fail-safe), show otherwise
      if (
        e.clientX < 4 || 
        e.clientY < 4 || 
        e.clientX > window.innerWidth - 4 || 
        e.clientY > window.innerHeight - 4
      ) {
        setIsCursorVisible(false)
      } else {
        setIsCursorVisible(true)
      }
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (!target) return
      const isClickable = target.closest('button') || target.closest('a') || target.closest('.cursor-pointer') || target.tagName === 'BUTTON' || target.tagName === 'A'
      setIsHovered(!!isClickable)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  // Check Supabase connection on load & restore session
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { error } = await supabase.from('classes').select('count', { count: 'exact', head: true })
        if (!error) setDbConnected(true)
      } catch (err) {
        console.error("Supabase connection check failed:", err)
        setDbConnected(false)
      }
    }
    checkConnection()

    // Restore Student/Teacher Session if available
    const savedRole = localStorage.getItem('role')
    if (savedRole === 'student') {
      const savedGroup = localStorage.getItem('student_group')
      const savedClass = localStorage.getItem('student_class')
      if (savedGroup && savedClass) {
        const parsedGroup = JSON.parse(savedGroup)
        const parsedClass = JSON.parse(savedClass)
        const verifySession = async () => {
          const { data: groupData } = await supabase.from('groups').select('*').eq('id', parsedGroup.id).maybeSingle()
          if (groupData) {
            setStudentGroup(groupData)
            setStudentClass(parsedClass)
            setScreen('student-playroom')
            triggerAlert('success', `Sesi kelompok '${groupData.group_name}' berhasil dipulihkan!`)
          } else {
            localStorage.clear()
          }
        }
        verifySession()
      }
    } else if (savedRole === 'teacher') {
      const savedClass = localStorage.getItem('teacher_class')
      if (savedClass) {
        const parsedClass = JSON.parse(savedClass)
        const verifyClass = async () => {
          const { data: classData } = await supabase.from('classes').select('*').eq('id', parsedClass.id).maybeSingle()
          if (classData) {
            setCurrentClass(classData)
            setTeacherName(classData.teacher_name)
            setScreen('teacher-dashboard')
            triggerAlert('success', `Dashboard Kelas ${classData.class_code} berhasil dipulihkan!`)
          } else {
            localStorage.clear()
          }
        }
        verifyClass()
      }
    }
  }, [])

  // Helper alert function
  const triggerAlert = (type, text) => {
    setAlertMsg({ type, text })
    setTimeout(() => {
      setAlertMsg({ type: '', text: '' })
    }, 4500)
  }

  // --- TEACHER ACTIONS ---
  const handleTeacherSetup = async (e) => {
    e.preventDefault()
    if (!teacherName.trim()) return
    
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
    const code = `LTJ-${rand}`

    try {
      const { data, error } = await supabase
        .from('classes')
        .insert([{ class_code: code, teacher_name: teacherName }])
        .select()
        .single()

      if (error) throw error

      setCurrentClass(data)
      localStorage.setItem('role', 'teacher')
      localStorage.setItem('teacher_class', JSON.stringify(data))
      setScreen('teacher-dashboard')
      triggerAlert('success', `Kelas baru berhasil dibuat dengan Kode: ${code}`)
    } catch (err) {
      console.error(err)
      triggerAlert('error', `Gagal membuat kelas: ${err.message}`)
    }
  }

  // Fetch groups data for Teacher Dashboard
  const fetchTeacherData = async () => {
    if (!currentClass) return
    try {
      const { data: groupsData, error: gError } = await supabase
        .from('groups')
        .select('*')
        .eq('class_id', currentClass.id)
        .order('created_at', { ascending: true })

      if (gError) throw gError

      const enrichedGroups = await Promise.all(groupsData.map(async (g) => {
        const { data: indAnsw } = await supabase
          .from('individual_answers')
          .select('*')
          .eq('group_id', g.id)

        const { data: decAnsw } = await supabase
          .from('group_decisions')
          .select('*')
          .eq('group_id', g.id)

        return {
          ...g,
          individualAnswers: indAnsw || [],
          groupDecisions: decAnsw || []
        }
      }))

      setGroups(enrichedGroups)
      setSelectedGroupDetails(prev => {
        if (!prev) return null
        const fresh = enrichedGroups.find(g => g.id === prev.id)
        return fresh ? fresh : null
      })
    } catch (err) {
      console.error("Gagal mengambil data monitoring:", err)
    }
  }

  // Load and subscribe in Teacher Dashboard
  useEffect(() => {
    if (screen !== 'teacher-dashboard' || !currentClass) return

    fetchTeacherData()

    const channel = supabase.channel(`class-monitor-${currentClass.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'groups', filter: `class_id=eq.${currentClass.id}` }, () => {
        fetchTeacherData()
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'individual_answers' }, () => {
        fetchTeacherData()
      })
      .on('postgres_changes', { event: '*', schema: 'public', table: 'group_decisions' }, () => {
        fetchTeacherData()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [screen, currentClass])

  // --- STUDENT ACTIONS ---
  const handleStudentJoin = async (e) => {
    e.preventDefault()
    if (!groupName.trim() || !classCodeInput.trim()) return

    const formattedCode = classCodeInput.trim().toUpperCase()

    try {
      // Find Class
      const { data: classData, error: cError } = await supabase
        .from('classes')
        .select('*')
        .eq('class_code', formattedCode)
        .maybeSingle()

      if (cError) throw cError
      if (!classData) {
        triggerAlert('error', `Kode kelas '${formattedCode}' tidak ditemukan!`)
        return
      }

      // Check if group name already exists
      const { data: existingGroup } = await supabase
        .from('groups')
        .select('*')
        .eq('class_id', classData.id)
        .eq('group_name', groupName.trim())
        .maybeSingle()

      if (existingGroup) {
        triggerAlert('error', `Nama kelompok '${groupName}' sudah digunakan.`)
        return
      }

      const { data: newGroup, error: gError } = await supabase
        .from('groups')
        .insert([{ class_id: classData.id, group_name: groupName.trim(), current_level: 1 }])
        .select()
        .single()

      if (gError) throw gError

      setStudentClass(classData)
      setStudentGroup(newGroup)
      localStorage.setItem('role', 'student')
      localStorage.setItem('student_group', JSON.stringify(newGroup))
      localStorage.setItem('student_class', JSON.stringify(classData))
      setScreen('student-playroom')
      triggerAlert('success', `Berhasil bergabung dengan kelas ${classData.class_code}!`)
    } catch (err) {
      console.error(err)
      triggerAlert('error', `Gagal masuk kelas: ${err.message}`)
    }
  }



  // Exit/Logout session
  const handleLogout = () => {
    if (window.confirm("Apakah Anda yakin ingin keluar dari sesi ini?")) {
      localStorage.clear()
      setScreen('landing')
      setCurrentClass(null)
      setStudentGroup(null)
      setStudentClass(null)
      setGroups([])
    }
  }

  const isRoleSelection = screen === 'role-selection';
  const isTeacherSetup = screen === 'teacher-setup';
  const isTeacherDashboard = screen === 'teacher-dashboard';
  const isStudentSetup = screen === 'student-setup';
  const isStudentPlayroom = screen === 'student-playroom';

  return (
    <div 
      className={`font-sans min-h-screen flex flex-col selection:bg-lutung-orange selection:text-white transition-all duration-300 ${
        isRoleSelection
          ? 'bg-cover bg-center bg-no-repeat text-forest-950'
          : isTeacherSetup
            ? 'bg-[#ffcc00] text-forest-950' 
            : (isTeacherDashboard || isStudentPlayroom)
              ? 'bg-cover bg-center bg-no-repeat bg-fixed text-forest-950' 
              : isStudentSetup
                ? 'bg-[#02462e] text-forest-950'
                : 'bg-[#f6f5ee] text-forest-950'
      }`}
      style={
        isRoleSelection 
          ? { backgroundImage: `url(${imgBgRole})` } 
          : (isTeacherDashboard || isStudentPlayroom)
            ? { backgroundImage: `url(${imgBgDashboard})` } 
            : {}
      }
    >
      
      {/* Alert Notification */}
      {alertMsg.text && (
        <div className={`fixed top-5 right-5 z-50 p-4 rounded-xl shadow-2xl border backdrop-blur-md transition-all duration-300 max-w-sm transform translate-y-0 ${
          alertMsg.type === 'success' 
            ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' 
            : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
        }`}>
          <div className="flex items-center gap-3">
            <span className="text-xl">{alertMsg.type === 'success' ? '⚡' : '⚠️'}</span>
            <p className="text-sm font-medium">{alertMsg.text}</p>
          </div>
        </div>
      )}

      {/* HEADER */}
      {screen !== 'landing' && screen !== 'role-selection' && screen !== 'teacher-setup' && screen !== 'student-setup' && (
        <Header 
          dbConnected={dbConnected} 
          screen={screen} 
          handleLogout={handleLogout} 
          setScreen={setScreen} 
        />
      )}

      {/* MAIN CONTAINER */}
      {screen === 'landing' ? (
        <LandingPage setScreen={setScreen} />
      ) : (
        <main className={`flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col ${(screen === 'teacher-dashboard' || screen === 'student-playroom') ? 'justify-start pt-32 pb-6 sm:pb-8 lg:pb-10' : 'justify-center py-4 sm:py-6 lg:py-8'}`}>
          {screen === 'role-selection' && (
            <RoleSelection setScreen={setScreen} />
          )}

          {screen === 'teacher-setup' && (
            <TeacherSetup 
              teacherName={teacherName} 
              setTeacherName={setTeacherName} 
              handleTeacherSetup={handleTeacherSetup} 
              setScreen={setScreen} 
            />
          )}

          {screen === 'teacher-dashboard' && currentClass && (
            <TeacherDashboard 
              teacherName={teacherName}
              currentClass={currentClass}
              groups={groups}
              selectedGroupDetails={selectedGroupDetails}
              setSelectedGroupDetails={setSelectedGroupDetails}
              teacherSelectedLevel={teacherSelectedLevel}
              setTeacherSelectedLevel={setTeacherSelectedLevel}
              levelsData={levelsData}
              triggerAlert={triggerAlert}
              onRefreshData={fetchTeacherData}
            />
          )}

          {screen === 'student-setup' && (
            <StudentSetup 
              groupName={groupName}
              setGroupName={setGroupName}
              classCodeInput={classCodeInput}
              setClassCodeInput={setClassCodeInput}
              handleStudentJoin={handleStudentJoin}
              setScreen={setScreen}
            />
          )}

          {screen === 'student-playroom' && studentGroup && (
            <StudentPlayroom 
              studentGroup={studentGroup}
              setStudentGroup={setStudentGroup}
              levelsData={levelsData}
              handleLogout={handleLogout}
              triggerAlert={triggerAlert}
            />
          )}
        </main>
      )}

      {/* FOOTER */}
      {screen !== 'landing' && (
        <footer className="mt-auto px-6 py-6 text-center text-xs space-y-1 transition-all duration-300 bg-transparent border-none text-gray-500">
          <p>© 2026 Edukasi Konservasi Lutung Jawa.</p>
          <p className="text-[10px] font-mono transition-colors text-emerald-800/80">Didedikasikan untuk Kelestarian Satwa Endemik Indonesia</p>
        </footer>
      )}

      {/* Custom Leaf Cursor */}
      {isCursorVisible && (
        <div 
          className="hidden md:block fixed pointer-events-none z-[9999] transition-[width,height,transform] duration-200 ease-out"
          style={{
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            width: isHovered ? '34px' : '26px',
            height: isHovered ? '34px' : '26px',
            transform: `translate(-50%, -10%) rotate(${isHovered ? '25deg' : '0deg'})`,
            transformOrigin: '50% 10%',
          }}
        >
          <img src={imgDaunCursor} alt="leaf-cursor" className="w-full h-full object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" />
        </div>
      )}

      {/* HTML5 Background Audio Element */}
      <audio 
        ref={audioRef} 
        src="/bg-music.mp3" 
        loop 
        preload="auto"
      />

      {/* Floating Background Music Controller */}
      <div 
        className="fixed bottom-5 left-5 z-50 flex items-center gap-2 bg-amber-950/80 border border-[#5c3a21] py-1.5 px-2 rounded-full shadow-lg group hover:pr-4 transition-all duration-300 backdrop-blur-sm"
      >
        <button
          onClick={() => {
            if (!audioRef.current) return
            if (isMuted) {
              audioRef.current.play().catch(err => console.log("Autoplay blocked:", err))
              setIsMuted(false)
            } else {
              audioRef.current.pause()
              setIsMuted(true)
            }
          }}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-205 cursor-pointer shrink-0 ${
            isMuted 
              ? 'bg-amber-900 border border-[#5c3a21] text-[#f7e7d0] hover:bg-amber-800' 
              : 'bg-emerald-700 text-white hover:bg-emerald-650 animate-pulse'
          }`}
          title={isMuted ? "Putar Musik Latar" : "Senapkan Musik"}
        >
          {isMuted ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          ) : (
            <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          )}
        </button>

        {/* Volume Slider (Slide-out on hover) */}
        <div className="w-0 overflow-hidden group-hover:w-20 transition-all duration-300 flex items-center">
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => {
              const val = parseFloat(e.target.value)
              setVolume(val)
              if (audioRef.current) {
                audioRef.current.volume = val
                // If user changes volume, make sure they hear it
                if (val > 0 && isMuted) {
                  audioRef.current.play().catch(err => console.log("Autoplay blocked:", err))
                  setIsMuted(false)
                } else if (val === 0 && !isMuted) {
                  audioRef.current.pause()
                  setIsMuted(true)
                }
              }
            }}
            className="w-20 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#fec700] hover:accent-[#ffd000]"
            title={`Volume: ${Math.round(volume * 100)}%`}
          />
        </div>
      </div>

    </div>
  )
}

export default App
