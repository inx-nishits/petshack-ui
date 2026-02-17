"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Bell, CheckCircle2, Info } from "lucide-react";

interface NotifyMeModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
    targetPrice?: number;
}

export const NotifyMeModal = ({ isOpen, onClose, productName, targetPrice }: NotifyMeModalProps) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    // Mock logged in state
    const [isLoggedIn] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [priceDropBelow, setPriceDropBelow] = useState("");
    const [submitted, setSubmitted] = useState(false);

    // Update price drop recommendation when targetPrice changes or modal opens
    useEffect(() => {
        if (isOpen && targetPrice) {
            setPriceDropBelow(Math.floor(targetPrice * 0.9).toString());
        }
    }, [isOpen, targetPrice]);

    // Handle closing reset
    const handleClose = () => {
        setSubmitted(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        onClose();
    };

    if (!isOpen || !mounted) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!isLoggedIn) {
            if (!email.includes("@")) {
                alert("Please enter a valid email address.");
                return;
            }
        }

        setSubmitted(true);
        setTimeout(() => {
            handleClose();
        }, 3000);
    };


    return createPortal(
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            {/* Modal Container: Rounded and shadow, max-height constrained */}
            <div className="bg-white rounded-4xl sm:rounded-[3rem] w-full max-w-lg shadow-2xl relative animate-in zoom-in-95 duration-300 flex flex-col max-h-[85vh] overflow-hidden border border-white/20">
                {/* Fixed Close Button - stays in place while content scrolls */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-surface/80 backdrop-blur-md text-muted hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center z-70 shadow-sm border border-border/50"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Internal Scrollable Content Area */}
                <div className="flex-1 overflow-y-auto custom-modal-scrollbar p-6 sm:p-10 lg:p-12 pt-10 sm:pt-14">
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        .custom-modal-scrollbar::-webkit-scrollbar {
                            width: 6px;
                        }
                        .custom-modal-scrollbar::-webkit-scrollbar-track {
                            background: transparent;
                        }
                        .custom-modal-scrollbar::-webkit-scrollbar-thumb {
                            background: #e2e8f0;
                            border-radius: 10px;
                        }
                        .custom-modal-scrollbar::-webkit-scrollbar-thumb:hover {
                            background: #cbd5e1;
                        }
                    `}} />

                    {!submitted ? (
                        <>
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6">
                                <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black mb-2 sm:mb-4">Price Drop Alert</h2>
                            <p className="text-muted text-sm sm:text-base font-medium mb-8 leading-relaxed">
                                Get notified for <span className="text-foreground font-bold">{productName}</span>.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                {!isLoggedIn && (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-light block">
                                                    First Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-sm min-h-[44px]"
                                                    placeholder="Enter first name"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-muted-light block">
                                                    Last Name <span className="text-red-500">*</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-sm min-h-[44px]"
                                                    placeholder="Enter last name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-muted-light block">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-surface border border-border rounded-xl px-4 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-sm min-h-[44px]"
                                                placeholder="email@example.com"
                                                required
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-muted-light block">
                                        Price Drop Below ($) <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={priceDropBelow}
                                        onChange={(e) => setPriceDropBelow(e.target.value)}
                                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-base sm:text-lg min-h-[44px]"
                                        placeholder="Enter target price"
                                        required
                                    />
                                    <p className="text-[10px] text-muted-light font-bold italic">
                                        Current price: ${targetPrice?.toFixed(2)}
                                    </p>
                                </div>

                                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
                                    <Info className="w-5 h-5 text-blue-500 shrink-0" />
                                    <ul className="text-[10px] sm:text-[11px] text-blue-700 font-bold space-y-1.5">
                                        <li>• Email sent when price drops below ${priceDropBelow || '...'}</li>
                                        <li>• Triggers once then auto expires.</li>
                                    </ul>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-3 sm:py-5 rounded-xl font-black text-base sm:text-lg shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all min-h-[44px] mt-2"
                                >
                                    Activate Alert
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-6 sm:py-10 animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">Alert Active!</h2>
                            <p className="text-muted text-sm sm:text-base font-medium leading-relaxed mb-8">
                                Thanks <span className="text-primary font-bold">{isLoggedIn ? 'User' : firstName}</span>! We'll notify you when the price drops below <span className="text-foreground font-bold">${priceDropBelow}</span>.
                            </p>
                            <button
                                onClick={handleClose}
                                className="w-full bg-surface border border-border text-foreground hover:bg-gray-100 py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-base transition-all min-h-[44px]"
                            >
                                Close
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};


