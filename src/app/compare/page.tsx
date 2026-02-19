"use client";

import { useCompare } from "@/context/CompareContext";
import { useModal } from "@/context/ModalContext";
import { SafeImage } from "@/components/ui/SafeImage";
import Link from "next/link";
import { X, Search, ExternalLink, Bell, ChevronDown, Clock, Truck, ArrowRight } from "lucide-react";
import { useState, useRef, MouseEvent } from "react";
import { formatDistanceToNow } from "date-fns";

export default function ComparePage() {
    const { compareList, removeFromCompare, clearCompare } = useCompare();
    const { openNotifyModal } = useModal();
    const [expandedStores, setExpandedStores] = useState<Record<string, boolean>>({});
    const [showDifferences, setShowDifferences] = useState(false);

    // Drag to scroll logic
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e: MouseEvent) => {
        if (!scrollRef.current) return;
        setIsDragging(true);
        setStartX(e.pageX - scrollRef.current.offsetLeft);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const onMouseLeave = () => {
        setIsDragging(false);
    };

    const onMouseUp = () => {
        setIsDragging(false);
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!isDragging || !scrollRef.current) return;
        e.preventDefault();
        const x = e.pageX - scrollRef.current.offsetLeft;
        const walk = (x - startX) * 2; // scroll-fast
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const toggleStores = (productId: string) => {
        setExpandedStores(prev => ({ ...prev, [productId]: !prev[productId] }));
    };

    const hasDifferences = (key: string) => {
        if (compareList.length < 2) return true;
        const firstVal = compareList[0].attributes[key];
        return compareList.some(p => p.attributes[key] !== firstVal);
    };

    if (compareList.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h1 className="text-3xl font-black text-foreground mb-4">No Products to Compare</h1>
                <p className="text-muted text-lg mb-8 max-w-md">
                    Add products to your comparison list to see them side-by-side.
                </p>
                <Link href="/discover" className="btn-primary">
                    Browse Products
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1920px] mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-8">
                <div>
                    <h1 className="text-xl sm:text-3xl font-black mb-1">Compare Products</h1>
                    <p className="text-muted text-xs sm:text-sm font-bold">Side-by-side analysis of the best pet deals.</p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto">
                    <label className="flex items-center gap-2 cursor-pointer bg-white border border-border px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold shadow-sm hover:bg-surface transition-colors select-none">
                        <input
                            type="checkbox"
                            checked={showDifferences}
                            onChange={(e) => setShowDifferences(e.target.checked)}
                            className="rounded border-gray-300 text-primary focus:ring-primary w-3.5 h-3.5"
                        />
                        <span>Differences Only</span>
                    </label>
                    <button
                        onClick={clearCompare}
                        className="px-4 sm:px-6 py-1.5 sm:py-2 bg-red-50 text-red-600 rounded-xl font-black text-[10px] sm:text-xs hover:bg-red-100 transition-colors whitespace-nowrap"
                    >
                        Clear All
                    </button>
                </div>
            </div>

            {/* Mobile Scroll Hint */}
            <div className="sm:hidden flex items-center gap-2 mb-2 text-[10px] font-bold text-muted justify-end px-1 animate-pulse">
                <span>Scroll for more</span> <ArrowRight className="w-3 h-3" />
            </div>

            <div
                ref={scrollRef}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseLeave}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                className={`overflow-x-auto pb-6 -mx-2 sm:mx-0 px-2 sm:px-0 scrollbar-hide snap-x snap-mandatory ${isDragging ? 'cursor-grabbing snap-none' : 'cursor-grab'}`}
            >
                <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full text-left border-collapse bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm border border-border">
                        <thead>
                            <tr className="bg-surface/50">
                                <th className="hidden md:table-cell p-3 lg:p-4 w-40 lg:w-48 border-b border-border align-bottom pb-4 sticky left-0 bg-surface z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-light">Product Overview</div>
                                </th>
                                {compareList.map(product => {
                                    const isLowest = product.bestPrice === Math.min(...compareList.map(p => p.bestPrice));
                                    return (
                                        <th key={product.id} className={`p-2 sm:p-3 lg:p-4 w-[85vw] sm:w-48 lg:w-60 align-top border-l border-b border-border relative group min-w-[260px] sm:min-w-[190px] lg:min-w-[220px] snap-center h-full ${isLowest ? 'bg-green-50/30' : ''}`}>
                                            <div className="flex flex-col h-full">
                                                <button
                                                    onClick={() => removeFromCompare(product.id)}
                                                    className="absolute top-2 right-2 p-1 bg-white text-muted hover:text-red-500 rounded-full shadow-sm transition-all z-10 hover:scale-110"
                                                    aria-label="Remove product"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>

                                                {/* Image */}
                                                <div className="w-full h-28 sm:h-auto sm:aspect-4/3 relative rounded-lg sm:rounded-xl overflow-hidden mb-2 sm:mb-3 border border-border bg-white group-hover:scale-[1.02] transition-transform duration-500 shrink-0">
                                                    <SafeImage src={product.image} alt={product.name} className="w-full h-full object-cover absolute inset-0" />
                                                </div>

                                                {/* Title - Fixed Height for Alignment */}
                                                <div className="h-[2.4em] mb-1.5 sm:mb-3 shrink-0 overflow-hidden">
                                                    <a
                                                        href={product.bestOffer?.offerUrl || '#'}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="font-black text-gray-900 hover:text-primary line-clamp-2 leading-tight text-xs sm:text-sm block"
                                                        title={product.name}
                                                    >
                                                        {product.name}
                                                    </a>
                                                </div>

                                                {/* Price & Badge */}
                                                <div className="flex flex-col gap-0.5 mb-2 sm:mb-3 shrink-0">
                                                    <div className="flex items-center gap-1.5 sm:gap-2">
                                                        <span className="text-xl sm:text-2xl font-black text-gray-900">
                                                            ${product.bestPrice.toFixed(2)}
                                                        </span>
                                                        {isLowest && (
                                                            <span className="bg-green-100 text-green-800 text-[8px] sm:text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wide whitespace-nowrap">
                                                                Best Deal
                                                            </span>
                                                        )}
                                                    </div>
                                                    <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                                                        <Clock className="w-3 h-3" />
                                                        {product.offers[0]?.lastUpdated ? formatDistanceToNow(new Date(product.offers[0].lastUpdated), { addSuffix: true }) : "recently"}
                                                    </div>
                                                </div>

                                                {/* Store Info */}
                                                <div className="flex items-center gap-2 mb-2 p-0 sm:p-0 bg-transparent rounded-none border-0 shrink-0">
                                                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-surface border border-border flex items-center justify-center text-[10px] font-black text-muted overflow-hidden shrink-0">
                                                        {product.bestOffer?.retailerLogo ? (
                                                            <img src={product.bestOffer.retailerLogo} alt={product.bestOffer.retailerName} className="w-full h-full object-cover" />
                                                        ) : (
                                                            product.bestOffer?.retailerName?.substring(0, 2)
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-bold text-[10px] sm:text-xs text-gray-900 leading-none truncate">{product.bestOffer?.retailerName}</span>
                                                        <div className="flex flex-wrap gap-x-1 sm:gap-x-1.5 text-[9px] text-gray-500 font-medium mt-0.5 leading-none">
                                                            <span className="whitespace-nowrap">
                                                                {product.bestOffer?.shippingPrice === 0 ? 'Free Shipping' : `+$${product.bestOffer?.shippingPrice} Shipping`}
                                                            </span>
                                                            <span className="text-gray-300">|</span>
                                                            <span className={`${product.bestOffer?.stockStatus?.toLowerCase().includes('in stock') ? 'text-green-700' : 'text-red-700'} whitespace-nowrap truncate max-w-[60px] sm:max-w-none`}>
                                                                {product.bestOffer?.stockStatus === 'In Stock' ? 'In Stock' : product.bestOffer?.stockStatus}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-col gap-1.5 sm:gap-2 mt-auto">
                                                    {/* Other Stores Toggle - Moved up to align with user screenshot flow (Price -> Info -> Other Stores -> CTA) */}
                                                    <div className="relative mb-1">
                                                        <button
                                                            onClick={() => toggleStores(product.id)}
                                                            className="text-left text-[10px] sm:text-xs font-medium text-gray-500 hover:text-primary hover:underline transition-colors flex items-center gap-1 group/btn"
                                                        >
                                                            <span>
                                                                {expandedStores[product.id] ? 'Hide other stores' : `View ${product.offers.length - 1} other stores`}
                                                            </span>
                                                            <ArrowRight className={`w-3 h-3 transition-transform group-hover/btn:translate-x-0.5 ${expandedStores[product.id] ? 'rotate-180' : ''}`} />
                                                        </button>

                                                        {expandedStores[product.id] && (
                                                            <div className="mt-2 space-y-1.5 animate-in slide-in-from-top-1 absolute left-0 right-0 bg-white p-3 rounded-xl shadow-xl border border-border z-20">
                                                                <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-2">Other Offers</h4>
                                                                {product.offers.slice(1).map((offer, idx) => (
                                                                    <div key={idx} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                                                                        <span className="text-[11px] font-bold text-gray-900 truncate max-w-[80px]">{offer.retailerId}</span>
                                                                        <div className="flex items-center gap-2">
                                                                            <span className="text-[11px] font-bold text-gray-900">${offer.price.toFixed(2)}</span>
                                                                            <a href={offer.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary"><ExternalLink className="w-3 h-3" /></a>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                                {product.offers.length <= 1 && (
                                                                    <div className="text-[9px] text-gray-400 text-center italic">No other stores available</div>
                                                                )}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex gap-1.5 sm:block sm:space-y-2">
                                                        <a
                                                            href={product.bestOffer?.offerUrl || '#'}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex-1 w-full py-2 bg-primary text-white text-center rounded-lg font-black text-[10px] sm:text-xs shadow-sm hover:bg-primary-dark transition-all flex items-center justify-center gap-1.5 whitespace-nowrap"
                                                        >
                                                            Go <span className="hidden sm:inline">To Store</span> <ExternalLink className="w-3 h-3" />
                                                        </a>

                                                        <button
                                                            onClick={() => openNotifyModal(product.name, product.bestPrice)}
                                                            className="flex-1 text-[10px] font-bold text-primary hover:underline hover:bg-primary/5 rounded-lg flex items-center justify-center gap-1 w-full text-center py-2 sm:py-1 border sm:border-0 border-primary/20"
                                                        >
                                                            <Bell className="w-3 h-3" /> <span className="hidden sm:inline">Set Price </span>Alert
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {/* --- Product Details Section --- */}
                            <tr>
                                <th colSpan={compareList.length + 1} className="bg-surface/50 p-2 text-[10px] font-black uppercase tracking-widest text-primary border-y border-border text-center">
                                    Technical Specifications
                                </th>
                            </tr>

                            <tr>
                                <th className="hidden md:table-cell p-3 lg:p-4 w-40 lg:w-48 text-xs font-black text-muted-light uppercase tracking-widest align-middle sticky left-0 bg-surface z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Brand</th>
                                {compareList.map(product => (
                                    <td key={product.id} className="p-3 sm:p-3 lg:p-4 border-l border-border font-bold text-sm text-foreground align-middle min-w-[280px] sm:min-w-[190px] lg:min-w-[220px] snap-center">
                                        <span className="block md:hidden text-[9px] text-muted font-bold uppercase mb-1">Brand</span>
                                        {product.brand}
                                    </td>
                                ))}
                            </tr>

                            <tr>
                                <th className="hidden md:table-cell p-3 lg:p-4 w-40 lg:w-48 text-xs font-black text-muted-light uppercase tracking-widest align-top pt-4 sticky left-0 bg-surface z-10 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]">Specs</th>
                                {compareList.map(product => (
                                    <td key={product.id} className="p-3 sm:p-3 lg:p-4 border-l border-border align-top min-w-[280px] sm:min-w-[190px] lg:min-w-[220px] snap-center">
                                        <div className="space-y-2">
                                            {Object.entries(product.attributes)
                                                .filter(([key]) => !showDifferences || hasDifferences(key))
                                                .map(([key, val]) => (
                                                    <div key={key} className="flex flex-col border-b border-border/40 pb-1 last:border-0">
                                                        <span className="text-[9px] text-muted font-bold uppercase">{key}</span>
                                                        <span className="text-xs font-medium text-foreground">{val}</span>
                                                    </div>
                                                ))}
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
