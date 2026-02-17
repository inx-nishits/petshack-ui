"use client";

import { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/mock";
import { Bell, Trash2, TrendingDown, ArrowRight, AlertTriangle } from "lucide-react";

export default function AlertsPage() {
    // Mock active alerts using a subset of products
    const [alerts, setAlerts] = useState(PRODUCTS.slice(0, 3).map(p => ({
        id: p.id,
        product: p,
        targetPrice: p.bestPrice - 5,
        createdAt: "2 days ago",
        status: "Active"
    })));

    const removeAlert = (id: string) => {
        setAlerts(alerts.filter(a => a.id !== id));
    };

    const clearAll = () => {
        setAlerts([]);
    };

    return (
        <div className="min-h-screen bg-surface py-12 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-6">
                    <div>
                        <div className="flex items-center gap-4 mb-3">
                            <h1 className="text-3xl sm:text-4xl font-black text-foreground flex items-center gap-3">
                                <Bell className="w-8 h-8 sm:w-10 sm:h-10 text-primary" /> Price Alerts
                            </h1>
                            {alerts.length > 0 && (
                                <button
                                    onClick={clearAll}
                                    className="text-xs font-bold text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors uppercase tracking-widest border border-red-100"
                                >
                                    Clear All
                                </button>
                            )}
                        </div>
                        <p className="text-muted text-sm sm:text-base font-medium max-w-xl leading-relaxed">
                            Stay ahead of the pack! We're tracking these products for you and will bark if the price drops.
                        </p>
                    </div>
                    <Link href="/discover" className="px-6 py-3 sm:px-8 sm:py-4 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all text-sm uppercase tracking-widest flex items-center gap-2">
                        Find More Products <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="bg-white rounded-2xl sm:rounded-[2.5rem] shadow-sm border border-border overflow-hidden">
                    {alerts.length > 0 ? (
                        <div className="divide-y divide-border/50">
                            {alerts.map((alert) => (
                                <div key={alert.id} className="p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 sm:gap-8 group hover:bg-surface/50 transition-colors">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl border border-border p-2 flex shrink-0 items-center justify-center relative">
                                        <img src={alert.product.image} alt={alert.product.name} className="w-full h-full object-contain" />
                                        <div className="absolute -top-2 -right-2 bg-green-100 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded-full border border-green-200 uppercase tracking-wide">
                                            {alert.status}
                                        </div>
                                    </div>

                                    <div className="flex-1 text-center md:text-left space-y-2">
                                        <h3 className="font-bold text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors">
                                            {alert.product.name}
                                        </h3>
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-bold uppercase tracking-widest text-muted-light">
                                            <span className="flex items-center gap-1.5"><TrendingDown className="w-4 h-4 text-primary" /> Target: ${alert.targetPrice}</span>
                                            <span>Current: ${alert.product.bestPrice}</span>
                                            <span>Created: {alert.createdAt}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4 w-full md:w-auto">
                                        <Link href={`/product/${alert.product.id}`} className="flex-1 md:flex-none px-6 py-3 border border-border rounded-xl text-center text-xs font-black uppercase tracking-widest hover:bg-surface hover:text-primary transition-colors min-h-[44px] flex items-center justify-center">
                                            View Product
                                        </Link>
                                        <button
                                            onClick={() => removeAlert(alert.id)}
                                            className="p-3 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                            title="Remove Alert"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 sm:p-20 text-center flex flex-col items-center justify-center">
                            <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mb-6">
                                <AlertTriangle className="w-10 h-10 text-muted-light" />
                            </div>
                            <h3 className="text-xl font-black text-foreground mb-2">No Active Alerts</h3>
                            <p className="text-muted font-medium mb-8 max-w-md mx-auto">
                                You haven't set up any price alerts yet. Go to the Discover page to start tracking prices!
                            </p>
                            <Link href="/discover" className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                                Start Tracking
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
