"use client";

import {
    LayoutDashboard,
    Box,
    Users,
    Store,
    BarChart3,
    Settings,
    LogOut,
    Search,
    Bell,
    User,
    Menu,
    X,
    MessageSquare,
    Image as ImageIcon
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/ui/Logo";

const ADMIN_NAV = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: Box },
    { label: "Retailers", href: "/admin/retailers", icon: Store },
    { label: "User Management", href: "/admin/users", icon: Users },
    { label: "Banners", href: "/admin/banners", icon: ImageIcon },
    { label: "Feedback", href: "/admin/feedback", icon: MessageSquare },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const isActive = (href: string) => pathname === href;

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside
                className={`fixed lg:translate-x-0 inset-y-0 left-0 z-50 w-72 bg-[#1A1A1A] text-white transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="h-full flex flex-col">
                    <div className="p-8">
                        <Logo className="brightness-0 invert" />
                        <div className="mt-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">Admin Control</div>
                    </div>

                    <nav className="flex-1 px-4 py-4 space-y-1">
                        {ADMIN_NAV.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all group ${isActive(item.href) ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                            >
                                <item.icon className={`w-5 h-5 transition-transform ${isActive(item.href) ? '' : 'group-hover:scale-110'}`} />
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="p-4 mt-auto border-t border-white/10">
                        <div className="flex items-center gap-3 px-4 py-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-black text-white">AS</div>
                            <div>
                                <div className="text-sm font-bold">Admin User</div>
                                <div className="text-[10px] text-gray-500 uppercase font-black">Super Admin</div>
                            </div>
                        </div>
                        <Link
                            href="/"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-400/10 transition-all w-full"
                        >
                            <LogOut className="w-5 h-5" /> Sign Out
                        </Link>
                    </div>
                </div>

                {/* Mobile Toggle Close */}
                <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="lg:hidden absolute top-6 -right-12 bg-[#1A1A1A] text-white p-2 rounded-r-xl"
                >
                    <X className="w-6 h-6" />
                </button>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:pl-72' : 'pl-0'}`}>
                {/* Header */}
                <header className="h-20 bg-white border-b border-gray-200 sticky top-0 z-40 px-4 sm:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {!isSidebarOpen && (
                            <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-gray-100 rounded-lg">
                                <Menu className="w-6 h-6" />
                            </button>
                        )}
                        <h2 className="text-xl font-black text-gray-900 tracking-tight">
                            {ADMIN_NAV.find(n => n.href === pathname)?.label || "Administration"}
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-6">
                        <div className="hidden sm:flex relative items-center">
                            <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search everything..."
                                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-64"
                            />
                        </div>
                        <button className="relative p-2 text-gray-400 hover:text-gray-900 transition-colors">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-px bg-gray-200 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                <User className="w-5 h-5" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 p-4 sm:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
