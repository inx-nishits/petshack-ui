"use client";

import { Facebook, Twitter, Link2, Check } from "lucide-react";
import { useState } from "react";

export const ShareActions = () => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto">
            <button
                title="Share on Facebook"
                className="p-2 sm:p-2.5 rounded-full border border-border hover:bg-surface transition-colors min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center group"
            >
                <Facebook className="w-4 h-4 text-muted group-hover:text-[#1877F2]" />
            </button>
            <button
                title="Share on Twitter"
                className="p-2 sm:p-2.5 rounded-full border border-border hover:bg-surface transition-colors min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center group"
            >
                <Twitter className="w-4 h-4 text-muted group-hover:text-[#1DA1F2]" />
            </button>
            <button
                onClick={handleCopy}
                title="Copy link to clipboard"
                className={`p-2 sm:p-2.5 rounded-full border transition-all min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center gap-2 ${copied ? 'bg-green-50 border-green-200 text-green-600' : 'border-border hover:bg-surface text-muted hover:text-primary'}`}
            >
                {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
                {copied && <span className="text-[10px] font-black uppercase tracking-widest absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gray-900 text-white px-2 py-1 rounded">Copied!</span>}
            </button>
        </div>
    );
};
