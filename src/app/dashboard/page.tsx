"use client";

import { useAuth } from "@/context/AuthContext";
import {
    Bell,
    Heart,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    Search,
    ChevronRight,
    Sparkles,
    CheckCircle2,
    LayoutDashboard,
    User,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function DashboardContent() {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const showWelcome = searchParams.get('welcome') === 'true';
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const stats = [
        { label: "Active Alerts", value: "12", icon: Bell, color: "text-primary", bg: "bg-primary/10" },
        { label: "Saved Items", value: "24", icon: Heart, color: "text-red-500", bg: "bg-red-50/50" },
        { label: "Price Drops", value: "8", icon: ArrowDownRight, color: "text-green-600", bg: "bg-green-50/50" },
        { label: "Pro Member", value: "Active", icon: ShieldCheck, color: "text-blue-600", bg: "bg-blue-50/50" },
    ];

    const recentPriceDrops = [
        { id: 1, name: "Royal Canin Puppy Food", price: 84.99, oldPrice: 99.99, store: "Pet Circle", image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200&h=200&fit=crop" },
        { id: 2, name: "Black Hawk Adult Dog Food", price: 115.00, oldPrice: 129.50, store: "My Pet Warehouse", image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=200&h=200&fit=crop" },
        { id: 3, name: "Hill's Science Diet Indoor Cat", price: 45.00, oldPrice: 55.00, store: "Petstock", image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=200&h=200&fit=crop" },
    ];

    return (
        <div className="min-h-screen bg-surface pb-20 pt-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Welcome Message */}
                {showWelcome && (
                    <div className="mb-8 p-6 bg-green-600 rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 animate-in slide-in-from-top-4 duration-500 shadow-2xl shadow-green-600/20">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center shrink-0">
                                <CheckCircle2 className="w-8 h-8" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black">Welcome to PetShack Pro, {user?.firstName}!</h2>
                                <p className="text-white/80 font-bold">Your account has been verified. Let's find some deals.</p>
                            </div>
                        </div>
                        <Link href="/discover" className="bg-white text-green-700 px-8 py-3 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-green-50 transition-all shrink-0">
                            Start Comparing
                        </Link>
                    </div>
                )}

                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs mb-3">
                            <LayoutDashboard className="w-4 h-4" /> User Dashboard
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 tracking-tight font-display">Overview</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-border rounded-xl font-bold text-sm text-gray-600 hover:border-primary hover:text-primary transition-all shadow-sm">
                            <Clock className="w-4 h-4" /> Search History
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-white rounded-4xl p-6 border border-border/50 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all group">
                            <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className="text-3xl font-black text-gray-900 mb-1 tracking-tight">{stat.value}</div>
                            <div className="text-xs font-bold text-muted-light uppercase tracking-widest">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content: Recent Activity */}
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                    <ArrowDownRight className="w-6 h-6 text-green-600" /> Recent Price Drops
                                </h3>
                                <Link href="/alerts" className="text-xs font-black text-primary hover:underline uppercase tracking-widest">
                                    Manage Alerts
                                </Link>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {recentPriceDrops.slice(0, 2).map((product) => (
                                    <div key={product.id} className="bg-white rounded-3xl p-5 border border-border shadow-sm flex gap-4 hover:shadow-md transition-all">
                                        <div className="w-20 h-20 bg-surface rounded-2xl overflow-hidden shrink-0">
                                            <SafeImage src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-center">
                                            <h4 className="font-bold text-sm text-gray-900 line-clamp-1 mb-1">{product.name}</h4>
                                            <div className="flex items-baseline gap-2 mb-2">
                                                <span className="text-lg font-black text-primary">${product.price}</span>
                                                <span className="text-xs text-muted-light line-through font-bold">${product.oldPrice}</span>
                                            </div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-light flex items-center gap-1">
                                                <Sparkles className="w-3 h-3" /> {product.store}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Comparisons */}
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                                    <Search className="w-6 h-6 text-primary" /> Recent Comparisons
                                </h3>
                                <Link href="/discover" className="text-xs font-black text-primary hover:underline uppercase tracking-widest">
                                    Full History
                                </Link>
                            </div>
                            <div className="bg-white rounded-3xl border border-border overflow-hidden">
                                {[1, 2, 3].map((item, i) => (
                                    <div key={i} className={`p-4 flex items-center justify-between hover:bg-surface transition-colors ${i < 2 ? 'border-b border-border/50' : ''}`}>
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-primary/5 rounded-xl flex items-center justify-center text-primary font-black text-[10px]">
                                                {i === 0 ? 'DOG' : i === 1 ? 'CAT' : 'FISH'}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-gray-900">Puppy Food - Large Breed</div>
                                                <div className="text-[10px] font-bold text-muted-light uppercase tracking-widest">Checked 3 hours ago</div>
                                            </div>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar: Subscriptions/Promos */}
                    <div className="space-y-6">
                        <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16" />
                            <Sparkles className="w-10 h-10 text-primary mb-6" />
                            <h4 className="text-2xl font-black mb-2">PetShack Pro</h4>
                            <p className="text-gray-400 text-sm font-medium mb-8 leading-relaxed">You're currently on the Pro trial. Enjoy unlimited alerts and historical data.</p>
                            <button className="w-full py-4 bg-primary rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary-dark transition-all">
                                View Plan Details
                            </button>
                        </div>

                        <div className="bg-white rounded-[2.5rem] p-8 border border-border text-center">
                            <h4 className="font-black text-gray-900 mb-2">Need Help?</h4>
                            <p className="text-xs font-medium text-muted mb-6">Our pet food experts are here to help you choose.</p>
                            <Link href="/contact" className="text-xs font-black text-primary uppercase tracking-widest hover:underline">
                                Contact Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-surface flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
