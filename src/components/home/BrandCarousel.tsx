"use client";

import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const BRANDS = [
    { name: 'Royal Canin', logo: '/assets/brand-1.png' },
    { name: 'Black Hawk', logo: '/assets/brand-2.png' },
    { name: 'Hills', logo: '/assets/brand-3.png' },
    { name: 'Breeder\'s Choice', logo: '/assets/brand-4.png' },
    { name: 'Advance', logo: '/assets/brand-5.png' },
    { name: 'Purina Pro Plan', logo: '/assets/brand-1.png' },
    { name: 'Kong', logo: '/assets/brand-2.png' },
    { name: 'Greenies', logo: '/assets/brand-3.png' },
    { name: 'Billie\'s Bowl', logo: '/assets/brand-4.png' }
];

export const BrandCarousel = () => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        loop: true,
        slidesToScroll: 1,
    }, [Autoplay({ delay: 3000, stopOnInteraction: false })]);

    const scrollPrev = React.useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = React.useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    return (
        <section className="py-8 sm:py-12 lg:py-16 bg-white border-t border-gray-50">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-8 sm:mb-10 lg:mb-12">
                    <div>
                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black mb-2">Search By Top Brands</h2>
                        <p className="text-muted text-xs sm:text-sm font-medium">Explore products from Australia's most trusted pet brands.</p>
                    </div>
                    <div className="hidden sm:flex gap-2">
                        <button
                            onClick={scrollPrev}
                            className="p-2 rounded-full border border-border hover:bg-surface transition-colors"
                            aria-label="Previous brands"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="p-2 rounded-full border border-border hover:bg-surface transition-colors"
                            aria-label="Next brands"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex -ml-4 sm:-ml-6">
                        {BRANDS.map((brand, index) => (
                            <div key={index} className="flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_20%] pl-4 sm:pl-6">
                                <Link
                                    href="#"
                                    className="aspect-square bg-white border border-border rounded-2xl sm:rounded-3xl lg:rounded-4xl flex flex-col items-center justify-center p-4 sm:p-6 grayscale hover:grayscale-0 transition-preset cursor-pointer hover:shadow-premium group h-full"
                                >
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-surface rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-primary/5 transition-colors">
                                        <span className="text-lg sm:text-2xl font-black text-gray-300 group-hover:text-primary">{brand.name[0]}</span>
                                    </div>
                                    <span className="text-xs sm:text-sm font-black text-gray-400 group-hover:text-primary transition-colors text-center">{brand.name}</span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 sm:mt-10 lg:mt-12 text-center">
                    <Link href="#" className="text-primary font-black hover:underline text-xs sm:text-sm uppercase tracking-widest inline-flex items-center gap-2">
                        View All Brands <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
};

