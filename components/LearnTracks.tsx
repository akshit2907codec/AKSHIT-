
import React, { useState } from 'react';
import { SKILLS } from '../constants';
import { SkillCategory, StudyTask } from '../types';

interface LearnTracksProps {
  enrolledIds: string[];
  onEnroll: (id: string) => void;
  studyTasks: StudyTask[];
  onAddTask: (text: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const LearnTracks: React.FC<LearnTracksProps> = ({ enrolledIds, onEnroll, studyTasks, onAddTask, onToggleTask, onDeleteTask }) => {
  const [filter, setFilter] = useState<SkillCategory | 'All'>('All');
  const filteredSkills = filter === 'All' ? SKILLS : SKILLS.filter(s => s.category === filter);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header>
        <h2 className="text-5xl font-black tracking-tighter mb-4 uppercase underline decoration-indigo-600 underline-offset-8 dark:text-slate-50 text-slate-900">SKILL ARCHIVE</h2>
        <div className="flex flex-wrap gap-2">
          {['All', ...Object.values(SkillCategory)].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-5 py-2 rounded-full font-black text-[10px] uppercase tracking-widest transition-all ${
                filter === cat 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : 'dark:bg-slate-800 bg-white/40 border border-[#DCD3BC] dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredSkills.map((skill) => (
          <div key={skill.id} className="group dark:bg-slate-900 bg-white/40 border dark:border-slate-800 border-[#DCD3BC] p-8 rounded-[2.5rem] flex flex-col shadow-lg backdrop-blur-sm hover:bg-white/60 dark:hover:bg-slate-800/80">
            <div className="flex justify-between items-start mb-6">
              <div className="w-16 h-16 dark:bg-slate-950 bg-[#EDE8D9] rounded-2xl flex items-center justify-center text-3xl border dark:border-slate-800 border-[#DCD3BC]">
                {skill.icon}
              </div>
              <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full border border-indigo-100 dark:border-indigo-800/30">
                {skill.difficulty}
              </span>
            </div>
            <h3 className="text-3xl font-black dark:text-slate-50 text-slate-900 mb-2 uppercase tracking-tighter">{skill.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 font-bold mb-8 text-xs uppercase tracking-tight line-clamp-2">{skill.description}</p>
            <button 
              onClick={() => onEnroll(skill.id)}
              className="mt-auto w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all bg-indigo-600 text-white shadow-xl hover:bg-indigo-700 active:scale-95"
            >
              {enrolledIds.includes(skill.id) ? 'VIEW PROGRESS' : 'INITIALIZE TRACK'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearnTracks;
