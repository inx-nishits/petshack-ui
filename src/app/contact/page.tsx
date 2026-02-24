import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Phone, MapPin, Mail, CheckCircle2, ShieldCheck, ChevronDown } from "lucide-react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        topic: "General Feedback",
        message: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLFormElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
        if (!formData.message) newErrors.message = "Message is required";
        if (!isCaptchaVerified) newErrors.captcha = "Please verify you are not a robot";
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Mock submission
        console.log("Form submitted:", formData);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="bg-white min-h-screen py-20 px-4">
                <div className="max-w-xl mx-auto text-center space-y-8 animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto border-4 border-green-100">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl font-black text-foreground">Message Sent!</h1>
                        <p className="text-lg text-muted font-medium">
                            Thanks for reaching out, <span className="text-primary font-bold">{formData.name}</span>! One of our experts will get back to you shortly.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                    >
                        Back to Contact Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-surface py-8 sm:py-12 lg:py-16 border-b border-border">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4 sm:mb-6">Contact Us & Feedback</h1>
                    <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto px-2">
                        Have a question or suggestion? We'd love to hear from you. Your feedback helps us make Petshack better for everyone.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
                    {/* Info Side */}
                    <div className="space-y-8 sm:space-y-12">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-black mb-4 sm:mb-6">Ways to reach us</h2>
                            <div className="space-y-6 sm:space-y-8">
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-sm sm:text-base">Email Support</span>
                                        <span className="text-muted text-sm sm:text-base">support@petshack.au</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-sm sm:text-base">Phone</span>
                                        <span className="text-muted text-sm sm:text-base">+61 (02) 8000 0000</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-sm sm:text-base">Head Office</span>
                                        <span className="text-muted text-sm sm:text-base">Sydney, NSW 2000, Australia</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary p-6 sm:p-8 rounded-2xl sm:rounded-3xl text-white">
                            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Are you a retailer?</h3>
                            <p className="text-white/70 mb-4 sm:mb-6 text-xs sm:text-sm">Join our platform to list your products and reach more customers.</p>
                            <a href="/partners" className="inline-flex items-center gap-2 font-bold text-accent hover:underline text-sm sm:text-base min-h-[44px]">
                                Partner with us →
                            </a>
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="lg:col-span-2">
                        <div className="bg-white border border-border shadow-2xl rounded-2xl sm:rounded-[1.5rem] lg:rounded-[2.5rem] p-6 lg:p-16">
                            <h2 className="text-xl sm:text-2xl font-black mb-6 sm:mb-8 lg:mb-10 flex items-center gap-2 sm:gap-3">
                                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-accent" />
                                Send Feedback
                            </h2>

                            <form className="space-y-4 lg:space-y-8" onSubmit={handleSubmit} ref={dropdownRef}>
                                <div className="space-y-2 lg:space-y-3">
                                    <label className="text-xs lg:text-sm font-bold">Topic</label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsOpen(!isOpen)}
                                            className="w-full bg-surface border border-border rounded-xl px-4 pr-12 py-3 sm:py-2.5 lg:py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-left text-base sm:text-sm lg:text-base min-h-[44px] font-medium flex items-center justify-between group"
                                        >
                                            <span className="truncate">{formData.topic}</span>
                                            <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                                                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-primary" />
                                            </div>
                                        </button>

                                        {isOpen && (
                                            <div className="absolute top-full left-0 w-full mt-2 bg-white border border-border rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                                <div className="p-1">
                                                    {["General Feedback", "Product Pricing Error", "Missing Retailer", "Feature Request", "Bug Report"].map((item) => (
                                                        <button
                                                            key={item}
                                                            type="button"
                                                            onClick={() => {
                                                                setFormData({ ...formData, topic: item });
                                                                setIsOpen(false);
                                                            }}
                                                            className={`w-full text-left px-4 py-2.5 text-sm sm:text-base font-medium rounded-lg transition-colors ${formData.topic === item
                                                                ? 'bg-primary text-white'
                                                                : 'hover:bg-surface text-foreground hover:text-primary'
                                                                }`}
                                                        >
                                                            {item}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                                    <div className="space-y-2 lg:space-y-3">
                                        <label className="text-xs lg:text-sm font-bold">Your Name</label>
                                        <input
                                            type="text"
                                            className={`w-full bg-surface border rounded-xl px-4 py-3 sm:py-2.5 lg:py-3.5 focus:ring-4 focus:ring-primary/10 outline-none transition-all text-base sm:text-sm lg:text-base min-h-[44px] ${errors.name ? 'border-red-500 bg-red-50/10' : 'border-border focus:border-primary'}`}
                                            placeholder="Enter name"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                        {errors.name && <p className="text-red-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2 lg:space-y-3">
                                        <label className="text-xs lg:text-sm font-bold">Email Address</label>
                                        <input
                                            type="email"
                                            className={`w-full bg-surface border rounded-xl px-4 py-3 sm:py-2.5 lg:py-3.5 focus:ring-4 focus:ring-primary/10 outline-none transition-all text-base sm:text-sm lg:text-base min-h-[44px] ${errors.email ? 'border-red-500 bg-red-50/10' : 'border-border focus:border-primary'}`}
                                            placeholder="Enter email"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                        {errors.email && <p className="text-red-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2 lg:space-y-3">
                                    <label className="text-xs lg:text-sm font-bold">Notes</label>
                                    <textarea
                                        rows={5}
                                        className={`w-full bg-surface border rounded-xl px-4 py-3 sm:py-2.5 lg:py-3.5 focus:ring-4 focus:ring-primary/10 outline-none transition-all text-base sm:text-sm lg:text-base ${errors.message ? 'border-red-500 bg-red-50/10' : 'border-border focus:border-primary'}`}
                                        placeholder="Tell us how we can help..."
                                        value={formData.message}
                                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                                    ></textarea>
                                    {errors.message && <p className="text-red-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest">{errors.message}</p>}
                                </div>

                                {/* Mock ReCaptcha */}
                                <div className="space-y-3">
                                    <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${isCaptchaVerified ? 'bg-green-50 border-green-200' : 'bg-surface border-border'}`}>
                                        <input
                                            type="checkbox"
                                            className="w-5 h-5 rounded cursor-pointer accent-primary"
                                            id="captcha"
                                            checked={isCaptchaVerified}
                                            onChange={e => setIsCaptchaVerified(e.target.checked)}
                                        />
                                        <label htmlFor="captcha" className="flex-1 flex items-center justify-between cursor-pointer">
                                            <span className="text-sm font-bold text-foreground">I am not a robot</span>
                                            <div className="flex flex-col items-center opacity-50">
                                                <ShieldCheck className="w-6 h-6 text-primary" />
                                                <span className="text-[8px] font-black uppercase">reCAPTCHA</span>
                                            </div>
                                        </label>
                                    </div>
                                    {errors.captcha && <p className="text-red-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest">{errors.captcha}</p>}
                                </div>

                                <button type="submit" className="w-full bg-primary text-white py-3 sm:py-4 lg:py-5 rounded-xl font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.01] active:scale-95 transition-all text-base sm:text-sm lg:text-base min-h-[44px]">
                                    Send Feedback <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

