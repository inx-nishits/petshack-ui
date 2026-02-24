"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, ArrowRight, ShieldCheck, RefreshCw } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function VerifyEmailPage() {
    const [code, setCode] = useState(["", "", "", "", ""]);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState("");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();

    const handleChange = (index: number, value: string) => {
        if (value.length > 1) value = value[value.length - 1];
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Move to next input if value is entered
        if (value && index < 4) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleVerify = (e: React.FormEvent) => {
        e.preventDefault();
        const verificationCode = code.join("");
        if (verificationCode.length < 5) {
            setError("Please enter the full 5-digit code");
            return;
        }

        setIsVerifying(true);
        setError("");

        // Simulation
        setTimeout(() => {
            setIsVerifying(false);
            router.push("/dashboard?welcome=true");
        }, 1500);
    };

    return (
        <AuthLayout>
            <div className="mb-8 text-left">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                    <Mail className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-black text-gray-900 mb-2 font-display tracking-tight">Check your email</h2>
                <p className="text-muted font-medium text-sm leading-relaxed">
                    We've sent a 5-digit verification code to your email address. Please enter it below to continue.
                </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-8">
                <div className="flex justify-between gap-2 sm:gap-4">
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { inputRefs.current[index] = el; }}
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-full h-14 sm:h-20 text-center text-2xl font-black bg-surface border border-border rounded-2xl focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                        />
                    ))}
                </div>

                {error && (
                    <p className="text-xs font-bold text-red-500 text-center animate-in shake duration-300">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-full bg-primary text-white py-4 sm:py-5 rounded-2xl font-black text-base sm:text-lg shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                    {isVerifying ? "Verifying..." : (
                        <>
                            Verify Account <ShieldCheck className="w-5 h-5 transition-transform group-hover:scale-110" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-10 text-center space-y-4">
                <p className="text-xs sm:text-sm text-muted font-bold tracking-tight">
                    Didn't receive the code?
                </p>
                <button className="text-primary font-black hover:underline flex items-center gap-2 mx-auto text-xs uppercase tracking-widest">
                    <RefreshCw className="w-3 h-3" /> Resend Code
                </button>
            </div>
        </AuthLayout>
    );
}
