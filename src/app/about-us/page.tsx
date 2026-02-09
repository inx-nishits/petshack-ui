"use client";

import { Info, Target, Eye, BookOpen, Mail, Users, Heart, ShieldCheck, ArrowRight, MessageSquare, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AboutUsPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumbs */}
            <div className="bg-surface border-b border-border py-4">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-light">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-muted">About Us</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section - Using Theme Primary #14A79D */}
            <section className="py-[60px] lg:py-36 relative overflow-hidden bg-primary">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 border border-white/30">
                            <Sparkles className="w-4 h-4" /> Welcome To PetShack
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.95] text-white">
                            FETCH THE<br />BEST PRICES—<span className="opacity-60">FAST.</span>
                        </h1>
                        <p className="text-xl md:text-3xl text-white/90 font-bold leading-relaxed max-w-4xl mx-auto">
                            The no-fuss Aussie platform where pet lovers find their best mates for the lowest prices.
                        </p>
                    </div>
                </div>

                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary-dark rounded-full blur-3xl" />
                </div>
            </section>

            {/* Main Content Sections */}
            <main className="relative z-20 -mt-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Intro Block - Floating Card */}
                    <div className="bg-white rounded-[3rem] p-12 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] mb-24 border border-border">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div className="space-y-8">
                                <p className="text-2xl md:text-3xl font-black text-foreground leading-[1.2] tracking-tight">
                                    PetShack is your <span className="text-primary italic">best mate</span> for finding the lowest prices on pet products and services in Australia.
                                </p>
                                <p className="text-muted text-lg font-medium leading-relaxed">
                                    Our Aussie community of thousands helps you save money and time by letting you compare prices on furry treats, grooming services, pet sitters, and practically everything else pets need.
                                </p>
                                <Link href="/contact" className="inline-flex items-center gap-3 bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/30">
                                    <Mail className="w-5 h-5" /> Contact Us Anytime
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="rounded-[2.5rem] overflow-hidden bg-surface aspect-square">
                                    <img
                                        src="https://petshack.au/_next/static/media/about-us-img1.bdb36d40.png"
                                        alt="Who are we"
                                        className="w-full h-full object-contain p-8 transform hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Who We Are - Clean & Professional */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
                        <div className="order-2 lg:order-1 relative">
                            <div className="aspect-4/5 rounded-[3.5rem] overflow-hidden shadow-2xl bg-surface border-12 border-white ring-1 ring-border">
                                <img
                                    src="https://petshack.au/_next/static/media/about-us-img2.a8bb481a.png"
                                    alt="Smart pack of Aussies"
                                    className="w-full h-full object-contain p-10"
                                />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[11px] mb-6 bg-primary/5 px-4 py-1.5 rounded-full">
                                <Users className="w-4 h-4" /> Who are we?
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-none tracking-tighter text-foreground">
                                A smart pack of Aussie bargain-hunting pet lovers
                            </h2>
                            <div className="space-y-6 text-muted text-xl font-medium leading-relaxed">
                                <p>
                                    At the heart of PetShack is a pack of pet lovers backed by clever techies who know how to sniff out a smarter way to shop. We’re a proudly independent, Aussie-run team helping fellow pet parents score the best deals from trusted local stores.
                                </p>
                                <p className="text-foreground font-black border-l-4 border-primary pl-6">
                                    We’re not here to try to sell you anything; we’re here to help you shop smarter.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Mission & Vision - Theme Grids */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                        {/* Mission */}
                        <div className="bg-primary/5 rounded-[4rem] p-12 md:p-16 text-foreground group overflow-hidden relative border border-primary/10">
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-primary rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:scale-110 transition-all duration-500 shadow-lg shadow-primary/20">
                                    <Target className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-4xl font-black mb-8 tracking-tighter">Our Mission</h3>
                                <p className="text-muted text-lg font-medium leading-relaxed mb-12">
                                    To help Aussie pet lovers shop smart and save big. We want to make pet parenting more affordable, convenient, and fun for all Aussies.
                                </p>
                                <div className="rounded-4xl bg-white p-6 shadow-sm border border-border">
                                    <img
                                        src="https://petshack.au/_next/static/media/about-us-img3.7b570e55.png"
                                        alt="Mission"
                                        className="w-full h-auto object-contain max-h-[200px]"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Vision */}
                        <div className="bg-foreground rounded-[4rem] p-12 md:p-16 text-white group overflow-hidden relative">
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-white/20 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                                    <Eye className="w-8 h-8 text-white group-hover:text-foreground transition-colors" />
                                </div>
                                <h3 className="text-4xl font-black mb-8 tracking-tighter">Our Vision</h3>
                                <p className="text-white/80 text-lg font-medium leading-relaxed mb-12">
                                    A world where pet care is smarter, cheaper, and wag-worthy. We envision scoring the best deals is as easy as a belly rub.
                                </p>
                                <div className="rounded-4xl bg-white/10 p-6 backdrop-blur-sm border border-white/10">
                                    <img
                                        src="https://petshack.au/_next/static/media/about-us-img4.70bdee3c.png"
                                        alt="Vision"
                                        className="w-full h-auto object-contain max-h-[200px]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Story - Clean Editorial Section */}
                    <div className="bg-surface rounded-[4rem] p-12 md:p-24 mb-32 relative overflow-hidden border border-border">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                            <div>
                                <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[11px] mb-6 bg-primary/10 px-4 py-1.5 rounded-full">
                                    <BookOpen className="w-4 h-4" /> Our Story
                                </div>
                                <h2 className="text-4xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.9] text-foreground">
                                    How it all<br /><span className="text-primary italic">started.</span>
                                </h2>
                                <div className="space-y-8 text-muted text-xl md:text-2xl font-medium leading-relaxed">
                                    <p>
                                        Like many Aussie pet lovers, we found ourselves infinitely hopping between sites, trying to find the best price for food, meds, and essentials.
                                    </p>
                                    <p>
                                        With dozens of Aussie retail pet stores out there, this endless site-hopping was a constant source of frustration. That’s when it hit us—why isn’t there a simple tool that shows it all in one place?
                                    </p>
                                </div>
                            </div>
                            <div className="relative">
                                <img
                                    src="https://petshack.au/_next/static/media/about-us-img5.86a031ed.png"
                                    alt="Story"
                                    className="w-full h-auto"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Need Help? - Integrated UI */}
                    <div className="mb-32">
                        <div className="bg-white rounded-[3.5rem] p-12 md:p-20 shadow-2xl border border-border flex flex-col lg:flex-row items-center gap-16 text-center lg:text-left relative overflow-hidden group">
                            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                                <MessageSquare className="w-12 h-12 text-primary" />
                            </div>
                            <div className="flex-1 space-y-6">
                                <h2 className="text-4xl font-black tracking-tight text-foreground">Need Help?</h2>
                                <p className="text-muted text-xl font-medium leading-relaxed">
                                    Got a question or need a hand? The PetShack team is always here to help you hunt for deals or navigate the platform.
                                </p>
                                <Link href="/contact" className="inline-flex items-center gap-4 bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg hover:shadow-2xl hover:bg-primary-dark transition-all">
                                    Get In Touch <ArrowRight className="w-6 h-6" />
                                </Link>
                            </div>
                            <div className="hidden lg:block">
                                <img
                                    src="https://petshack.au/_next/static/media/about-us-img6.4d71bc38.png"
                                    alt="Help"
                                    className="w-48 h-auto"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Final CTA - High Energy Theme */}
            <section className="py-[60px] lg:py-32 bg-primary relative overflow-hidden rounded-t-[5rem]">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 text-white font-black uppercase tracking-widest text-[10px] mb-8 bg-white/20 px-6 py-2 rounded-full border border-white/30 backdrop-blur-md">
                        Join The PetShack Community
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black text-white mb-10 tracking-tighter leading-tight">
                        READY TO BE PART<br />OF THE <span className="opacity-60 text-white">PACK?</span>
                    </h2>
                    <p className="text-white/80 text-xl font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
                        Sign up and be part of our growing PetShack Pack. Get early bird perks, promo codes, and first access to our upcoming membership program.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <Link
                            href="/signup"
                            className="w-full sm:w-auto bg-white text-primary px-14 py-6 rounded-2xl font-black text-xl hover:bg-surface transition-all shadow-2xl shadow-black/10 hover:-translate-y-1"
                        >
                            Join Free Today
                        </Link>
                    </div>
                </div>

                {/* Decorative blobs */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-white/10 rounded-full blur-[150px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary-dark/50 rounded-full blur-[150px] translate-y-1/2" />
            </section>

            {/* Footer Support */}
            <div className="container mx-auto px-4 py-16 text-center">
                <p className="text-muted font-black text-sm tracking-widest uppercase mb-8 opacity-40">
                    Trusted by thousands of Aussie pet parents
                </p>
                <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
                    <span className="font-black text-2xl">PETBARN</span>
                    <span className="font-black text-2xl">PETSTOCK</span>
                    <span className="font-black text-2xl">PET CIRCLE</span>
                    <span className="font-black text-2xl">BUDGET PET</span>
                </div>
            </div>
        </div>
    );
}
