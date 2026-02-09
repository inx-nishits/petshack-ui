import { PRODUCTS } from "@/data/mock";
import { ProductCard } from "../ui/ProductCard";
import Link from "next/link";

export const FeaturedDeals = () => {
    return (
        <section className="py-[60px] lg:py-20 bg-surface">
            <div className="container mx-auto px-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 mb-12">
                    <div>
                        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">Today's Best Price Drops</h2>
                        <p className="text-muted font-medium text-sm lg:text-base">Hand-picked deals from verified Australian retailers.</p>
                    </div>
                    <Link href="#" className="w-full sm:w-auto bg-white border border-border px-8 py-3 rounded-full text-[11px] lg:text-sm font-black shadow-sm hover:shadow-premium transition-all uppercase tracking-widest text-center whitespace-nowrap">
                        Browse All Deals
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PRODUCTS.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    {/* Add more items if list is short, but ensure unique keys */}
                    {PRODUCTS.map((product) => (
                        <ProductCard key={`${product.id}-alt`} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};
