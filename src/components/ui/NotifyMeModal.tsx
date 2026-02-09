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
            <div className="bg-white rounded-[2.5rem] w-full max-w-lg overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-full bg-surface text-muted hover:text-primary transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="p-10 lg:p-12">
                    {!submitted ? (
                        <>
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-8">
                                <Bell className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-3xl font-black mb-4">Price Drop Alert</h2>
                            <p className="text-muted font-medium mb-10 leading-relaxed">
                                Get notified as soon as <span className="text-foreground font-bold">{productName}</span> hits a new low price or comes back in stock.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-black uppercase tracking-widest text-muted-light block">
                                        First Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="w-full bg-surface border border-border rounded-xl px-5 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold"
                                        placeholder="Enter your first name"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-5 rounded-xl font-black text-lg shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all"
                                >
                                    Activate Alert
                                </button>
                                <p className="text-[10px] text-center text-muted-light font-bold uppercase tracking-wider">
                                    Privacy Guaranteed • Aussie Owned • No Spam
                                </p>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                                <CheckCircle2 className="w-10 h-10 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-black mb-4">Alert Active!</h2>
                            <p className="text-muted font-medium leading-relaxed">
                                Thanks <span className="text-primary font-bold">{firstName}</span>! We've sniffed out your request and will notify you of any price changes for this product.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
