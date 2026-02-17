"use client";

import { useCompare } from "@/context/CompareContext";
import { useModal } from "@/context/ModalContext";
import { SafeImage } from "@/components/ui/SafeImage";
import Link from "next/link";
import { X, Search, ExternalLink, Bell, ChevronDown, Clock, Truck } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function ComparePage() {
    const { compareList, removeFromCompare, clearCompare } = useCompare();
    const { openNotifyModal } = useModal();
    const [expandedStores, setExpandedStores] = useState<Record<string, boolean>>({});

    const toggleStores = (productId: string) => {
        setExpandedStores(prev => ({ ...prev, [productId]: !prev[productId] }));
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
        <div className="container mx-auto px-4 py-8 sm:py-12">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl sm:text-4xl font-black mb-2">Compare Products</h1>
                    <p className="text-muted font-bold">Side-by-side analysis of the best pet deals in Australia.</p>
                </div>
                <button
                    onClick={clearCompare}
                    className="px-6 py-3 bg-red-50 text-red-600 rounded-xl font-black text-sm hover:bg-red-100 transition-colors"
                >
                    Clear All
                </button>
            </div>

            <div className="overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="min-w-[1000px]">
                    <table className="w-full text-left border-collapse bg-white rounded-3xl overflow-hidden shadow-sm border border-border">
                        <thead>
                            <tr className="bg-surface/50">
                                <th className="p-6 w-56 border-b border-border">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-muted-light">Product Detail</div>
                                </th>
                                {compareList.map(product => (
                                    <th key={product.id} className="p-6 w-72 align-top border-l border-b border-border relative group">
                                        <button
                                            onClick={() => removeFromCompare(product.id)}
                                            className="absolute top-4 right-4 p-2 bg-white text-muted hover:text-red-500 rounded-full shadow-sm transition-all z-10 hover:scale-110"
                                            aria-label="Remove product"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <div className="w-full aspect-square relative rounded-2xl overflow-hidden mb-4 border border-border bg-surface group-hover:scale-[1.02] transition-transform duration-500">
                                            <SafeImage src={product.image} alt={product.name} className="w-full h-full object-contain p-4 absolute inset-0" />
                                        </div>
                                        <a
                                            href={product.bestOffer?.offerUrl || '#'}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-black text-foreground hover:text-primary line-clamp-2 mb-3 leading-tight text-lg"
                                        >
                                            {product.name}
                                        </a>
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-[10px] text-muted font-bold uppercase">From</span>
                                                <span className="text-2xl font-black text-primary">${product.bestPrice.toFixed(2)}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-[10px] font-bold text-muted-light">
                                                <Clock className="w-3 h-3" />
                                                Updated {product.offers[0]?.lastUpdated ? formatDistanceToNow(new Date(product.offers[0].lastUpdated), { addSuffix: true }) : "recently"}
                                            </div>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-border">
                            {/* Brand */}
                            <tr>
                                <th className="p-6 text-xs font-black text-muted-light uppercase tracking-widest bg-surface/30">Brand</th>
                                {compareList.map(product => (
                                    <td key={product.id} className="p-6 border-l border-border font-black text-sm text-foreground">{product.brand}</td>
                                ))}
                            </tr>

                            {/* Best Store & Logo */}
                            <tr>
                                <th className="p-6 text-xs font-black text-muted-light uppercase tracking-widest bg-surface/30">Best Store</th>
                                {compareList.map(product => (
                                    <td key={product.id} className="p-6 border-l border-border">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-[10px] font-black text-muted overflow-hidden shadow-sm">
                                                {product.bestOffer?.retailerLogo ? (
                                                    <img src={product.bestOffer.retailerLogo} alt={product.bestOffer.retailerName} className="w-full h-full object-cover" />
                                                ) : (
                                                    product.bestOffer?.retailerName?.substring(0, 2)
                                                )}
                                            </div>
                                            <span className="font-black text-sm text-foreground">{product.bestOffer?.retailerName}</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* Shipping Price */}
                            <tr>
                                <th className="p-6 text-xs font-black text-muted-light uppercase tracking-widest bg-surface/30">Shipping</th>
                                {compareList.map(product => (
                                    <td key={product.id} className="p-6 border-l border-border">
                                        <div className="flex items-center gap-2 font-black text-sm text-foreground">
                                            <Truck className="w-4 h-4 text-muted-light" />
                                            {product.bestOffer?.shippingPrice === 0 ? (
                                                <span className="text-green-600">FREE</span>
                                            ) : (
                                                `$${product.bestOffer?.shippingPrice?.toFixed(2)}`
                                            )}
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* Stock Status */}
                            <tr>
                                <th className="p-6 text-xs font-black text-muted-light uppercase tracking-widest bg-surface/30">Stock Status</th>
                                {compareList.map(product => (
                                    <td key={product.id} className="p-6 border-l border-border">
                                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm border ${product.bestOffer?.stockStatus?.toLowerCase().includes('in stock') ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}`}>
                                            {product.bestOffer?.stockStatus}
                                        </span>
                                    </td>
                                ))}
                            </tr>

                            {/* Specs */}
                            <tr>
                                <th className="p-6 text-xs font-black text-muted-light uppercase tracking-widest bg-surface/30">Specifications</th>
                                {compareList.map(product => (
                                    <td key={product.id} className="p-6 border-l border-border">
                                        <div className="grid grid-cols-1 gap-2">
                                            {Object.entries(product.attributes).map(([key, val]) => (
                                                <div key={key} className="flex justify-between items-center py-1 border-b border-border/50 text-[11px]">
                                                    <span className="text-muted font-bold">{key}</span>
                                                    <span className="text-foreground font-black">{val}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* Actions & Notify */}
                            <tr>
                                <th className="p-6 text-xs font-black text-muted-light uppercase tracking-widest bg-surface/30">Actions</th>
                                {compareList.map(product => (
                                    <td key={product.id} className="p-6 border-l border-border">
                                        <div className="flex flex-col gap-3">
                                            <a
                                                href={product.bestOffer?.offerUrl || '#'}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full py-4 px-6 bg-primary text-white text-center rounded-2xl font-black text-sm shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all flex items-center justify-center gap-2 group/btn"
                                            >
                                                Go To Store <ExternalLink className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5" />
                                            </a>
                                            <button
                                                onClick={() => openNotifyModal(product.name, product.bestPrice)}
                                                className="w-full py-4 px-6 bg-accent/10 text-accent text-center rounded-2xl font-black text-sm hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2 border border-accent/20"
                                            >
                                                <Bell className="w-4 h-4" /> Notify Me
                                            </button>
                                            <button
                                                onClick={() => toggleStores(product.id)}
                                                className="w-full py-3 text-primary text-center font-black text-[10px] uppercase tracking-widest hover:underline flex items-center justify-center gap-1"
                                            >
                                                View Other Stores <ChevronDown className={`w-3 h-3 transition-transform ${expandedStores[product.id] ? 'rotate-180' : ''}`} />
                                            </button>

                                            {/* Other Stores Inline Accordion */}
                                            {expandedStores[product.id] && (
                                                <div className="mt-2 space-y-2 animate-in slide-in-from-top-2 duration-200">
                                                    {product.offers.slice(1).map((offer, idx) => (
                                                        <div key={idx} className="p-3 bg-surface border border-border rounded-xl flex items-center justify-between">
                                                            <div className="flex flex-col">
                                                                <span className="text-[10px] font-black text-foreground">{offer.retailerId.substring(0, 2).toUpperCase()}</span>
                                                                <span className="text-[9px] font-bold text-muted">${offer.price.toFixed(2)}</span>
                                                            </div>
                                                            <a href={offer.url} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-white border border-border rounded-lg shadow-sm">
                                                                <ExternalLink className="w-3 h-3" />
                                                            </a>
                                                        </div>
                                                    ))}
                                                    {product.offers.length <= 1 && (
                                                        <div className="p-3 text-[10px] text-muted text-center italic font-bold">No other stores found</div>
                                                    )}
                                                </div>
                                            )}
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
