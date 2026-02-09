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
            <div className="bg-surface py-20 border-b border-border">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-foreground mb-6">Explore Top Pet Brands</h1>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Search and compare prices for thousands of products from Australia's most trusted manufacturers.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16">
                {/* Brand Search */}
                <div className="max-w-2xl mx-auto mb-16 relative">
                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-light w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search for a brand..."
                        className="w-full pl-16 pr-6 py-5 rounded-2xl bg-white border border-border shadow-soft focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all font-medium text-lg"
                    />
                </div>

                {/* Popular Brands Grid */}
                <h2 className="text-2xl font-black mb-10">Popular Brands</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-20">
                    {brands.map((brand) => (
                        <Link
                            key={brand}
                            href={`/discover?brand=${brand.toLowerCase().replace(' ', '-')}`}
                            className="aspect-square bg-white border border-border rounded-3xl flex flex-col items-center justify-center p-8 transition-preset hover:shadow-premium hover:-translate-y-1 group"
                        >
                            <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mb-4 transition-colors group-hover:bg-primary/5">
                                <span className="text-2xl font-black text-muted-light group-hover:text-primary">{brand[0]}</span>
                            </div>
                            <span className="text-sm font-bold text-center text-foreground group-hover:text-primary transition-colors">{brand}</span>
                        </Link>
                    ))}
                </div>

                {/* Alphabetic Index (Mock) */}
                <div className="bg-surface rounded-[2rem] p-12 border border-border">
                    <h3 className="text-xl font-bold mb-10">All Brands A-Z</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-y-10">
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'].map(char => (
                            <div key={char}>
                                <h4 className="text-2xl font-black text-primary mb-6">{char}</h4>
                                <ul className="space-y-3">
                                    {[1, 2, 3, 4].map(idx => (
                                        <li key={idx}>
                                            <Link href="/discover" className="text-sm text-muted hover:text-primary transition-colors font-medium">
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
