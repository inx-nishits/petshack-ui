import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export const Footer = () => {
    return (
        <footer className="bg-surface border-t border-border pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-4 lg:col-span-2">
                        <Logo />
                        <p className="text-muted text-sm leading-relaxed max-w-sm">
                            Australia's leading pet product price comparison platform. We help you find the best prices across 40+ trusted Aussie stores.
                        </p>
                        <p className="text-muted-light text-[10px] font-bold uppercase tracking-widest">
                            ABN: 84669170389
                        </p>
                        <div className="flex items-center gap-4">
                            <Link href="#" className="p-2 bg-white rounded-full border border-border text-muted hover:text-primary transition-colors hover:shadow-sm">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-white rounded-full border border-border text-muted hover:text-primary transition-colors hover:shadow-sm">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2 bg-white rounded-full border border-border text-muted hover:text-primary transition-colors hover:shadow-sm">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-foreground mb-6">Discovery</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="#" className="text-muted hover:text-primary transition-colors">Dog Products</Link></li>
                            <li><Link href="#" className="text-muted hover:text-primary transition-colors">Cat Essentials</Link></li>
                            <li><Link href="#" className="text-muted hover:text-primary transition-colors">Bird Care</Link></li>
                            <li><Link href="#" className="text-muted hover:text-primary transition-colors">Aquatic & Fish</Link></li>
                        </ul>
                    </div>

                    {/* Platform */}
                    <div>
                        <h4 className="font-bold text-foreground mb-6">Platform</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/blog" className="text-muted hover:text-primary transition-colors">Pet Blog</Link></li>
                            <li><Link href="https://membership.petshack.au/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors">Membership</Link></li>
                            <li><Link href="/faqs" className="text-muted hover:text-primary transition-colors">FAQs</Link></li>
                            <li><Link href="https://membership.petshack.au/forpartners" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors">Become a Partner</Link></li>
                            <li><Link href="/about-us" className="text-muted hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-muted hover:text-primary transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-6">
                        <h4 className="font-bold text-foreground">Newsletter</h4>
                        <p className="text-muted text-sm leading-relaxed">
                            Subscribe our newsletter to get our latest update & news
                        </p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full bg-white border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                                required
                            />
                            <button className="bg-primary text-white font-bold py-3 px-6 rounded-xl text-sm hover:bg-primary-dark transition-all shadow-lg shadow-primary/10">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom */}
                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-light text-xs">
                        © 2026 Petshack.au - All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-muted-light">
                        <Link href="/privacy" className="hover:text-primary">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary">Terms of Service</Link>
                        <Link href="/disclaimer" className="hover:text-primary">Data Disclaimer</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
