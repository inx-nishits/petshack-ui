"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, TrendingUp, Star } from 'lucide-react';
import { PRODUCTS } from '@/data/mock';

export const TrendingProducts = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true
    });

    const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    // Use top 6 products as requested
    const trendingList = PRODUCTS.slice(0, 6);

    return (
        <section className="py-[60px] lg:py-24 bg-surface/30 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider mb-4">
                            <TrendingUp className="w-4 h-4" /> Snaffled By Everyone
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-foreground tracking-tighter leading-none">
                            TRENDING <span className="text-primary italic">NOW.</span>
                        </h2>
                    </div>
                    <div className="flex gap-3">
                        <button
                            onClick={scrollPrev}
                            className="w-12 h-12 rounded-full border border-border bg-white flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                            aria-label="Previous"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="w-12 h-12 rounded-full border border-border bg-white flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all shadow-sm"
                            aria-label="Next"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                <div className="relative" ref={emblaRef}>
                    <div className="flex -ml-4 lg:-ml-8 pb-16 pt-16">
                        {trendingList.map((product, index) => (
                            <div key={product.id} className="flex-[0_0_80%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] xl:flex-[0_0_25%] pl-4 lg:pl-8 group select-none cursor-pointer">
                                <Link href="#" className="relative block h-full">
                                    <div className="relative flex items-end h-full">
                                        {/* Styled Rank Number - Using Brand Theme Colors */}
                                        <div className="absolute -bottom-6 -left-4 lg:-left-10 z-0 pointer-events-none select-none">
                                            <span className="text-[140px] lg:text-[180px] font-black leading-[0.8] text-transparent transition-all group-hover:scale-105 block"
                                                style={{
                                                    WebkitTextStroke: '2px #14A79D',
                                                    opacity: 0.15,
                                                    fontFamily: 'system-ui, sans-serif',
                                                    fontWeight: 900,
                                                    letterSpacing: '-0.05em'
                                                }}>
                                                {index + 1}
                                            </span>
                                        </div>

                                        {/* Product Card Styled like Netflix Poster - Now with strict width/height consistency */}
                                        <div className="relative z-10 w-full ml-12 lg:ml-16 bg-white rounded-3xl lg:rounded-[2.5rem] shadow-xl border border-border group-hover:-translate-y-4 transition-all duration-500">
                                            <div className="aspect-3/4 relative bg-surface m-4 rounded-2xl lg:rounded-[1.8rem] overflow-hidden flex items-center justify-center">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=800"; // Reliable fallback pet image
                                                    }}
                                                />
                                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-border flex items-center gap-1.5 shadow-lg group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">
                                                    <Star className="w-3.5 h-3.5 fill-current" />
                                                    <span className="text-[10px] font-black italic uppercase">TOP {index + 1}</span>
                                                </div>
                                            </div>
                                            <div className="p-6 lg:p-8 pt-2">
                                                <span className="text-[10px] font-black text-primary uppercase tracking-widest block mb-2">{product.brand}</span>
                                                <h3 className="text-base lg:text-lg font-black text-foreground leading-tight line-clamp-2 mb-4 group-hover:text-primary transition-colors h-[2.5em]">
                                                    {product.name}
                                                </h3>
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="text-xs text-muted font-bold block mb-1">BEST PRICE</span>
                                                        <span className="text-xl lg:text-2xl font-black text-primary tracking-tighter">${product.bestPrice.toFixed(2)}</span>
                                                    </div>
                                                    <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                                                        <ChevronRight className="w-5 h-5" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
