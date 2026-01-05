
import React, { useState, useEffect, useRef } from 'react';
import { SKILLS } from '../constants';
import { Skill, UserStats, UserRank, StudyTask } from '../types';

interface DashboardProps {
  enrolledIds: string[];
  userStats: UserStats;
  studyTasks?: StudyTask[];
  onToggleTask?: (id: string) => void;
  onAddTask?: (text: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ enrolledIds, userStats, studyTasks = [], onToggleTask, onAddTask }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const enrolledSkills = SKILLS.filter(s => enrolledIds.includes(s.id));

  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAddTask = () => {
    if (newTaskText.trim() && onAddTask) {
      onAddTask(newTaskText.trim());
      setNewTaskText('');
      setShowAddModal(false);
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-5xl font-black tracking-tighter mb-2 uppercase underline decoration-indigo-600 underline-offset-8 dark:text-slate-50 text-slate-900">ELEVATE YOURSELF.</h2>
          <p className="text-lg font-bold uppercase tracking-tight dark:text-slate-400 text-slate-500">System operational. Leveling {enrolledSkills.length} engineering streams.</p>
        </div>

        <div className="flex items-center gap-4 bg-white/40 dark:bg-slate-900 border border-[#DCD3BC] dark:border-slate-800 p-2 pl-6 rounded-full shadow-lg backdrop-blur-md transition-all">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">FOCUS TIMER</span>
            <span className={`text-2xl font-black tracking-widest font-mono dark:text-slate-50 text-slate-900 ${isRunning ? 'animate-pulse text-indigo-600' : ''}`}>
              {formatTime(time)}
            </span>
          </div>
          <div className="flex gap-1">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all active:scale-90 ${isRunning ? 'bg-amber-500 hover:bg-amber-600' : 'bg-emerald-600 hover:bg-emerald-700'}`}
            >
              {isRunning ? '⏸' : '▶'}
            </button>
            <button 
              onClick={() => {setTime(0); setIsRunning(false);}}
              className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
            >
              🔄
            </button>
          </div>
        </div>
      </header>

      <section className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-black dark:text-slate-50 text-slate-900 uppercase tracking-tighter">DAILY TO-DO LIST</h3>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90"
              title="Add New Mission"
            >
              <span className="text-xl font-bold">+</span>
            </button>
          </div>
          <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-50 dark:bg-indigo-900/20 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-800/30">
            {studyTasks.filter(t => t.isCompleted).length} / {studyTasks.length} COMPLETED
          </span>
        </div>
        
        <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar -mx-2 px-2 mask-linear-fade">
          {studyTasks.map((task) => (
            <div 
              key={task.id}
              className={`flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-full border transition-all duration-300 backdrop-blur-md shadow-sm group ${
                task.isCompleted 
                ? 'bg-emerald-500/10 border-emerald-500/30 opacity-60' 
                : 'dark:bg-slate-900 bg-white border-[#DCD3BC] dark:border-slate-800 hover:border-indigo-400 hover:shadow-md'
              }`}
            >
              <button 
                onClick={() => onToggleTask?.(task.id)}
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 transform active:scale-90 ${
                  task.isCompleted 
                  ? 'bg-emerald-500 border-emerald-500' 
                  : 'bg-white dark:bg-slate-800 border-[#DCD3BC] dark:border-slate-700 hover:border-indigo-600'
                }`}
              >
                {task.isCompleted && <span className="text-white text-xs font-black">✓</span>}
              </button>
              <p className={`text-[11px] font-black uppercase tracking-tight whitespace-nowrap ${
                task.isCompleted ? 'text-slate-400 line-through' : 'dark:text-slate-200 text-slate-700'
              }`}>
                {task.text}
              </p>
            </div>
          ))}

          <button 
            onClick={() => setShowAddModal(true)}
            className="flex-shrink-0 flex items-center gap-4 px-6 py-4 rounded-full border border-dashed border-[#DCD3BC] dark:border-slate-800 opacity-40 hover:opacity-100 transition-opacity cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-full border-2 border-dashed border-slate-400 dark:border-slate-600 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
              <span className="text-slate-400 dark:text-slate-500 font-black group-hover:text-indigo-500 transition-colors">+</span>
            </div>
            <p className="text-[11px] font-black uppercase tracking-tight text-slate-400 dark:text-slate-500 group-hover:text-indigo-500 whitespace-nowrap transition-colors">ADD MISSION</p>
          </button>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-10">
        <section className="space-y-8">
          <h3 className="text-2xl font-black mb-6 flex items-center gap-2 uppercase tracking-tighter dark:text-slate-50 text-slate-900">
            ACTIVE STREAMS
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledSkills.map((skill: Skill) => (
              <div key={skill.id} className="group cursor-pointer dark:bg-slate-900 bg-white/50 dark:border-slate-800 border-[#DCD3BC] border p-8 rounded-[2.5rem] transition-all hover:bg-white/80 dark:hover:bg-slate-800/80 shadow-lg relative overflow-hidden backdrop-blur-sm">
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 dark:bg-slate-950 bg-[#F5F1E6] rounded-2xl flex items-center justify-center text-4xl border dark:border-slate-800 border-[#DCD3BC]">
                      {skill.icon}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-2xl font-black dark:text-slate-50 text-slate-900 uppercase tracking-tighter">{skill.name}</h4>
                        <span className="text-2xl text-indigo-600 font-black transform transition-all duration-300 group-hover:translate-x-1.5">→</span>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">{skill.category}</span>
                    </div>
                  </div>
                  <div className="mt-auto space-y-3">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                      <span>Sync Progress</span>
                      <span className="text-indigo-600 font-black">{skill.progress}%</span>
                    </div>
                    <div className="h-3 dark:bg-slate-800 bg-[#EDE8D9] rounded-full overflow-hidden p-0.5 border dark:border-slate-700 border-[#DCD3BC]">
                      <div className="h-full bg-indigo-600 rounded-full transition-all duration-1000" style={{ width: `${skill.progress}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="dark:bg-slate-900 bg-white border dark:border-slate-800 border-[#DCD3BC] w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <h4 className="text-2xl font-black dark:text-slate-50 text-slate-900 uppercase tracking-tighter mb-2">NEW MISSION</h4>
            <p className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-6">Define your next engineering objective.</p>
            
            <input 
              autoFocus
              type="text" 
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
              placeholder="E.G. OPTIMIZE SQL QUERIES..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-[#DCD3BC] dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold uppercase tracking-tight focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:text-slate-50 text-slate-900"
            />
            
            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                ABORT
              </button>
              <button 
                onClick={handleAddTask}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95"
              >
                INITIALIZE
              </button>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .mask-linear-fade { mask-image: linear-gradient(to right, black 85%, transparent 100%); }
      `}</style>
    </div>
  );
};

export default Dashboard;
