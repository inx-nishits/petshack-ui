"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, User } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isSent, setIsSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setIsSent(true);
        }, 1200);
    };

    return (
        <AuthLayout>
            {!isSent ? (
                <>
                    <div className="mb-10 text-left shrink-0">
                        <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-3 font-display tracking-tight">Reset Password</h2>
                        <p className="text-muted font-medium tracking-tight leading-relaxed text-sm sm:text-base">Enter your email and we'll send you a recovery link.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest pl-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-surface border border-border rounded-xl pl-12 pr-4 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-sm"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !email}
                            className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-[0_20px_40px_-5px_rgba(20,167,157,0.3)] hover:translate-y-[-2px] hover:shadow-[0_25px_50px_-12px_rgba(20,167,157,0.4)] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-wait mt-2 shrink-0"
                        >
                            {isLoading ? "Sending Link..." : (
                                <>
                                    Send Recovery Link <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-10 border-t border-border pt-8 text-left shrink-0">
                        <Link href="/login" className="flex items-center gap-2 text-muted font-bold hover:text-primary transition-colors cursor-pointer group text-sm">
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Login
                        </Link>
                    </div>
                </>
            ) : (
                <div className="text-left py-4 animate-in fade-in zoom-in duration-500 shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 rounded-2xl flex items-center justify-center mb-6 transition-transform hover:scale-105">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-xl flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 tracking-tight">Check Your Inbox</h2>
                    <p className="text-muted font-medium mb-8 leading-relaxed tracking-tight max-w-sm text-sm sm:text-base">
                        We've sent a recovery link to <span className="text-foreground font-bold">{email}</span>. Please check your email to reset your password.
                    </p>
                    <div className="space-y-6">
                        <button
                            onClick={() => setIsSent(false)}
                            className="text-primary font-bold text-sm hover:underline cursor-pointer"
                        >
                            Didn't receive an email? Resend
                        </button>
                        <div className="pt-8 border-t border-border">
                            <Link href="/login" className="flex items-center gap-2 text-foreground font-bold hover:text-primary transition-colors cursor-pointer group text-sm">
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Login
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
}

