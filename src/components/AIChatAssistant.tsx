import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  Calendar,
  RotateCcw,
  Copy,
  Check,
  Phone,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Minimize2,
} from 'lucide-react';
import { HiByHumanIcon } from './Logo';
import { STUDIO_INFO } from '../data';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
  suggestBooking?: boolean;
}

interface AIChatAssistantProps {
  onOpenFittingModal: (serviceOrTopic?: string) => void;
}

const PRESET_QUESTIONS = [
  '💰 What are your package prices?',
  '🎁 How do I get the 50% discount?',
  '🛡️ What is your money-back guarantee?',
  '📱 Can you build custom Web & Mobile Apps?',
  '📅 How do I book a consultation?',
];

export function AIChatAssistant({ onOpenFittingModal }: AIChatAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      content: `Hello! I'm the **HiByHuman AI Copilot**, powered by Gemini.

I can help you explore our bespoke web engineering, mobile apps, pricing packages, or claim your **50% First Order Discount** (code **FIRST50**).

How can I assist your business today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestBooking: true,
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'user-' + Date.now(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send conversation history to server-side Gemini endpoint
      const payload = {
        messages: [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        })),
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const aiReply: ChatMessage = {
        id: 'ai-' + Date.now(),
        role: 'model',
        content: data.reply || "Thank you! Our studio lead can discuss this with you directly in a quick discovery call. Would you like to schedule one?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestBooking: data.suggestBooking ?? true,
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error('Chat error:', err);
      // Helpful fallback in case of connection hiccup
      setMessages((prev) => [
        ...prev,
        {
          id: 'error-' + Date.now(),
          role: 'model',
          content: `HiByHuman specializes in bespoke web apps, mobile solutions, branding, and digital growth. You can claim **50% off your first project** with code **FIRST50**.

Would you like to book a direct consultation with our technical director, or email us at **${STUDIO_INFO.email}**?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestBooking: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'model',
        content: `Conversation reset! How can I help you explore HiByHuman's services, packages, or claim your **50% First Order Discount**?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestBooking: true,
      },
    ]);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('FIRST50');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Simple Markdown renderer for bold, code, and lists
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className="space-y-1.5">
        {lines.map((line, idx) => {
          if (!line.trim()) return <div key={idx} className="h-1" />;

          // Bullet points
          const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('• ') || line.trim().startsWith('* ');
          const cleanLine = isBullet ? line.trim().replace(/^[-•*]\s+/, '') : line;

          // Parse bold text **example**
          const parts = cleanLine.split(/(\*\*.*?\*\*)/g);

          return (
            <div key={idx} className={isBullet ? 'flex items-start gap-1.5 pl-1' : ''}>
              {isBullet && <span className="text-cyan-400 font-bold text-xs mt-0.5">•</span>}
              <p className="leading-relaxed text-slate-200">
                {parts.map((part, pIdx) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    return (
                      <strong key={pIdx} className="font-semibold text-white">
                        {part.slice(2, -2)}
                      </strong>
                    );
                  }
                  return part;
                })}
              </p>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 flex items-end gap-3 select-none">
        {/* Tooltip callout bubble when chat is closed */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              transition={{ delay: 1, duration: 0.3 }}
              onClick={() => setIsOpen(true)}
              className="hidden md:flex items-center gap-2 bg-slate-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-[0_0_20px_rgba(0,212,255,0.2)] border border-slate-700 text-xs font-medium text-slate-200 cursor-pointer hover:border-cyan-400/50 hover:shadow-xl transition-all group"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Ask HiByHuman AI</span>
              <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-500/30">
                50% OFF
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-fuchsia-600 text-slate-950 font-black shadow-[0_0_25px_rgba(0,212,255,0.5)] flex items-center justify-center cursor-pointer border-2 border-cyan-300/40 overflow-hidden group"
          aria-label={isOpen ? 'Close AI Chat' : 'Open AI Chat'}
        >
          {/* Ambient rotation glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 font-black" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="relative"
              >
                <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-slate-950 font-black" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-200 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Floating Chat Window Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-22 right-4 sm:bottom-26 sm:right-7 z-50 w-[calc(100vw-32px)] sm:w-[420px] h-[580px] max-h-[82vh] bg-slate-900 rounded-3xl shadow-[0_0_50px_rgba(0,212,255,0.25)] border border-slate-700/80 flex flex-col overflow-hidden backdrop-blur-xl text-white"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-between border-b border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
                  <HiByHumanIcon className="w-5 h-5" animated={true} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-sm tracking-tight text-white">HiByHuman AI</h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      Gemini 3.8
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>Active Studio Assistant • Scotland</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1 text-slate-400">
                <button
                  type="button"
                  onClick={handleResetChat}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Minimize"
                  className="p-1.5 rounded-lg hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Promo Banner Strip inside Chat */}
            <div className="px-4 py-2 bg-cyan-950/60 border-b border-cyan-900/50 flex items-center justify-between text-xs text-cyan-200 shrink-0">
              <span className="flex items-center gap-1.5 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>50% Off First Order Promo Active</span>
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="px-2 py-0.5 rounded-md bg-slate-900 border border-cyan-500/40 text-[10px] font-mono font-bold text-cyan-300 hover:bg-slate-800 flex items-center gap-1 transition-colors cursor-pointer"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>FIRST50</span>
                  </>
                )}
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs sm:text-sm bg-slate-950/90">
              {messages.map((message) => {
                const isUser = message.role === 'user';
                return (
                  <div
                    key={message.id}
                    className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isUser
                          ? 'bg-gradient-to-tr from-cyan-400 to-fuchsia-500 text-slate-950 font-black'
                          : 'bg-slate-800 text-cyan-300 border border-slate-700'
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    {/* Message Bubble */}
                    <div
                      className={`max-w-[82%] rounded-2xl p-3.5 shadow-sm ${
                        isUser
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-medium rounded-tr-none'
                          : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
                      }`}
                    >
                      {isUser ? (
                        <p className="leading-relaxed whitespace-pre-wrap">{message.content}</p>
                      ) : (
                        renderFormattedText(message.content)
                      )}

                      {/* Action Guide Buttons for Model Responses */}
                      {!isUser && message.suggestBooking && (
                        <div className="mt-3 pt-2.5 border-t border-slate-800 flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              onOpenFittingModal('AI Consultation - 50% Promo');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(0,212,255,0.3)] cursor-pointer"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Book Consultation (50% Off)</span>
                          </button>
                          <a
                            href={`tel:${STUDIO_INFO.phone.replace(/[^0-9+]/g, '')}`}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium flex items-center gap-1 transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Direct Call</span>
                          </a>
                        </div>
                      )}

                      <span
                        className={`block text-[10px] mt-1.5 text-right ${
                          isUser ? 'text-slate-900/70' : 'text-slate-500'
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Typing Animation */}
              {isLoading && (
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 text-cyan-400 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-xs text-slate-400 font-mono ml-2">Consulting studio database...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestion Chips */}
            <div className="px-3 py-2 bg-slate-900 border-t border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(q)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-cyan-950/60 hover:text-cyan-300 text-[11px] text-slate-300 font-medium whitespace-nowrap border border-slate-700 transition-colors cursor-pointer shrink-0 disabled:opacity-50"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Bottom Input Area */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about web apps, pricing, timelines..."
                className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400 focus:border-cyan-400 transition-all"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-slate-950 font-black transition-all shadow-[0_0_10px_rgba(0,212,255,0.3)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
