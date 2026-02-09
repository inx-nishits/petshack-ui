"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, User, ArrowRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blog" },
    { label: "Membership", href: "https://membership.petshack.au/", external: true },
    { label: "Become A Partner", href: "https://membership.petshack.au/forpartners", external: true },
];

const MEGA_MENU_DATA = {
    petTypes: [
        {
            title: "Dog",
            href: "#",
            image: "/assets/cat-dog.png"
        },
        {
            title: "Cat",
            href: "#",
            image: "/assets/cat-cat.png"
        },
        {
            title: "Fish",
            href: "#",
            image: "/assets/cat-fish.png"
        },
        {
            title: "Reptile",
            href: "#",
            image: "/assets/cat-fish.png"
        },
        {
            title: "Bird",
            href: "#",
            image: "/assets/cat-bird.png"
        },
        {
            title: "Horse",
            href: "#",
            image: "/assets/cat-dog.png"
        },
        {
            title: "Wildlife",
            href: "#",
            image: "/assets/cat-bird.png"
        },
        {
            title: "Small Animal",
            href: "#",
            image: "/assets/cat-small.png"
        }
    ],
    brands: [
        { name: "Royal Canin", logo: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=200&h=200&fit=crop" },
        { name: "Black Hawk", logo: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=200&h=200&fit=crop" },
        { name: "Hill's Science Diet", logo: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200&h=200&fit=crop" },
        { name: "Breeder's Choice", logo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=200&h=200&fit=crop" },
        { name: "Advance", logo: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=200&h=200&fit=crop" },
        { name: "Purina Pro Plan", logo: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=200&h=200&fit=crop" },
        { name: "Kong", logo: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=200&h=200&fit=crop" },
        { name: "Greenies", logo: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=200&h=200&fit=crop" },
        { name: "Billie's Bowl", logo: "https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=200&h=200&fit=crop" },
    ]
};

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const headerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                setActiveMegaMenu(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setActiveMegaMenu(null);
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen]);

    return (
        <header ref={headerRef} className="sticky top-0 z-50 w-full bg-white border-b border-border transition-all">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 xl:h-20 items-center justify-between">
                    {/* Logo */}
                    <Logo />

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-[13px] xl:text-[15px] font-semibold">
                        {NAV_ITEMS.slice(0, 2).map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                className={`transition-colors relative py-1 ${isActive(item.href) ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                            >
                                {item.label}
                                {isActive(item.href) && (
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
                                )}
                            </Link>
                        ))}

                        {/* Mega Menu Triggers */}
                        {[
                            { id: "petTypes", label: "Pet Types" },
                            { id: "brands", label: "Brands" }
                        ].map((menu) => (
                            <div
                                key={menu.id}
                                className={`relative group cursor-pointer flex items-center gap-1 transition-colors font-semibold h-16 xl:h-20 ${activeMegaMenu === menu.id ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                                onMouseEnter={() => setActiveMegaMenu(menu.id)}
                                onClick={() => setActiveMegaMenu(activeMegaMenu === menu.id ? null : menu.id)}
                            >
                                <span>{menu.label}</span>
                                <ChevronDown className={`w-4 h-4 transition-transform ${activeMegaMenu === menu.id ? "rotate-180" : ""}`} />
                            </div>
                        ))}

                        {NAV_ITEMS.slice(2).map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                className={`transition-colors relative py-1 ${isActive(item.href) ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Auth CTAs for Desktop */}
                    <div className="hidden lg:flex items-center gap-3 xl:gap-6">
                        <Link
                            href="/login"
                            className={`text-[13px] xl:text-[15px] font-bold transition-colors ${isActive("/login") ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-primary text-white px-4 xl:px-7 py-2 xl:py-3 rounded-xl text-[13px] xl:text-[15px] font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95"
                        >
                            Join Free
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="text-foreground p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mega Menu Dropdown */}
            {activeMegaMenu && (
                <div
                    className="absolute top-full left-0 w-full animate-in fade-in slide-in-from-top-2 duration-200 z-50 pointer-events-none"
                    onMouseLeave={() => setActiveMegaMenu(null)}
                >
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
                        <div className="max-w-5xl mx-auto bg-white border border-border border-t-4 border-t-primary shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] rounded-b-3xl overflow-hidden">
                            <div className="p-8 lg:p-10 text-left">
                                {activeMegaMenu === "petTypes" && (
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                        <div className="md:col-span-1 space-y-6 md:pr-8 md:border-r border-border">
                                            <h2 className="text-2xl font-black text-foreground leading-tight">Shop By<br className="hidden md:block" /><span className="text-primary">Pet Type</span></h2>
                                            <p className="text-muted text-sm font-medium leading-relaxed">
                                                Find the perfect products specifically tailored for your furry, feathered, or scaled friends.
                                            </p>
                                            <Link
                                                href="#"
                                                className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all"
                                                onClick={() => setActiveMegaMenu(null)}
                                            >
                                                Explore All <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {MEGA_MENU_DATA.petTypes.map((type) => (
                                                <Link
                                                    key={type.title}
                                                    href="#"
                                                    onClick={() => setActiveMegaMenu(null)}
                                                    className="group/item flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-surface transition-all border border-transparent hover:border-border/50"
                                                >
                                                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-surface border border-border group-hover/item:border-primary/50 group-hover/item:bg-white transition-all flex items-center justify-center p-3 lg:p-4 shadow-sm group-hover/item:shadow-md">
                                                        <img src={type.image} alt={type.title} className="w-full h-full object-contain group-hover/item:scale-110 transition-transform duration-300" />
                                                    </div>
                                                    <span className="font-bold text-sm text-foreground group-hover/item:text-primary transition-colors">{type.title}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeMegaMenu === "brands" && (
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                        <div className="md:col-span-1 space-y-6 md:pr-8 md:border-r border-border">
                                            <h2 className="text-2xl font-black text-foreground leading-tight">Search By<br className="hidden md:block" /><span className="text-primary">Top Brands</span></h2>
                                            <p className="text-muted text-sm font-medium leading-relaxed">
                                                We compare the biggest brands across all major Aussie pet retailers.
                                            </p>
                                            <Link
                                                href="#"
                                                className="inline-flex items-center gap-2 text-primary text-sm font-bold hover:gap-3 transition-all"
                                                onClick={() => setActiveMegaMenu(null)}
                                            >
                                                View All Brands <ArrowRight className="w-4 h-4" />
                                            </Link>
                                        </div>
                                        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                                            {MEGA_MENU_DATA.brands.map((brand, idx) => (
                                                <Link
                                                    key={idx}
                                                    href="#"
                                                    className="group flex flex-col items-center gap-3 p-5 rounded-3xl hover:bg-surface transition-all border border-transparent hover:border-border/50 hover:shadow-premium"
                                                    onClick={() => setActiveMegaMenu(null)}
                                                >
                                                    <div className="w-16 h-16 rounded-2xl bg-white border border-border group-hover:border-primary/30 flex items-center justify-center shrink-0 shadow-sm overflow-hidden relative">
                                                        <img
                                                            src={brand.logo}
                                                            alt={brand.name}
                                                            className="w-full h-full object-cover transition-all duration-300 rounded-xl"
                                                            onError={(e) => {
                                                                (e.target as HTMLImageElement).style.display = 'none';
                                                            }}
                                                        />
                                                        {/* Initial Placeholder (Always there as backup) */}
                                                        <span className="absolute inset-0 flex items-center justify-center text-xl font-black text-gray-200 group-hover:text-primary/20 transition-colors pointer-events-none uppercase">
                                                            {brand.name[0]}
                                                        </span>
                                                    </div>
                                                    <span className="font-bold text-xs text-foreground group-hover:text-primary transition-colors text-center leading-tight">{brand.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="lg:hidden border-t border-border bg-white p-6 space-y-6 animate-in slide-in-from-top duration-300 shadow-xl h-[calc(100vh-80px)] overflow-y-auto">
                    <nav className="flex flex-col gap-1">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                target={item.external ? "_blank" : undefined}
                                rel={item.external ? "noopener noreferrer" : undefined}
                                className={`py-3 text-base font-semibold transition-all border-b border-dashed border-border/50 ${isActive(item.href) ? "text-primary" : "text-gray-900"}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}

                        <div className="py-4">
                            <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-4">Categories</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {MEGA_MENU_DATA.petTypes.map(type => (
                                    <Link
                                        key={type.title}
                                        href="#"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="p-3 bg-surface rounded-xl text-xs font-semibold text-foreground text-center border border-transparent hover:border-primary/20 transition-all flex flex-col items-center gap-2"
                                    >
                                        <img src={type.image} alt={type.title} className="w-10 h-10 object-contain" />
                                        {type.title}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/login"
                            className="flex items-center gap-2 py-3 font-semibold text-gray-900 border-t border-border mt-2"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            <User className="w-5 h-5" /> Sign In
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-primary text-white text-center py-4 rounded-xl font-semibold shadow-lg shadow-primary/20 mt-2 active:scale-95 transition-transform"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Join Free
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};
