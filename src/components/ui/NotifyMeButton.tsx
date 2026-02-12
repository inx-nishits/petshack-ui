"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import { NotifyMeModal } from "./NotifyMeModal";

interface NotifyMeButtonProps {
    productName: string;
    variant?: "full" | "outline";
}

export const NotifyMeButton = ({ productName, variant = "outline" }: NotifyMeButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    if (variant === "full") {
        return (
            <>
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full mt-4 bg-accent/10 text-accent py-4 rounded-xl font-bold text-sm hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2 border border-accent/20"
                >
                    <Bell className="w-4 h-4" /> Notify Me of Price Drops
                </button>
                <NotifyMeModal productName={productName} isOpen={isOpen} onClose={() => setIsOpen(false)} />
            </>
        );
    }

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="flex-1 border border-border py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-surface transition-colors"
            >
                <Bell className="w-4 h-4" /> Notify Me
            </button>
            <NotifyMeModal productName={productName} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

