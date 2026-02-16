"use client";

import { useState } from "react";
import { X, Bell, CheckCircle2 } from "lucide-react";

interface NotifyMeModalProps {
    isOpen: boolean;
    onClose: () => void;
    productName: string;
}

export const NotifyMeModal = ({ isOpen, onClose, productName }: NotifyMeModalProps) => {
    const [firstName, setFirstName] = useState("");
    const [submitted, setSubmitted] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            onClose();
            setSubmitted(false);
            setFirstName("");
        }, 3000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl sm:rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-surface text-muted hover:text-primary transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <div className="p-6 sm:p-10 lg:p-12">
                    {!submitted ? (
                        <>
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-6 sm:mb-8">
                                <Bell className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">Price Drop Alert</h2>
                            <p className="text-muted text-sm sm:text-base font-medium mb-6 sm:mb-10 leading-relaxed">
                                Get notified as soon as <span className="text-foreground font-bold">{productName}</span> hits a new low price or comes back in stock.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <div className="space-y-2 sm:space-y-3">
                                    <label className="text-xs sm:text-sm font-black uppercase tracking-widest text-muted-light block">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-base sm:text-lg min-h-[44px]"
                                        placeholder="Enter your first name"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-3 sm:py-5 rounded-xl font-black text-base sm:text-lg shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all min-h-[44px]"
                                >
                                    Activate Alert
                                </button>
                                <p className="text-[9px] sm:text-[10px] text-center text-muted-light font-bold uppercase tracking-wider">
                                    Privacy Guaranteed • Aussie Owned • No Spam
                                </p>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-6 sm:py-10 animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8">
                                <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4">Alert Active!</h2>
                            <p className="text-muted text-sm sm:text-base font-medium leading-relaxed">
                                Thanks <span className="text-primary font-bold">{firstName}</span>! We've sniffed out your request and will notify you of any price changes for this product.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

