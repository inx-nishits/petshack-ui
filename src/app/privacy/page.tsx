"use client";

import React from 'react';
import { ShieldCheck, Mail, Lock, Eye } from 'lucide-react';

export default function PrivacyPage() {
    return (
        <div className="bg-white min-h-screen py-12 lg:py-16">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header Section */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider mb-6">
                        <ShieldCheck className="w-4 h-4" /> Your Data is Safe
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-black text-foreground tracking-tighter leading-none mb-6">
                        PRIVACY <span className="text-primary italic">POLICY.</span>
                    </h1>
                    <p className="text-gray-500 font-bold text-lg">Last Updated: February 9, 2026</p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">
                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">1. Introduction</h2>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                At Petshack.au, we are committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, and disclose your personal information when you use our price comparison platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">2. Information We Collect</h2>
                            <div className="space-y-4">
                                <div className="p-6 bg-surface rounded-2xl border border-border">
                                    <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                                        <Lock className="w-4 h-4 text-primary" /> Account Information
                                    </h3>
                                    <p className="text-gray-600 text-sm font-medium">When you sign up, we collect your name, email address, and password to manage your account and preferences.</p>
                                </div>
                                <div className="p-6 bg-surface rounded-2xl border border-border">
                                    <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                                        <Eye className="w-4 h-4 text-primary" /> Usage Data
                                    </h3>
                                    <p className="text-gray-600 text-sm font-medium">We collect information about how you interact with our platform, including search queries, viewed products, and clicked deals.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">3. How We Use Your Data</h2>
                            <p className="text-gray-600 leading-relaxed font-medium mb-4">
                                We use the collected information for various purposes, including:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-gray-600 font-medium">
                                <li>Providing and maintaining our price comparison service.</li>
                                <li>Personalizing your experience and showing you relevant pet deals.</li>
                                <li>Sending you price drop alerts and newsletters (if subscribed).</li>
                                <li>Analyzing platform usage to improve our features and performance.</li>
                                <li>Detecting and preventing fraudulent or unauthorized activity.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">4. Australian Privacy Principles</h2>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                We comply with the Australian Privacy Principles (APPs) as set out in the Privacy Act 1988 (Cth). We take reasonable steps to ensure that your personal information is stored securely and protected from misuse.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">5. Contact Us</h2>
                            <p className="text-gray-600 leading-relaxed font-medium mb-6">
                                If you have any questions about this Privacy Policy or how we handle your data, please contact our data protection team:
                            </p>
                            <div className="flex items-center gap-4 p-6 bg-primary/5 border border-primary/10 rounded-[2rem]">
                                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-black text-primary uppercase tracking-widest">Email Support</p>
                                    <p className="text-lg font-black text-foreground">privacy@petshack.au</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Quick Links */}
                    <div className="lg:col-span-4 lg:pl-12">
                        <div className="sticky top-32 space-y-8">
                            <div className="p-8 bg-surface rounded-[2.5rem] border border-border shadow-sm">
                                <h3 className="font-black text-foreground mb-6 uppercase tracking-tight">Quick Links</h3>
                                <nav className="flex flex-col gap-4">
                                    <a href="/terms" className="text-sm font-bold text-muted hover:text-primary transition-colors">Terms of Service</a>
                                    <a href="/disclaimer" className="text-sm font-bold text-muted hover:text-primary transition-colors">Data Disclaimer</a>
                                    <a href="/faqs" className="text-sm font-bold text-muted hover:text-primary transition-colors">Safety FAQs</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

