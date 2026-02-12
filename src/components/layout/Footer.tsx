import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export const Footer = () => {
    return (
        <footer className="bg-surface border-t border-border pt-16 pb-8">
            <div className="container mx-auto px-6 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section - Span 2 columns for better balance */}
                    <div className="space-y-6 md:col-span-2 lg:col-span-1 border-b md:border-b-0 border-border pb-8 md:pb-0">
                        <Logo />
                        <p className="text-muted text-sm leading-relaxed max-w-sm">
                            Australia's leading pet product price comparison platform. We help you find the best prices across 40+ trusted Aussie stores.
                        </p>
                        <p className="text-muted-light text-[10px] font-bold uppercase tracking-widest block pt-2">
                            ABN: 84669170389
                        </p>
                        <div className="flex items-center gap-4 pt-2">
                            <Link href="#" className="p-2.5 bg-white rounded-full border border-border text-muted hover:text-primary transition-colors hover:shadow-sm">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2.5 bg-white rounded-full border border-border text-muted hover:text-primary transition-colors hover:shadow-sm">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="p-2.5 bg-white rounded-full border border-border text-muted hover:text-primary transition-colors hover:shadow-sm">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Discovery Column */}
                    <div>
                        <h4 className="font-black text-foreground uppercase tracking-widest text-xs mb-8">Discovery</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="#" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Dog Products</Link></li>
                            <li><Link href="#" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Cat Essentials</Link></li>
                            <li><Link href="#" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Bird Care</Link></li>
                            <li><Link href="#" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Aquatic & Fish</Link></li>
                            <li><Link href="#" className="text-muted hover:text-primary transition-colors flex items-center gap-2">Small Animals</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h4 className="font-black text-foreground uppercase tracking-widest text-xs mb-8">Company</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="/about-us" className="text-muted hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/blog" className="text-muted hover:text-primary transition-colors">Pet Blog</Link></li>
                            <li><Link href="/faqs" className="text-muted hover:text-primary transition-colors">FAQs</Link></li>
                            <li><Link href="/contact" className="text-muted hover:text-primary transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h4 className="font-black text-foreground uppercase tracking-widest text-xs mb-8">Resources</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            <li><Link href="https://membership.petshack.au/" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors">Membership</Link></li>
                            <li><Link href="https://membership.petshack.au/forpartners" target="_blank" rel="noopener noreferrer" className="text-muted hover:text-primary transition-colors">Become a Partner</Link></li>
                            <li><Link href="/privacy" className="text-muted hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-muted hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/disclaimer" className="text-muted hover:text-primary transition-colors">Data Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-muted-light text-xs">
                        © 2026 Petshack.au - All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-muted-light">
                        <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
                        <Link href="/disclaimer" className="hover:text-primary transition-colors">Data Disclaimer</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};
