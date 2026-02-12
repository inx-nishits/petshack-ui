"use client";

import React from 'react';
import { AlertCircle, RefreshCcw, ExternalLink, CheckCircle } from 'lucide-react';

export default function DisclaimerPage() {
    return (
        <div className="bg-white min-h-screen py-12 lg:py-16">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header Section */}
                <div className="mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider mb-6">
                        <AlertCircle className="w-4 h-4" /> Price Accuracy Notice
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-black text-foreground tracking-tighter leading-none mb-6">
                        DATA <span className="text-primary italic">DISCLAIMER.</span>
                    </h1>
                    <p className="text-gray-500 font-bold text-lg">Last Updated: February 9, 2026</p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 space-y-12">
                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">1. Pricing Accuracy</h2>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                While we use advanced technology to fetch the most up-to-date prices from over 40+ Aussie retailers, prices and stock availability change rapidly. The price shown on Petshack.au may occasionally differ from the final price on the retailer's checkout page.
                            </p>
                            <div className="mt-6 p-6 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-4">
                                <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                                <p className="text-sm font-bold text-red-800 leading-relaxed">
                                    CRITICAL: Always verify the final total price, including shipping and taxes, on the retailer’s website before completing any purchase.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">2. Update Frequency</h2>
                            <p className="text-gray-600 leading-relaxed font-medium mb-4">
                                Our platform periodically refreshes data from retailers. The "Last Updated" timestamp on product pages indicates when we most recently synced with that specific store.
                            </p>
                            <div className="p-6 bg-surface rounded-2xl border border-border flex items-center gap-4">
                                <RefreshCcw className="w-5 h-5 text-primary animate-spin-slow" />
                                <p className="text-sm font-bold text-gray-600">We aim to refresh top-tier deals every 2-4 hours.</p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">3. Affiliate Disclosure</h2>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                To keep our service free for pet parents, Petshack.au participates in various affiliate marketing programs. This means we may earn a small commission if you click through and make a purchase. This does not affect the price you pay or our ranking of the "Best Price."
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">4. Retailer Relationships</h2>
                            <p className="text-gray-600 leading-relaxed font-medium">
                                Petshack.au is an independent comparison tool. We are not owned by, or exclusively partnered with, any specific retailer. Our goal is to provide objective data to help you save money.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-black text-foreground mb-4 uppercase tracking-tight">5. User Responsibility</h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <p className="text-gray-600 text-sm font-medium">Read retailer terms and return policies carefully.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <p className="text-gray-600 text-sm font-medium">Check product specifications on the official store page.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                    <p className="text-gray-600 text-sm font-medium">Verify that the correct breed/size variant is selected.</p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Quick Links */}
                    <div className="lg:col-span-4 lg:pl-12">
                        <div className="sticky top-32 space-y-8">
                            <div className="p-8 bg-surface rounded-[2.5rem] border border-border shadow-sm">
                                <h3 className="font-black text-foreground mb-6 uppercase tracking-tight">Verify Shop</h3>
                                <p className="text-xs font-bold text-gray-500 leading-relaxed mb-6">
                                    Look for the "View Deal" button to be safely redirected to the official Australian retailer store.
                                </p>
                                <div className="w-full bg-primary text-white p-4 rounded-xl flex items-center justify-center gap-2 font-black text-xs uppercase tracking-widest">
                                    Visit Store <ExternalLink className="w-4 h-4" />
                                </div>
                                <hr className="my-6 border-border" />
                                <nav className="flex flex-col gap-4">
                                    <a href="/privacy" className="text-sm font-bold text-muted hover:text-primary transition-colors">Privacy Policy</a>
                                    <a href="/terms" className="text-sm font-bold text-muted hover:text-primary transition-colors">Terms of Service</a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

