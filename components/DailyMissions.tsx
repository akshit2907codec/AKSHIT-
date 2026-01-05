
import React from 'react';
import { DailyMission } from '../types';

interface DailyMissionsProps {
  missions: DailyMission[];
  onComplete: (missionId: string) => void;
}

const DailyMissions: React.FC<DailyMissionsProps> = ({ missions, onComplete }) => {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header>
        <h2 className="text-5xl font-black tracking-tighter dark:text-slate-50 text-slate-900 mb-2 uppercase underline decoration-indigo-600 underline-offset-8">DAILY MISSIONS</h2>
        <p className="dark:text-slate-400 text-slate-500 text-lg font-bold uppercase tracking-tight">Complete daily tasks to accelerate your ranking.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {missions.map((mission) => (
          <div 
            key={mission.id}
            className={`dark:bg-slate-900 bg-white/50 border transition-all hover:bg-white/80 dark:hover:bg-slate-800 p-8 rounded-[2.5rem] relative overflow-hidden shadow-xl backdrop-blur-sm ${
              mission.isCompleted ? 'border-emerald-500/30' : 'dark:border-slate-800 border-[#DCD3BC]'
            }`}
          >
            {mission.isCompleted && (
              <div className="absolute top-0 right-0 p-6">
                <span className="bg-emerald-500 text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">COMPLETED</span>
              </div>
            )}
            
            <div className="flex items-center gap-6 mb-6">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-md border ${
                mission.isCompleted ? 'bg-emerald-500/10 border-emerald-500/30' : 'dark:bg-slate-950 bg-[#EDE8D9] dark:border-slate-800 border-[#DCD3BC]'
              }`}>
                {mission.icon}
              </div>
              <div className="flex-grow">
                <h3 className={`text-2xl font-black uppercase tracking-tighter ${mission.isCompleted ? 'text-slate-400 line-through' : 'dark:text-slate-50 text-slate-900'}`}>
                  {mission.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-widest mt-0.5">{mission.description}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">REWARD</span>
                <span className="text-lg font-black text-indigo-600">+{mission.rewardXp} XP</span>
              </div>
              
              {!mission.isCompleted && (
                <button 
                  onClick={() => onComplete(mission.id)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all shadow-xl active:scale-95"
                >
                  CLAIM MISSION
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="dark:bg-indigo-900/10 bg-indigo-600/5 border dark:border-indigo-500/20 border-indigo-600/10 p-8 rounded-[2.5rem] flex items-center gap-6 backdrop-blur-sm shadow-lg">
        <div className="w-16 h-16 bg-white dark:bg-slate-950 rounded-2xl flex items-center justify-center text-4xl border border-indigo-200/50 dark:border-indigo-800/50 shadow-sm shrink-0">⚡</div>
        <div>
          <h4 className="text-xl font-black dark:text-slate-50 text-slate-900 uppercase tracking-tighter">BATTLE PASS PROGRESS</h4>
          <p className="dark:text-slate-400 text-slate-600 dark:text-slate-300 text-sm font-bold uppercase tracking-tight">Completing all 4 missions today grants an additional 250 XP bonus!</p>
        </div>
      </div>
    </div>
  );
};

export default DailyMissions;
