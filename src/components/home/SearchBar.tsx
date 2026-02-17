"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

const SUGGESTIONS = [
    "Royal Canin",
    "Hill's Science Diet",
    "Dog Food",
    "Cat Toys",
    "NexGard",
    "Black Hawk",
    "Fish Tank",
    "Bird Cage",
    "Puppy Treats"
];

export const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (query.trim().length > 1) {
            const filtered = SUGGESTIONS.filter(s =>
                s.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filtered);
            setIsOpen(true);
        } else {
            setSuggestions([]);
            setIsOpen(false);
        }
    }, [query]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/discover?q=${encodeURIComponent(query)}`);
            setIsOpen(false);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setQuery(suggestion);
        router.push(`/discover?q=${encodeURIComponent(suggestion)}`);
        setIsOpen(false);
    };

    return (
        <div ref={wrapperRef} className="container mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 lg:-mt-10 relative z-30">
            <form onSubmit={handleSearch} className="max-w-7xl mx-auto bg-white rounded-3xl sm:rounded-full shadow-2xl border border-gray-100 p-2 sm:p-2 lg:p-3 flex items-center relative z-20">
                <div className="pl-3 sm:pl-4 lg:pl-6 text-gray-400 shrink-0">
                    <Search className="w-5 h-5 sm:w-6 sm:h-6 opacity-30" />
                </div>
                <input
                    name="q"
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for pet products..."
                    className="flex-1 px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg focus:outline-none placeholder:text-gray-300 font-bold text-foreground bg-transparent"
                    autoComplete="off"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => setQuery("")}
                        className="p-2 text-gray-300 hover:text-gray-500 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                )}
                <button
                    type="submit"
                    className="hidden sm:block bg-primary text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl sm:rounded-full font-black text-sm uppercase tracking-widest shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all hover:scale-105 active:scale-95"
                >
                    Search
                </button>
            </form>

            {/* Suggestions Dropdown */}
            {isOpen && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 pt-4 px-4 sm:px-6 z-10 w-full max-w-7xl mx-auto">
                    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-200 mx-auto">
                        <div className="p-2">
                            {suggestions.map((suggestion, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSuggestionClick(suggestion)}
                                    className="w-full text-left px-4 sm:px-6 py-3 sm:py-4 hover:bg-surface rounded-xl flex items-center gap-3 transition-colors group"
                                >
                                    <Search className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                                    <span className="font-bold text-sm sm:text-base text-gray-600 group-hover:text-foreground">
                                        {suggestion.split(new RegExp(`(${query})`, 'gi')).map((part, i) =>
                                            part.toLowerCase() === query.toLowerCase() ? <span key={i} className="text-foreground">{part}</span> : part
                                        )}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
