"use client";

import { useCompare } from "@/context/CompareContext";
import { ArrowRight, X, Layers } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SafeImage } from "../ui/SafeImage";

export function CompareFloatingBar() {
    const { compareList, clearCompare, removeFromCompare } = useCompare();
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(compareList.length > 0 && pathname !== "/compare");
    }, [compareList, pathname]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-4 animate-in slide-in-from-bottom-10 duration-300">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-foreground text-white rounded-2xl shadow-premium p-4 flex items-center justify-between gap-4 border border-white/10 backdrop-blur-xl">

                    <div className="flex items-center gap-4 overflow-hidden">
                        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-white/10 rounded-lg shrink-0">
                            <Layers className="w-5 h-5 text-primary-light" />
                            <span className="font-bold text-sm">
                                <span className="text-primary-light">{compareList.length}</span>/4 Selected
                            </span>
                        </div>

                        {/* Product Thumbnails */}
                        <div className="flex -space-x-3 overflow-x-auto py-1 px-1 custom-scrollbar">
                            {compareList.map((product) => (
                                <div key={product.id} className="relative group shrink-0">
                                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-foreground bg-white overflow-hidden relative shadow-sm">
                                        <SafeImage
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeFromCompare(product.id);
                                        }}
                                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity transform scale-75 hover:scale-100"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <button
                            onClick={clearCompare}
                            className="text-xs font-bold text-gray-400 hover:text-white transition-colors underline-offset-4 hover:underline hidden sm:block"
                        >
                            Clear All
                        </button>

                        <Link
                            href="/compare"
                            className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-black text-xs sm:text-sm shadow-lg shadow-primary/25 transition-all active:scale-95 flex items-center gap-2 group"
                        >
                            Compare Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
