"use client";

import {
    Users,
    Box,
    Store,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    CheckCircle2,
    AlertCircle
} from "lucide-react";
import { PRODUCTS } from "@/data/mock";

const STATS = [
    { label: "Total Users", value: "1,284", change: "+12.5%", trend: "up", icon: Users, color: "bg-blue-500" },
    { label: "Total Products", value: PRODUCTS.length.toString(), change: "+4.2%", trend: "up", icon: Box, color: "bg-purple-500" },
    { label: "Active Retailers", value: "18", change: "0%", trend: "neutral", icon: Store, color: "bg-orange-500" },
    { label: "Price Alerts Sent", value: "8,432", change: "+28.4%", trend: "up", icon: TrendingUp, color: "bg-green-500" },
];

const RECENT_ACTIVITIES = [
    { type: "price_drop", product: "Royal Canin Adult 15kg", detail: "Price dropped by $5.00 at PetCircle", time: "2 mins ago", status: "notified" },
    { type: "new_user", detail: "Sarah Jenkins joined the pack", time: "15 mins ago", status: "verified" },
    { type: "error", detail: "Automatic sync failed for MyPetWarehouse", time: "1 hour ago", status: "failed" },
    { type: "retailer", detail: "Lucky Dog Supplies added 45 new SKUs", time: "3 hours ago", status: "success" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg shadow-${stat.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'}`}>
                                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : stat.trend === 'down' ? <ArrowDownRight className="w-3 h-3" /> : null}
                                {stat.change}
                            </div>
                        </div>
                        <div>
                            <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activities */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden h-full">
                        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                            <h3 className="text-xl font-black text-gray-900 flex items-center gap-3">
                                <Clock className="w-6 h-6 text-primary" /> Live Activity Feed
                            </h3>
                            <button className="text-xs font-bold text-primary hover:underline uppercase tracking-widest">View All</button>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {RECENT_ACTIVITIES.map((activity, idx) => (
                                <div key={idx} className="p-6 flex items-start gap-4 hover:bg-gray-50/50 transition-colors">
                                    <div className={`w-2 h-2 rounded-full mt-2.5 shrink-0 ${activity.status === 'failed' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="font-bold text-gray-900">{activity.detail}</span>
                                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{activity.time}</span>
                                        </div>
                                        {activity.product && <div className="text-xs font-medium text-gray-500">Product: {activity.product}</div>}
                                    </div>
                                    {activity.status === 'failed' ? (
                                        <AlertCircle className="w-5 h-5 text-red-400" />
                                    ) : (
                                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Shortcuts */}
                <div className="space-y-6">
                    <div className="bg-gray-900 rounded-4xl p-8 text-white relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black mb-2">Sync Engine</h3>
                            <p className="text-gray-400 text-sm mb-6">Last sync completed 12 minutes ago.</p>
                            <button className="w-full bg-primary py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                <TrendingUp className="w-5 h-5" /> Force Global Refresh
                            </button>
                        </div>
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Box className="w-32 h-32 rotate-12" />
                        </div>
                    </div>

                    <div className="bg-white rounded-4xl border border-gray-100 shadow-sm p-8">
                        <h3 className="text-lg font-black text-gray-900 mb-6">System Health</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                                    <span>API Performance</span>
                                    <span className="text-green-500">99.8%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-[99.8%]"></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                                    <span>Sync Success Rate</span>
                                    <span className="text-primary">94.2%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[94.2%]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
