"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, ArrowRight, ShieldCheck, CheckCircle2, Eye, EyeOff, User } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function ResetPasswordPage() {
    const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

    const validate = () => {
        const newErrors = { password: "", confirmPassword: "" };
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!formData.password) newErrors.password = "Password is required";
        else if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Must contain uppercase, lowercase, number, symbol (min 8 chars)";
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return !newErrors.password && !newErrors.confirmPassword;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                setIsSuccess(true);
            }, 1200);
        }
    };

    return (
        <AuthLayout>
            {!isSuccess ? (
                <>
                    <div className="mb-10 text-left shrink-0">
                        <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-3 font-display tracking-tight">New Password</h2>
                        <p className="text-muted font-medium tracking-tight text-sm sm:text-base leading-relaxed">Please enter your new secure password.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest pl-1">New Password</label>
                            <div className="relative group">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-primary'}`} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className={`w-full bg-surface border ${errors.password ? 'border-red-500' : 'border-border focus:border-primary'} rounded-xl pl-12 pr-12 py-4 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-sm`}
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
                            {errors.password && <span className="text-[10px] text-red-500 font-bold ml-4 block leading-tight mt-1">{errors.password}</span>}
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest pl-1">Confirm New Password</label>
                            <div className="relative group">
                                <ShieldCheck className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${errors.confirmPassword ? 'text-red-400' : 'text-gray-400 group-focus-within:text-primary'}`} />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    className={`w-full bg-surface border ${errors.confirmPassword ? 'border-red-500' : 'border-border focus:border-primary'} rounded-xl pl-12 pr-12 py-4 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-sm`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary cursor-pointer transition-colors"
                                >
                                    {showConfirmPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && <span className="text-[10px] text-red-500 font-bold ml-4 block leading-tight mt-1">{errors.confirmPassword}</span>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-[0_20px_40px_-5px_rgba(20,167,157,0.3)] hover:translate-y-[-2px] hover:shadow-[0_25px_50px_-12px_rgba(20,167,157,0.4)] transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-50 disabled:cursor-wait mt-2 shrink-0"
                        >
                            {isSubmitting ? "Updating..." : (
                                <>
                                    Update Password <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </>
                            )}
                        </button>
                    </form>
                </>
            ) : (
                <div className="text-left py-6 animate-in fade-in zoom-in duration-500 shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-50 rounded-2xl flex items-center justify-center mb-6 transition-transform hover:scale-105">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-100 rounded-xl flex items-center justify-center">
                            <CheckCircle2 className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 tracking-tight">Password Updated</h2>
                    <p className="text-muted font-medium mb-10 leading-relaxed tracking-tight max-w-xs text-sm sm:text-base">
                        Your identity has been verified and your password has been successfully reset.
                    </p>
                    <Link
                        href="/login"
                        className="w-full bg-primary text-white py-5 rounded-2xl font-bold text-lg shadow-[0_20px_40px_-5px_rgba(20,167,157,0.3)] hover:translate-y-[-2px] hover:shadow-[0_25px_50px_-12px_rgba(20,167,157,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer group max-w-xs"
                    >
                        Sign In Now <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            )}
        </AuthLayout>
    );
}

