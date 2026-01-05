
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { getSkillMentorResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIMentorProps {
  onMentorUse: () => void;
}

const AIMentor: React.FC<AIMentorProps> = ({ onMentorUse }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      id: '0',
      role: 'model', 
      text: "Hello! I am your **SkillSpace AI Mentor**. I specialize in C++, Python, Java, and AI/ML.\n\nHow can I help you level up your engineering skills today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatarColor: 'bg-indigo-600'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: input, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), avatarColor: 'bg-slate-700' };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    onMentorUse();
    const responseText = await getSkillMentorResponse("Full Stack & AI", input);
    const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), avatarColor: 'bg-indigo-600' };
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col space-y-6">
      <header>
        <h2 className="text-5xl font-black tracking-tighter dark:text-white text-slate-900 mb-2 uppercase underline decoration-indigo-600 underline-offset-8">NEURAL MENTOR</h2>
        <p className="dark:text-slate-400 text-slate-500 text-lg font-bold uppercase tracking-tight">Expert technical guidance. Powered by Gemini 3.</p>
      </header>

      <div className="flex-grow dark:bg-slate-900 bg-white/40 border dark:border-slate-800 border-[#DCD3BC] rounded-[3rem] flex flex-col overflow-hidden shadow-2xl backdrop-blur-sm">
        <div ref={scrollRef} className="flex-grow p-8 overflow-y-auto space-y-8">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'model' && <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-black shrink-0">AI</div>}
              <div className={`max-w-[85%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className="flex items-center gap-3 mb-2 px-1">
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{msg.role === 'user' ? 'You' : 'SkillSpace Mentor'}</span>
                  <span className="text-[10px] text-slate-400 font-bold">{msg.timestamp}</span>
                </div>
                <div className={`p-6 rounded-[2rem] shadow-xl ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none font-bold' : 'dark:bg-slate-800 bg-white text-slate-800 dark:text-slate-200 rounded-tl-none border dark:border-slate-700 border-[#DCD3BC]'}`}>
                  <div className="prose-custom">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
              {msg.role === 'user' && <div className="w-10 h-10 rounded-xl bg-slate-700 flex items-center justify-center text-white font-black shrink-0">U</div>}
            </div>
          ))}
        </div>

        <div className="p-8 bg-white/20 dark:bg-slate-950/50 border-t dark:border-slate-800/50 border-[#DCD3BC]">
          <div className="flex items-center space-x-4 max-w-4xl mx-auto">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="ASK FOR GUIDANCE..."
              className="flex-grow dark:bg-slate-900 bg-white border dark:border-slate-700 border-[#DCD3BC] rounded-2xl px-8 py-5 dark:text-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 font-bold uppercase tracking-tight"
            />
            <button onClick={handleSend} disabled={loading} className="bg-indigo-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg hover:bg-indigo-700 transition-all">
              <span className="text-3xl">📡</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIMentor;
