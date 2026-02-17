"use client";

import { useCompare } from "@/context/CompareContext";
import { SafeImage } from "@/components/ui/SafeImage";
import Link from "next/link";
import { X, Search } from "lucide-react";
import { PRODUCTS } from "@/data/mock";

export default function ComparePage() {
    const { compareList, removeFromCompare, clearCompare } = useCompare();

    if (compareList.length === 0) {
        return (
            <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h1 className="text-3xl font-black text-foreground mb-4">No Products to Compare</h1>
                <p className="text-muted text-lg mb-8 max-w-md">
                    Adds products to your comparison list to see them side-by-side.
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
                <h1 className="text-2xl sm:text-3xl font-black">Compare Products ({compareList.length})</h1>
                <button
                    onClick={clearCompare}
                    className="text-sm font-bold text-red-500 hover:underline"
                >
                    Clear All
                </button>
            </div>

            <div className="overflow-x-auto pb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
                <div className="min-w-[800px]">
                    <table className="w-full text-left border-collapse">
                        {/* Header Row - Images & Delete */}
                        <thead>
                            <tr>
                                <th className="p-4 w-48 bg-gray-50/50"></th>
                                {compareList.map(product => (
                                    <th key={product.id} className="p-4 w-64 align-top border-l border-border relative group">
                                        <button
                                            onClick={() => removeFromCompare(product.id)}
                                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:text-red-500 transition-colors z-10"
                                            aria-label="Remove product"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <div className="w-full aspect-square relative rounded-xl overflow-hidden mb-4 border border-border">
                                            <SafeImage src={product.image} alt={product.name} className="w-full h-full object-cover absolute inset-0" />
                                        </div>
                                        <Link href={`/product/${product.id}`} className="font-bold text-foreground hover:text-primary line-clamp-2 mb-2">
                                            {product.name}
                                        </Link>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-xs text-muted font-bold">from</span>
                                            <span className="text-lg font-black text-primary">${product.bestPrice.toFixed(2)}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {/* Comparison Rows */}
                        <tbody className="divide-y divide-border border-t border-border">
                            {/* Brand */}
                            <tr>
                                <th className="p-4 text-sm font-black text-muted uppercase tracking-wider bg-gray-50/30 sticky left-0">Brand</th>
                                {compareList.map(product => (
                                    <td key={product.id} className="p-4 border-l border-border font-medium text-sm">{product.brand}</td>
                                ))}
                            </tr>

                            {/* Category */}
                            <tr>
                                <th className="p-4 text-sm font-black text-muted uppercase tracking-wider bg-gray-50/30 sticky left-0">Category</th>
                                {compareList.map(product => (
                                    <td key={product.id} className="p-4 border-l border-border font-medium text-sm">{product.category}</td>
                                ))}
                            </tr>

                            {/* Animal Type */}
                            <tr>
                                <th className="p-4 text-sm font-black text-muted uppercase tracking-wider bg-gray-50/30 sticky left-0">Pet Type</th>
                                {compareList.map(product => (
                                    <td key={product.id} className="p-4 border-l border-border font-medium text-sm capitalize">{product.animalType}</td>
                                ))}
                            </tr>

                            {/* Attributes */}
                            <tr>
                                <th className="p-4 text-sm font-black text-muted uppercase tracking-wider bg-gray-50/30 sticky left-0">Specs</th>
                                {compareList.map(product => (
                                    <td key={product.id} className="p-4 border-l border-border font-medium text-sm">
                                        <ul className="space-y-1">
                                            {Object.entries(product.attributes).map(([key, val]) => (
                                                <li key={key}><span className="text-muted-light mr-1">{key}:</span> {val}</li>
                                            ))}
                                        </ul>
                                    </td>
                                ))}
                            </tr>

                            {/* Best Retailer */}
                            <tr>
                                <th className="p-4 text-sm font-black text-muted uppercase tracking-wider bg-gray-50/30 sticky left-0">Cheapest At</th>
                                {compareList.map(product => (
                                    <td key={product.id} className="p-4 border-l border-border font-medium text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded bg-white border border-border flex items-center justify-center text-[8px] font-black overflow-hidden">
                                                {product.bestOffer?.retailerName?.substring(0, 2)}
                                            </div>
                                            <span>{product.bestOffer?.retailerName}</span>
                                        </div>
                                    </td>
                                ))}
                            </tr>

                            {/* Stock Status */}
                            <tr>
                                <th className="p-4 text-sm font-black text-muted uppercase tracking-wider bg-gray-50/30 sticky left-0">Availability</th>
                                {compareList.map(product => (
                                    <td key={product.id} className="p-4 border-l border-border font-medium text-sm capitalize">
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${product.bestOffer?.stockStatus?.toLowerCase().includes('in stock') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {product.bestOffer?.stockStatus}
                                        </span>
                                    </td>
                                ))}
                            </tr>

                            {/* Action */}
                            <tr>
                                <th className="p-4 text-sm font-black text-muted uppercase tracking-wider bg-gray-50/30 sticky left-0"></th>
                                {compareList.map(product => (
                                    <td key={product.id} className="p-4 border-l border-border font-medium text-sm">
                                        <Link href={`/product/${product.id}`} className="block w-full py-3 bg-primary text-white text-center rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
                                            View Product
                                        </Link>
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
