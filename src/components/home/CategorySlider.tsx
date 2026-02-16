"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
        loop: false
    });

    const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <section className="py-12 lg:py-16 bg-gradient-to-br from-surface/50 via-white to-primary/5 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl z-0"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider mb-4">
                            🐾 Shop By Pet
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight leading-none">
                            Find Products For Your <span className="text-primary italic">Furry Friend</span>
                        </h2>
                        <p className="text-muted font-medium text-sm lg:text-base mt-3">
                            Browse by pet type to discover the best deals tailored for your companion
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <div className="flex gap-3">
                        <button
                            onClick={scrollPrev}
                            className="w-12 h-12 rounded-full border-2 border-primary/20 bg-white flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-md hover:shadow-xl hover:shadow-primary/20 active:scale-95"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-12 h-12 rounded-full border-2 border-primary/20 bg-white flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-md hover:shadow-xl hover:shadow-primary/20 active:scale-95"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden cursor-grab active:cursor-grabbing py-4" ref={emblaRef}>
                    <div className="flex gap-6 lg:gap-8">
                        {CATEGORIES.map((cat) => (
                            <Link
                                key={cat.name}
                                href={cat.href}
                                className="group flex flex-col items-center gap-4 shrink-0 min-w-[140px] lg:min-w-[160px]"
                            >
                                <div className={`relative w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br ${cat.color} ${cat.hoverColor} rounded-3xl flex items-center justify-center border-2 border-border/50 transition-all duration-500 group-hover:border-primary group-hover:shadow-2xl group-hover:shadow-primary/20 group-hover:-translate-y-2 overflow-hidden`}>
                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-20 h-20 lg:w-24 lg:h-24 object-contain transition-transform duration-500 group-hover:scale-110 relative z-10"
                                    />

                                    {/* Floating Badge */}
                                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-[9px] font-black text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                                        SHOP
                                    </div>
                                </div>
                                <span className="font-black text-base lg:text-lg text-gray-700 group-hover:text-primary transition-colors text-center">
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
