"use client";

import { useState } from "react";
import { Bell, BellOff, Trash2, ArrowUpRight, ArrowDownRight, ShieldCheck, User, LogOut, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MOCK_ALERTS = [
    {
        id: "1",
        productName: "Royal Canin Adult 15kg",
        retailer: "PetCircle",
        oldPrice: 125.00,
        newPrice: 115.00,
        type: "price_drop",
        date: "2 hours ago",
        active: true,
        image: "https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=200&h=200&fit=crop"
    },
    {
        id: "2",
        productName: "Hills Science Diet Puppy Large Breed 12kg",
        retailer: "MyPetWarehouse",
        oldPrice: 140.00,
        newPrice: 145.00,
        type: "price_increase",
        date: "Yesterday",
        active: true,
        image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop"
    }
];

export default function AlertsPage() {
    const [alerts, setAlerts] = useState(MOCK_ALERTS);
    const router = useRouter();

    const toggleAlert = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setAlerts(alerts.map(a => a.id === id ? { ...a, active: !a.active } : a));
    };

    const deleteAlert = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setAlerts(alerts.filter(a => a.id !== id));
    };

    const clearAll = () => {
        setAlerts([]);
    };

    const handleAlertClick = (productName: string) => {
        router.push(`/discover?q=${encodeURIComponent(productName)}`);
    };

    return (
        <div className="min-h-screen bg-surface pb-20">
            {/* Header / Banner */}
            <div className="bg-primary/5 border-b border-primary/10 pb-20 pt-10 sm:pt-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-white p-2 shadow-xl shadow-primary/10">
                            <div className="w-full h-full rounded-full bg-primary text-white flex items-center justify-center font-black text-2xl sm:text-3xl tracking-tighter">
                                JS
                            </div>
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-2xl sm:text-4xl font-black text-foreground mb-2">My Alerts</h1>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 text-xs sm:text-sm font-bold text-muted-light uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-primary" /> Pet Lover</span>
                                <span className="flex items-center gap-1.5"><Bell className="w-4 h-4 text-primary" /> {alerts.length} Active Alerts</span>
                            </div>
                        </div>
                        <div className="md:ml-auto">
                            <button
                                onClick={clearAll}
                                className="px-6 py-3 bg-white border border-border rounded-xl text-sm font-bold text-red-500 hover:bg-red-50 transition-all shadow-sm flex items-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" /> Clear All Alerts
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                    {/* Sidebar Nav (Matching Profile Style) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-border overflow-hidden sticky top-24">
                            <div className="p-2 sm:p-3 space-y-1">
                                <Link href="/profile" className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 text-gray-500 hover:text-foreground hover:bg-surface rounded-xl font-bold text-sm sm:text-base transition-all">
                                    <User className="w-5 h-5" /> My Profile
                                </Link>
                                <Link href="/alerts" className="flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 bg-primary/5 text-primary rounded-xl font-bold text-sm sm:text-base border border-primary/10 transition-all">
                                    <Bell className="w-5 h-5" /> Data Alerts
                                </Link>
                                <div className="h-px bg-border/50 my-2" />
                                <button className="w-full flex items-center gap-3 px-4 py-3 sm:px-5 sm:py-4 text-red-500 hover:bg-red-50 rounded-xl font-bold text-sm sm:text-base transition-all">
                                    <LogOut className="w-5 h-5" /> Sign Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Alerts Content */}
                    <div className="lg:col-span-2 space-y-4">
                        {alerts.length > 0 ? (
                            alerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    onClick={() => handleAlertClick(alert.productName)}
                                    className={`bg-white rounded-2xl sm:rounded-3xl border shadow-sm transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5 ${alert.active ? 'border-border hover:border-primary/30' : 'border-dashed border-gray-200 opacity-60'}`}
                                >
                                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center p-5 sm:p-6">
                                        {/* Product Image */}
                                        <div className="shrink-0">
                                            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 ${alert.type === 'price_drop' ? 'border-green-100' : 'border-red-100'} bg-surface`}>
                                                <img
                                                    src={alert.image}
                                                    alt={alert.productName}
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='28'%3E🐾%3C/text%3E%3C/svg%3E";
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-3 mb-1">
                                                <h3 className="font-black text-gray-900 leading-tight line-clamp-2">{alert.productName}</h3>
                                                {/* Price Badge */}
                                                <div className={`shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black ${alert.type === 'price_drop' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                                                    {alert.type === 'price_drop' ? (
                                                        <ArrowDownRight className="w-3 h-3" />
                                                    ) : (
                                                        <ArrowUpRight className="w-3 h-3" />
                                                    )}
                                                    {alert.type === 'price_drop' ? 'Price Drop' : 'Price Rise'}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-muted-light uppercase tracking-widest mb-3">
                                                <span>{alert.retailer}</span>
                                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                <span>{alert.date}</span>
                                            </div>
                                            {/* Price Row */}
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-gray-400 line-through">${alert.oldPrice.toFixed(2)}</span>
                                                <span className={`text-lg font-black ${alert.type === 'price_drop' ? 'text-green-700' : 'text-red-700'}`}>
                                                    ${alert.newPrice.toFixed(2)}
                                                </span>
                                                <span className={`text-xs font-black px-2 py-0.5 rounded-full ${alert.type === 'price_drop' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {alert.type === 'price_drop'
                                                        ? `-$${(alert.oldPrice - alert.newPrice).toFixed(2)}`
                                                        : `+$${(alert.newPrice - alert.oldPrice).toFixed(2)}`
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex items-center gap-2 shrink-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                                            <button
                                                onClick={(e) => toggleAlert(alert.id, e)}
                                                className={`p-3 rounded-xl transition-all ${alert.active ? 'bg-primary/10 text-primary hover:bg-primary/20' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
                                                title={alert.active ? "Notification Active" : "Notification Paused"}
                                            >
                                                {alert.active ? <Bell className="w-5 h-5" /> : <BellOff className="w-5 h-5" />}
                                            </button>
                                            <button
                                                onClick={(e) => deleteAlert(alert.id, e)}
                                                className="p-3 rounded-xl bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all"
                                                title="Remove Alert"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Click to compare hint */}
                                    <div className={`px-5 sm:px-6 py-2.5 border-t text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${alert.type === 'price_drop' ? 'bg-green-50/50 border-green-100/50 text-green-600' : 'bg-red-50/50 border-red-100/50 text-red-500'}`}>
                                        <ArrowUpRight className="w-3 h-3" /> Click to view on Compare Page
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-4xl border-2 border-dashed border-gray-100 p-20 text-center">
                                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <BellOff className="w-10 h-10 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-black text-gray-900 mb-2">No active alerts</h3>
                                <p className="text-gray-500 font-medium mb-8">You haven't set up any price alerts yet. Go to the products page to start tracking!</p>
                                <Link href="/discover" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-2xl font-black shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                                    Browse Products <ArrowUpRight className="w-5 h-5" />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
