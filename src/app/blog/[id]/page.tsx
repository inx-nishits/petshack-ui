import { BLOG_POSTS } from "@/data/mock";
import { Clock, User, ArrowLeft, Facebook, Twitter, Link2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SafeImage } from "@/components/ui/SafeImage";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function BlogDetailPage({ params }: PageProps) {
    const { id } = await params;
    const post = BLOG_POSTS.find(p => p.id === id);

    if (!post) {
        notFound();
    }

    const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3);

    return (
        <div className="bg-white min-h-screen">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">
                <Link href="/blog" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-muted hover:text-primary mb-6 sm:mb-10 transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Back to Blog
                </Link>

                <article className="max-w-4xl mx-auto">
                    <header className="mb-8 sm:mb-12">
                        <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-6 flex-wrap">
                            <span className="bg-primary/5 text-primary text-[10px] sm:text-xs font-black px-2 sm:px-3 py-1 rounded-full uppercase tracking-widest">
                                {post.tags[0]}
                            </span>
                            <span className="text-muted-light hidden sm:inline">·</span>
                            <span className="text-[10px] sm:text-sm text-muted font-medium flex items-center gap-1.5">
                                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> {post.date}
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-4 sm:mb-8 leading-[1.1] tracking-tight">
                            {post.title}
                        </h1>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0 py-4 sm:py-6 border-y border-border">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-surface border border-border flex items-center justify-center shrink-0">
                                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-muted" />
                                </div>
                                <div>
                                    <span className="font-bold block tracking-tight text-sm sm:text-base">{post.author}</span>
                                    <span className="text-[10px] sm:text-xs text-muted font-medium uppercase tracking-wide">Verified Expert</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto">
                                <button className="p-2 sm:p-2.5 rounded-full border border-border hover:bg-surface transition-colors min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center">
                                    <Facebook className="w-4 h-4" />
                                </button>
                                <button className="p-2 sm:p-2.5 rounded-full border border-border hover:bg-surface transition-colors min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center">
                                    <Twitter className="w-4 h-4" />
                                </button>
                                <button className="p-2 sm:p-2.5 rounded-full border border-border hover:bg-surface transition-colors min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center">
                                    <Link2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </header>



                    <div className="aspect-video sm:aspect-21/9 rounded-xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-12 border border-border shadow-sm bg-surface">
                        <SafeImage src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="prose prose-sm sm:prose-lg prose-blue max-w-none text-muted leading-relaxed mb-12 sm:mb-16 whitespace-pre-wrap">
                        <p className="text-base sm:text-xl text-foreground font-medium mb-6 sm:mb-10 leading-relaxed italic border-l-4 border-primary pl-4 sm:pl-8 py-1 sm:py-2">
                            {post.excerpt}
                        </p>

                        <p className="mb-6 sm:mb-8 text-sm sm:text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>

                        <h2 className="text-xl sm:text-3xl font-black text-foreground mt-8 sm:mt-12 mb-4 sm:mb-6">Understanding the Basics</h2>
                        <p className="mb-6 sm:mb-8 text-sm sm:text-lg">
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>

                        <div className="bg-surface border border-border rounded-xl sm:rounded-2xl p-5 sm:p-8 my-8 sm:my-12 shadow-sm">
                            <h3 className="text-base sm:text-xl font-bold text-foreground mb-3 sm:mb-4">Key Takeaways:</h3>
                            <ul className="list-disc pl-4 sm:pl-6 space-y-2 sm:space-y-3 font-semibold text-foreground text-xs sm:text-base">
                                <li>Prioritize whole ingredients over fillers like corn or soy.</li>
                                <li>Check for specific animal protein sources as the first ingredient.</li>
                                <li>Consult with your veterinarian for breed-specific requirements.</li>
                                <li>Monitor your pet's energy levels and coat health after switching foods.</li>
                            </ul>
                        </div>

                        <p className="mb-6 sm:mb-8 text-sm sm:text-lg">
                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                    </div>

                    <footer className="bg-surface border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center mb-12 sm:mb-16">
                        <h3 className="text-lg sm:text-2xl font-black mb-3 sm:mb-4">Found this advice helpful?</h3>
                        <p className="text-xs sm:text-base text-muted mb-6 sm:mb-8 max-w-md mx-auto">
                            Sign up for our newsletter to get weekly expert tips and the best price alerts for your pets.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-grow px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-border focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all min-h-[44px] text-sm sm:text-base"
                            />
                            <button className="bg-primary text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-preset min-h-[44px] text-sm sm:text-base">
                                Join
                            </button>
                        </div>
                    </footer>

                    {/* More from Author/PetShack */}
                    <div className="border-t border-border pt-12 sm:pt-16 pb-8">
                        <h3 className="text-xl sm:text-2xl font-black mb-6 sm:mb-8 flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <User className="w-4 h-4" />
                            </span>
                            More from PetShack
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {relatedPosts.map((relatedPost) => (
                                <Link key={relatedPost.id} href={`/blog/${relatedPost.id}`} className="group block h-full flex flex-col">
                                    <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-100 border border-border relative">
                                        <SafeImage
                                            src={relatedPost.image}
                                            alt={relatedPost.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <span className="bg-black/30 backdrop-blur-md text-white text-[9px] font-black px-2 py-1 rounded-full uppercase tracking-widest">
                                                {relatedPost.tags[0]}
                                            </span>
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight mb-2 text-lg">
                                        {relatedPost.title}
                                    </h4>
                                    <div className="mt-auto flex items-center gap-2 text-xs font-bold text-muted-light uppercase tracking-widest">
                                        <Clock className="w-3 h-3" /> {relatedPost.date}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </article>
            </div>
        </div>
    );
}
