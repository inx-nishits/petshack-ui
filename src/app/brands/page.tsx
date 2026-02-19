import { PRODUCTS } from "@/data/mock";
import Link from "next/link";
import { Search } from "lucide-react";

export default function BrandsPage() {
    const brands = [
        "Royal Canin", "NexGard", "Black Hawk", "Hills Science Diet", "Bravecto", "Advantix",
        "Advance", "Ivory Coat", "Meals for Mutts", "Supercoat", "Feliway", "Frontline",
        "SavourLife", "Vetafarm", "Kong", "Chuckit!", "Adaptil", "Apoquel"
    ];

    return (
        <div className="bg-white min-h-screen">
            <div className="bg-surface py-8 sm:py-12 lg:py-16 border-b border-border">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-4 sm:mb-6">Explore Top Pet Brands</h1>
                    <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto px-2">
                        Search and compare prices for thousands of products from Australia's most trusted manufacturers.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-10">
                {/* Brand Search */}
                <div className="max-w-2xl mx-auto mb-10 sm:mb-16 relative">
                    <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-muted-light w-4 h-4 sm:w-5 sm:h-5" />
                    <input
                        type="text"
                        placeholder="Search for a brand..."
                        className="w-full pl-12 sm:pl-16 pr-4 sm:pr-6 py-3 sm:py-5 rounded-xl sm:rounded-2xl bg-white border border-border shadow-soft focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-base sm:text-lg min-h-[44px]"
                    />
                </div>

                {/* Popular Brands Grid */}
                <h2 className="text-xl sm:text-2xl font-black mb-6 sm:mb-10">Popular Brands</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 mb-12 sm:mb-20">
                    {brands.map((brand) => (
                        <Link
                            key={brand}
                            href="#"
                            className="aspect-square bg-white border border-border rounded-xl sm:rounded-2xl flex flex-col items-center justify-center p-4 sm:p-8 transition-preset hover:shadow-premium hover:-translate-y-1 group"
                        >
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-surface rounded-full flex items-center justify-center mb-3 sm:mb-4 transition-colors group-hover:bg-primary/5">
                                <span className="text-xl sm:text-2xl font-black text-muted-light group-hover:text-primary">{brand[0]}</span>
                            </div>
                            <span className="text-xs sm:text-sm font-bold text-center text-foreground group-hover:text-primary transition-colors">{brand}</span>
                        </Link>
                    ))}
                </div>

                {/* Alphabetic Index (Mock) */}
                <div className="bg-surface rounded-2xl sm:rounded-4xl p-6 sm:p-12 border border-border">
                    <h3 className="text-lg sm:text-xl font-bold mb-6 sm:mb-10">All Brands A-Z</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-6 sm:gap-y-10 gap-x-4">
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map(char => (
                            <div key={char}>
                                <h4 className="text-xl sm:text-2xl font-black text-primary mb-3 sm:mb-6">{char}</h4>
                                <ul className="space-y-2 sm:space-y-3">
                                    {[1, 2, 3, 4].map(idx => (
                                        <li key={idx}>
                                            <Link href="#" className="text-xs sm:text-sm text-muted hover:text-primary transition-colors font-medium block py-1">
                                                {char} Brand Example {idx}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

