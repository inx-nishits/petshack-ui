"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, CheckCircle2, ArrowRight, ShieldCheck, Eye, EyeOff } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";

export default function SignupPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreed: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName) newErrors.firstName = "First name is required";
        else if (!/^[A-Za-z]+$/.test(formData.firstName)) newErrors.firstName = "First name must contain only letters";

        if (!formData.lastName) newErrors.lastName = "Last name is required";
        else if (!/^[A-Za-z]+$/.test(formData.lastName)) newErrors.lastName = "Last name must contain only letters";

        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!formData.password) newErrors.password = "Password is required";
        else if (!passwordRegex.test(formData.password)) {
            newErrors.password = "Must contain uppercase, lowercase, number, symbol (min 8 chars)";
        }

        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (!formData.agreed) {
            newErrors.agreed = "You must agree to the terms";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            setTimeout(() => {
                setIsSubmitting(false);
                setIsEmailSent(true);
            }, 1500);
        }
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const updated = { ...prev };
                delete updated[field];
                return updated;
            });
        }
    };

    return (
        <AuthLayout>
            {!isEmailSent ? (
                <>
                    <div className="mb-8 lg:mb-10 text-left shrink-0">
                        <h2 className="text-3xl font-bold text-foreground mb-3 font-display tracking-tight">Create Account</h2>
                        <p className="text-muted font-medium text-sm sm:text-base leading-relaxed">Please enter your details to start saving.</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest pl-1">First Name</label>
                                <div className="relative group">
                                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${errors.firstName ? 'text-red-400' : 'text-gray-400 group-focus-within:text-primary'}`} />
                                    <input
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                                        className={`w-full bg-surface border ${errors.firstName ? 'border-red-500' : 'border-border focus:border-primary'} rounded-xl pl-12 pr-4 py-3.5 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-sm`}
                                        placeholder="Jane"
                                    />
                                    {errors.firstName && <span className="text-[10px] text-red-500 font-bold ml-4 mt-1 block">{errors.firstName}</span>}
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest pl-1">Last Name</label>
                                <div className="relative group">
                                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${errors.lastName ? 'text-red-400' : 'text-gray-400 group-focus-within:text-primary'}`} />
                                    <input
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                                        className={`w-full bg-surface border ${errors.lastName ? 'border-red-500' : 'border-border focus:border-primary'} rounded-xl pl-12 pr-4 py-3.5 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-sm`}
                                        placeholder="Doe"
                                    />
                                    {errors.lastName && <span className="text-[10px] text-red-500 font-bold ml-4 mt-1 block">{errors.lastName}</span>}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest pl-1">Email Address</label>
                            <div className="relative group">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${errors.email ? 'text-red-400' : 'text-gray-400 group-focus-within:text-primary'}`} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className={`w-full bg-surface border ${errors.email ? 'border-red-500' : 'border-border focus:border-primary'} rounded-xl pl-12 pr-4 py-3.5 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-sm`}
                                    placeholder="jane@example.com"
                                />
                                {errors.email && <span className="text-[10px] text-red-500 font-bold ml-4 mt-1 block">{errors.email}</span>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest pl-1">Create Password</label>
                            <div className="relative group">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${errors.password ? 'text-red-400' : 'text-gray-400 group-focus-within:text-primary'}`} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                    className={`w-full bg-surface border ${errors.password ? 'border-red-500' : 'border-border focus:border-primary'} rounded-xl pl-12 pr-12 py-3.5 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-sm`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary cursor-pointer transition-colors"
                                >
                                    {showPassword ? <Eye className="w-4.5 h-4.5" /> : <EyeOff className="w-4.5 h-4.5" />}
                                </button>
                                {errors.password && <span className="text-[10px] text-red-500 font-bold ml-4 mt-1 block leading-tight">{errors.password}</span>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest pl-1">Confirm Password</label>
                            <div className="relative group">
                                <ShieldCheck className={`absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 transition-colors ${errors.confirmPassword ? 'text-red-400' : 'text-gray-400 group-focus-within:text-primary'}`} />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                    className={`w-full bg-surface border ${errors.confirmPassword ? 'border-red-500' : 'border-border focus:border-primary'} rounded-xl pl-12 pr-12 py-3.5 focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-sm`}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary cursor-pointer transition-colors"
                                >
                                    {showConfirmPassword ? <Eye className="w-4.5 h-4.5" /> : <EyeOff className="w-4.5 h-4.5" />}
                                </button>
                                {errors.confirmPassword && <span className="text-[10px] text-red-500 font-bold ml-4 mt-1 block">{errors.confirmPassword}</span>}
                            </div>
                        </div>

                        <div className="flex items-start gap-4 py-1 group cursor-pointer" onClick={() => handleInputChange('agreed', !formData.agreed)}>
                            <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${formData.agreed ? 'bg-primary border-primary' : 'bg-surface border-border group-hover:border-primary'}`}>
                                {formData.agreed && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </div>
                            <p className="text-xs text-muted leading-relaxed font-semibold">
                                I agree to the <Link href="/terms" className="text-primary hover:underline font-bold cursor-pointer">Terms</Link> and <Link href="/privacy" className="text-primary hover:underline font-bold cursor-pointer">Privacy Policy</Link>.
                                {errors.agreed && <span className="block text-red-500 mt-1 font-bold">{errors.agreed}</span>}
                            </p>
                        </div>

                        <button
                            disabled={isSubmitting}
                            className={`w-full bg-primary text-white py-4 rounded-2xl font-bold text-lg shadow-[0_20px_40px_-10px_rgba(20,167,157,0.3)] hover:translate-y-[-2px] hover:shadow-[0_30px_60px_-15px_rgba(20,167,157,0.4)] active:translate-y-px transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-70 disabled:cursor-wait mt-2 shrink-0`}
                        >
                            {isSubmitting ? "Creating..." : (
                                <>
                                    Join PetShack Free <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-sm text-muted font-semibold tracking-tight pb-2 shrink-0">
                        Already have an account? {" "}
                        <Link href="/login" className="text-primary hover:underline font-bold cursor-pointer">
                            Log in
                        </Link>
                    </p>
                </>
            ) : (
                <div className="text-left py-6 animate-in fade-in zoom-in duration-500 shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 transition-transform hover:scale-105">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/20">
                            <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
                        </div>
                    </div>
                    <h2 className="text-4xl font-bold mb-4 tracking-tight">Verify Your Email</h2>
                    <p className="text-muted font-medium mb-10 leading-relaxed tracking-tight max-w-sm text-sm sm:text-base">
                        We've sent a verification link to <span className="text-foreground font-bold">{formData.email}</span>. Please click the link in the email to activate your account.
                    </p>

                    <div className="space-y-4">
                        <div className="p-4 bg-surface border border-border rounded-2xl">
                            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-2">Simulated Link (Demo Only)</p>
                            <Link
                                href="/verify-email"
                                className="inline-flex items-center gap-2 text-primary font-black hover:underline"
                            >
                                Click to Verify Account <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>

                        <button
                            onClick={() => setIsEmailSent(false)}
                            className="text-muted font-bold text-sm hover:text-primary transition-colors hover:underline cursor-pointer flex items-center gap-2"
                        >
                            <Mail className="w-4 h-4" /> Resend verification email
                        </button>
                    </div>

                    <div className="pt-8 border-t border-border mt-10">
                        <Link href="/login" className="text-sm font-bold text-muted hover:text-primary transition-colors flex items-center gap-2">
                            Back to Login
                        </Link>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
}

