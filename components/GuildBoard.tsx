
import React, { useState, useEffect, useRef } from 'react';
import { Guild, ChatMessage, WarRoomMission } from '../types';
import { MISSIONS, CHALLENGES } from '../constants';
import { validateUserCode } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

interface GuildBoardProps {
  guilds: Guild[];
  onCreateGuild: (name: string, tag: string) => void;
  onMissionSuccess: (xp: number, points: number) => void;
}

type ProgrammingLanguage = 'C++' | 'PYTHON' | 'JAVA' | 'C';

const GuildBoard: React.FC<GuildBoardProps> = ({ guilds, onCreateGuild, onMissionSuccess }) => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'warroom' | 'logic-core'>('logic-core');
  const [selectedGuild, setSelectedGuild] = useState<Guild | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGuildName, setNewGuildName] = useState('');
  const [newGuildTag, setNewGuildTag] = useState('');
  const [chatInput, setChatInput] = useState('');
  
  // Logic Core / AI Mentor State
  const [selectedLang, setSelectedLang] = useState<ProgrammingLanguage>('C++');
  const [drillIdx, setDrillIdx] = useState(0);
  const [code, setCode] = useState('');
  const [mentorFeedback, setMentorFeedback] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [hasLogicError, setHasLogicError] = useState(false);

  const [activeMissionId, setActiveMissionId] = useState<string | null>(null);
  const [missionProgress, setMissionProgress] = useState(0);
  const [missionStatus, setMissionStatus] = useState('');
  const [showRewardModal, setShowRewardModal] = useState<{xp: number, points: number} | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'system', sender: 'MODERATOR', text: 'Guild communication channel initialized.', timestamp: '12:00', avatarColor: 'bg-indigo-600' },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Dynamic boilerplate generation based on language
  const getLanguageBoilerplate = (lang: ProgrammingLanguage, challengeIdx: number) => {
    const challenge = CHALLENGES[challengeIdx];
    switch (lang) {
      case 'PYTHON':
        return `# Mission: ${challenge.title}\n# ${challenge.description}\n\ndef solve():\n    # Your logic here\n    print("Hello Guild")\n\nsolve()`;
      case 'JAVA':
        return `public class Main {\n    public static void main(String[] args) {\n        // Mission: ${challenge.title}\n        // Logic for: ${challenge.description}\n        System.out.println("Logic Start");\n    }\n}`;
      case 'C':
        return `#include <stdio.h>\n\nint main() {\n    // Mission: ${challenge.title}\n    // Objective: ${challenge.description}\n    printf("Logic Ready\\n");\n    return 0;\n}`;
      default: // C++
        return challenge.starterCode || `#include <iostream>\n\nint main() {\n    // Mission: ${challenge.title}\n    std::cout << "C++ System Active" << std::endl;\n    return 0;\n}`;
    }
  };

  useEffect(() => {
    setCode(getLanguageBoilerplate(selectedLang, drillIdx));
    setMentorFeedback('');
  }, [selectedLang, drillIdx]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, activeSubTab]);

  const handleSelectGuild = (guild: Guild) => {
    setSelectedGuild(guild);
    setActiveSubTab('logic-core');
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGuildName && newGuildTag) {
      const id = Date.now().toString();
      const newGuild: Guild = {
        id,
        name: newGuildName,
        tag: newGuildTag,
        rank: 1,
        members: 1,
        exp: 0
      };
      onCreateGuild(newGuildName, newGuildTag);
      setSelectedGuild(newGuild);
      setActiveSubTab('logic-core');
      setShowCreateModal(false);
      setNewGuildName('');
      setNewGuildTag('');
    }
  };

  const handleValidateDrill = async () => {
    if (!code.trim() || isValidating) return;
    setIsValidating(true);
    setHasLogicError(false);
    setMentorFeedback('');

    const challenge = CHALLENGES[drillIdx];
    const rawResult = await validateUserCode(challenge.description, code, selectedLang);
    
    const result = rawResult?.trim().toUpperCase() || '';
    const isFail = result.startsWith('FAIL') || result.includes('LOGIC ERROR') || result.includes('ERROR');

    if (isFail) {
      setHasLogicError(true);
      setMentorFeedback("YOUR CODE DOING SOME ERROR PLEASE CHECK AND RETRY!");
    } else {
      setHasLogicError(false);
      setMentorFeedback(`${selectedLang} LOGIC VERIFIED. Sequence execution successful. +100 GUILD EXP.`);
      onMissionSuccess(100, 25);
    }
    setIsValidating(false);
  };

  const startMissionStrike = (mission: WarRoomMission) => {
    setActiveMissionId(mission.id);
    setMissionProgress(0);
    const steps = ["Linking Nodes...", "Injecting Code...", "Optimizing...", "Strike Complete."];
    let currentStep = 0;
    const interval = setInterval(() => {
      setMissionProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onMissionSuccess(mission.reward, mission.reward / 2);
          setShowRewardModal({ xp: mission.reward, points: mission.reward / 2 });
          setActiveMissionId(null);
          return 100;
        }
        if (prev % 25 === 0) setMissionStatus(steps[currentStep++]);
        return prev + 5;
      });
    }, 100);
  };

  const sendChatMessage = () => {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      role: 'user',
      sender: 'YOU',
      text: chatInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatarColor: 'bg-indigo-600'
    }]);
    setChatInput('');
  };

  if (!selectedGuild) {
    return (
      <div className="space-y-12 animate-in fade-in duration-500">
        <header className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="max-w-2xl">
            <h2 className="text-6xl font-black tracking-tighter dark:text-slate-50 text-slate-900 mb-4 uppercase leading-[0.9]">
              GUILD <br/><span className="text-indigo-600">STRUCTURES</span>
            </h2>
            <p className="dark:text-slate-400 text-slate-500 text-lg font-bold uppercase tracking-tight">Select an active node to enter the workspace or establish a new command center.</p>
          </div>
          <button 
            onClick={() => setShowCreateModal(true)} 
            className="bg-indigo-600 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-indigo-700 shadow-2xl transition-all active:scale-95"
          >
            INITIALIZE NEW GUILD
          </button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guilds.map((guild) => (
            <button 
              key={guild.id}
              onClick={() => handleSelectGuild(guild)}
              className="group relative dark:bg-slate-900 bg-white border-2 dark:border-slate-800 border-[#DCD3BC] p-10 rounded-[3rem] text-left transition-all hover:border-indigo-600 hover:-translate-y-2 shadow-xl"
            >
              <div className="w-20 h-20 bg-slate-950 dark:bg-slate-800 rounded-[1.5rem] flex items-center justify-center text-4xl font-black text-indigo-500 mb-8 border border-white/5 group-hover:scale-110 transition-transform">
                {guild.tag}
              </div>
              <h3 className="text-3xl font-black dark:text-slate-50 text-slate-900 uppercase tracking-tighter mb-2 group-hover:text-indigo-600 transition-colors">{guild.name}</h3>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{guild.members} ACTIVE OPERATIVES</p>
              <div className="absolute bottom-10 right-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-3xl">🛡️</span>
              </div>
            </button>
          ))}
        </div>

        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <form onSubmit={handleCreateSubmit} className="dark:bg-slate-900 bg-white border-2 dark:border-slate-800 border-[#DCD3BC] w-full max-w-lg rounded-[3rem] p-12 shadow-2xl animate-in zoom-in-95">
              <h4 className="text-4xl font-black dark:text-slate-50 text-slate-900 uppercase mb-2 tracking-tighter">FOUND GUILD</h4>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-10">Define your engineering clan's identity.</p>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Clanship Name</label>
                  <input type="text" placeholder="E.G. QUANTUM REAPERS" value={newGuildName} onChange={(e) => setNewGuildName(e.target.value.toUpperCase())} className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-[#DCD3BC] dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold uppercase dark:text-slate-50 outline-none focus:border-indigo-600"/>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Identifier Tag (3 Chars)</label>
                  <input type="text" maxLength={3} placeholder="QR1" value={newGuildTag} onChange={(e) => setNewGuildTag(e.target.value.toUpperCase())} className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-[#DCD3BC] dark:border-slate-800 rounded-2xl px-6 py-4 text-sm font-bold uppercase dark:text-slate-50 outline-none focus:border-indigo-600"/>
                </div>
              </div>
              <div className="flex gap-4 mt-12">
                <button type="button" onClick={() => setShowCreateModal(false)} className="flex-1 py-5 font-black text-xs uppercase text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all">ABORT</button>
                <button type="submit" className="flex-1 bg-indigo-600 text-white py-5 rounded-2xl font-black text-xs uppercase shadow-2xl hover:bg-indigo-700">INITIALIZE</button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setSelectedGuild(null)}
            className="w-14 h-14 bg-white dark:bg-slate-900 border-2 border-[#DCD3BC] dark:border-slate-800 rounded-2xl flex items-center justify-center text-2xl hover:border-indigo-600 transition-all shadow-lg"
          >
            ←
          </button>
          <div>
            <div className="flex items-center gap-4">
              <h2 className="text-4xl font-black tracking-tighter dark:text-slate-50 text-slate-900 uppercase">{selectedGuild.name}</h2>
              <span className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase">{selectedGuild.tag}</span>
            </div>
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">GUILD LOGIC CORE ACTIVE</p>
          </div>
        </div>
      </header>

      <div className="flex gap-2 p-1 dark:bg-slate-900 bg-white/40 border-2 dark:border-slate-800 border-[#DCD3BC] rounded-2xl w-fit backdrop-blur-md">
        {[
          { id: 'logic-core', label: 'LOGIC CORE', icon: '🧠' },
          { id: 'warroom', label: 'MISSIONS', icon: '⚔️' },
          { id: 'chat', label: 'COMMS', icon: '💬' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${activeSubTab === tab.id ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}
          >
            <span>{tab.icon}</span> {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[60vh]">
        {activeSubTab === 'logic-core' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[75vh]">
            <div className="dark:bg-slate-900 bg-white border-2 dark:border-slate-800 border-[#DCD3BC] rounded-[3rem] flex flex-col overflow-hidden shadow-2xl">
              <div className="p-6 bg-slate-950/30 border-b dark:border-slate-800 border-[#DCD3BC] flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em]">MISSION DRILLS</span>
                  <div className="flex gap-2">
                    {(['C++', 'PYTHON', 'JAVA', 'C'] as ProgrammingLanguage[]).map(lang => (
                      <button 
                        key={lang}
                        onClick={() => setSelectedLang(lang)}
                        className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase border transition-all ${selectedLang === lang ? 'bg-indigo-600 text-white border-indigo-500 shadow-md' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                </div>
                <select 
                  value={drillIdx}
                  onChange={(e) => setDrillIdx(parseInt(e.target.value))}
                  className="w-full bg-slate-50 dark:bg-slate-950 border dark:border-slate-800 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase text-slate-400 outline-none cursor-pointer hover:border-indigo-600 transition-colors"
                >
                  {CHALLENGES.map((c, i) => <option key={c.id} value={i} className="bg-slate-900">{c.title}</option>)}
                </select>
              </div>
              <div className="px-8 py-5 bg-indigo-600/5 border-b dark:border-slate-800 border-[#DCD3BC]">
                <p className="text-xs font-bold dark:text-slate-300 text-slate-700 uppercase tracking-tight leading-relaxed">{CHALLENGES[drillIdx].description}</p>
              </div>
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="flex-grow bg-transparent p-10 dark:text-indigo-50 text-slate-900 font-mono text-sm focus:outline-none resize-none leading-relaxed"
              />
              <div className="p-8 bg-slate-950/30 border-t dark:border-slate-800 border-[#DCD3BC]">
                <button
                  onClick={handleValidateDrill}
                  disabled={isValidating}
                  className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl disabled:opacity-50"
                >
                  {isValidating ? `AI ANALYZING ${selectedLang}...` : `VERIFY ${selectedLang} LOGIC`}
                </button>
              </div>
            </div>

            <div className={`dark:bg-slate-950 bg-white border-2 rounded-[3rem] flex flex-col overflow-hidden shadow-inner transition-all duration-300 ${hasLogicError ? 'border-red-500/50' : 'dark:border-slate-800 border-[#DCD3BC]'}`}>
              <div className={`p-6 border-b flex justify-between items-center ${hasLogicError ? 'bg-red-500/10' : 'dark:bg-slate-900/50 bg-[#EDE8D9]/50'}`}>
                <span className={`text-[10px] font-black uppercase tracking-widest ${hasLogicError ? 'text-red-600' : 'text-slate-500'}`}>
                  ORACLE FEEDBACK
                </span>
                {hasLogicError && <span className="animate-pulse text-red-600 text-xl">⚠️</span>}
              </div>
              <div className="flex-grow p-10 overflow-y-auto">
                {isValidating ? (
                  <div className="space-y-6">
                    <div className="h-4 dark:bg-slate-800 bg-slate-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 dark:bg-slate-800 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                ) : mentorFeedback ? (
                  <div className="space-y-8 animate-in fade-in slide-in-from-top-4">
                    <p className={`text-2xl font-black tracking-tighter uppercase leading-tight ${hasLogicError ? 'text-red-600' : 'text-indigo-600'}`}>
                      {mentorFeedback}
                    </p>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-20">
                    <span className="text-9xl mb-6">🛡️</span>
                    <p className="font-black text-xs uppercase tracking-[0.5em]">Input {selectedLang} to engage oracle</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'warroom' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MISSIONS.map((mission) => (
              <div key={mission.id} className="dark:bg-slate-900 bg-white border-2 dark:border-slate-800 border-[#DCD3BC] p-10 rounded-[3rem] flex flex-col shadow-xl">
                <div className="flex justify-between mb-6">
                  <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500 border border-indigo-500/30 px-3 py-1 rounded-full">{mission.type}</span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{mission.difficulty}</span>
                </div>
                <h3 className="text-3xl font-black dark:text-slate-50 text-slate-900 mb-4 uppercase tracking-tighter leading-[0.9]">{mission.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-bold mb-10 text-xs uppercase leading-relaxed">{mission.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-black text-indigo-600">+{mission.reward} XP</span>
                  <button 
                    onClick={() => startMissionStrike(mission)}
                    className="bg-slate-900 dark:bg-slate-800 text-white px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-lg active:scale-95"
                  >
                    START STRIKE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeSubTab === 'chat' && (
          <div className="h-[60vh] flex flex-col dark:bg-slate-900 bg-white border-2 dark:border-slate-800 border-[#DCD3BC] rounded-[3rem] overflow-hidden shadow-2xl">
            <div ref={scrollRef} className="flex-grow p-10 overflow-y-auto space-y-8">
              {messages.map((msg) => (
                <div key={msg.id} className="flex gap-6 items-start animate-in slide-in-from-left-4">
                  <div className={`w-12 h-12 rounded-2xl ${msg.avatarColor} flex items-center justify-center text-white font-black shrink-0 shadow-lg`}>
                    {msg.sender?.[0]}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">{msg.sender}</span>
                      <span className="text-[9px] text-slate-400 font-bold">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm font-bold dark:text-slate-300 text-slate-700 leading-relaxed uppercase">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-8 bg-slate-950/30 border-t-2 dark:border-slate-800 border-[#DCD3BC]">
              <div className="flex gap-4 max-w-5xl mx-auto">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                  placeholder="TRANSMIT TO CLAN NODES..."
                  className="flex-grow bg-white dark:bg-slate-950 border-2 dark:border-slate-800 border-[#DCD3BC] rounded-2xl px-8 py-4 text-xs font-bold uppercase dark:text-slate-50 outline-none focus:border-indigo-600"
                />
                <button onClick={sendChatMessage} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl transition-all">SEND</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {activeMissionId && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-xl">
          <div className="w-full max-w-lg text-center space-y-10 animate-pulse">
            <h4 className="text-6xl font-black text-white uppercase tracking-tighter leading-none">{missionStatus}</h4>
            <div className="h-6 dark:bg-slate-800 bg-slate-900 rounded-full overflow-hidden p-1 border-2 border-indigo-500/30">
              <div className="h-full bg-indigo-600 rounded-full transition-all duration-300" style={{ width: `${missionProgress}%` }} />
            </div>
            <p className="text-indigo-400 font-black text-xs uppercase tracking-[0.5em]">MISSION IN PROGRESS</p>
          </div>
        </div>
      )}

      {showRewardModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-indigo-600/10 backdrop-blur-3xl animate-in fade-in duration-500">
          <div className="text-center space-y-10 animate-in zoom-in-95 duration-300">
            <div className="text-9xl mb-6">🎖️</div>
            <h3 className="text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">STRIKE SECURED</h3>
            <div className="flex justify-center gap-12">
              <div className="text-indigo-600 text-6xl font-black">+{showRewardModal.xp} XP</div>
            </div>
            <button 
              onClick={() => setShowRewardModal(null)} 
              className="px-16 py-6 bg-slate-950 text-white rounded-[2rem] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl"
            >
              ACKNOWLEDGE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuildBoard;
