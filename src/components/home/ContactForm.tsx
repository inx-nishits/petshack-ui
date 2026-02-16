"use client";

import { MessageSquare, Send } from "lucide-react";

export const ContactForm = () => {
    return (
        <section className="py-8 sm:py-12 lg:py-16 bg-white border-t border-gray-50">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-4xl mx-auto bg-white border border-border shadow-2xl rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] p-4 sm:p-6 md:p-10 lg:p-16">
                    <div className="text-center mb-6 sm:mb-8 lg:mb-12">
                        <h2 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-black mb-2 sm:mb-3 lg:mb-4 flex items-center justify-center gap-2 lg:gap-3">
                            <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-accent" />
                            Drop Us a Paw-Note
                        </h2>
                        <p className="text-gray-600 text-sm sm:text-base lg:text-lg font-medium">
                            Got a thought, idea, or even a tiny grumble?
                        </p>
                    </div>

                    <form className="space-y-4 sm:space-y-6 lg:space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                            <div className="space-y-2 lg:space-y-3">
                                <label className="text-xs sm:text-sm font-bold">Your Name</label>
                                <input type="text" className="w-full bg-surface border border-border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 lg:py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm sm:text-base min-h-[44px]" placeholder="Enter name" />
                            </div>
                            <div className="space-y-2 lg:space-y-3">
                                <label className="text-xs sm:text-sm font-bold">Email Address</label>
                                <input type="email" className="w-full bg-surface border border-border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 lg:py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm sm:text-base min-h-[44px]" placeholder="Enter email" />
                            </div>
                        </div>

                        <div className="space-y-2 lg:space-y-3">
                            <label className="text-xs sm:text-sm font-bold">Topic</label>
                            <select className="w-full bg-surface border border-border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 lg:py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none cursor-pointer text-sm sm:text-base min-h-[44px]">
                                <option>General Feedback</option>
                                <option>Product Pricing Error</option>
                                <option>Missing Retailer</option>
                                <option>Feature Request</option>
                                <option>Bug Report</option>
                            </select>
                        </div>

                        <div className="space-y-2 lg:space-y-3">
                            <label className="text-xs sm:text-sm font-bold">Your Message</label>
                            <textarea rows={4} className="w-full bg-surface border border-border rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 lg:py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm sm:text-base" placeholder="Tell us how we can help..."></textarea>
                        </div>

                        <button className="w-full bg-primary text-white py-3 sm:py-4 lg:py-5 rounded-xl font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-2 sm:gap-3 hover:scale-[1.01] transition-all text-sm sm:text-base min-h-[44px]">
                            Send Feedback <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

