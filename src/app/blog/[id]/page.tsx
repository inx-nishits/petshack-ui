import { BLOG_POSTS } from "@/data/mock";
import { Clock, User, ArrowLeft, Facebook, Twitter, Link2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { id } = await params;
    const post = BLOG_POSTS.find(p => p.id === id);

    if (!post) {
        notFound();
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-6 py-12 lg:py-16">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-muted hover:text-primary mb-12 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back to Blog
                </Link>

                <article className="max-w-4xl mx-auto">
                    <header className="mb-12">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="bg-primary/5 text-primary text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                {post.category}
                            </span>
                            <span className="text-muted-light">·</span>
                            <span className="text-sm text-muted font-medium">{post.date}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-foreground mb-10 leading-[1.1]">
                            {post.title}
                        </h1>
                        <div className="flex items-center justify-between py-8 border-y border-border">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center">
                                    <User className="w-6 h-6 text-muted" />
                                </div>
                                <div>
                                    <span className="font-bold block tracking-tight">{post.author}</span>
                                    <span className="text-xs text-muted font-medium">Verified Expert</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button className="p-2.5 rounded-full border border-border hover:bg-surface transition-colors">
                                    <Facebook className="w-4 h-4" />
                                </button>
                                <button className="p-2.5 rounded-full border border-border hover:bg-surface transition-colors">
                                    <Twitter className="w-4 h-4" />
                                </button>
                                <button className="p-2.5 rounded-full border border-border hover:bg-surface transition-colors">
                                    <Link2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </header>

                    <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-16 border border-border shadow-sm">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="prose prose-lg prose-blue max-w-none text-muted leading-relaxed mb-20 whitespace-pre-wrap">
                        <p className="text-xl text-foreground font-medium mb-12 leading-relaxed italic border-l-4 border-primary pl-10 py-2">
                            {post.excerpt}
                        </p>

                        <p className="mb-8">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>

                        <h2 className="text-3xl font-black text-foreground mt-16 mb-8">Understanding the Basics</h2>
                        <p className="mb-8">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <div className="bg-surface border border-border rounded-2xl p-8 my-16 shadow-sm">
                            <h3 className="text-xl font-bold text-foreground mb-4">Key Takeaways:</h3>
                            <ul className="list-disc pl-6 space-y-3 font-semibold text-foreground">
                                <li>Prioritize whole ingredients over fillers like corn or soy.</li>
                                <li>Check for specific animal protein sources as the first ingredient.</li>
                                <li>Consult with your veterinarian for breed-specific requirements.</li>
                                <li>Monitor your pet's energy levels and coat health after switching foods.</li>
                            </ul>
                        </div>

                        <p className="mb-8">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                    </div>

                    <footer className="bg-surface border border-border rounded-3xl p-12 text-center">
                        <h3 className="text-2xl font-black mb-4">Found this advice helpful?</h3>
                        <p className="text-muted mb-8 max-w-md mx-auto">
                            Sign up for our newsletter to get weekly expert tips and the best price alerts for your pets.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow px-6 py-4 rounded-xl border border-border focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                            />
                            <button className="bg-primary text-white px-10 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-preset">
                                Join
                            </button>
                        </div>
                    </footer>
                </article>
            </div>
        </div>
    );
}
