import { PRODUCTS, RETAILERS } from "@/data/mock";
import { ShieldCheck, ArrowUpRight, Clock, Info, Share2, Heart } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NotifyMeButton } from "@/components/ui/NotifyMeButton";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
    const { id } = await params;
    const product = PRODUCTS.find(p => p.id === id);

    if (!product) {
        notFound();
    }

    const sortedOffers = [...product.offers].sort((a, b) => a.price - b.price);
    const bestOffer = sortedOffers[0];

    // Helper to get retailer name and logo
    const getRetailer = (id: string) => RETAILERS.find(r => r.id === id);

    return (
        <div className="bg-white min-h-screen">
            {/* JSON-LD for SEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": product.name,
                        "image": [product.image],
                        "description": product.description,
                        "sku": product.sku,
                        "brand": {
                            "@type": "Brand",
                            "name": product.brand
                        },
                        "offers": {
                            "@type": "AggregateOffer",
                            "lowPrice": product.bestPrice,
                            "highPrice": Math.max(...product.offers.map(o => o.price)),
                            "priceCurrency": "USD",
                            "offerCount": product.offers.length
                        }
                    })
                }}
            />

            <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8 lg:py-12">
                {/* Breadcrumbs */}
                <nav className="flex text-[10px] sm:text-xs text-muted-light mb-4 sm:mb-6 gap-2">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/discover" className="hover:text-primary transition-colors">Discover</Link>
                    <span>/</span>
                    <span className="text-muted truncate max-w-[150px] sm:max-w-xs">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 lg:gap-16 mb-8 sm:mb-12 lg:mb-16">
                    {/* Product Image */}
                    <div className="space-y-3 sm:space-y-4">
                        <div className="aspect-square rounded-2xl sm:rounded-3xl overflow-hidden border border-border bg-surface relative group">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            <button className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 sm:p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-muted hover:text-red-500 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center">
                                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>
                        <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl sm:rounded-2xl border border-border overflow-hidden bg-surface cursor-pointer hover:border-primary transition-colors shrink-0">
                                    <img src={product.image} className="w-full h-full object-cover opacity-50 hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Overview */}
                    <div className="flex flex-col">
                        <div className="mb-4 sm:mb-6">
                            <span className="inline-block bg-primary/10 text-primary text-[10px] sm:text-xs font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full mb-2 sm:mb-3">
                                {product.brand}
                            </span>
                            <h1 className="text-xl sm:text-3xl md:text-4xl font-black text-foreground mb-2 sm:mb-3 leading-tight">
                                {product.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                                <div className="flex items-center gap-1 text-xs sm:text-sm text-yellow-500">
                                    <span className="text-foreground font-bold mr-1">4.8</span>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map(i => <ShieldCheck key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />)}
                                    </div>
                                    <span className="text-muted-light ml-1 sm:ml-2">(124 reviews)</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted">
                                    <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    Prices updated 2h ago
                                </div>
                            </div>
                        </div>

                        <div className="bg-surface rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-border mb-6 sm:mb-8 lg:mb-10 shadow-sm">
                            <div className="flex items-end justify-between mb-4 sm:mb-6">
                                <div>
                                    <span className="text-xs sm:text-sm text-muted block mb-0.5 sm:mb-1">Lowest price found</span>
                                    <div className="flex items-baseline gap-0.5 sm:gap-1">
                                        <span className="text-lg sm:text-xl font-bold text-primary">$</span>
                                        <span className="text-3xl sm:text-4xl font-black text-primary tracking-tight">
                                            {product.bestPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] sm:text-xs font-bold text-green-600 flex items-center justify-end gap-1 mb-0.5 sm:mb-1">
                                        <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Verified Deal
                                    </span>
                                    <p className="text-[10px] sm:text-xs text-muted-light">At {getRetailer(bestOffer?.retailerId || '')?.name}</p>
                                </div>
                            </div>
                            <button className="w-full bg-accent text-white py-3 sm:py-4 rounded-xl font-bold text-sm sm:text-lg hover:bg-accent-hover transition-preset shadow-lg shadow-accent/20 flex items-center justify-center gap-2 min-h-[44px]">
                                Get This Deal <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                        </div>

                        <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                            <h3 className="font-bold text-sm sm:text-lg border-b border-border pb-2">Quick Attributes</h3>
                            <div className="grid grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-4 sm:gap-x-8">
                                {Object.entries(product.attributes).map(([key, value]) => (
                                    <div key={key}>
                                        <dt className="text-[10px] sm:text-xs text-muted-light uppercase font-bold mb-0.5 sm:mb-1">{key}</dt>
                                        <dd className="text-xs sm:text-sm font-semibold">{value}</dd>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3 sm:gap-4">
                            <button className="flex-1 min-w-[120px] border border-border py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:bg-surface transition-colors min-h-[44px]">
                                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Share
                            </button>
                            <NotifyMeButton productName={product.name} />
                        </div>
                    </div>
                </div>

                {/* Price Comparison Table */}
                <section className="mb-8 sm:mb-12 lg:mb-16">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
                        <h2 className="text-lg sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
                            Price Comparison <span className="text-[10px] sm:text-sm font-normal text-muted bg-surface px-2 sm:px-3 py-1 rounded-full border border-border">{product.offers.length} Sellers</span>
                        </h2>
                        <div className="hidden sm:flex items-center gap-2 text-xs text-muted-light">
                            <Info className="w-4 h-4" /> Prices exclude shipping unless stated
                        </div>
                    </div>

                    {/* Mobile: Card View, Desktop: Table View */}
                    <div className="hidden sm:block overflow-hidden border border-border rounded-3xl shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-surface text-xs font-bold text-muted-light uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Retailer</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {sortedOffers.map((offer, idx) => {
                                    const retailer = getRetailer(offer.retailerId);
                                    const isBest = idx === 0;

                                    return (
                                        <tr key={offer.retailerId} className={`group ${isBest ? 'bg-primary/5' : 'hover:bg-surface'} transition-colors`}>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-white rounded-xl border border-border flex items-center justify-center p-2 group-hover:scale-110 transition-transform shadow-sm">
                                                        <span className="text-[10px] font-black">{retailer?.name.substring(0, 2)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="font-bold text-foreground block">{retailer?.name}</span>
                                                        <span className="text-[10px] text-muted-light tracking-wide uppercase font-bold">Trusted Partner</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <div className={`w-2 h-2 rounded-full ${offer.stockStatus === 'in-stock' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                    <span className="text-sm font-bold capitalize text-muted">{offer.stockStatus.replace('-', ' ')}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col">
                                                    <span className={`text-xl font-black ${isBest ? 'text-primary' : 'text-foreground'}`}>
                                                        ${offer.price.toFixed(2)}
                                                    </span>
                                                    {isBest && <span className="text-[10px] text-primary font-bold uppercase tracking-wide">Best Value</span>}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <Link
                                                    href={offer.url}
                                                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-preset ${isBest
                                                        ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:translate-y-[-2px]'
                                                        : 'bg-white border border-primary text-primary hover:bg-primary hover:text-white'
                                                        }`}
                                                >
                                                    Go to Store <ArrowUpRight className="w-4 h-4" />
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="sm:hidden space-y-3">
                        {sortedOffers.map((offer, idx) => {
                            const retailer = getRetailer(offer.retailerId);
                            const isBest = idx === 0;

                            return (
                                <div key={offer.retailerId} className={`border border-border rounded-2xl p-4 ${isBest ? 'bg-primary/5 border-primary/20 shadow-sm' : 'bg-white shadow-sm'}`}>
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-white rounded-xl border border-border flex items-center justify-center shadow-sm">
                                                <span className="text-[10px] font-black">{retailer?.name.substring(0, 2)}</span>
                                            </div>
                                            <div>
                                                <span className="font-bold text-sm block">{retailer?.name}</span>
                                                <div className="flex items-center gap-1.5 mt-0.5">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${offer.stockStatus === 'in-stock' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                    <span className="text-[10px] font-bold capitalize text-muted">{offer.stockStatus.replace('-', ' ')}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {isBest && <span className="text-[9px] text-primary font-black uppercase bg-white border border-primary/20 px-2 py-1 rounded-full shadow-sm">Best Deal</span>}
                                    </div>
                                    <div className="flex items-end justify-between mt-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-muted font-bold uppercase tracking-wider mb-0.5">Price</span>
                                            <span className={`text-2xl font-black ${isBest ? 'text-primary' : 'text-foreground'}`}>
                                                ${offer.price.toFixed(2)}
                                            </span>
                                        </div>
                                        <Link
                                            href={offer.url}
                                            className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold transition-preset min-h-[44px] ${isBest
                                                ? 'bg-primary text-white shadow-lg shadow-primary/20'
                                                : 'bg-white border border-primary text-primary'
                                                }`}
                                        >
                                            Go to Store <ArrowUpRight className="w-3.5 h-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Product Description */}
                <section className="max-w-4xl">
                    <h2 className="text-lg sm:text-2xl font-bold mb-3 sm:mb-6">Product Information</h2>
                    <div className="prose prose-sm sm:prose-blue text-muted leading-relaxed">
                        <p className="mb-3 sm:mb-4 text-sm sm:text-base">{product.description}</p>
                        <h4 className="font-bold text-foreground mb-2 text-sm sm:text-base">Key Benefits:</h4>
                        <ul className="list-disc pl-5 space-y-1 sm:space-y-2 mb-4 sm:mb-6 text-sm sm:text-base">
                            <li>Formulated for medium breed adult dogs (11-25kg)</li>
                            <li>Supports digestive health and balanced intestinal flora</li>
                            <li>Contains high-quality protein for muscle maintenance</li>
                            <li>Enriched with Omega-3 fatty acids for skin and coat health</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}
