"use client";

import { MessageSquare, Send, Phone, MapPin, Mail } from "lucide-react";

export default function ContactPage() {
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
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-sm sm:text-base">Email Support</span>
                                        <span className="text-muted text-sm sm:text-base">support@petshack.au</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-sm sm:text-base">Phone</span>
                                        <span className="text-muted text-sm sm:text-base">+61 (02) 8000 0000</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 sm:gap-4">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/5 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
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

                            <form className="space-y-4 lg:space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                                    <div className="space-y-2 lg:space-y-3">
                                        <label className="text-xs lg:text-sm font-bold">Your Name</label>
                                        <input type="text" className="w-full bg-surface border border-border rounded-xl px-4 py-3 sm:py-2.5 lg:py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-base sm:text-sm lg:text-base min-h-[44px]" placeholder="Enter name" />
                                    </div>
                                    <div className="space-y-2 lg:space-y-3">
                                        <label className="text-xs lg:text-sm font-bold">Email Address</label>
                                        <input type="email" className="w-full bg-surface border border-border rounded-xl px-4 py-3 sm:py-2.5 lg:py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-base sm:text-sm lg:text-base min-h-[44px]" placeholder="Enter email" />
                                    </div>
                                </div>

                                <div className="space-y-2 lg:space-y-3">
                                    <label className="text-xs lg:text-sm font-bold">Topic</label>
                                    <select className="w-full bg-surface border border-border rounded-xl px-4 py-3 sm:py-2.5 lg:py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none cursor-pointer text-base sm:text-sm lg:text-base min-h-[44px]">
                                        <option>General Feedback</option>
                                        <option>Product Pricing Error</option>
                                        <option>Missing Retailer</option>
                                        <option>Feature Request</option>
                                        <option>Bug Report</option>
                                    </select>
                                </div>

                                <div className="space-y-2 lg:space-y-3">
                                    <label className="text-xs lg:text-sm font-bold">Your Message</label>
                                    <textarea rows={5} className="w-full bg-surface border border-border rounded-xl px-4 py-3 sm:py-2.5 lg:py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-base sm:text-sm lg:text-base" placeholder="Tell us how we can help..."></textarea>
                                </div>

                                <button className="w-full bg-primary text-white py-3 sm:py-4 lg:py-5 rounded-xl font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.01] transition-all text-base sm:text-sm lg:text-base min-h-[44px]">
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

