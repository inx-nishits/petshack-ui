"use client";

import { Product } from "@/types";
import Link from "next/link";
import { Star, ShieldCheck, Bell, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { NotifyMeModal } from "./NotifyMeModal";

interface ProductCardProps {
    product: Product;
    viewMode?: 'grid' | 'list';
}

const LogoImage = ({ src, name }: { src: string, name: string }) => {
    const [error, setError] = useState(false);

    if (error || !src) {
        return (
            <div className="w-full h-full bg-primary/5 flex items-center justify-center">
                <span className="text-[10px] font-black text-primary uppercase tracking-tighter">
                    {name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={name}
            className="w-full h-full object-cover relative z-10"
            onError={() => setError(true)}
        />
    );
};

export const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
    const lowestPrice = product.bestPrice;
    const retailerCount = product.offers.length;
    const isList = viewMode === 'list';
    const [imageError, setImageError] = useState(false);
    const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);

    // Reset error state if image URL changes
    useEffect(() => {
        setImageError(false);
    }, [product.image]);

    return (
        <div className={`group bg-white border border-border rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 flex relative h-full ${isList ? 'flex-row' : 'flex-col'}`}>
            {/* Main Card Link - Ensure it sits on top for clicks but doesn't block rendering */}
            <Link
                href="#"
                className="absolute inset-0 z-30 cursor-pointer"
                aria-label={`View details for ${product.name}`}
            />

            {/* Image Container with Soft Background */}
            <div className={`relative overflow-hidden bg-surface m-2 rounded-2xl lg:rounded-[1.4rem] z-0 group-hover:bg-white transition-colors duration-500 shrink-0 ${isList ? 'aspect-square w-48 md:w-64' : 'aspect-square min-h-[180px]'}`}>
                <div className="absolute inset-0 flex items-center justify-center bg-transparent">
                    {!imageError ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            crossOrigin="anonymous"
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 block relative z-10"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="w-full h-full bg-surface rounded-xl flex flex-col items-center justify-center text-muted-light gap-2 relative z-10">
                            <span className="text-4xl">🐾</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-center px-4 text-gray-400">Preview Product</span>
                        </div>
                    )}
                </div>

                {/* Glassmorphism Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2 z-20">
                    {product.bestOffer?.stockStatus && (
                        <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm border ${product.bestOffer.stockStatus.toLowerCase().includes('in stock')
                            ? 'bg-green-500/10 text-green-700 border-green-500/20'
                            : 'bg-red-500/10 text-red-700 border-red-500/20'
                            }`}>
                            {product.bestOffer.stockStatus}
                        </span>
                    )}
                </div>

                {!isList && retailerCount > 1 && (
                    <div className="absolute bottom-3 right-3 text-[10px] font-black uppercase tracking-tighter bg-white/80 backdrop-blur-md text-primary px-3 py-1.5 rounded-full border border-primary/10 shadow-sm z-20">
                        {retailerCount} Stores Compared
                    </div>
                )}
            </div>

            <div className={`flex-1 flex flex-col z-20 pointer-events-none p-4 lg:p-5 ${isList ? 'pt-6' : 'pt-1'}`}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black text-primary uppercase tracking-[0.15em]">{product.brand}</span>
                        {isList && retailerCount > 1 && (
                            <span className="text-[10px] font-black text-muted-light uppercase tracking-widest bg-surface px-2 py-0.5 rounded border border-border">
                                {retailerCount} Stores
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-0.5 rounded-full">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-[10px] text-yellow-700 font-black">4.8</span>
                    </div>
                </div>

                <h3 className={`font-bold text-foreground group-hover:text-primary transition-colors leading-[1.4] ${isList ? 'text-xl md:text-2xl mb-4' : 'text-sm line-clamp-2 mb-3 h-[40px]'}`}>
                    {product.name}
                </h3>

                {isList && (
                    <p className="text-muted text-sm font-medium mb-6 line-clamp-2 max-w-xl">
                        {product.description}
                    </p>
                )}

                <div className="mt-auto space-y-5">
                    {/* Price & Retailer Info - Detailed Block */}
                    <div className={`flex flex-col pt-3 border-t border-gray-100 ${isList ? 'max-w-2xl' : ''}`}>
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                                {/* Store Logo */}
                                <div className="w-8 h-8 rounded-lg bg-surface border border-border flex items-center justify-center overflow-hidden shrink-0 shadow-sm relative group/logo">
                                    <LogoImage
                                        src={product.bestOffer?.retailerLogo || ''}
                                        name={product.bestOffer?.retailerName || ''}
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-foreground uppercase tracking-tight">{product.bestOffer?.retailerName}</span>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${product.bestOffer?.stockStatus?.toLowerCase().includes('in stock') ? 'bg-green-500' : 'bg-red-500'}`} />
                                        <span className={`text-[9px] font-bold uppercase tracking-wider ${product.bestOffer?.stockStatus?.toLowerCase().includes('in stock') ? 'text-green-600' : 'text-red-600'}`}>
                                            {product.bestOffer?.stockStatus}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="flex items-baseline gap-0.5 justify-end">
                                    <span className="text-sm font-black text-primary">$</span>
                                    <span className={`${isList ? 'text-4xl' : 'text-3xl'} font-black text-primary tracking-tighter`}>
                                        {lowestPrice.toFixed(0)}
                                        <span className="text-xs font-black">.{(lowestPrice % 1).toFixed(2).split('.')[1]}</span>
                                    </span>
                                </div>
                                <div className="text-[9px] font-black text-muted-light mt-0.5 tracking-wide">
                                    + ${product.bestOffer?.shippingPrice.toFixed(2)} Shipping
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Actions Block */}
                    <div className={`flex flex-col gap-4 mt-auto pointer-events-auto relative z-40 ${isList ? 'max-w-md' : ''}`}>
                        {/* Compare Utility Link */}
                        <div className="flex items-center justify-between px-1">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                className="text-[10px] font-black text-muted-light hover:text-primary transition-all flex items-center gap-1.5 cursor-pointer group/compare"
                            >
                                <ShieldCheck className="w-3.5 h-3.5 transition-colors group-hover/compare:text-primary" />
                                <span className="uppercase tracking-widest border-b border-transparent group-hover/compare:border-primary/30">Compare Prices</span>
                                <ArrowRight className="w-3.5 h-3.5 transition-all group-hover/compare:translate-x-1 group-hover/compare:text-primary" />
                            </button>
                        </div>

                        {/* Main Interaction Row */}
                        <div className="grid grid-cols-2 gap-2 pb-1">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsNotifyModalOpen(true);
                                }}
                                className="py-3 px-2 rounded-xl border border-gray-100 bg-gray-50/50 text-[10px] font-black text-muted hover:text-accent hover:border-accent/20 hover:bg-accent/5 transition-all text-center cursor-pointer flex items-center justify-center gap-1.5"
                            >
                                <Bell className="w-3.5 h-3.5" /> Notify Me
                            </button>
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="py-3 px-2 rounded-xl bg-primary text-white text-[10px] font-black shadow-lg shadow-primary/25 hover:bg-primary-dark hover:-translate-y-px active:translate-y-0 transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                            >
                                View Deal
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <NotifyMeModal
                isOpen={isNotifyModalOpen}
                onClose={() => setIsNotifyModalOpen(false)}
                productName={product.name}
            />
        </div>
    );
};

