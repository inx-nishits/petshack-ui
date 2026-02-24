"use client";

import { useAuth } from "@/context/AuthContext";
import { Heart, Trash2, ArrowRight, ExternalLink, ShoppingCart, Info, Search } from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { useState } from "react";

const MOCK_SAVED_ITEMS = [
    {
        id: "1",
        name: "Royal Canin Size Health Nutrition Medium Adult Dry Dog Food",
        image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=300&h=300&fit=crop",
        bestPrice: 119.99,
        store: "Pet Circle",
        category: "Dog Food"
    },
    {
        id: "2",
        name: "Black Hawk Grain Free Adult Dog Food - Lamb",
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=300&h=300&fit=crop",
        bestPrice: 125.50,
        store: "My Pet Warehouse",
        category: "Dog Food"
    },
    {
        id: "3",
        name: "Kong Classic Dog Toy Red - Large",
        image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=300&h=300&fit=crop",
        bestPrice: 24.99,
        store: "Petstock",
        category: "Toys"
    }
];

export default function SavedItemsPage() {
    const { isLoggedIn } = useAuth();
    const [items, setItems] = useState(MOCK_SAVED_ITEMS);

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div className="min-h-screen bg-surface pb-20 pt-10 sm:pt-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-12">
                    <div className="flex items-center gap-2 text-red-500 font-black uppercase tracking-[0.2em] text-xs mb-3">
                        <Heart className="w-4 h-4 fill-current" /> Shortlist
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <h1 className="text-4xl sm:text-6xl font-black text-gray-900 tracking-tighter font-display mb-4">Saved Products</h1>
                            <p className="text-muted-light font-bold text-base sm:text-lg max-w-2xl">
                                Track your favorite products across all stores and get notified of the best deals.
                            </p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="bg-white border border-border px-5 py-3 rounded-2xl font-black text-sm text-gray-900 shadow-sm">
                                {items.length} Items Saved
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Items List */}
                    <div className="lg:col-span-2 space-y-4">
                        {items.length > 0 ? (
                            items.map((item) => (
                                <div key={item.id} className="group bg-white rounded-3xl p-5 sm:p-6 border border-border shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all flex flex-col sm:flex-row gap-6 relative">
                                    <div className="w-full sm:w-40 aspect-square bg-surface rounded-2xl overflow-hidden shrink-0 border border-border/50 group-hover:bg-primary/5 transition-colors">
                                        <SafeImage src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-center">
                                        <div className="flex items-start justify-between gap-4 mb-2">
                                            <div>
                                                <div className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">{item.category}</div>
                                                <h3 className="text-lg font-black text-gray-900 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                                                    {item.name}
                                                </h3>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all shrink-0"
                                                title="Remove from wishlist"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-muted-light uppercase tracking-widest">Best Price</span>
                                                <span className="text-2xl font-black text-primary">${item.bestPrice.toFixed(2)}</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-[10px] font-bold text-muted-light uppercase tracking-widest">Top Retailer</span>
                                                <div className="flex items-center gap-1.5 text-sm font-black text-gray-900 mt-0.5">
                                                    <ShoppingCart className="w-3.5 h-3.5 text-muted-light" /> {item.store}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-6 flex flex-wrap items-center gap-3">
                                            <Link href="/discover" className="flex-1 sm:flex-none px-6 py-3 bg-primary text-white text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-primary-dark transition-all shadow-lg shadow-primary/20 text-center flex items-center justify-center gap-2">
                                                Compare Details <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                            <button className="flex-1 sm:flex-none px-6 py-3 border border-border text-gray-600 text-[11px] font-black uppercase tracking-widest rounded-xl hover:bg-surface transition-all flex items-center justify-center gap-2">
                                                <ExternalLink className="w-3.5 h-3.5" /> Go To Store
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-20 text-center">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Heart className="w-10 h-10 text-gray-300" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2">No saved items yet</h3>
                                <p className="text-muted font-medium mb-8">Items you save while browsing will appear here.</p>
                                <Link href="/discover" className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all">
                                    Explore Products <Search className="w-4 h-4" />
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Sidebar / Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-[2.5rem] p-8 border border-border shadow-sm">
                            <h4 className="text-xl font-black text-gray-900 mb-4">How it works</h4>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black shrink-0">1</div>
                                    <p className="text-xs font-bold text-muted border-b border-border/50 pb-4 leading-relaxed">
                                        Save products you're interested in while using the price comparison tool.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black shrink-0">2</div>
                                    <p className="text-xs font-bold text-muted border-b border-border/50 pb-4 leading-relaxed">
                                        We monitor prices across all shops every hour for your shortlisted items.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black shrink-0">3</div>
                                    <p className="text-xs font-bold text-muted leading-relaxed">
                                        Get instant notifications via the bell icon or email when prices drop below your target.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10 relative overflow-hidden group">
                            <Info className="w-12 h-12 text-primary opacity-20 absolute -right-2 -top-2 transition-transform group-hover:scale-125" />
                            <h4 className="font-black text-primary mb-2">Pro Tip</h4>
                            <p className="text-xs font-bold text-gray-600 leading-relaxed italic">
                                "Shortlisted items are stored in your profile and synced across all your devices."
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
