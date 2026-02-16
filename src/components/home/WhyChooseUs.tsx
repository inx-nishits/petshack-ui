import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export const WhyChooseUs = () => {
    return (
        <section className="py-8 sm:py-12 lg:py-16 bg-linear-to-b from-white to-surface/50 overflow-hidden relative">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="w-full">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider mb-4 sm:mb-6 lg:mb-8">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" /> Why Use PetShack?
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl xl:text-7xl font-black text-foreground mb-6 sm:mb-8 lg:mb-10 leading-[1.1] tracking-tighter">
                        Aside from helping you find the <span className="text-primary italic">best prices</span> on pet products.
                    </h2>

                    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-500 leading-snug font-medium">
                            PetShack also helps you get exclusive discounts, time-limited promo codes, and bonus savings from trusted Aussie stores.
                        </p>

                        <p className="text-sm sm:text-base lg:text-lg xl:text-xl text-gray-400 leading-relaxed font-semibold">
                            You can <Link href="#" className="text-primary hover:underline font-bold transition-all">compare prices</Link>, explore your favourite brands, or learn more <Link href="#how-it-works" className="text-primary hover:underline font-bold transition-all">about how PetShack works</Link>. No lengthy sign-ups, no hidden fees.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

