
import React, { useState, useEffect } from 'react';
import { UserStats, UserRank } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  userStats: UserStats;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, userStats, activeTab, setActiveTab }) => {
  const [isDark, setIsDark] = useState(false);

  // Sync theme with document root for "proper" Tailwind dark mode
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const tabs = [
    { id: 'dashboard', label: 'DASHBOARD', icon: '🏠' },
    { id: 'learn', label: 'LEARN', icon: '📚' },
    { id: 'missions', label: 'DAILY MISSIONS', icon: '🎯' },
    { id: 'guilds', label: 'GUILDS', icon: '🛡️' },
    { id: 'mentor', label: 'AI MENTOR', icon: '🧠' },
  ];

  const getRankTheme = (rank: UserRank) => {
    switch (rank) {
      case UserRank.PLATINUM:
        return { color: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', stars: 4, icon: '💎' };
      case UserRank.GOLD:
        return { color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', stars: 3, icon: '🥇' };
      case UserRank.SILVER:
        return { color: 'text-slate-500 dark:text-slate-300', bg: 'bg-slate-400/10', border: 'border-slate-400/30', stars: 2, icon: '🥈' };
      default:
        return { color: 'text-orange-700 dark:text-orange-600', bg: 'bg-orange-900/10', border: 'border-orange-900/30', stars: 1, icon: '🥉' };
    }
  };

  const theme = getRankTheme(userStats.rank);
  const levelProgress = userStats.xp % 100;

  return (
    <div className="min-h-screen flex flex-col md:flex-row theme-transition">
      {/* Sidebar Navigation */}
      <nav className={`w-full md:w-80 border-r flex flex-col p-6 space-y-8 sticky top-0 h-auto md:h-screen z-40 transition-colors duration-500 ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-[#EDE8D9] border-[#DCD3BC]'}`}>
        
        {/* LOGO SECTION */}
        <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25"></div>
            <div className="relative w-14 h-14 bg-slate-950 rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 opacity-90"></div>
              <span className="relative font-bold-display text-3xl text-white">SS</span>
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tighter uppercase leading-none dark:text-slate-50 text-slate-900">SKILLSPACE</h1>
            <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.4em] mt-1">ELITE HUB</span>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="space-y-1.5 flex-grow">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-4 px-4 py-3.5 rounded-2xl transition-all font-black tracking-widest text-[10px] uppercase ${
                activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-lg' 
                : isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'text-slate-600 hover:bg-[#DCD3BC] hover:text-slate-900'
              }`}
            >
              <span className="text-2xl">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* BOTTOM SECTION */}
        <div className="space-y-4">
          {/* THEME TOGGLE */}
          <div className={`p-1.5 rounded-2xl flex items-center border transition-all duration-500 ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-[#DCD3BC] border-[#CEC4A6]'}`}>
            <button 
              onClick={() => setIsDark(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${!isDark ? 'bg-[#F5F1E6] text-indigo-700 shadow-md' : 'text-slate-500'}`}
            >
              ☀️ BRIGHT
            </button>
            <button 
              onClick={() => setIsDark(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${isDark ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-600'}`}
            >
              🌙 DARK
            </button>
          </div>

          {/* Rank Profile Capsule */}
          <div 
            className={`relative group cursor-pointer p-4 rounded-[2rem] border shadow-xl transition-all duration-500 overflow-hidden active:scale-[0.98] ${
              isDark 
              ? `bg-slate-950/50 border-slate-800` 
              : `bg-[#F5F1E6]/80 border-[#DCD3BC] hover:border-indigo-300`
            }`}
          >
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-2.5">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 text-xl shadow-md ${isDark ? `bg-slate-900 border-slate-800` : 'bg-white border-[#DCD3BC]'}`}>
                   {theme.icon}
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-[8px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">OPERATIVE</p>
                  <p className={`text-sm font-black tracking-tight uppercase leading-none ${theme.color}`}>
                    {userStats.rank}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2.5">
                <div className="space-y-1">
                   <div className="flex justify-between items-end text-[8px] font-black uppercase tracking-widest">
                      <span className="text-slate-500 dark:text-slate-400">LVL {userStats.level}</span>
                      <span className={theme.color}>{userStats.xp} XP</span>
                   </div>
                   <div className={`h-1.5 w-full rounded-full overflow-hidden p-0.5 border ${isDark ? 'bg-slate-800 border-slate-700/50' : 'bg-[#DCD3BC] border-[#CEC4A6]'}`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${isDark ? 'bg-indigo-500' : 'bg-indigo-600'}`} 
                        style={{ width: `${levelProgress}%` }}
                      />
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className={`flex-grow p-6 md:p-12 overflow-y-auto transition-all duration-500 ${isDark ? 'bg-slate-950' : 'bg-[#F5F1E6]'}`}>
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
