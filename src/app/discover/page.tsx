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
    const [showSortDropdown, setShowSortDropdown] = useState(false);

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

    const itemsPerPage = 10;
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
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-10">
            {/* Breadcrumbs */}
            <nav className="flex text-[10px] sm:text-xs text-muted-light mb-6 sm:mb-8 gap-2">
                <a href="/" className="hover:text-primary transition-colors font-bold">Home</a>
                <span>/</span>
                <span className="text-muted font-bold">Discover Products</span>
            </nav>



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
                <aside className={`w-full lg:w-64 shrink-0 space-y-4 sm:space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                    <div className="bg-white border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4 sm:mb-5">
                            <h3 className="font-black text-base sm:text-lg flex items-center gap-2">
                                <Filter className="w-4 h-4" /> Filters
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

                        <div className="space-y-4 sm:space-y-5">
                            {/* 1. Pet Type (Target Animal) */}
                            <div className="border-b border-border pb-3 sm:pb-4">
                                <h4 className="font-bold mb-2 sm:mb-3 text-[10px] uppercase tracking-widest text-muted-light">Pet Type</h4>
                                <div className="space-y-1.5 sm:space-y-2">
                                    {['Dog', 'Cat', 'Bird', 'Fish', 'Small Pet', 'Reptile'].map((item) => (
                                        <label key={item} className="flex items-center gap-2 cursor-pointer group min-h-[24px]">
                                            <input
                                                type="checkbox"
                                                checked={selectedAnimals.includes(item)}
                                                onChange={() => toggleFilter(selectedAnimals, setSelectedAnimals, item)}
                                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer transition-all"
                                            />
                                            <span className={`text-xs font-bold transition-colors ${selectedAnimals.includes(item) ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* 2. Brand (New) */}
                            <div className="border-b border-border pb-3 sm:pb-4">
                                <h4 className="font-bold mb-2 sm:mb-3 text-[10px] uppercase tracking-widest text-muted-light">Brand</h4>
                                <div className="space-y-1.5 sm:space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                    {Array.from(new Set(PRODUCTS.map(p => p.brand))).sort().map((brand) => (
                                        <label key={brand} className="flex items-center gap-2 cursor-pointer group min-h-[24px]">
                                            <input
                                                type="checkbox"
                                                checked={selectedBrands.includes(brand)}
                                                onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer transition-all"
                                            />
                                            <span className={`text-xs font-bold transition-colors ${selectedBrands.includes(brand) ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>{brand}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* 3. Category (New) */}
                            <div className="border-b border-border pb-3 sm:pb-4">
                                <h4 className="font-bold mb-2 sm:mb-3 text-[10px] uppercase tracking-widest text-muted-light">Category</h4>
                                <div className="space-y-1.5 sm:space-y-2 max-h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                    {Array.from(new Set(PRODUCTS.map(p => p.category))).sort().map((cat) => (
                                        <label key={cat} className="flex items-center gap-2 cursor-pointer group min-h-[24px]">
                                            <input
                                                type="checkbox"
                                                checked={selectedCategories.includes(cat)}
                                                onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer transition-all"
                                            />
                                            <span className={`text-xs font-bold transition-colors ${selectedCategories.includes(cat) ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>{cat}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* 4. Age Group (Life Stage) */}
                            <div className="border-b border-border pb-3 sm:pb-4">
                                <h4 className="font-bold mb-2 sm:mb-3 text-[10px] uppercase tracking-widest text-muted-light">Age Group</h4>
                                <div className="space-y-1.5 sm:space-y-2">
                                    {['Puppy', 'Adult', 'Senior', 'Kitten', 'All Ages'].map((item) => (
                                        <label key={item} className="flex items-center gap-2 cursor-pointer group min-h-[24px]">
                                            <input
                                                type="checkbox"
                                                checked={selectedLifeStages.includes(item)}
                                                onChange={() => toggleFilter(selectedLifeStages, setSelectedLifeStages, item)}
                                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer transition-all"
                                            />
                                            <span className={`text-xs font-bold transition-colors ${selectedLifeStages.includes(item) ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>{item}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* 5. Pet Shop (Pet Stores) */}
                            <div className="border-b border-border pb-3 sm:pb-4">
                                <h4 className="font-bold mb-2 sm:mb-3 text-[10px] uppercase tracking-widest text-muted-light">Pet Shop</h4>
                                <div className="space-y-1.5 sm:space-y-2">
                                    {RETAILERS.map((retailer) => (
                                        <label key={retailer.id} className="flex items-center gap-2 cursor-pointer group min-h-[24px]">
                                            <input
                                                type="checkbox"
                                                checked={selectedStores.includes(retailer.id)}
                                                onChange={() => toggleFilter(selectedStores, setSelectedStores, retailer.id)}
                                                className="w-4 h-4 rounded border-border text-primary focus:ring-primary/20 cursor-pointer transition-all"
                                            />
                                            <span className={`text-xs font-bold transition-colors ${selectedStores.includes(retailer.id) ? 'text-primary' : 'text-gray-500 group-hover:text-primary'}`}>{retailer.name}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* 6. Price Range */}
                            <div className="pb-2">
                                <div className="flex justify-between items-center mb-2 sm:mb-3">
                                    <h4 className="font-bold text-[10px] uppercase tracking-widest text-muted-light">Max Price</h4>
                                    <span className="text-xs font-black text-primary">${priceRange}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="500"
                                    step="10"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-surface rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-[9px] font-black text-muted-light mt-2 uppercase">
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

                            <div className="relative flex-1 sm:flex-none min-w-[200px]">
                                <button
                                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                                    className="w-full appearance-none bg-white border border-border rounded-xl px-4 py-3 text-xs sm:text-sm font-bold focus:outline-none focus:ring-4 focus:ring-primary/10 cursor-pointer shadow-sm hover:border-primary transition-colors min-h-[44px] text-left flex items-center justify-between group"
                                    type="button"
                                >
                                    <span className="truncate mr-2">{sortOption}</span>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-primary transition-transform duration-200 ${showSortDropdown ? 'rotate-180' : ''}`} />
                                </button>

                                {showSortDropdown && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40 bg-transparent"
                                            onClick={() => setShowSortDropdown(false)}
                                        />
                                        <div className="absolute top-full right-0 mt-2 w-full bg-white border border-border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                            <div className="py-1">
                                                {["Best Match", "Price: Low to High", "Price: High to Low", "Last Price Update"].map((option) => (
                                                    <button
                                                        key={option}
                                                        className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-bold transition-colors ${sortOption === option
                                                            ? 'bg-primary text-white'
                                                            : 'text-foreground hover:bg-surface hover:text-primary'
                                                            }`}
                                                        onClick={() => {
                                                            setSortOption(option);
                                                            setShowSortDropdown(false);
                                                        }}
                                                        type="button"
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}
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

                    {/* Pagination - Dynamic with Ellipsis */}
                    {filteredAndSortedProducts.length > itemsPerPage && (
                        <div className="mt-12 sm:mt-20 flex flex-col items-center gap-6">
                            <nav className="flex items-center gap-2 sm:gap-3">
                                <button
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="px-6 py-3 sm:px-8 sm:py-4 border border-border rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-black hover:bg-surface transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest min-h-[44px]"
                                >
                                    Prev
                                </button>

                                {(() => {
                                    const pages = [];
                                    const padding = 2; // Show 2 pages on each side of current

                                    if (totalPages <= 8) {
                                        for (let i = 1; i <= totalPages; i++) pages.push(i);
                                    } else {
                                        // Always show first page
                                        pages.push(1);

                                        const start = Math.max(2, currentPage - padding);
                                        const end = Math.min(totalPages - 1, currentPage + padding);

                                        if (start > 2) pages.push('...');

                                        for (let i = start; i <= end; i++) {
                                            if (!pages.includes(i)) pages.push(i);
                                        }

                                        if (end < totalPages - 1) pages.push('...');

                                        // Always show last page
                                        if (!pages.includes(totalPages)) pages.push(totalPages);
                                    }

                                    return pages.map((page, idx) => (
                                        typeof page === 'number' ? (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentPage(page)}
                                                className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-black transition-all flex items-center justify-center ${page === currentPage ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-110' : 'hover:bg-surface text-foreground border border-transparent hover:border-border'}`}
                                            >
                                                {page}
                                            </button>
                                        ) : (
                                            <span key={idx} className="w-8 text-center text-muted font-black tracking-widest flex items-center justify-center">...</span>
                                        )
                                    ));
                                })()}

                                <button
                                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="px-6 py-3 sm:px-8 sm:py-4 border border-border rounded-xl sm:rounded-2xl text-[10px] sm:text-sm font-black hover:bg-surface transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest min-h-[44px]"
                                >
                                    Next
                                </button>
                            </nav>

                            <div className="text-[10px] sm:text-xs font-black text-muted-light uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full border border-border/50 shadow-sm animate-pulse-slow">
                                Note: Prices last updated yesterday at 15:03 AEST
                            </div>
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

