import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, X, Send, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const { t, language } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);

  const officialNumber = '01341718208';
  const internationalNumber = '8801341718208';

  const prompts = t.whatsapp.prompts;
  const currentText = prompts[selectedPromptIndex]?.text || '';

  const handleOpenChat = () => {
    const encoded = encodeURIComponent(currentText);
    const url = `https://wa.me/${internationalNumber}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header with WhatsApp Green */}
          <div className="bg-[#128C7E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center font-bold text-white">
                <MessageSquare className="w-5 h-5 fill-white text-[#128C7E]" />
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-tight">UrTutorsBD WhatsApp Desk</h4>
                <p className="text-[11px] text-white/80">Active Coordinator · {officialNumber}</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 text-xs bg-slate-50">
            <label className="font-bold text-slate-700 block text-[11px] uppercase tracking-wider">
              {t.whatsapp.selectPrompt}
            </label>

            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {prompts.map((p, idx) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => setSelectedPromptIndex(idx)}
                  className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all cursor-pointer ${
                    selectedPromptIndex === idx
                      ? 'bg-emerald-50/80 border-[#25D366] text-[#075E54] font-semibold ring-1 ring-[#25D366]'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100/70'
                  }`}
                >
                  <span className="block text-[11px] font-bold">{p.label}</span>
                  <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{p.text}</span>
                </button>
              ))}
            </div>

            {/* Preview Box */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-slate-700 text-[11px] italic">
              “{currentText}”
            </div>

            {/* Launch Button */}
            <button
              onClick={handleOpenChat}
              className="w-full py-2.5 px-4 text-xs font-bold text-white bg-[#25D366] hover:bg-[#1EBE5D] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{t.whatsapp.chatBtn}</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
        title={t.whatsapp.tooltip}
        aria-label="Contact UrTutorsBD on WhatsApp"
      >
        <MessageSquare className="w-7 h-7 fill-white" />
        <span className="sr-only">UrTutorsBD WhatsApp</span>
      </button>
    </div>
  );
};
