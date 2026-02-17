"use client";

import { useModal } from "@/context/ModalContext";
import { Bell } from "lucide-react";

interface NotifyMeButtonProps {
    productName: string;
    targetPrice?: number;
    variant?: "full" | "outline";
}

export const NotifyMeButton = ({ productName, targetPrice, variant = "outline" }: NotifyMeButtonProps) => {
    const { openNotifyModal } = useModal();

    if (variant === "full") {
        return (
            <button
                onClick={() => openNotifyModal(productName, targetPrice || 0)}
                className="w-full mt-4 bg-accent/10 text-accent py-4 rounded-xl font-bold text-sm hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2 border border-accent/20"
            >
                <Bell className="w-4 h-4" /> Notify Me of Price Drops
            </button>
        );
    }

    return (
        <button
            onClick={() => openNotifyModal(productName, targetPrice || 0)}
            className="flex-1 min-w-[120px] border border-border py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-surface transition-colors min-h-[44px]"
        >
            <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Notify Me
        </button>
    );
};



