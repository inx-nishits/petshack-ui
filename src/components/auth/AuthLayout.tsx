"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { User, ArrowLeft } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

interface AuthLayoutProps {
    children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
    return (
        <div className="h-dvh w-full overflow-hidden bg-[#F8FAFC] flex items-center justify-center p-0 sm:p-6 lg:p-8 relative">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[10%] -right-[5%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
            </div>

            <div className="max-w-6xl w-full h-full lg:h-[min(800px,90vh)] max-h-full grid grid-cols-1 lg:grid-cols-2 bg-white sm:rounded-[2.5rem] sm:border sm:border-border sm:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden relative z-10 shrink-0">

                {/* Left Side: Premium Branding - Hidden on mobile */}
                <div className="bg-primary/5 relative hidden lg:flex flex-col border-r border-border shrink-0 min-h-0 overflow-y-auto scrollbar-hide">
                    {/* Centering wrapper */}
                    <div className="flex flex-col min-h-full p-8 lg:p-12 xl:p-16">
                        <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-foreground transition-colors w-fit group">
                            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                            Back to Home
                        </Link>

                        <div className="grow" />
                        <div className="relative z-10 py-4">
                            <Logo />

                            <div className="mt-8 lg:mt-10">
                                <h1 className="text-3xl lg:text-4xl xl:text-[2.75rem] font-bold text-foreground mb-6 leading-[1.15] tracking-tight">
                                    Join Australia's <br />
                                    <span className="text-primary">Smartest</span> Pet Parents.
                                </h1>
                                <p className="text-muted text-base lg:text-lg mb-0 max-w-sm font-medium leading-relaxed">
                                    Create an account to unlock exclusive price tracking tools and save an average of $350/year.
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 flex items-center gap-4 text-sm font-semibold text-muted relative z-10 shrink-0">
                            <div className="flex -space-x-2">
                                {[
                                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64",
                                    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=64&h=64",
                                    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64",
                                    "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=64&h=64"
                                ].map((src, i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                                        <img
                                            src={src}
                                            alt={`User ${i + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <span className="leading-tight">Join 12,000+ happy pet owners</span>
                        </div>
                        <div className="grow" />
                    </div>
                </div>

                {/* Right Side: Form (Scrollable) */}
                <div className="flex flex-col h-full overflow-y-auto custom-scrollbar relative min-h-0">
                    <div className="flex flex-col min-h-full p-6 sm:p-10 lg:p-12 xl:p-16">
                        <div className="lg:hidden flex items-center justify-between w-full mb-8 shrink-0">
                            <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-foreground transition-colors group">
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                Back
                            </Link>
                            <Logo className="scale-90 origin-right" />
                        </div>

                        <div className="grow" />

                        <div className="py-4 w-full">
                            {children}
                        </div>

                        <div className="grow" />
                    </div>
                </div>
            </div>
        </div>
    );
}
