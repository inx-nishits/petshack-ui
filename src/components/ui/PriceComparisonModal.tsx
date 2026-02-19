"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ExternalLink, ArrowRight, Truck, Info, Star } from "lucide-react";
import { Product } from "@/types";
import { RETAILERS } from "@/data/mock";

interface PriceComparisonModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product;
}

export function PriceComparisonModal({ isOpen, onClose, product }: PriceComparisonModalProps) {
    const [mounted, setMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen || !mounted) return null;

    // Sorting offers by price (lowest first)
    // Note: In a real app, you might want to sort by (Price + Shipping)
    const sortedOffers = [...product.offers].sort((a, b) => {
        const priceA = a.price + (a.shippingCost || 0);
        const priceB = b.price + (b.shippingCost || 0);
        return priceA - priceB;
    });

    const bestOffer = sortedOffers[0];

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                ref={modalRef}
                className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
            >
                {/* Header */}
                <div className="p-4 sm:p-5 border-b border-border flex justify-between items-start gap-4 bg-surface/50">
                    <div className="flex gap-4">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 shrink-0 bg-white rounded-xl border border-border flex items-center justify-center overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h2 className="text-base sm:text-lg font-black text-gray-900 leading-tight line-clamp-2 pr-4">{product.name}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-bold text-muted-light uppercase tracking-wider">{sortedOffers.length} Sellers</span>
                                <span className="text-xs font-bold text-muted-light">•</span>
                                <span className="text-xs font-bold text-green-600">Best Price: ${bestOffer?.price.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 -mr-2 -mt-2 rounded-full hover:bg-gray-100 transition-colors text-muted hover:text-foreground"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Offer List */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5 custom-scrollbar bg-gray-50/30">
                    <div className="flex flex-col gap-2">
                        {sortedOffers.map((offer, idx) => {
                            const retailer = RETAILERS.find(r => r.id === offer.retailerId);
                            const retailerName = retailer?.name || 'Store';
                            const retailerLogo = retailer?.logo;

                            const isCheapest = idx === 0;
                            const totalPrice = offer.price + (offer.shippingCost || 0);

                            return (
                                <div
                                    key={idx}
                                    className={`relative bg-white rounded-xl border p-3 sm:py-3 sm:px-4 transition-all
                                        ${isCheapest
                                            ? 'border-green-200 shadow-md ring-1 ring-green-100 z-10'
                                            : 'border-border hover:border-gray-300 hover:shadow-sm'}`}
                                >
                                    {isCheapest && (
                                        <div className="absolute -top-2.5 left-4 bg-green-600 text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                                            <Star className="w-2.5 h-2.5 fill-current" /> Best Value
                                        </div>
                                    )}

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                                        {/* Retailer Info */}
                                        <div className="flex items-center gap-3 sm:w-[28%]">
                                            {/* Logo */}
                                            <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-lg bg-white border border-border flex items-center justify-center overflow-hidden shadow-sm">
                                                {retailerLogo ? (
                                                    <img src={retailerLogo} alt={retailerName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <span className="text-[10px] font-black text-gray-400 uppercase">{retailerName.substring(0, 2)}</span>
                                                )}
                                            </div>

                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-gray-900 line-clamp-1">{retailerName}</span>
                                                <div className="flex items-center gap-1.5">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${offer.stockStatus === 'in-stock' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                    <span className={`text-[10px] font-bold uppercase tracking-tight ${offer.stockStatus === 'in-stock' ? 'text-green-700' : 'text-red-600'}`}>
                                                        {offer.stockStatus?.replace('-', ' ')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Pricing Specifics (Middle) - Wider & optimized gaps */}
                                        <div className="flex-1 flex flex-row items-center justify-start gap-6 sm:px-6 sm:border-l sm:border-r border-border/50 border-dashed sm:border-solid py-1 sm:py-0 border-t sm:border-t-0 mt-1 sm:mt-0">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-bold text-muted uppercase tracking-wide">Item Price</span>
                                                <span className="text-sm font-bold text-gray-700">${offer.price.toFixed(2)}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[9px] font-bold text-muted uppercase tracking-wide flex items-center gap-1">
                                                    Shipping
                                                </span>
                                                <span className={`text-sm font-bold ${offer.shippingCost === 0 ? 'text-green-600' : 'text-gray-700'}`}>
                                                    {offer.shippingCost === 0 ? 'FREE' : `$${offer.shippingCost?.toFixed(2)}`}
                                                </span>
                                            </div>
                                            {offer.discount && (
                                                <div className="hidden sm:flex items-center gap-1 text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-full border border-orange-100">
                                                    {offer.discount}
                                                </div>
                                            )}
                                        </div>

                                        {/* Total & Action (Right) */}
                                        <div className="flex items-center justify-between sm:justify-end gap-5 sm:w-auto pt-1 sm:pt-0 border-t sm:border-t-0 border-border/50 sm:border-none">
                                            <div className="flex flex-col sm:items-end min-w-[80px]">
                                                <span className="text-[9px] font-black text-muted-light uppercase tracking-tight">Total</span>
                                                <span className="text-lg sm:text-xl font-black text-gray-900 leading-none">${totalPrice.toFixed(2)}</span>
                                            </div>
                                            <a
                                                href={offer.url || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="bg-primary hover:bg-primary-dark text-white text-xs font-black px-4 py-2 sm:px-6 sm:py-2.5 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center gap-2 group whitespace-nowrap"
                                            >
                                                Visit <span className="hidden sm:inline">Store</span> <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                            </a>
                                        </div>
                                    </div>

                                    {/* Mobile Only Discount */}
                                    {offer.discount && (
                                        <div className="sm:hidden mt-2 pt-2 border-t border-dashed border-border flex items-center gap-2 text-[10px] font-bold text-orange-600">
                                            <Info className="w-3 h-3" /> {offer.discount}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-3 bg-gray-50 border-t border-border text-center">
                    <p className="text-[10px] text-muted font-medium">
                        "Best Price" includes estimated shipping. Prices subject to change.
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
}
