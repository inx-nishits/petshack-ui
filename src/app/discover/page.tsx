"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/mock";
import { ProductCard } from "@/components/ui/ProductCard";
import { Logo } from "@/components/ui/Logo";

import { Filter, ChevronDown, Grid, List, Info, Target, Cpu, Clock, MessageSquareText } from "lucide-react";

const MODULE_DATA = {
    module: "PetShack Price Comparison",
    subModule: "Product Discovery & Filtering",
    description: "High-authority price comparison portal for Australian pet owners, enabling multi-retailer price tracking and filtering.",
    estimation: "React: 40h / Python: 60h",
    notes: "Core engine designed for real-time price scrapers and affiliate mapping.",
    clientComments: "Ensure filtering feels snappy and brands are easily searchable."
};

function DiscoverContent() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const searchParams = useSearchParams();

    // Filter states
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "");
    const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState(500);
    const [showModuleInfo, setShowModuleInfo] = useState(true);

    // Sync search query from URL
    useEffect(() => {
        const q = searchParams.get('q');
        if (q) setSearchQuery(q);

        const animal = searchParams.get('animal')?.toLowerCase();
        if (animal) {
            const match = ['Dog', 'Cat', 'Bird', 'Fish', 'Small Pet'].find(a => a.toLowerCase() === animal);
            if (match) setSelectedAnimals([match]);
        }

        const brand = searchParams.get('brand')?.toLowerCase();
        if (brand) {
            const match = ['Royal Canin', 'Hills Science', 'NexGard', 'Black Hawk', 'Advantix'].find(b => b.toLowerCase() === brand);
            if (match) setSelectedBrands([match]);
        }
    }, [searchParams]);

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesAnimal = selectedAnimals.length === 0 || selectedAnimals.includes(product.animalType.charAt(0).toUpperCase() + product.animalType.slice(1));
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
            const matchesPrice = product.bestPrice <= priceRange;

            return matchesSearch && matchesAnimal && matchesCategory && matchesBrand && matchesPrice;
        });
    }, [searchQuery, selectedAnimals, selectedCategories, selectedBrands, priceRange]);

    const toggleFilter = (list: string[], setList: (val: string[]) => void, item: string) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumbs */}
            <nav className="flex text-xs text-muted-light mb-8 gap-2">
                <a href="/" className="hover:text-primary transition-colors font-bold">Home</a>
                <span>/</span>
                <span className="text-muted font-bold">Discover Products (USD)</span>
            </nav>

            {/* Module Definition Info Section (Task 2) */}
            <div className="mb-10 bg-primary/5 border border-primary/20 rounded-3xl p-6 lg:p-8 relative overflow-hidden group">
                <div className="flex flex-col lg:flex-row justify-between gap-8 relative z-10">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <Target className="w-5 h-5 text-primary" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-primary">Module Definition Spec (e3060)</h2>
                        </div>
                        <h3 className="text-2xl font-black mb-2">{MODULE_DATA.module}</h3>
                        <p className="text-sm text-gray-500 font-bold mb-4 flex items-center gap-2">
                            <Cpu className="w-4 h-4" /> Sub-Module: {MODULE_DATA.subModule}
                        </p>
                        <p className="text-gray-600 font-medium leading-relaxed">
                            {MODULE_DATA.description}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex gap-6">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-border">
                            <span className="text-[10px] font-black uppercase text-muted-light block mb-1">Estimation</span>
                            <span className="text-sm font-bold flex items-center gap-2 italic"><Clock className="w-4 h-4 text-primary" /> {MODULE_DATA.estimation}</span>
                        </div>
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-border">
                            <span className="text-[10px] font-black uppercase text-muted-light block mb-1">Client Comments</span>
                            <span className="text-sm font-bold flex items-center gap-2"><MessageSquareText className="w-4 h-4 text-primary" /> {MODULE_DATA.clientComments}</span>
                        </div>
                    </div>
                </div>
                <div className="absolute -right-8 -bottom-8 opacity-5 transform rotate-12 group-hover:scale-110 transition-transform">
                    <Logo className="w-64 h-64" />
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-72 shrink-0 space-y-8">
                    <div className="bg-white border border-border rounded-4xl p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-black text-xl flex items-center gap-2">
                                <Filter className="w-5 h-5" /> Filters
                            </h3>
                            <button
                                onClick={() => {
                                    setSelectedAnimals([]);
                                    setSelectedCategories([]);
                                    setSelectedBrands([]);
                                    setSearchQuery("");
                                    setPriceRange(500);
                                }}
                                className="text-[10px] font-black uppercase text-primary hover:underline"
                            >
                                Clear All
                            </button>
                        </div>

                        <div className="space-y-8">
                            {/* Animal Type */}
                            <div className="border-b border-border pb-8">
                                <h4 className="font-bold mb-5 text-xs uppercase tracking-widest text-muted-light">Target Animal</h4>
                                <div className="space-y-4">
                                    {['Dog', 'Cat', 'Bird', 'Fish', 'Small Pet'].map((item) => (
                                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedAnimals.includes(item)}
                                                onChange={() => toggleFilter(selectedAnimals, setSelectedAnimals, item)}
                                                className="w-5 h-5 rounded-lg border-border text-primary focus:ring-primary/20 cursor-pointer transition-all"
                                            />
                                            <span className={`text-sm font-bold transition-colors ${selectedAnimals.includes(item) ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Category */}
                            <div className="border-b border-border pb-8">
                                <h4 className="font-bold mb-5 text-xs uppercase tracking-widest text-muted-light">Product Category</h4>
                                <div className="space-y-4">
                                    {['Food', 'Treats', 'Healthcare', 'Toys', 'Accessories'].map((item) => (
                                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(item)}
                                                onChange={() => toggleFilter(selectedCategories, setSelectedCategories, item)}
                                                className="w-5 h-5 rounded-lg border-border text-primary focus:ring-primary/20 cursor-pointer transition-all"
                                            />
                                            <span className={`text-sm font-bold transition-colors ${selectedCategories.includes(item) ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Brand */}
                            <div className="border-b border-border pb-8">
                                <h4 className="font-bold mb-5 text-xs uppercase tracking-widest text-muted-light">Featured Brands</h4>
                                <div className="space-y-4">
                                    {['Royal Canin', 'Hills Science', 'NexGard', 'Black Hawk', 'Advantix'].map((item) => (
                                        <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(item)}
                                                onChange={() => toggleFilter(selectedBrands, setSelectedBrands, item)}
                                                className="w-5 h-5 rounded-lg border-border text-primary focus:ring-primary/20 cursor-pointer transition-all"
                                            />
                                            <span className={`text-sm font-bold transition-colors ${selectedBrands.includes(item) ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="pb-4">
                                <div className="flex justify-between items-center mb-5">
                                    <h4 className="font-bold text-xs uppercase tracking-widest text-muted-light">Max Price (USD)</h4>
                                    <span className="text-sm font-black text-primary">${priceRange}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="500"
                                    step="10"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                    className="w-full h-2 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-[10px] font-black text-muted-light mt-4 uppercase">
                                    <span>$0</span>
                                    <span>$500+</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Module Notes (Task 2) */}
                    <div className="bg-surface rounded-4xl p-6 border border-border italic text-xs text-muted-light font-medium leading-relaxed mb-8">
                        <span className="block font-black uppercase tracking-tighter mb-2 text-primary">Developer Notes:</span>
                        "{MODULE_DATA.notes}"
                    </div>


                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 bg-surface p-8 rounded-[2.5rem] border border-border shadow-sm">
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-500 font-bold">
                                Showing <span className="text-primary font-black">{filteredProducts.length}</span> results
                            </span>
                            {searchQuery && (
                                <span className="text-[10px] font-black text-muted-light uppercase tracking-widest">
                                    Filtered by: "{searchQuery}"
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
                            <div className="flex bg-white border border-border rounded-2xl p-1.5 shadow-sm">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-primary'}`}
                                >
                                    <Grid className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2.5 rounded-xl transition-all ${viewMode === 'list' ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-gray-400 hover:text-primary'}`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="relative flex-1 sm:flex-none">
                                <select className="appearance-none bg-white border border-border rounded-xl pl-5 pr-12 py-3.5 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 w-full cursor-pointer shadow-sm hover:border-primary transition-colors">
                                    <option>Featured First</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Top Rated</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length > 0 ? (
                        <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {filteredProducts.map((product, idx) => (
                                <ProductCard key={`${product.id}-${idx}`} product={product} viewMode={viewMode as 'grid' | 'list'} />
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center bg-surface rounded-[3rem] border border-dashed border-border">
                            <Info className="w-12 h-12 text-muted-light mx-auto mb-4" />
                            <h3 className="text-xl font-black mb-2">No matches found</h3>
                            <p className="text-gray-500 font-medium">Try adjusting your filters or search query.</p>
                        </div>
                    )}

                    {/* Pagination */}
                    {filteredProducts.length > 0 && (
                        <div className="mt-20 flex justify-center">
                            <nav className="flex items-center gap-3">
                                <button className="px-8 py-4 border border-border rounded-2xl text-sm font-black hover:bg-surface transition-all disabled:opacity-50 uppercase tracking-widest">Prev</button>
                                {[1, 2].map((page) => (
                                    <button
                                        key={page}
                                        className={`w-14 h-14 rounded-2xl text-sm font-black transition-all ${page === 1 ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' : 'hover:bg-surface text-foreground border border-transparent hover:border-border'}`}
                                    >
                                        {page}
                                    </button>
                                ))}
                                <button className="px-8 py-4 border border-border rounded-2xl text-sm font-black hover:bg-surface transition-all uppercase tracking-widest">Next</button>
                            </nav>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default function DiscoverPage() {
    return (
        <div className="bg-white min-h-screen">
            <Suspense fallback={
                <div className="container mx-auto px-4 py-20 text-center">
                    <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <span className="font-black text-muted-light uppercase tracking-widest">Syncing Products...</span>
                </div>
            }>
                <DiscoverContent />
            </Suspense>
        </div>
    );
}
