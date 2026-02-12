"use client";

import { MessageSquare, Send } from "lucide-react";

export const ContactForm = () => {
    return (
        <section className="py-12 lg:py-16 bg-white border-t border-gray-50">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-white border border-border shadow-2xl rounded-[1.5rem] lg:rounded-[2.5rem] p-6 md:p-10 lg:p-16">
                    <div className="text-center mb-8 lg:mb-12">
                        <h2 className="text-2xl lg:text-3xl font-black mb-3 lg:mb-4 flex items-center justify-center gap-2 lg:gap-3">
                            <MessageSquare className="w-6 h-6 lg:w-8 lg:h-8 text-accent" />
                            Drop Us a Paw-Note
                        </h2>
                        <p className="text-gray-600 text-base lg:text-lg font-medium">
                            Got a thought, idea, or even a tiny grumble?
                        </p>
                    </div>

                    <form className="space-y-4 lg:space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
                            <div className="space-y-2 lg:space-y-3">
                                <label className="text-xs lg:text-sm font-bold">Your Name</label>
                                <input type="text" className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 lg:py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm lg:text-base" placeholder="Enter name" />
                            </div>
                            <div className="space-y-2 lg:space-y-3">
                                <label className="text-xs lg:text-sm font-bold">Email Address</label>
                                <input type="email" className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 lg:py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm lg:text-base" placeholder="Enter email" />
                            </div>
                        </div>

                        <div className="space-y-2 lg:space-y-3">
                            <label className="text-xs lg:text-sm font-bold">Topic</label>
                            <select className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 lg:py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all appearance-none cursor-pointer text-sm lg:text-base">
                                <option>General Feedback</option>
                                <option>Product Pricing Error</option>
                                <option>Missing Retailer</option>
                                <option>Feature Request</option>
                                <option>Bug Report</option>
                            </select>
                        </div>

                        <div className="space-y-2 lg:space-y-3">
                            <label className="text-xs lg:text-sm font-bold">Your Message</label>
                            <textarea rows={4} className="w-full bg-surface border border-border rounded-xl px-4 py-2.5 lg:py-3.5 focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all text-sm lg:text-base" placeholder="Tell us how we can help..."></textarea>
                        </div>

                        <button className="w-full bg-primary text-white py-4 lg:py-5 rounded-xl font-bold shadow-xl shadow-primary/20 flex items-center justify-center gap-3 hover:scale-[1.01] transition-all text-sm lg:text-base">
                            Send Feedback <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

