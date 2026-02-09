"use client";

import Link from "next/link";
import useEmblaCarousel from 'embla-carousel-react';

const CATEGORIES = [
    { name: "Dog", image: "/assets/cat-dog.png", href: "#" },
    { name: "Cat", image: "/assets/cat-cat.png", href: "#" },
    { name: "Fish", image: "/assets/cat-fish.png", href: "#" },
    { name: "Reptile", image: "/assets/cat-fish.png", href: "#" },
    { name: "Bird", image: "/assets/cat-bird.png", href: "#" },
    { name: "Horse", image: "/assets/cat-dog.png", href: "#" },
    { name: "Wildlife", image: "/assets/cat-bird.png", href: "#" },
    { name: "Small Animals", image: "/assets/cat-small.png", href: "#" },
];

export const CategoryGrid = () => {
    const [emblaRef] = useEmblaCarousel({
        align: 'start',
        containScroll: 'trimSnaps',
        dragFree: true
    });

    return (
        <section className="py-[60px] lg:py-12 bg-white">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-black mb-12 text-center lg:text-left">Compare Prices For Your Pet</h2>

                <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
                    <div className="flex gap-8 lg:gap-12 pl-4">
                        {CATEGORIES.map((cat) => (
                            <Link
                                key={cat.name}
                                href={cat.href}
                                className="group flex flex-col items-center gap-4 shrink-0 min-w-[100px]"
                            >
                                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gray-50 rounded-full flex items-center justify-center border border-gray-100 transition-all group-hover:bg-primary group-hover:shadow-xl group-hover:shadow-primary/20 overflow-hidden">
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-16 h-16 lg:w-20 lg:h-20 object-contain transition-transform group-hover:scale-110"
                                    />
                                </div>
                                <span className="font-bold text-sm text-gray-700 group-hover:text-primary transition-colors text-center">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
