"use client";

import { Product } from "@/types";
import Link from "next/link";
import { Star, ShieldCheck, Bell, ArrowRight, X } from "lucide-react";
import { useState, useEffect } from "react";
import { NotifyMeModal } from "./NotifyMeModal";
import { useCompare } from "@/context/CompareContext";

interface ProductCardProps {
    product: Product;
    viewMode?: 'grid' | 'list';
}

export const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
    const isList = viewMode === 'list';
    const lowestPrice = product.bestPrice;
    const retailerCount = product.offers.length;
    const [imageError, setImageError] = useState(false);
    const [isNotifyModalOpen, setIsNotifyModalOpen] = useState(false);
    const [showStoresDropdown, setShowStoresDropdown] = useState(false);
    const { addToCompare, removeFromCompare, isInCompare } = useCompare();

    const isCompared = isInCompare(product.id);

    const toggleCompare = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isCompared) {
            removeFromCompare(product.id);
        } else {
            addToCompare(product);
        }
    };

    const toggleStores = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowStoresDropdown(!showStoresDropdown);
    };

    useEffect(() => {
        setImageError(false);
    }, [product.image]);

    return (
        <div className="group bg-white border border-border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col relative w-full h-full">
            <div className={`flex flex-col ${isList ? 'sm:flex-row' : ''} h-full`}>
                {/* Main Card Link */}
                <Link
                    href={`/product/${product.id}`}
                    className="absolute inset-0 z-10 cursor-pointer"
                    aria-label={`View details for ${product.name}`}
                />

                {/* Image Section - Enforce Square Aspect Ratio */}
                <div className={`relative overflow-hidden bg-surface flex items-center justify-center border-border group-hover:bg-primary/5 transition-colors
                    ${isList
                        ? 'sm:w-48 sm:shrink-0 aspect-square border-b sm:border-b-0 sm:border-r relative'
                        : 'border-b aspect-square w-full relative'
                    }`}>
                    {!imageError ? (
                        <img
                            src={product.image}
                            alt={product.name}
                            crossOrigin="anonymous"
                            className="object-cover transition-transform duration-500 group-hover:scale-110 block absolute inset-0 w-full h-full"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="text-center text-muted-light">
                            <span className="text-2xl">🐾</span>
                        </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-2 left-2 z-20 pointer-events-none">
                        {product.bestOffer?.stockStatus && (
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md backdrop-blur-md shadow-sm border ${product.bestOffer.stockStatus.toLowerCase().includes('in stock')
                                ? 'bg-green-500/10 text-green-700 border-green-500/20'
                                : 'bg-red-500/10 text-red-700 border-red-500/20'
                                }`}>
                                {product.bestOffer.stockStatus}
                            </span>
                        )}
                    </div>

                    {/* GRID MODE: Overlay Store List */}
                    {!isList && showStoresDropdown && (
                        <div className="absolute inset-0 z-30 bg-white/95 backdrop-blur-sm p-4 flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-200">
                            <div className="flex justify-between items-center mb-2 pb-2 border-b border-border/50">
                                <span className="font-bold text-xs text-foreground">Available Stores</span>
                                <button
                                    onClick={toggleStores}
                                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <X className="w-4 h-4 text-muted" />
                                </button>
                            </div>
                            <div className="overflow-y-auto flex-1 pr-1 space-y-2 pointer-events-auto">
                                {product.offers.map((offer, idx) => {
                                    const retailerName = offer.retailerId === 'petcircle' ? 'Pet Circle' :
                                        offer.retailerId === 'petbarn' ? 'Petbarn' :
                                            offer.retailerId === 'petstock' ? 'PETstock' :
                                                offer.retailerId === 'budgetpetproducts' ? 'Budget Pet' : 'Store';
                                    const isCheapest = idx === 0;

                                    return (
                                        <div key={idx} className={`flex flex-col gap-2 p-2 rounded-lg border text-left ${isCheapest ? 'bg-green-50/50 border-green-200' : 'bg-white border-border'}`}>
                                            <div className="flex justify-between items-start">
                                                <span className="text-xs font-bold text-foreground line-clamp-1">{retailerName}</span>
                                                <span className="text-xs font-black text-primary">${offer.price.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-1">
                                                <span className={`text-[9px] font-bold uppercase ${offer.stockStatus === 'in-stock' ? 'text-green-600' : 'text-red-500'}`}>{offer.stockStatus === 'in-stock' ? 'In Stock' : 'Out Stock'}</span>
                                                <a
                                                    href={offer.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-2 py-1 rounded bg-primary text-white text-[10px] font-bold hover:bg-primary-dark transition-colors flex items-center gap-1 shadow-sm"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    Go <ArrowRight className="w-2.5 h-2.5" />
                                                </a>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className={`flex-1 flex flex-col justify-between relative bg-white ${isList ? 'p-3 sm:p-4' : 'p-4'}`}>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">{product.brand}</span>
                            </div>
                            {/* Compare Checkbox */}
                            <button
                                onClick={toggleCompare}
                                className={`pointer-events-auto inline-flex items-center justify-center p-1.5 rounded transition-all z-20 hover:scale-110 active:scale-95 ${isCompared ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-surface text-muted-light hover:text-primary hover:bg-primary/10'}`}
                                title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
                            >
                                {isCompared ? <ShieldCheck className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 border-2 border-current rounded-sm" />}
                            </button>
                        </div>

                        <h3 className={`font-bold text-foreground leading-snug group-hover:text-primary transition-colors pointer-events-auto line-clamp-2 mb-1
                            ${isList ? 'text-sm sm:text-lg' : 'text-base h-[2.8em]'}`}>
                            <Link href={`/product/${product.id}`}>{product.name}</Link>
                        </h3>

                        <div className="flex items-end justify-between mt-1">
                            <div>
                                <span className="text-[9px] font-bold text-muted-light uppercase tracking-tight block mb-0.5">Best Price</span>
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs font-black text-primary">$</span>
                                    <span className="text-2xl font-black text-primary tracking-tighter">
                                        {lowestPrice.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            {retailerCount > 1 && (
                                <span className="text-[10px] font-bold text-muted bg-surface px-2 py-1 rounded-full border border-border/50">{retailerCount} stores</span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 sm:mt-auto pt-3 border-t border-border/50 gap-4 pointer-events-auto z-20">
                        {retailerCount > 1 ? (
                            <button
                                onClick={toggleStores}
                                className="text-[10px] sm:text-xs font-black text-primary hover:underline flex items-center gap-1 group/btn"
                            >
                                View Other Stores <ArrowRight className={`w-3 h-3 transition-transform ${showStoresDropdown ? 'rotate-90' : ''} group-hover/btn:translate-x-0.5`} />
                            </button>
                        ) : (
                            <span />
                        )}

                        <div className="flex items-center gap-2">
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setIsNotifyModalOpen(true);
                                }}
                                className="p-2 rounded-lg text-muted hover:text-accent hover:bg-accent/5 transition-colors"
                                title="Notify Me"
                            >
                                <Bell className="w-4 h-4" />
                            </button>
                            <a
                                href={product.bestOffer?.offerUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="py-2 px-4 sm:px-6 rounded-lg bg-primary text-white text-[10px] sm:text-xs font-black shadow-lg shadow-primary/20 hover:bg-primary-dark hover:-translate-y-px active:translate-y-0 transition-all flex items-center gap-1.5"
                            >
                                View Deal <ArrowRight className="w-3 h-3" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* LIST MODE: Inline Stores Dropdown - Full Width below main content */}
            {isList && showStoresDropdown && (
                <div className="w-full bg-gray-50/50 border-t border-border p-3 sm:p-4 animate-in slide-in-from-top-2 duration-200 z-30 relative shadow-inner">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
                        {product.offers.map((offer, idx) => {
                            const retailerName = offer.retailerId === 'petcircle' ? 'Pet Circle' :
                                offer.retailerId === 'petbarn' ? 'Petbarn' :
                                    offer.retailerId === 'petstock' ? 'PETstock' :
                                        offer.retailerId === 'budgetpetproducts' ? 'Budget Pet' : 'Store';
                            const isCheapest = idx === 0;

                            return (
                                <div key={idx} className={`flex items-center justify-between p-3 rounded-xl border transition-all ${isCheapest ? 'bg-green-50/50 border-green-200 shadow-sm relative overflow-hidden' : 'bg-white border-border hover:border-primary/30'}`}>
                                    {isCheapest && <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-bl-xl flex items-center justify-center text-[8px] text-white font-bold">★</div>}
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 shrink-0 rounded-lg bg-white border border-border flex items-center justify-center text-[10px] font-black text-muted uppercase shadow-sm">
                                            {retailerName.substring(0, 2)}
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-xs font-bold text-foreground leading-tight">{retailerName}</span>
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className={`text-[9px] font-bold ${offer.stockStatus === 'in-stock' ? 'text-green-600' : 'text-red-500'}`}>{offer.stockStatus.replace('-', ' ')}</span>
                                                {offer.shippingCost === 0 && <span className="text-[9px] text-green-700 font-bold bg-green-100 px-1.5 py-0.5 rounded">FREE SHIP</span>}
                                                {offer.discount && <span className="text-[9px] text-white bg-red-500 px-1.5 py-0.5 rounded font-bold">{offer.discount}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right pl-3 flex flex-col items-end gap-1">
                                        <div className="text-sm font-black text-foreground">${offer.price.toFixed(2)}</div>
                                        <a
                                            href={offer.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 rounded-lg bg-primary text-white text-[10px] font-bold hover:bg-primary-dark transition-colors flex items-center gap-1 shadow-sm active:translate-y-px"
                                        >
                                            Go <ArrowRight className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            <NotifyMeModal
                isOpen={isNotifyModalOpen}
                onClose={() => setIsNotifyModalOpen(false)}
                productName={product.name}
            />
        </div>
    );
};
