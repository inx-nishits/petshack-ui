"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PRODUCTS } from "@/data/mock";
import { ProductCard } from "../ui/ProductCard";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const FeaturedDeals = () => {
    // Generate 8 items for a more focused grid/slider
    const displayProducts = [...PRODUCTS, ...PRODUCTS].slice(0, 8);

    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: "start",
        containScroll: "trimSnaps",
        dragFree: true,
        breakpoints: {
            '(min-width: 1024px)': { active: false } // Disable slider on desktop, keep it as grid
        }
    });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="py-12 lg:py-16 bg-surface">
            <div className="container mx-auto px-6">
                <div className="flex flex-row justify-between items-center md:items-end gap-4 mb-10">
                    <div className="flex-1">
                        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-1 md:mb-2">Today's Best Price Drops</h2>
                        <p className="text-muted font-medium text-sm lg:text-base line-clamp-1">Hand-picked deals from verified retailers.</p>
                    </div>
                    {/* Navigation Arrows - Row with Title on all screens */}
                    <div className="flex gap-2 lg:hidden">
                        <button
                            onClick={scrollPrev}
                            className="p-2.5 md:p-3 rounded-full border border-border bg-white shadow-sm hover:shadow-md transition-all active:scale-95 shrink-0"
                            aria-label="Previous deal"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="p-2.5 md:p-3 rounded-full border border-border bg-white shadow-sm hover:shadow-md transition-all active:scale-95 shrink-0"
                            aria-label="Next deal"
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Slider for Mobile/Tablet, Grid for Desktop */}
                <div className="overflow-hidden lg:overflow-visible" ref={emblaRef}>
                    <div className="flex lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 ml-0">
                        {displayProducts.map((product, index) => (
                            <div
                                key={`${product.id}-${index}`}
                                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-none pr-4 lg:pr-0"
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-10 md:mt-12 text-center">
                    <Link
                        href="#"
                        className="inline-flex w-full sm:w-auto bg-white border border-border px-12 py-3.5 rounded-full text-[11px] lg:text-sm font-black shadow-sm hover:shadow-premium transition-all uppercase tracking-widest text-center whitespace-nowrap"
                    >
                        Browse All Deals
                    </Link>
                </div>
            </div>
        </section>
    );
};
