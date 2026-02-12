"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Star, ChevronRight, ChevronLeft } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const BANNERS = [
    {
        id: 1,
        title: "Never Overpay for Pet Food Again!",
        subtitle: "Compare 40+ Aussie retailers instantly.",
        cta: "Compare Now",
        link: "#", // External merchant example
        image: "/assets/hero-banner.png",
        bgColor: "bg-primary",
        external: true
    },
    {
        id: 2,
        title: "Join the Club & Save Big!",
        subtitle: "Exclusive discounts for PetShack members.",
        cta: "Join Free",
        link: "/signup", // Internal
        image: "/assets/promo-app.png",
        bgColor: "bg-blue-600",
        external: false
    },
    {
        id: 3,
        title: "Top Deals on Pet Essentials",
        subtitle: "Sniff out the best bargains at PetBarn today.",
        cta: "Shop Now",
        link: "#", // External merchant example
        image: "/assets/cat-dog.png",
        bgColor: "bg-purple-600",
        external: true
    }
];

export const Hero = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        onSelect();
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        emblaApi && emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        emblaApi && emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="relative overflow-hidden group">
            <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                    {BANNERS.map((banner) => (
                        <div key={banner.id} className={`flex-[0_0_100%] min-w-0 relative ${banner.bgColor} text-white pt-12 lg:pt-20 pb-24 lg:pb-28 cursor-pointer`}>
                            {/* Stretched Link for Full Slide Clickability */}
                            {banner.external ? (
                                <a
                                    href={banner.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 z-10"
                                    aria-label={banner.title}
                                />
                            ) : (
                                <Link
                                    href={banner.link}
                                    className="absolute inset-0 z-10"
                                    aria-label={banner.title}
                                />
                            )}

                            <div className="container mx-auto px-6 relative z-0">
                                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                                    <div className="max-w-2xl pl-0 lg:pl-12">
                                        <div className="flex items-center gap-2 mb-6">
                                            <span className="text-lg font-bold tracking-tight">Australia's #1 Pet Comparison Site</span>
                                        </div>

                                        <h1 className="text-3xl md:text-6xl font-black mb-8 leading-[1.1]">
                                            {banner.title}
                                        </h1>

                                        <p className="text-base md:text-xl text-white/90 mb-10 leading-relaxed max-w-xl">
                                            {banner.subtitle}
                                        </p>

                                        <div className="space-y-6">
                                            <div className="inline-block bg-[#2b2b2b] text-white px-8 lg:px-10 py-3 lg:py-4 rounded-full font-black text-base lg:text-lg hover:bg-black transition-all shadow-xl shadow-black/20 relative z-20 pointer-events-none text-center">
                                                {banner.cta}
                                            </div>

                                            <div className="flex items-center gap-2 mt-8">
                                                <div className="flex text-yellow-400">
                                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-4 h-4 md:w-5 md:h-5 fill-current ${i === 5 ? 'opacity-50' : ''}`} />)}
                                                </div>
                                                <span className="text-xs md:text-sm font-bold">4.8/5 from Aussie Pet Owners</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden lg:flex justify-end relative pr-12">
                                        <div className="relative w-full max-w-lg aspect-square">
                                            <img
                                                src={banner.image}
                                                alt={banner.title}
                                                className="w-full h-full object-contain relative z-20 drop-shadow-2xl"
                                            />
                                            {/* Decorative glow */}
                                            <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl scale-75 z-10" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative patterns */}
                            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
                                <svg width="100%" height="100%"><pattern id={`pattern-${banner.id}`} width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="1" /></pattern><rect width="100%" height="100%" fill={`url(#pattern-${banner.id})`} /></svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <button className="hidden group-hover:block absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-sm transition-all" onClick={scrollPrev}>
                <ChevronLeft className="w-8 h-8" />
            </button>
            <button className="hidden group-hover:block absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-3 rounded-full text-white backdrop-blur-sm transition-all" onClick={scrollNext}>
                <ChevronRight className="w-8 h-8" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-10 lg:bottom-16 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
                {BANNERS.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full transition-all ${index === selectedIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/60'}`}
                        onClick={() => emblaApi && emblaApi.scrollTo(index)}
                    />
                ))}
            </div>
        </section>
    );
};

