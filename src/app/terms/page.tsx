"use client";

import React from 'react';
import { ScrollText, Gavel, Globe, Users } from 'lucide-react';

export default function TermsPage() {
    return (
        <div className="bg-white min-h-screen py-24">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header Section */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider mb-6">
                        <ScrollText className="w-4 h-4" /> Usage Rules
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-black text-foreground tracking-tighter leading-none mb-6">
                        TERMS OF <span className="text-primary italic">SERVICE.</span>
                    </h1>
                    <p className="text-gray-500 font-bold text-lg">Last Updated: February 9, 2026</p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">
                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">1. Acceptance of Terms</h2>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                By accessing or using Petshack.au (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to any part of these terms, you may not access our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">2. Comparison Service</h2>
                            <div className="p-6 bg-surface rounded-2xl border border-border">
                                <p className="text-gray-600 text-sm font-medium leading-relaxed">
                                    Petshack.au is an aggregate price comparison platform. We do not sell products directly. All transactions occur on third-party retailer websites. We are not responsible for the quality, delivery, or safety of any products purchased through links on our platform.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">3. User Accounts</h2>
                            <p className="text-gray-600 leading-relaxed font-medium mb-4">
                                When you create an account with us, you must provide accurate and complete information. You are responsible for:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600 font-medium">
                                <li>Maintaining the confidentiality of your password.</li>
                                <li>All activities that occur under your account.</li>
                                <li>Notifying us immediately of any security breaches.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">4. Intellectual Property</h2>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                The Service and its original content (excluding product data from retailers) are and will remain the exclusive property of Petshack.au and its licensors. Our trademarks and brand identity may not be used in connection with any product or service without prior written consent.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">5. Limitation of Liability</h2>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                In no event shall Petshack.au be liable for any indirect, incidental, special, consequential, or punitive damages arising out of your use of our comparison tool or any reliance on the pricing data provided.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">6. Governing Law</h2>
                            <div className="flex items-center gap-4 p-6 bg-primary/5 border border-primary/10 rounded-[2rem]">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-primary uppercase tracking-widest">Legal Jurisdiction</p>
                                    <p className="text-lg font-black text-foreground">Victoria, Australia</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Quick Links */}
                    <div className="lg:col-span-4 lg:pl-12">
                        <div className="sticky top-32 space-y-8">
                            <div className="p-8 bg-surface rounded-[2.5rem] border border-border shadow-sm">
                                <h3 className="font-black text-foreground mb-6 uppercase tracking-tight">Quick Check</h3>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Gavel className="w-5 h-5 text-primary shrink-0" />
                                        <p className="text-xs font-bold text-gray-500">Must be 18+ to create an account.</p>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <Users className="w-5 h-5 text-primary shrink-0" />
                                        <p className="text-xs font-bold text-gray-500">One account per individual pet lover.</p>
                                    </div>
                                </div>
                                <hr className="my-6 border-border" />
                                <nav className="flex flex-col gap-4">
                                    <a href="/privacy" className="text-sm font-bold text-muted hover:text-primary transition-colors">Privacy Policy</a>
                                    <a href="/disclaimer" className="text-sm font-bold text-muted hover:text-primary transition-colors">Data Disclaimer</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
