"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SafeImage } from '@/components/ui/SafeImage';

const CATEGORIES = [
    { name: "Dog", image: "/assets/cat-dog.png", href: "#", color: "from-blue-500/10 to-blue-600/10", hoverColor: "group-hover:from-blue-500/20 group-hover:to-blue-600/20" },
    { name: "Cat", image: "/assets/cat-cat.png", href: "#", color: "from-purple-500/10 to-purple-600/10", hoverColor: "group-hover:from-purple-500/20 group-hover:to-purple-600/20" },
    { name: "Fish", image: "/assets/cat-fish.png", href: "#", color: "from-cyan-500/10 to-cyan-600/10", hoverColor: "group-hover:from-cyan-500/20 group-hover:to-cyan-600/20" },
    { name: "Reptile", image: "/assets/cat-fish.png", href: "#", color: "from-green-500/10 to-green-600/10", hoverColor: "group-hover:from-green-500/20 group-hover:to-green-600/20" },
    { name: "Bird", image: "/assets/cat-bird.png", href: "#", color: "from-yellow-500/10 to-yellow-600/10", hoverColor: "group-hover:from-yellow-500/20 group-hover:to-yellow-600/20" },
    { name: "Horse", image: "/assets/cat-dog.png", href: "#", color: "from-amber-500/10 to-amber-600/10", hoverColor: "group-hover:from-amber-500/20 group-hover:to-amber-600/20" },
    { name: "Wildlife", image: "/assets/cat-bird.png", href: "#", color: "from-emerald-500/10 to-emerald-600/10", hoverColor: "group-hover:from-emerald-500/20 group-hover:to-emerald-600/20" },
    { name: "Small Animals", image: "/assets/cat-small.png", href: "#", color: "from-pink-500/10 to-pink-600/10", hoverColor: "group-hover:from-pink-500/20 group-hover:to-pink-600/20" },
];

export const CategorySlider = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true,
        loop: false,
        breakpoints: {
            '(min-width: 768px)': { dragFree: false }
        }
    });

    const scrollPrev = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = React.useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="py-8 sm:py-12 lg:py-16 bg-linear-to-br from-surface/50 via-white to-primary/5 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl z-0 pointer-events-none"></div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
                    <div className="flex-1 max-w-2xl">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-black uppercase tracking-wider mb-3 sm:mb-4">
                            🐾 Shop By Pet
                        </div>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-none mb-2 sm:mb-3">
                            Find Products For Your <span className="text-primary italic">Furry Friend</span>
                        </h2>
                        <p className="text-muted font-medium text-xs sm:text-sm lg:text-base max-w-lg leading-relaxed">
                            Browse by pet type to discover the best deals tailored for your companion.
                        </p>
                    </div>

                    {/* Navigation Arrows - Hidden on mobile */}
                    <div className="hidden md:flex gap-3">
                        <button
                            onClick={scrollPrev}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary/20 bg-white flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-md hover:shadow-xl hover:shadow-primary/20 active:scale-95 group"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-active:-translate-x-1" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-primary/20 bg-white flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-md hover:shadow-xl hover:shadow-primary/20 active:scale-95 group"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 transition-transform group-active:translate-x-1" />
                        </button>
                    </div>
                </div>

                <div className="relative" ref={emblaRef}>
                    <div className="flex gap-4 sm:gap-6 lg:gap-8 pb-4 pl-1 sm:pl-0">
                        {CATEGORIES.map((cat, index) => (
                            <Link
                                key={cat.name}
                                href={cat.href}
                                className="group flex flex-col items-center gap-3 sm:gap-4 shrink-0 w-[110px] sm:w-[140px] lg:w-[180px] select-none"
                            >
                                <div className={`relative w-full aspect-square bg-linear-to-br ${cat.color} ${cat.hoverColor} rounded-2xl sm:rounded-3xl flex items-center justify-center border-2 border-border/50 transition-all duration-500 group-hover:border-primary group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:-translate-y-2 overflow-hidden`}>
                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <SafeImage
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-1/2 h-1/2 object-contain transition-transform duration-500 group-hover:scale-110 relative z-10 drop-shadow-sm"
                                        draggable={false}
                                    />

                                    {/* Floating Badge */}
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full text-[8px] sm:text-[9px] font-black text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                                        SHOP
                                    </div>
                                </div>
                                <span className="font-extrabold text-xs sm:text-base lg:text-lg text-foreground/80 group-hover:text-primary transition-colors text-center tracking-tight">
                                    {cat.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
