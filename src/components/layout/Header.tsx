"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ChevronDown, User, ArrowRight, Sparkles, Users, Globe, Search } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { Logo } from "@/components/ui/Logo";

const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Blogs", href: "/blog" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact", href: "/contact" },
];

const UTILITY_ITEMS = [
    { label: "Membership", href: "https://membership.petshack.au/", external: true, icon: Sparkles },
    { label: "Become A Partner", href: "https://membership.petshack.au/forpartners", external: true, icon: Users },
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
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const headerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter(); // You'll need to import useRouter

    const isActive = (path: string) => pathname === path;

    // Scroll Logic for Hiding Top Bar
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // At the top check
            setIsScrolled(currentScrollY > 10);

            // Show/Hide logic
            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // Scrolling down - hide top bar info
                setIsVisible(false);
            } else {
                // Scrolling up - show everything
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

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
        setIsSearchOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen || isSearchOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMenuOpen, isSearchOpen]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/discover?q=${encodeURIComponent(searchQuery)}`);
            setIsSearchOpen(false);
        }
    };

    return (
        <header
            ref={headerRef}
            className={`sticky top-0 z-50 w-full bg-white border-b border-border shadow-sm transition-transform duration-500 ${!isVisible && isScrolled
                ? "lg:-translate-y-[36px] -translate-y-full"
                : "translate-y-0"
                }`}
        >
            {/* Utility Top Bar */}
            <div className="hidden lg:block bg-surface border-b border-border/50 h-9">
                <div className="container mx-auto px-6 sm:px-6 lg:px-8 h-full">
                    <div className="flex justify-between items-center h-full text-[11px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-6 text-muted-light">
                            <span className="flex items-center gap-2">
                                <Globe className="w-3 h-3" /> Australia's #1 Pet Price Tracker
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            {UTILITY_ITEMS.map((item, idx) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    target={item.external ? "_blank" : undefined}
                                    rel={item.external ? "noopener noreferrer" : undefined}
                                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full transition-all group border ${idx === 0
                                        ? "bg-primary/10 text-primary border-primary/20 hover:bg-primary hover:text-white"
                                        : "bg-white text-muted border-border hover:border-primary hover:text-primary"
                                        }`}
                                >
                                    <item.icon className={`w-3 h-3 transition-transform ${idx === 0 ? "group-hover:rotate-12" : "group-hover:scale-110"}`} />
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 sm:px-6 lg:px-8">
                <div className="flex h-16 xl:h-20 items-center justify-between">
                    {/* Logo */}
                    <Logo />

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-[13px] xl:text-[15px] font-semibold">
                        {/* Home & About Us */}
                        <Link
                            href="/"
                            className={`transition-colors relative py-1 ${isActive("/") ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                        >
                            Home
                            {isActive("/") && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
                            )}
                        </Link>

                        <Link
                            href="/about-us"
                            className={`transition-colors relative py-1 ${isActive("/about-us") ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                        >
                            About Us
                            {isActive("/about-us") && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
                            )}
                        </Link>

                        <Link
                            href="/discover"
                            className={`transition-colors relative py-1 ${isActive("/discover") ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                        >
                            Compare
                            {isActive("/discover") && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
                            )}
                        </Link>

                        <Link
                            href="/blog"
                            className={`transition-colors relative py-1 ${isActive("/blog") ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                        >
                            Blogs
                            {isActive("/blog") && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
                            )}
                        </Link>

                        {/* Mega Menu Triggers */}
                        <div
                            className={`relative group cursor-pointer flex items-center gap-1 transition-colors font-semibold h-16 xl:h-20 ${activeMegaMenu === "petTypes" ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                            onMouseEnter={() => setActiveMegaMenu("petTypes")}
                            onClick={() => setActiveMegaMenu(activeMegaMenu === "petTypes" ? null : "petTypes")}
                        >
                            <span>Pet Types</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${activeMegaMenu === "petTypes" ? "rotate-180" : ""}`} />
                        </div>

                        <div
                            className={`relative group cursor-pointer flex items-center gap-1 transition-colors font-semibold h-16 xl:h-20 ${activeMegaMenu === "brands" ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                            onMouseEnter={() => setActiveMegaMenu("brands")}
                            onClick={() => setActiveMegaMenu(activeMegaMenu === "brands" ? null : "brands")}
                        >
                            <span>Brands</span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${activeMegaMenu === "brands" ? "rotate-180" : ""}`} />
                        </div>

                        <Link
                            href="/contact"
                            className={`transition-colors relative py-1 ${isActive("/contact") ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                        >
                            Contact
                            {isActive("/contact") && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
                            )}
                        </Link>
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
                    <div className="flex items-center gap-2 relative left-2.5 lg:hidden">
                        <button
                            type="button"
                            className="text-foreground p-2"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            <Search className="w-6 h-6" />
                        </button>
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

            {/* Mobile Search Overlay */}
            {isSearchOpen && (
                <div className="lg:hidden absolute top-auto left-0 w-full bg-white p-4 animate-in slide-in-from-top-2 duration-200 border-b border-border shadow-md z-40">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full bg-surface border border-border rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-primary/20 font-bold text-sm h-[44px]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-light" />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-primary text-xs font-black uppercase tracking-widest">Go</button>
                    </form>
                </div>
            )}

            {/* Mega Menu Dropdown */}
            {activeMegaMenu && (
                <div
                    className="absolute top-full left-0 w-full animate-in fade-in slide-in-from-top-2 duration-200 z-50 pointer-events-none"
                    onMouseLeave={() => setActiveMegaMenu(null)}
                >
                    <div className="container mx-auto px-6 sm:px-6 lg:px-8 pointer-events-auto">
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
                                                href="/discover"
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
                                                    href={`/discover?animal=${encodeURIComponent(type.title)}`}
                                                    onClick={() => setActiveMegaMenu(null)}
                                                    className="group/item flex flex-col items-center gap-3 p-4 rounded-2xl hover:bg-surface transition-all border border-transparent hover:border-border/50"
                                                >
                                                    <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-surface border border-border group-hover/item:border-primary/50 group-hover/item:bg-white transition-all flex items-center justify-center p-3 lg:p-4 shadow-sm group-hover/item:shadow-md">
                                                        <SafeImage src={type.image} alt={type.title} className="w-full h-full object-contain group-hover/item:scale-110 transition-transform duration-300" />
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
                                                href="/brands"
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
                                                    href={`/discover?brand=${encodeURIComponent(brand.name)}`}
                                                    className="group flex flex-col items-center gap-3 p-5 rounded-3xl hover:bg-surface transition-all border border-transparent hover:border-border/50 hover:shadow-premium"
                                                    onClick={() => setActiveMegaMenu(null)}
                                                >
                                                    <div className="w-16 h-16 rounded-2xl bg-white border border-border group-hover:border-primary/30 flex items-center justify-center shrink-0 shadow-sm overflow-hidden relative">
                                                        <SafeImage
                                                            src={brand.logo}
                                                            alt={brand.name}
                                                            className="w-full h-full object-cover transition-all duration-300 rounded-xl"
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
                                className={`py-3 text-base font-semibold transition-all border-b border-dashed border-border/50 ${isActive(item.href) ? "text-primary" : "text-gray-900"}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}

                        {/* Mobile Utility Links */}
                        <div className="py-4 border-b border-dashed border-border/50">
                            <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-4">Pet Services</h4>
                            <div className="grid grid-cols-1 gap-2">
                                {UTILITY_ITEMS.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        target={item.external ? "_blank" : undefined}
                                        rel={item.external ? "noopener noreferrer" : undefined}
                                        className="flex items-center gap-3 p-3 bg-surface rounded-xl text-sm font-bold text-foreground"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        <item.icon className="w-4 h-4 text-primary" />
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="py-4">
                            <h4 className="text-xs font-bold text-muted uppercase tracking-wider mb-4">Categories</h4>
                            <div className="grid grid-cols-2 gap-3">
                                {MEGA_MENU_DATA.petTypes.map(type => (
                                    <Link
                                        key={type.title}
                                        href={`/discover?animal=${encodeURIComponent(type.title)}`}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="p-3 bg-surface rounded-xl text-xs font-semibold text-foreground text-center border border-transparent hover:border-primary/20 transition-all flex flex-col items-center gap-2"
                                    >
                                        <SafeImage src={type.image} alt={type.title} className="w-10 h-10 object-contain" />
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

