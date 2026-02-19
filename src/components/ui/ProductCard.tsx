"use client";

import { Product } from "@/types";
import { Star, ShieldCheck, Bell, ArrowRight, X, ExternalLink, Clock, Truck } from "lucide-react";
import { useState, useEffect } from "react";
import { useCompare } from "@/context/CompareContext";
import { useModal } from "@/context/ModalContext";
import { formatDistanceToNow } from "date-fns";
import { usePathname } from "next/navigation";

import { PriceComparisonModal } from "./PriceComparisonModal";

interface ProductCardProps {
    product: Product;
    viewMode?: 'grid' | 'list';
}

export const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
    const isList = viewMode === 'list';
    const lowestPrice = product.bestPrice;
    const retailerCount = product.offers.length;
    const [imageError, setImageError] = useState(false);
    const [showComparisonModal, setShowComparisonModal] = useState(false); // Used for Full Modal
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
        setShowComparisonModal(true);
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

                {/* Image Section */}
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
                </div>

                {/* Content Section */}
                <div className={`flex-1 flex flex-col justify-between relative bg-white ${isList ? 'p-4 sm:p-4' : 'p-4'}`}>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">{product.brand}</span>
                            </div>

                            {/* Compare Checkbox */}
                            <button
                                onClick={toggleCompare}
                                className={`pointer-events-auto flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all z-20 hover:scale-105 active:scale-95 border ${isCompared ? 'bg-primary text-white border-primary shadow-md shadow-primary/20' : 'bg-surface text-muted-light border-border hover:text-primary hover:border-primary/30'}`}
                                title={isCompared ? 'Remove from Compare' : 'Add to Compare'}
                            >
                                <span className="text-[10px] font-black uppercase tracking-widest">Compare</span>
                                {isCompared ? <ShieldCheck className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 border-2 border-current rounded-sm" />}
                            </button>
                        </div>

                        <h3 className={`font-black text-gray-900 leading-tight group-hover:text-primary transition-colors pointer-events-auto line-clamp-2
                            ${isList ? 'text-base sm:text-lg' : 'text-base h-[2.8em]'}`}>
                            <a href={product.bestOffer?.offerUrl || '#'} target="_blank" rel="noopener noreferrer">
                                {product.name}
                            </a>
                        </h3>

                        {/* Status & Update Info */}
                        <div className="flex flex-wrap items-center gap-2 mt-1">
                            {product.bestOffer?.stockStatus && (
                                <span className={`text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${product.bestOffer.stockStatus.toLowerCase().includes('in stock')
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : 'bg-red-50 text-red-700 border-red-200'
                                    }`}>
                                    {product.bestOffer.stockStatus}
                                </span>
                            )}
                            <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border bg-gray-50 text-muted border-border flex items-center gap-1">
                                <Clock className="w-2.5 h-2.5" /> {lastUpdated}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mt-1">
                            <div>
                                <span className="text-[10px] font-black text-muted-light uppercase tracking-tight block mb-0.5">Lowest Price</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-xs font-black text-gray-900">$</span>
                                    <span className="text-2xl font-black text-gray-900 tracking-tighter">
                                        {lowestPrice.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-2">
                                    {product.bestOffer?.retailerLogo ? (
                                        <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white border border-border shadow-sm shrink-0">
                                            <img
                                                src={product.bestOffer.retailerLogo}
                                                alt={product.bestOffer.retailerName}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-[10px] font-black text-primary border border-primary/20 shrink-0">
                                            {product.bestOffer?.retailerName?.substring(0, 2).toUpperCase()}
                                        </div>
                                    )}
                                    <span className={`font-black text-gray-800 tracking-tight line-clamp-1 ${isList ? 'text-[10px]' : 'text-xs'}`}>
                                        {product.bestOffer?.retailerName}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="text-[9px] font-black text-muted-light uppercase tracking-tight block mb-0.5">Shipping</span>
                                <div className="flex items-center justify-end gap-1 text-gray-900">
                                    <Truck className="w-3 h-3 text-muted-light" />
                                    <span className="text-xs font-black">
                                        {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {isList && (
                            <p className="text-xs text-muted font-medium line-clamp-1 leading-relaxed">
                                {product.description}
                            </p>
                        )}
                    </div>

                    <div className={`flex flex-col border-t border-dashed border-border pointer-events-auto z-20 ${isList ? 'gap-2 mt-2 pt-2' : 'gap-3 mt-3 pt-3'}`}>
                        {isHome && !isList ? (
                            /* COMPACT HOMEPAGE GRID LAYOUT */
                            <div className="flex flex-col gap-2.5">
                                <div className="flex items-center justify-between gap-2">
                                    {retailerCount > 1 ? (
                                        <button
                                            onClick={toggleStores}
                                            className="text-[10px] font-bold text-gray-500 hover:text-primary hover:underline flex items-center gap-1 group/btn shrink-0"
                                        >
                                            {retailerCount} Stores <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
                                        </button>
                                    ) : (
                                        <span className="text-[10px] font-bold text-muted uppercase tracking-widest shrink-0">Single Retailer</span>
                                    )}

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            openNotifyModal(product.name, product.bestPrice);
                                        }}
                                        className="flex items-center gap-1.5 text-[10px] font-black text-muted hover:text-accent transition-colors shrink-0"
                                        title="Price Alert"
                                    >
                                        <Bell className="w-3.5 h-3.5 text-primary" /> Price Alert
                                    </button>
                                </div>

                                <a
                                    href={product.bestOffer?.offerUrl || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full py-3.5 rounded-xl bg-primary text-white text-xs sm:text-sm font-black shadow-lg shadow-primary/20 hover:bg-primary-dark hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
                                >
                                    Go To Store <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        ) : (
                            /* STANDARD LAYOUT (DISCOVER PAGE, ETC) */
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                {retailerCount > 1 ? (
                                    <button
                                        onClick={toggleStores}
                                        className="text-xs font-bold text-gray-500 hover:text-primary flex items-center gap-1 group/btn"
                                    >
                                        View {retailerCount - 1} other stores <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                                    </button>
                                ) : ( // Consistent placeholder for alignment
                                    <span className="text-xs font-bold text-muted opacity-50">Single Retailer</span>
                                )}

                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            openNotifyModal(product.name, product.bestPrice);
                                        }}
                                        className={`flex items-center gap-2 rounded-xl border border-border font-bold text-muted hover:text-accent hover:bg-accent/5 transition-all shrink-0 group/notify ${isList ? 'py-1.5 px-3 text-[9px] sm:text-[10px]' : 'py-2 px-4 text-xs'}`}
                                        title="Set Price Alert"
                                    >
                                        <Bell className={`${isList ? 'w-3.5 h-3.5' : 'w-4 h-4'} group-hover/notify:rotate-12 transition-transform`} />
                                        <span>Price Alert</span>
                                    </button>
                                    <a
                                        href={product.bestOffer?.offerUrl || '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className={`flex-1 sm:flex-none rounded-xl bg-primary text-white font-black shadow-lg shadow-primary/20 hover:bg-primary-dark hover:-translate-y-px active:translate-y-0 transition-all flex items-center justify-center gap-2 whitespace-nowrap ${isList ? 'py-1.5 px-4 text-[9px] sm:text-[10px]' : 'py-2 px-6 text-[10px] sm:text-xs'}`}
                                    >
                                        Go To Store <ExternalLink className="w-3 h-3" />
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Price Comparison Modal */}
            <PriceComparisonModal
                isOpen={showComparisonModal}
                onClose={() => setShowComparisonModal(false)}
                product={product}
            />
        </div>
    );
};
