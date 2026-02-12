"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function VerifyEmailPage() {
    const [verifying, setVerifying] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVerifying(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AuthLayout>
            <div className="text-left py-6 animate-in fade-in zoom-in duration-500 shrink-0">
                {verifying ? (
                    <>
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
                            <ShieldCheck className="w-8 h-8 text-primary opacity-50" />
                        </div>
                        <h2 className="text-4xl font-bold mb-4 tracking-tight">Verifying Email...</h2>
                        <p className="text-muted font-medium mb-10 leading-relaxed tracking-tight max-w-sm text-sm sm:text-base">
                            Please wait while we secure your account and verify your identity.
                        </p>
                    </>
                ) : (
                    <>
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 rounded-2xl flex items-center justify-center mb-6 transition-transform hover:scale-105 border border-green-100">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100/50 rounded-xl flex items-center justify-center">
                                <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                            </div>
                        </div>
                        <h2 className="text-4xl font-bold mb-4 tracking-tight">Account Verified!</h2>
                        <p className="text-muted font-medium mb-10 leading-relaxed tracking-tight max-w-sm text-sm sm:text-base">
                            Your email has been successfully verified. Your account is now active and ready to use.
                        </p>

                        <Link
                            href="/login"
                            className="w-full bg-foreground text-white py-5 rounded-2xl font-bold text-lg shadow-[0_20px_40px_-5px_rgba(0,0,0,0.2)] hover:translate-y-[-2px] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.3)] active:translate-y-px transition-all flex items-center justify-center gap-2 group cursor-pointer max-w-xs"
                        >
                            Log In to Your Account <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </>
                )}
            </div>
        </AuthLayout>
    );
}

