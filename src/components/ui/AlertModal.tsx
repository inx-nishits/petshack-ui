"use client";

import { X, AlertCircle } from "lucide-react";
import { useEffect } from "react";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message: string;
}

export function AlertModal({ isOpen, onClose, title = "Alert", message }: AlertModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="bg-white rounded-2xl w-full max-w-sm shadow-2xl scale-100 animate-in zoom-in-95 duration-200 overflow-hidden"
                role="alertdialog"
                aria-modal="true"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border bg-surface/50">
                    <h3 className="font-black text-lg flex items-center gap-2 text-primary">
                        <AlertCircle className="w-5 h-5" />
                        {title}
                    </h3>
                    <button
                        onClick={onClose}
                        className="p-1 rounded-full hover:bg-black/5 transition-colors"
                    >
                        <X className="w-5 h-5 text-muted" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 text-center">
                    <p className="text-foreground font-medium text-sm leading-relaxed">
                        {message}
                    </p>
                </div>

                {/* Footer */}
                <div className="p-4 bg-surface/30 border-t border-border flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-primary text-white rounded-xl font-black text-sm hover:bg-primary-dark transition-all active:scale-95 shadow-md shadow-primary/20 w-full sm:w-auto min-w-[120px]"
                    >
                        Okay, Got it
                    </button>
                </div>
            </div>
        </div>
    );
}
