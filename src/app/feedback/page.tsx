"use client";

import { useState, useEffect } from "react";
import { MessageSquareText, CheckCircle, Mail, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function FeedbackPage() {
    const { user, isLoggedIn } = useAuth();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        topic: "general",
        message: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    // SOW 4.8: Pre-fill name and email for logged-in users
    useEffect(() => {
        if (isLoggedIn && user) {
            setFormData(prev => ({
                ...prev,
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || ""
            }));
        }
    }, [isLoggedIn, user]);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address";
        }
        if (!formData.message.trim()) newErrors.message = "Message is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setSubmitted(true);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-surface py-12 sm:py-20 flex items-center justify-center">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
                    <div className="bg-white rounded-2xl sm:rounded-[3rem] shadow-xl border border-border p-12 sm:p-20 text-center animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                            <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-black mb-4">Feedback Sent!</h2>
                        <p className="text-muted text-lg font-medium max-w-lg mx-auto mb-10">
                            Thank you for taking the time to help us improve. We've received your feedback and will review it shortly.
                        </p>
                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setFormData(prev => ({
                                    ...prev,
                                    topic: "general",
                                    message: "",
                                    // Keep name/email for logged-in users
                                    ...(isLoggedIn ? {} : { firstName: "", lastName: "", email: "" })
                                }));
                            }}
                            className="px-8 py-4 bg-surface border border-border text-foreground hover:bg-white hover:border-primary hover:text-primary rounded-xl font-bold transition-all shadow-sm"
                        >
                            Send Another
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface py-12 sm:py-20 flex items-center justify-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                <div className="bg-white rounded-2xl sm:rounded-[3rem] shadow-xl border border-border overflow-hidden relative">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left Panel */}
                        <div className="p-8 sm:p-12 lg:p-16 bg-primary/5 border-r border-border/50 text-center lg:text-left flex flex-col justify-center">
                            <MessageSquareText className="w-12 h-12 sm:w-16 sm:h-16 text-primary mb-6 sm:mb-8 mx-auto lg:mx-0" />
                            <h1 className="text-3xl sm:text-4xl font-black text-foreground mb-4 sm:mb-6">We Value Your Bark!</h1>
                            <p className="text-muted text-sm sm:text-base font-medium leading-relaxed mb-6">
                                Your feedback helps us make PetShack better for every paw in Australia. Tell us what you love or what needs fetching.
                            </p>
                            {isLoggedIn && (
                                <div className="bg-white border border-border rounded-2xl p-4 flex items-center gap-3 text-sm font-bold text-gray-700">
                                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-black text-sm shrink-0">
                                        {user?.firstName[0]}{user?.lastName[0]}
                                    </div>
                                    <div className="text-left">
                                        <div className="font-black">{user?.firstName} {user?.lastName}</div>
                                        <div className="text-xs text-muted-light font-medium">{user?.email}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Panel — Form */}
                        <div className="p-8 sm:p-12 lg:p-16">
                            <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                                {/* SOW 3.7 / 4.8: First Name + Last Name */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-black text-muted-light uppercase tracking-widest mb-2">
                                            First Name <span className="text-red-500">*</span>
                                        </label>
                                        {isLoggedIn ? (
                                            <div className="flex items-center gap-2 px-4 py-3 bg-surface border border-border rounded-xl text-sm font-bold text-foreground opacity-75">
                                                <User className="w-4 h-4 text-primary shrink-0" />
                                                {formData.firstName}
                                            </div>
                                        ) : (
                                            <>
                                                <input
                                                    type="text"
                                                    value={formData.firstName}
                                                    onChange={e => handleChange("firstName", e.target.value)}
                                                    placeholder="First name"
                                                    className={`w-full bg-surface border rounded-xl px-4 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-sm min-h-[44px] ${errors.firstName ? "border-red-400" : "border-border"}`}
                                                />
                                                {errors.firstName && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.firstName}</span>}
                                            </>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-black text-muted-light uppercase tracking-widest mb-2">
                                            Last Name <span className="text-red-500">*</span>
                                        </label>
                                        {isLoggedIn ? (
                                            <div className="flex items-center gap-2 px-4 py-3 bg-surface border border-border rounded-xl text-sm font-bold text-foreground opacity-75">
                                                {formData.lastName}
                                            </div>
                                        ) : (
                                            <>
                                                <input
                                                    type="text"
                                                    value={formData.lastName}
                                                    onChange={e => handleChange("lastName", e.target.value)}
                                                    placeholder="Last name"
                                                    className={`w-full bg-surface border rounded-xl px-4 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-sm min-h-[44px] ${errors.lastName ? "border-red-400" : "border-border"}`}
                                                />
                                                {errors.lastName && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.lastName}</span>}
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* SOW 3.7 / 4.8: Email Address */}
                                <div>
                                    <label className="block text-xs font-black text-muted-light uppercase tracking-widest mb-2">
                                        Email Address <span className="text-red-500">*</span>
                                    </label>
                                    {isLoggedIn ? (
                                        <div className="flex items-center gap-2 px-4 py-3 bg-surface border border-border rounded-xl text-sm font-bold text-foreground opacity-75">
                                            <Mail className="w-4 h-4 text-primary shrink-0" />
                                            {formData.email}
                                            <span className="ml-auto text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-black uppercase">Verified</span>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-light" />
                                                <input
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={e => handleChange("email", e.target.value)}
                                                    placeholder="your@email.com"
                                                    className={`w-full bg-surface border rounded-xl pl-10 pr-4 py-3 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-sm min-h-[44px] ${errors.email ? "border-red-400" : "border-border"}`}
                                                />
                                            </div>
                                            {errors.email && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.email}</span>}
                                        </>
                                    )}
                                </div>

                                {/* Topic Dropdown */}
                                <div>
                                    <label className="block text-xs font-black text-muted-light uppercase tracking-widest mb-2">
                                        Topic <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={formData.topic}
                                        onChange={e => handleChange("topic", e.target.value)}
                                        className="w-full bg-surface border border-border rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-bold text-xs sm:text-sm min-h-[44px]"
                                    >
                                        <option value="general">General Feedback</option>
                                        <option value="feature">Feature Request</option>
                                        <option value="bug">Report a Bug</option>
                                        <option value="pricing">Pricing Issues</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>

                                {/* Notes / Message */}
                                <div>
                                    <label className="block text-xs font-black text-muted-light uppercase tracking-widest mb-2">
                                        Notes <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={e => handleChange("message", e.target.value)}
                                        className={`w-full bg-surface border rounded-xl px-4 py-3 sm:px-5 sm:py-4 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-sm min-h-[120px] ${errors.message ? "border-red-400" : "border-border"}`}
                                        placeholder="Add your comments here..."
                                    />
                                    {errors.message && <span className="text-[10px] text-red-500 font-bold mt-1 block">{errors.message}</span>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-3 sm:py-5 rounded-xl font-black text-lg shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all hover:-translate-y-1 active:translate-y-0 min-h-[44px]"
                                >
                                    Send Feedback
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
