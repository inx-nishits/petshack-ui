"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, RotateCcw } from "lucide-react";
import { ChatMessage, PREDEFINED_QUESTIONS, WELCOME_MESSAGE, FALLBACK_MESSAGE, findAnswerByKeywords } from "@/data/chatbot";

export const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            text: WELCOME_MESSAGE,
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handlePredefinedQuestion = (question: string, answer: string) => {
        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            text: question,
            sender: 'user',
            timestamp: new Date()
        };

        const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: answer,
            sender: 'bot',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage, botMessage]);
    };

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);

        // Find answer based on keywords
        const answer = findAnswerByKeywords(inputValue);

        const botMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: answer || FALLBACK_MESSAGE,
            sender: 'bot',
            timestamp: new Date()
        };

        setTimeout(() => {
            setMessages(prev => [...prev, botMessage]);
        }, 500);

        setInputValue("");
    };

    const handleRestartChat = () => {
        setMessages([
            {
                id: '1',
                text: WELCOME_MESSAGE,
                sender: 'bot',
                timestamp: new Date()
            }
        ]);
        setInputValue("");
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 p-3 sm:p-4 rounded-full shadow-2xl transition-all duration-300 ${isOpen
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-primary hover:bg-primary-dark'
                    }`}
                aria-label={isOpen ? "Close chat" : "Open chat"}
            >
                {isOpen ? (
                    <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                ) : (
                    <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-14 right-2 sm:bottom-20 sm:right-6 z-50 w-[calc(100vw-1rem)] sm:w-[380px] max-h-[70vh] sm:max-h-[min(500px,80vh)] bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-border overflow-hidden animate-in slide-in-from-bottom-4 duration-300 flex flex-col">
                    {/* Header */}
                    <div className="bg-primary text-white p-2.5 sm:p-4 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-7 h-7 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <MessageCircle className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                            </div>
                            <div>
                                <h3 className="font-black text-[11px] sm:text-sm">PetShack Assistant</h3>
                                <p className="text-[8px] sm:text-[10px] text-white/80">Always here to help</p>
                            </div>
                        </div>
                        <button
                            onClick={handleRestartChat}
                            className="p-1 sm:p-2 hover:bg-white/10 rounded-full transition-colors"
                            aria-label="Restart chat"
                        >
                            <RotateCcw className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-2.5 sm:p-4 space-y-2.5 sm:space-y-3 bg-surface/30">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-xl sm:rounded-2xl px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 ${message.sender === 'user'
                                            ? 'bg-primary text-white'
                                            : 'bg-white border border-border text-foreground'
                                        }`}
                                >
                                    <p className="text-[11px] sm:text-xs font-medium leading-relaxed">{message.text}</p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Predefined Questions */}
                    {messages.length <= 2 && (
                        <div className="px-2.5 sm:px-4 py-2 sm:py-3 bg-white border-t border-border shrink-0">
                            <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-muted-light mb-1.5 sm:mb-2">Quick Questions</p>
                            <div className="flex flex-wrap gap-1 sm:gap-2">
                                {PREDEFINED_QUESTIONS.slice(0, 4).map((q) => (
                                    <button
                                        key={q.id}
                                        onClick={() => handlePredefinedQuestion(q.question, q.answer)}
                                        className="text-[9px] sm:text-[10px] font-bold px-2 py-1 sm:px-2.5 sm:py-1.5 bg-surface hover:bg-primary hover:text-white border border-border rounded-full transition-all"
                                    >
                                        {q.question}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input */}
                    <form onSubmit={handleSendMessage} className="p-2 sm:p-3 bg-white border-t border-border shrink-0">
                        <div className="flex items-center gap-1.5 sm:gap-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Type your question..."
                                className="flex-1 bg-surface border border-border rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 text-[11px] sm:text-xs focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-[11px] sm:placeholder:text-xs"
                            />
                            <button
                                type="submit"
                                disabled={!inputValue.trim()}
                                className="p-1.5 sm:p-2.5 bg-primary text-white rounded-lg sm:rounded-xl hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0"
                                aria-label="Send message"
                            >
                                <Send className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

