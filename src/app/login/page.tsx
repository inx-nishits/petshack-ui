"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Mail, Lock, ArrowRight, Eye, EyeOff, CheckCircle2, User } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const signupSuccess = searchParams.get('signup') === 'success';

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError("Please fill in all fields");
            return;
        }

        setIsLoggingIn(true);
        setError("");

        setTimeout(() => {
            setIsLoggingIn(false);
            router.push("/");
        }, 800);
    };

    return (
        <AuthLayout>
            <div className="mb-10 text-left shrink-0">
                {signupSuccess && (
                    <div className="mb-8 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span className="text-sm font-bold text-green-700">Account created! Please sign in.</span>
                    </div>
                )}
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-3 font-display tracking-tight">Welcome Back</h2>
                <p className="text-muted font-medium tracking-tight text-sm sm:text-base leading-relaxed">Continue finding the best pet deals.</p>
            </div>

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl text-xs font-bold text-red-500 animate-in shake duration-300 shrink-0">
                    {error}
                </div>
            )}

            <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest pl-1">Email Address</label>
                    <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-surface border border-border rounded-xl pl-12 pr-4 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-sm"
                            placeholder="name@email.com"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Password</label>
                        <Link href="/forgot-password" className="text-[10px] font-bold text-primary hover:underline cursor-pointer">
                            Forgot password?
                        </Link>
                    </div>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type={showPassword ? "text" : "password"}
                            required
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-surface border border-border rounded-xl pl-12 pr-12 py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-sm"
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary cursor-pointer transition-colors"
                        >
                            {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-[0_20px_40px_-5px_rgba(20,167,157,0.3)] hover:translate-y-[-2px] hover:shadow-[0_25px_50px_-12px_rgba(20,167,157,0.4)] active:translate-y-px transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-wait shrink-0"
                >
                    {isLoggingIn ? "Logging in..." : (
                        <>
                            Sign In <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </>
                    )}
                </button>
            </form>

            <p className="text-center mt-12 text-sm text-muted font-semibold tracking-tight pb-4 shrink-0">
                New to PetShack? {" "}
                <Link href="/signup" className="text-primary font-bold hover:underline cursor-pointer transition-colors">
                    Join free today
                </Link>
            </p>
        </AuthLayout>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <AuthLayout>
                <div className="flex items-center justify-center p-20">
                    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
            </AuthLayout>
        }>
            <LoginContent />
        </Suspense>
    );
}
