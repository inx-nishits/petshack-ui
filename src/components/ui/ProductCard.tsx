"use client";

import { Product } from "@/types";
import Link from "next/link";
import { Star, ShieldCheck, Bell, ArrowRight, X, ExternalLink, Clock, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { useCompare } from "@/context/CompareContext";
import { useModal } from "@/context/ModalContext";
import { formatDistanceToNow } from "date-fns";
import { usePathname } from "next/navigation";

interface ProductCardProps {
    product: Product;
    viewMode?: 'grid' | 'list';
}

export const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
    const isList = viewMode === 'list';
    const lowestPrice = product.bestPrice;
    const retailerCount = product.offers.length;
    const [imageError, setImageError] = useState(false);
    const [showStoresDropdown, setShowStoresDropdown] = useState(false);
    const { addToCompare, removeFromCompare, isInCompare } = useCompare();
    const { openNotifyModal } = useModal();
    const pathname = usePathname();
    const isHome = pathname === "/";

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

    // SOW Req: Shipping Price & Store Details based on lowest price store
    const bestOffer = product.offers[0]; // Assuming sorted by price in mock data logic
    const shippingPrice = product.bestOffer?.shippingPrice ?? 0;

    // SOW Req: Last Price Update
    const lastUpdated = bestOffer?.lastUpdated ? formatDistanceToNow(new Date(bestOffer.lastUpdated), { addSuffix: true }) : "recently";

    return (
        <div className="group bg-white border border-border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex flex-col relative w-full h-full">
            <div className={`flex flex-col ${isList ? 'sm:flex-row' : ''} h-full`}>
                {/* Content Container - No more absolute card link */}

                {/* Image Section - Enforce Square Aspect Ratio */}
                <div className={`relative overflow-hidden bg-surface flex items-center justify-center border-border group-hover:bg-primary/5 transition-colors
                    ${isList
                        ? 'sm:w-56 sm:shrink-0 aspect-square border-b sm:border-b-0 sm:border-r relative'
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
                    <div className="absolute top-2 left-2 z-20 pointer-events-none flex flex-col gap-1">
                        {product.bestOffer?.stockStatus && (
                            <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md backdrop-blur-md shadow-sm border ${product.bestOffer.stockStatus.toLowerCase().includes('in stock')
                                ? 'bg-green-500/10 text-green-700 border-green-500/20'
                                : 'bg-red-500/10 text-red-700 border-red-500/20'
                                }`}>
                                {product.bestOffer.stockStatus}
                            </span>
                        )}
                        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-md backdrop-blur-md shadow-sm border bg-blue-500/10 text-blue-700 border-blue-500/20 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" /> {lastUpdated}
                        </span>
                    </div>

                    {/* GRID MODE: Overlay Store List */}
                    {!isList && showStoresDropdown && (
                        <div className="absolute inset-0 z-30 bg-white/95 backdrop-blur-sm p-4 flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-200">
                            <div className="flex justify-between items-center mb-2 pb-2 border-b border-border/50">
                                <span className="font-bold text-xs text-foreground uppercase tracking-widest">Store Prices</span>
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
                                                <div className="flex items-center gap-1.5">
                                                    <div className="w-4 h-4 rounded bg-white border border-border flex items-center justify-center text-[7px] font-black">
                                                        {retailerName.substring(0, 2)}
                                                    </div>
                                                    <span className="text-xs font-bold text-foreground line-clamp-1">{retailerName}</span>
                                                </div>
                                                <span className="text-xs font-black text-primary">${offer.price.toFixed(2)}</span>
                                            </div>
                                            <div className="flex justify-between items-center mt-1">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className={`text-[8px] font-bold uppercase ${offer.stockStatus === 'in-stock' ? 'text-green-600' : 'text-red-500'}`}>
                                                        {offer.stockStatus === 'in-stock' ? 'In Stock' : 'Out Stock'}
                                                    </span>
                                                    <span className="text-[8px] text-muted-light font-bold">
                                                        Ship: {offer.shippingCost === 0 ? 'FREE' : `$${offer.shippingCost?.toFixed(2)}`}
                                                    </span>
                                                </div>
                                                <a
                                                    href={offer.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="px-2 py-1 rounded bg-primary text-white text-[10px] font-bold hover:bg-primary-dark transition-colors flex items-center gap-1 shadow-sm"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    Go <ExternalLink className="w-2.5 h-2.5" />
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
                <div className={`flex-1 flex flex-col justify-between relative bg-white ${isList ? 'p-4 sm:p-5' : 'p-4'}`}>
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">{product.brand}</span>
                                {isList && (
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 bg-surface border border-border rounded-md">
                                            <span className="text-[9px] font-bold text-muted uppercase">From</span>
                                            <span className="text-[10px] font-black text-foreground">{product.bestOffer?.retailerName}</span>
                                        </div>
                                    </div>
                                )}
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

                        <h3 className={`font-black text-foreground leading-tight group-hover:text-primary transition-colors pointer-events-auto line-clamp-2
                            ${isList ? 'text-lg sm:text-xl' : 'text-base h-[2.8em]'}`}>
                            <a href={product.bestOffer?.offerUrl || '#'} target="_blank" rel="noopener noreferrer">
                                {product.name}
                            </a>
                        </h3>

                        <div className="grid grid-cols-2 gap-4 mt-1">
                            <div>
                                <span className="text-[9px] font-black text-muted-light uppercase tracking-tight block mb-0.5">Lowest Price</span>
                                <div className="flex items-baseline gap-0.5">
                                    <span className="text-xs font-black text-primary">$</span>
                                    <span className="text-2xl font-black text-primary tracking-tighter">
                                        {lowestPrice.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-[9px] font-black text-muted-light uppercase tracking-tight block mb-0.5">Shipping</span>
                                <div className="flex items-center justify-end gap-1 text-foreground">
                                    <Truck className="w-3 h-3 text-muted-light" />
                                    <span className="text-sm font-black">
                                        {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {isList && (
                            <p className="text-xs text-muted font-medium line-clamp-2 leading-relaxed">
                                {product.description}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-dashed border-border pointer-events-auto z-20">
                        {isHome && !isList ? (
                            /* COMPACT HOMEPAGE GRID LAYOUT */
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    {retailerCount > 1 ? (
                                        <button
                                            onClick={toggleStores}
                                            className="text-[10px] font-black text-primary hover:underline flex items-center gap-1 group/btn"
                                        >
                                            {retailerCount} Stores <ArrowRight className={`w-3 h-3 transition-transform ${showStoresDropdown ? 'rotate-90' : ''} group-hover/btn:translate-x-0.5`} />
                                        </button>
                                    ) : (
                                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Single Retailer</span>
                                    )}

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            openNotifyModal(product.name, product.bestPrice);
                                        }}
                                        className="flex items-center gap-1.5 text-[10px] font-black text-muted hover:text-accent transition-colors"
                                        title="Notify Me"
                                    >
                                        <Bell className="w-3.5 h-3.5 text-primary" /> Notify Me
                                    </button>
                                </div>

                                <a
                                    href={product.bestOffer?.offerUrl || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full py-3 rounded-xl bg-primary text-white text-[10px] font-black shadow-lg shadow-primary/20 hover:bg-primary-dark hover:-translate-y-px active:translate-y-0 transition-all flex items-center justify-center gap-2"
                                >
                                    Go To Store <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        ) : (
                            /* STANDARD LAYOUT (DISCOVER PAGE, ETC) */
                            <div className="flex items-center justify-between">
                                {retailerCount > 1 ? (
                                    <button
                                        onClick={toggleStores}
                                        className="text-[10px] sm:text-xs font-black text-primary hover:underline flex items-center gap-1 group/btn"
                                    >
                                        View Other Stores <ArrowRight className={`w-3 h-3 transition-transform ${showStoresDropdown ? 'rotate-90' : ''} group-hover/btn:translate-x-0.5`} />
                                    </button>
                                ) : (
                                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">Single Retailer</span>
                                )}

                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            openNotifyModal(product.name, product.bestPrice);
                                        }}
                                        className="p-2.5 rounded-xl border border-border text-muted hover:text-accent hover:bg-accent/5 transition-all"
                                        title="Notify Me"
                                    >
                                        <Bell className="w-4 h-4" />
                                    </button>
                                    <a
                                        href={product.bestOffer?.offerUrl || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="py-2.5 px-5 sm:px-7 rounded-xl bg-primary text-white text-[10px] sm:text-xs font-black shadow-lg shadow-primary/20 hover:bg-primary-dark hover:-translate-y-px active:translate-y-0 transition-all flex items-center gap-2"
                                    >
                                        Go To Store <ExternalLink className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* LIST MODE: Inline Stores Dropdown - Full Width below main content */}
            {isList && showStoresDropdown && (
                <div className="w-full bg-gray-50/50 border-t border-border p-4 sm:p-6 animate-in slide-in-from-top-2 duration-200 z-30 relative shadow-inner">
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-xs font-black uppercase tracking-widest text-muted-light">Price Comparison</h4>
                        <span className="text-[10px] font-bold text-muted">{retailerCount} stores found</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {product.offers.map((offer, idx) => {
                            const retailerName = offer.retailerId === 'petcircle' ? 'Pet Circle' :
                                offer.retailerId === 'petbarn' ? 'Petbarn' :
                                    offer.retailerId === 'petstock' ? 'PETstock' :
                                        offer.retailerId === 'budgetpetproducts' ? 'Budget Pet' : 'Store';
                            const isCheapest = idx === 0;

                            return (
                                <div key={idx} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${isCheapest ? 'bg-white border-primary shadow-sm relative overflow-hidden ring-1 ring-primary/10' : 'bg-white border-border hover:border-primary/30'}`}>
                                    {isCheapest && <div className="absolute top-0 right-0 w-7 h-7 bg-primary rounded-bl-xl flex items-center justify-center text-[10px] text-white font-black shadow-sm z-10">★</div>}
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 shrink-0 rounded-xl bg-surface border border-border flex items-center justify-center text-[10px] font-black text-muted uppercase overflow-hidden shadow-sm">
                                            {product.bestOffer?.retailerLogo && isCheapest ? (
                                                <img src={product.bestOffer.retailerLogo} alt={retailerName} className="w-full h-full object-cover" />
                                            ) : (
                                                retailerName.substring(0, 2)
                                            )}
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-sm font-black text-foreground leading-tight">{retailerName}</span>
                                            <div className="flex items-center gap-1.5 flex-wrap">
                                                <span className={`text-[9px] font-bold uppercase tracking-wider ${offer.stockStatus === 'in-stock' ? 'text-green-600' : 'text-red-500'}`}>{offer.stockStatus.replace('-', ' ')}</span>
                                                <span className="text-[9px] text-muted-light font-bold">•</span>
                                                <span className="text-[9px] text-muted font-bold">Ship: {offer.shippingCost === 0 ? 'FREE' : `$${offer.shippingCost?.toFixed(2)}`}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right pl-3 flex flex-col items-end gap-1.5 pt-2">
                                        <div className="text-lg font-black text-primary whitespace-nowrap">
                                            ${offer.price.toFixed(2)}
                                        </div>
                                        <a
                                            href={offer.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-1.5 rounded-lg bg-surface border border-border text-foreground text-[10px] font-bold hover:bg-primary hover:text-white hover:border-primary transition-all flex items-center gap-2 active:translate-y-px"
                                        >
                                            Visit <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

        </div>
    );
};
