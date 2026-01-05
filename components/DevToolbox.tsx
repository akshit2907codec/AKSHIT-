
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { generateDevToolAction, validateUserCode } from '../services/geminiService';
import { CHALLENGES } from '../constants';

const DevToolbox: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'terminal' | 'arena' | 'json'>('arena');
  const [input, setInput] = useState(CHALLENGES[0].starterCode);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedChallengeIdx, setSelectedChallengeIdx] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleAction = async () => {
    if (!input.trim() || loading) return;
    setValidationError(null);
    setLoading(true);

    if (activeTool === 'arena') {
      const challenge = CHALLENGES[selectedChallengeIdx];
      const result = await validateUserCode(challenge.description, input);
      
      if (result?.startsWith('FAIL')) {
        setValidationError("Your code doing some error please check and retry!");
        setOutput(result.replace('FAIL:', '').trim());
      } else {
        setOutput("✅ SUCCESS: SEQUENCE VERIFIED. CODE LOGIC IS CORRECT. +25 XP GRANTED.");
      }
    } else if (activeTool === 'json') {
      try {
        const obj = JSON.parse(input);
        setOutput(JSON.stringify(obj, null, 2));
      } catch (e) {
        setValidationError("Your code doing some error please check and retry!");
        setOutput("❌ INVALID JSON STRUCTURE: " + (e as Error).message);
      }
    } else {
      const result = await generateDevToolAction(activeTool as any, input);
      setOutput(result || 'No output generated.');
    }
    
    setLoading(false);
  };

  const handleChallengeChange = (idx: number) => {
    setSelectedChallengeIdx(idx);
    setInput(CHALLENGES[idx].starterCode);
    setOutput('');
    setValidationError(null);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header>
        <h2 className="text-5xl font-black tracking-tighter dark:text-white text-slate-900 mb-2 uppercase underline decoration-indigo-600 underline-offset-8">DEV TOOLBOX</h2>
        <p className="dark:text-slate-400 text-slate-500 text-lg font-bold uppercase tracking-tight">Precision instruments for the modern engineer.</p>
      </header>

      <div className="flex flex-wrap gap-2 p-1 dark:bg-slate-900 bg-white/40 border dark:border-slate-800 border-[#DCD3BC] rounded-2xl w-fit backdrop-blur-sm shadow-sm">
        {[
          { id: 'arena', label: 'CODE ARENA', icon: '⚔️' },
          { id: 'terminal', label: 'NEURAL TERMINAL', icon: '💻' },
          { id: 'json', label: 'JSON PULSE', icon: '💎' }
        ].map((tool) => (
          <button
            key={tool.id}
            onClick={() => {
              setActiveTool(tool.id as any);
              setOutput('');
              setValidationError(null);
              setInput(tool.id === 'arena' ? CHALLENGES[0].starterCode : '');
            }}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 ${
              activeTool === tool.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <span>{tool.icon}</span>
            {tool.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-auto lg:h-[65vh]">
        {/* Input Pane */}
        <div className="dark:bg-slate-900 bg-white/50 border dark:border-slate-800 border-[#DCD3BC] rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl backdrop-blur-sm">
          <div className="p-6 dark:bg-slate-950/50 bg-[#EDE8D9]/50 border-b dark:border-slate-800 border-[#DCD3BC] flex justify-between items-center">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">
              {activeTool === 'arena' ? 'Logic Workspace' : 'Input Stream'}
            </span>
            {activeTool === 'arena' && (
              <select 
                value={selectedChallengeIdx}
                onChange={(e) => handleChallengeChange(parseInt(e.target.value))}
                className="bg-transparent text-[10px] font-black uppercase tracking-widest text-slate-500 outline-none cursor-pointer hover:text-indigo-600"
              >
                {CHALLENGES.map((c, i) => (
                  <option key={c.id} value={i}>{c.title}</option>
                ))}
              </select>
            )}
          </div>
          
          {activeTool === 'arena' && (
            <div className="px-8 py-4 bg-indigo-600/5 border-b dark:border-slate-800 border-[#DCD3BC]">
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-1">Objective:</p>
              <p className="text-xs font-bold dark:text-slate-300 text-slate-700 uppercase tracking-tight">
                {CHALLENGES[selectedChallengeIdx].description}
              </p>
            </div>
          )}

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Initialize code sequence..."
            className="flex-grow bg-transparent p-8 dark:text-indigo-50 text-slate-900 font-mono text-sm focus:outline-none resize-none placeholder:text-slate-400 leading-relaxed uppercase tracking-tight min-h-[300px]"
          />
          <div className="p-6 dark:bg-slate-950/30 bg-white/30 border-t dark:border-slate-800 border-[#DCD3BC]">
            <button
              onClick={handleAction}
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl active:scale-95 disabled:opacity-50 ${
                activeTool === 'arena' ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-800 hover:bg-slate-900 text-white'
              }`}
            >
              {loading ? 'ANALYZING LOGIC...' : 'VALIDATE SEQUENCE'}
            </button>
          </div>
        </div>

        {/* Output Pane */}
        <div className={`dark:bg-slate-950 bg-white/60 border rounded-[2.5rem] flex flex-col overflow-hidden shadow-inner group relative backdrop-blur-md transition-all duration-300 ${
          validationError ? 'border-red-500/50 ring-2 ring-red-500/20' : 'dark:border-slate-800 border-[#DCD3BC]'
        }`}>
          <div className={`p-6 border-b flex justify-between items-center ${
            validationError ? 'bg-red-500/10 border-red-500/30' : 'dark:bg-slate-900/50 bg-[#EDE8D9]/50 dark:border-slate-800 border-[#DCD3BC]'
          }`}>
            <span className={`text-[10px] font-black uppercase tracking-widest ${validationError ? 'text-red-600' : 'text-slate-500'}`}>
              {validationError ? 'CRITICAL ERROR' : 'Process Output'}
            </span>
            {validationError && <span className="animate-pulse text-red-600">⚠️</span>}
          </div>
          
          <div className="flex-grow p-8 overflow-y-auto font-mono text-sm">
            {loading ? (
              <div className="space-y-4">
                <div className="h-4 dark:bg-slate-800 bg-slate-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 dark:bg-slate-800 bg-slate-200 rounded w-1/2 animate-pulse"></div>
              </div>
            ) : validationError ? (
              <div className="space-y-4">
                <p className="text-red-600 font-black text-xl tracking-tighter uppercase leading-tight">
                  {validationError}
                </p>
                <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
                  <p className="text-xs font-bold text-red-500/80 uppercase tracking-widest mb-2">Detailed Reason:</p>
                  <p className="text-sm dark:text-red-300 text-red-800 font-bold uppercase tracking-tight">
                    {output}
                  </p>
                </div>
              </div>
            ) : output ? (
              <div className="prose-custom dark:text-slate-300 text-slate-800">
                <ReactMarkdown>{output}</ReactMarkdown>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-30">
                <span className="text-6xl mb-4">🛡️</span>
                <p className="font-black text-xs uppercase tracking-[0.5em]">Waiting for execution</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevToolbox;
