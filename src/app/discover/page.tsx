"use client";

import { useState, useEffect, Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PRODUCTS, RETAILERS } from "@/data/mock";
import { ProductCard } from "@/components/ui/ProductCard";
import { Filter, ChevronDown, Grid, List, Info, Target, Cpu } from "lucide-react";

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
    const router = useRouter();

    // Filter states
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || "");
    const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    // SOW Requirement: Retailer Filter
    const [selectedStores, setSelectedStores] = useState<string[]>([]);
    // SOW Requirement: Life Stage Filter
    const [selectedLifeStages, setSelectedLifeStages] = useState<string[]>([]);

    const [priceRange, setPriceRange] = useState(500);
    const [sortOption, setSortOption] = useState("Best Match");
    const [showFilters, setShowFilters] = useState(false);

    // Sync search query from URL on load
    // Sync search query from URL on load
    useEffect(() => {
        const q = searchParams.get('q');
        if (q) setSearchQuery(q);

        const animalParam = searchParams.get('animal');
        if (animalParam) {
            const animals = animalParam.split(',').map(a => {
                // Try to find matching case from known list, otherwise capitalize
                const known = ['Dog', 'Cat', 'Bird', 'Fish', 'Small Pet', 'Reptile'].find(k => k.toLowerCase() === a.trim().toLowerCase());
                return known || (a.trim().charAt(0).toUpperCase() + a.trim().slice(1));
            });
            setSelectedAnimals(animals);
        }

        const brandParam = searchParams.get('brand');
        if (brandParam) {
            setSelectedBrands(brandParam.split(','));
        }

        const storeParam = searchParams.get('store');
        if (storeParam) {
            setSelectedStores(storeParam.split(','));
        }

        const lifeStageParam = searchParams.get('lifestage');
        if (lifeStageParam) {
            setSelectedLifeStages(lifeStageParam.split(','));
        }

        const sortParam = searchParams.get('sort');
        if (sortParam) {
            setSortOption(sortParam);
        }
    }, [searchParams]);

    // Update URL when filters change (Basic implementation)
    // Update URL when filters change
    useEffect(() => {
        const params = new URLSearchParams();
        if (searchQuery) params.set('q', searchQuery);

        if (selectedAnimals.length > 0) params.set('animal', selectedAnimals.join(','));
        if (selectedBrands.length > 0) params.set('brand', selectedBrands.join(','));
        if (selectedStores.length > 0) params.set('store', selectedStores.join(','));
        if (selectedLifeStages.length > 0) params.set('lifestage', selectedLifeStages.join(','));

        if (sortOption && sortOption !== "Best Match") params.set('sort', sortOption);

        // Update URL
        const newUrl = `/discover?${params.toString()}`;
        // window.history.replaceState(null, '', newUrl); // Native replacement to avoid re-render loop if router.replace causes issues
        router.replace(newUrl, { scroll: false });

    }, [searchQuery, selectedAnimals, selectedBrands, selectedStores, selectedLifeStages, sortOption, router]);

    const filteredAndSortedProducts = useMemo(() => {
        let result = PRODUCTS.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase());

            // Normalize for comparison
            const productAnimal = product.animalType.toLowerCase();
            const matchesAnimal = selectedAnimals.length === 0 || selectedAnimals.some(a => a.toLowerCase() === productAnimal);

            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);

            // SOW Requirement: Filter by Retailer (Store)
            // Check if ANY offer matches one of the selected stores
            const matchesStore = selectedStores.length === 0 || product.offers.some(offer => selectedStores.includes(offer.retailerId));

            // SOW Requirement: Filter by Life Stage
            const matchesLifeStage = selectedLifeStages.length === 0 || selectedLifeStages.includes(product.lifeStage);

            const matchesPrice = product.bestPrice <= priceRange;

            return matchesSearch && matchesAnimal && matchesCategory && matchesBrand && matchesPrice && matchesStore && matchesLifeStage;
        });

        // Sorting Logic
        if (sortOption === "Price: Low to High") {
            result.sort((a, b) => a.bestPrice - b.bestPrice);
        } else if (sortOption === "Price: High to Low") {
            result.sort((a, b) => b.bestPrice - a.bestPrice);
        } else if (sortOption === "Last Price Update") {
            // SOW Requirement: Sort by Last Updated
            // Logic: Find the most recent update in offers for each product
            const getLastUpdate = (p: typeof PRODUCTS[0]) => {
                if (!p.offers.length) return 0;
                const dates = p.offers.map(o => new Date(o.lastUpdated).getTime());
                return Math.max(...dates);
            };
            result.sort((a, b) => getLastUpdate(b) - getLastUpdate(a)); // Descending (Newest first)
        }

        return result;
    }, [searchQuery, selectedAnimals, selectedCategories, selectedBrands, selectedStores, selectedLifeStages, priceRange, sortOption]);

    const toggleFilter = (list: string[], setList: (val: string[]) => void, item: string) => {
        if (list.includes(item)) {
            setList(list.filter(i => i !== item));
        } else {
            setList([...list, item]);
        }
    };

    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedAnimals, selectedCategories, selectedBrands, selectedStores, selectedLifeStages, priceRange, sortOption]);

    const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
    const paginatedProducts = filteredAndSortedProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16">
            {/* Breadcrumbs */}
            <nav className="flex text-[10px] sm:text-xs text-muted-light mb-6 sm:mb-8 gap-2">
                <a href="/" className="hover:text-primary transition-colors font-bold">Home</a>
                <span>/</span>
                <span className="text-muted font-bold">Discover Products (USD)</span>
            </nav>

            {/* Module Definition Info Section (Task 2) */}
            <div className="mb-8 sm:mb-10 bg-primary/5 border border-primary/20 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 relative overflow-hidden group">
                <div className="flex flex-col lg:flex-row justify-between gap-6 sm:gap-8 relative z-10">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                            <h2 className="text-xs sm:text-sm font-black uppercase tracking-widest text-primary">Module Definition Spec (e3060)</h2>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-black mb-2">{MODULE_DATA.module}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 font-bold mb-3 sm:mb-4 flex items-center gap-2">
                            <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Sub-Module: {MODULE_DATA.subModule}
                        </p>
                        <p className="text-gray-600 font-medium leading-relaxed text-sm">
                            {MODULE_DATA.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
                {/* Mobile Filter Toggle */}
                <button
                    className="lg:hidden w-full bg-white border border-border rounded-xl p-4 flex items-center justify-between font-bold text-foreground shadow-sm mb-4"
                    onClick={() => setShowFilters(!showFilters)}
                >
                    <span className="flex items-center gap-2"><Filter className="w-5 h-5 text-primary" /> Filters</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>

                {/* Sidebar Filters */}
                <aside className={`w-full lg:w-72 shrink-0 space-y-6 sm:space-y-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    <div className="bg-white border border-border rounded-2xl sm:rounded-4xl p-6 sm:p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-6 sm:mb-8">
                            <h3 className="font-black text-lg sm:text-xl flex items-center gap-2">
                                <Filter className="w-4 h-4 sm:w-5 sm:h-5" /> Filters
                            </h3>
                            <button
                                onClick={() => {
                                    setSelectedAnimals([]);
                                    setSelectedCategories([]);
                                    setSelectedBrands([]);
                                    setSelectedStores([]);
                                    setSelectedLifeStages([]);
                                    setSearchQuery("");
                                    setPriceRange(500);
                                }}
                                className="text-[10px] font-black uppercase text-primary hover:underline tap-target"
                            >
                                Clear All
                            </button>
                        </div>

                        <div className="space-y-6 sm:space-y-8">
                            {/* Pet Stores (SOW Req) */}
                            <div className="border-b border-border pb-6 sm:pb-8">
                                <h4 className="font-bold mb-4 sm:mb-5 text-[10px] sm:text-xs uppercase tracking-widest text-muted-light">Pet Stores</h4>
                                <div className="space-y-3 sm:space-y-4">
                                    {RETAILERS.map((retailer) => (
                                        <label key={retailer.id} className="flex items-center gap-3 cursor-pointer group min-h-[32px]">
                                            <input
                                                type="checkbox"
                                                checked={selectedStores.includes(retailer.id)}
                                                onChange={() => toggleFilter(selectedStores, setSelectedStores, retailer.id)}
                                                className="w-5 h-5 rounded-lg border-border text-primary focus:ring-primary/20 cursor-pointer transition-all"
                                            />
                                            <span className={`text-sm font-bold transition-colors ${selectedStores.includes(retailer.id) ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>{retailer.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Life Stage (SOW Req) */}
                            <div className="border-b border-border pb-6 sm:pb-8">
                                <h4 className="font-bold mb-4 sm:mb-5 text-[10px] sm:text-xs uppercase tracking-widest text-muted-light">Life Stage</h4>
                                <div className="space-y-3 sm:space-y-4">
                                    {['Puppy', 'Adult', 'Senior', 'Kitten', 'All Ages'].map((item) => (
                                        <label key={item} className="flex items-center gap-3 cursor-pointer group min-h-[32px]">
                                            <input
                                                type="checkbox"
                                                checked={selectedLifeStages.includes(item)}
                                                onChange={() => toggleFilter(selectedLifeStages, setSelectedLifeStages, item)}
                                                className="w-5 h-5 rounded-lg border-border text-primary focus:ring-primary/20 cursor-pointer transition-all"
                                            />
                                            <span className={`text-sm font-bold transition-colors ${selectedLifeStages.includes(item) ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Animal Type */}
                            <div className="border-b border-border pb-6 sm:pb-8">
                                <h4 className="font-bold mb-4 sm:mb-5 text-[10px] sm:text-xs uppercase tracking-widest text-muted-light">Target Animal</h4>
                                <div className="space-y-3 sm:space-y-4">
                                    {['Dog', 'Cat', 'Bird', 'Fish', 'Small Pet', 'Reptile'].map((item) => (
                                        <label key={item} className="flex items-center gap-3 cursor-pointer group min-h-[32px]">
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

                            {/* Price Range */}
                            <div className="pb-4">
                                <div className="flex justify-between items-center mb-4 sm:mb-5">
                                    <h4 className="font-bold text-[10px] sm:text-xs uppercase tracking-widest text-muted-light">Max Price (USD)</h4>
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
                                <div className="flex justify-between text-[10px] font-black text-muted-light mt-3 sm:mt-4 uppercase">
                                    <span>$0</span>
                                    <span>$500+</span>
                                </div>
                            </div>
                        </div>
                    </div>


                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {/* Toolbar */}
                    <div className="flex flex-col sm:flex-row justify-between items-end gap-4 mb-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-lg sm:text-xl font-black text-foreground tracking-tight">
                                Showing <span className="text-primary">{filteredAndSortedProducts.length}</span> results
                            </span>
                            {searchQuery && (
                                <span className="text-[10px] font-bold text-muted-light uppercase tracking-widest">
                                    Filtered by: "{searchQuery}"
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                            <div />

                            <div className="relative flex-1 sm:flex-none">
                                <select
                                    className="appearance-none bg-white border border-border rounded-xl pl-4 pr-10 py-3 text-xs sm:text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 w-full cursor-pointer shadow-sm hover:border-primary transition-colors min-h-[44px]"
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                >
                                    <option>Best Match</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    {/* SOW Requirement */}
                                    <option>Last Price Update</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {paginatedProducts.length > 0 ? (
                        <div className="grid gap-4 grid-cols-1">
                            {paginatedProducts.map((product, idx) => (
                                <ProductCard key={`${product.id}-${idx}`} product={product} viewMode="list" />
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 sm:py-20 text-center bg-surface rounded-2xl sm:rounded-[3rem] border border-dashed border-border" role="alert">
                            <Info className="w-10 h-10 sm:w-12 sm:h-12 text-muted-light mx-auto mb-3 sm:mb-4" />
                            <h3 className="text-lg sm:text-xl font-black mb-1 sm:mb-2">No matches found</h3>
                            <p className="text-sm font-bold text-gray-500">Try adjusting your filters or search query.</p>
                        </div>
                    )}

                    {/* Pagination - Static for Mock */}
                    {filteredAndSortedProducts.length > itemsPerPage && (
                        <div className="mt-12 sm:mt-20 flex justify-center">
                            <nav className="flex items-center gap-2 sm:gap-3">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-6 py-3 sm:px-8 sm:py-4 border border-border rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-black hover:bg-surface transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest min-h-[44px]"
                                >
                                    Prev
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-black transition-all flex items-center justify-center ${page === currentPage ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' : 'hover:bg-surface text-foreground border border-transparent hover:border-border'}`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-6 py-3 sm:px-8 sm:py-4 border border-border rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-black hover:bg-surface transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest min-h-[44px]"
                                >
                                    Next
                                </button>
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
                <div className="container mx-auto px-6 py-20 text-center">
                    <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <span className="font-black text-muted-light uppercase tracking-widest">Syncing Products...</span>
                </div>
            }>
                <DiscoverContent />
            </Suspense>
        </div>
    );
}

