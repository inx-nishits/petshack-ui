"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export const MerchantShowcase = () => {
    const [imageError, setImageError] = useState(false);

    return (
        <section className="py-12 lg:py-20">
            <div className="container mx-auto px-6">
                <div className="max-w-7xl mx-auto">
                    {/* The Advertising Billboard */}
                    <Link
                        href="https://petshack.au"
                        target="_blank"
                        className="group relative block w-full rounded-[2rem] lg:rounded-[3.5rem] overflow-hidden bg-surface shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] transition-all duration-700 hover:shadow-[0_40px_120px_-20px_rgba(20,167,157,0.2)] hover:-translate-y-2 border-4 border-white active:scale-[0.99]"
                    >
                        {!imageError ? (
                            <div className="relative w-full">
                                {/* The Merchant's Creative - h-auto ensures NO CROPPING as requested */}
                                <img
                                    src="https://images.unsplash.com/photo-1591768793355-74d7af73d744?q=80&w=2070&auto=format&fit=crop"
                                    alt="Pet Shack Promotional Banner"
                                    className="w-full h-auto block transition-transform duration-[2000ms] group-hover:scale-105"
                                    onError={() => setImageError(true)}
                                />

                                {/* Professional "AD" Tag - Small, discreet but legally compliant */}
                                <div className="absolute top-6 right-6 lg:top-10 lg:right-10 px-3 py-1 bg-black/20 backdrop-blur-md rounded-md border border-white/20 text-white/80 text-[10px] font-bold uppercase tracking-widest pointer-events-none">
                                    Ad
                                </div>
                            </div>
                        ) : (
                            /* Professional Mock State */
                            <div className="w-full aspect-21/9 lg:aspect-21/6 flex items-center justify-center bg-linear-to-br from-primary/5 to-surface text-center p-12">
                                <div className="space-y-4">
                                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                        <span className="text-4xl">🐕</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-foreground/40 uppercase tracking-tighter">Your Promotion Here</h3>
                                    <p className="text-sm font-medium text-muted-light max-w-sm mx-auto">
                                        This area is designated for merchant-provided advertising banners. No cropping, full visibility.
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* High-Intensity Inner Glow on Hover */}
                        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 group-hover:ring-primary/20 transition-all duration-700 pointer-events-none" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    </Link>

                </div>
            </div>
        </section>
    );
};
