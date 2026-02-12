"use client";

import Image from "next/image";
import { BLOG_POSTS } from "@/data/mock";
import Link from "next/link";
import { Clock, User, ChevronRight, Search, Sparkles, Filter, Calendar, BookOpen } from "lucide-react";

export default function BlogListingPage() {
    return (
        <div className="bg-white min-h-screen">
            {/* Breadcrumbs */}
            <div className="bg-surface border-b border-border py-4">
                <div className="container mx-auto px-6 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-muted-light">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight className="w-3 h-3" />
                        <span className="text-muted">Pet Blog</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section - Brand Primary */}
            <section className="py-12 lg:py-16 relative overflow-hidden bg-primary">
                <div className="container mx-auto px-6 sm:px-6 lg:px-8 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-8 border border-white/30">
                        <Sparkles className="w-4 h-4" /> The PetShack Advice
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black mb-10 tracking-tighter leading-[0.95] text-white">
                        SMART PET<br />INSIGHTS.
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-bold leading-relaxed max-w-2xl mx-auto">
                        Your Aussie source for saving big on pet care, from nutrition tips to price-comparison secrets.
                    </p>
                </div>

                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-primary-dark rounded-full blur-3xl" />
                </div>
            </section>

            {/* Search & Filter Bar */}
            <div className="relative z-30 -mt-10">
                <div className="container mx-auto px-6 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-border p-4 flex flex-col md:flex-row gap-4 items-center">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-light" />
                            <input
                                type="text"
                                placeholder="Search articles, tips, or guides..."
                                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 font-medium"
                            />
                        </div>
                        <div className="flex gap-4 w-full md:w-auto">
                            <button className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 bg-surface text-foreground px-8 py-4 rounded-2xl font-bold hover:bg-gray-100 transition-colors border border-border">
                                <Filter className="w-4 h-4" /> Filter
                            </button>
                            <button className="flex-1 md:flex-none bg-primary text-white px-10 py-4 rounded-2xl font-black hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="container mx-auto px-6 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-black tracking-tight">Latest News</h2>
                    <div className="h-px flex-1 bg-border mx-8 hidden lg:block" />
                    <div className="flex gap-2">
                        <span className="text-sm font-bold text-muted uppercase tracking-widest">Showing {BLOG_POSTS.length} Articles</span>
                    </div>
                </div>

                {BLOG_POSTS.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {BLOG_POSTS.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.id}`}
                                className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden border border-border transition-all hover:-translate-y-2 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)]"
                            >
                                <div className="w-full h-[250px] overflow-hidden bg-gray-50 border-b border-border relative">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }}
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="text-[10px] font-black text-white px-4 py-2 bg-black/30 backdrop-blur-md rounded-full uppercase tracking-widest">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-10 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs font-bold text-muted-light mb-6 uppercase tracking-widest">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-4 h-4" /> {post.date}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" /> 5 Min Read
                                        </div>
                                    </div>
                                    <h2 className="text-2xl font-black text-foreground mb-6 leading-[1.2] group-hover:text-primary transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-muted text-lg font-medium line-clamp-3 mb-10 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="mt-auto pt-8 border-t border-border flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                                                <User className="w-5 h-5 text-primary" />
                                            </div>
                                            <span className="text-sm font-black text-foreground">{post.author}</span>
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-surface border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all">
                                            <ChevronRight className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-surface rounded-[4rem] border border-dashed border-border">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
                            <BookOpen className="w-10 h-10 text-muted-light" />
                        </div>
                        <h3 className="text-2xl font-black mb-4">No Latest News!</h3>
                        <p className="text-muted font-medium max-w-sm mx-auto">
                            We're currently digging up some fresh content for you. Check back soon for the latest pet insights.
                        </p>
                    </div>
                )}
            </div>

            {/* Newsletter CTA - Consistent with Brand */}
            <section className="pb-12 lg:pb-16">
                <div className="container mx-auto px-6 sm:px-6 lg:px-8">
                    <div className="bg-[#0F172A] rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
                        <div className="relative z-10 max-w-3xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">Stay paw-sitively updated.</h2>
                            <p className="text-white/60 text-lg md:text-xl font-medium mb-12 leading-relaxed">
                                Subscribe to our newsletter to get our latest updates, price comparison guides, and exclusive news delivered straight to your inbox.
                            </p>
                            <form className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 text-lg"
                                />
                                <button className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-primary-dark transition-all shadow-xl shadow-primary/20">
                                    Subscribe Now
                                </button>
                            </form>
                        </div>
                        {/* Highlights */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
                    </div>
                </div>
            </section>
        </div>
    );
}

