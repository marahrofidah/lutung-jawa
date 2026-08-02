import React from 'react'

export default function StudentVideo({ currentLvlData, onNext }) {
  return (
    <div className="max-w-3xl mx-auto space-y-6 py-4 animate-scale-up text-left">
      <div className="paper-container-shadow">
        <div className="card-paper paper-rough-1 p-6 sm:p-8 space-y-6 relative overflow-hidden">
          
          <div className="border-b border-[#02462e]/10 pb-4">
            <span className="text-[12px] font-sans bg-[#02462e] text-[#fec700] border border-[#fec700]/30 px-3 py-1 rounded-lg font-extrabold tracking-wider">
             Tahap 4: Pembahasan
            </span>
            <h4 className="font-display font-black text-2xl text-[#02462e] mt-3">
              Materi Penjelasan Level {currentLvlData.level}
            </h4>
          </div>

          {/* Video Player */}
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-slate-200 bg-black shadow-md relative z-10">
            <iframe 
              src={currentLvlData.videoUrl} 
              title="YouTube video player" 
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
            ></iframe>
          </div>

          {/* Theory Discussion Text */}
          <div className="paper-container-shadow relative z-10">
            <div className="card-paper-yellow paper-rough-2 p-5 space-y-2">
              <span className="font-display font-black text-[#02462e] text-xs uppercase tracking-wider block">
                {Number(currentLvlData?.level) === 1 || Number(currentLvlData?.level) === 2 ? "Umpan Balik:" : "Pembahasan Ilmiah:"}
              </span>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify font-bold italic">
                {currentLvlData.discussion}
              </p>
            </div>
          </div>

          {/* Finish Button */}
          <div className="pt-4 border-t border-[#02462e]/10 flex justify-end relative z-10">
            <button
              onClick={onNext}
              className="bg-[#02462e] hover:bg-[#fec700] text-white hover:text-[#02462e] font-display font-black px-8 py-3.5 rounded-2xl shadow-md transition duration-150 cursor-pointer border border-[#02462e] flex items-center gap-2 text-sm sm:text-base"
            >
              <span>Selesai Menonton & Lihat Hasil</span>
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
