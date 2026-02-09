"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, Search, Mail, MessageSquareText, Sparkles } from "lucide-react";
import Link from "next/link";

const FAQS = [
    {
        question: "What is PetShack?",
        answer: "PetShack is a dedicated price comparison platform for pet lovers across Australia. It helps users find the best prices on pet products from a range of trusted retail stores in the country. We don't sell products directly; we help you find where they're cheapest."
    },
    {
        question: "Why should I use PetShack?",
        answer: "Shopping for pet products can be expensive and time-consuming. PetShack simplifies this process by comparing prices from official pet stores in one place, helping users save money and time with every purchase."
    },
    {
        question: "How do I use PetShack?",
        answer: "It's simple! 1) Type the brand or product into the search bar. 2) Browse the results to see the best prices offered by various retailers. 3) Once you find the best deal, click the 'Go to Store' link to complete your purchase on the retailer's official website."
    },
    {
        question: "Does PetShack sell any pet products?",
        answer: "No, PetShack does not sell any products. We are strictly a price comparison tool that connects users to the best deals across various Australian retailers."
    },
    {
        question: "Does PetShack deliver products?",
        answer: "No, delivery is handled by the retail store you choose to purchase from. Each retailer has their own shipping policies and delivery times."
    },
    {
        question: "How much does it cost to use PetShack?",
        answer: "PetShack is 100% free for all pet owners! Our goal is to make pet care more affordable for everyone in Australia."
    },
    {
        question: "What if there's an issue with a product I purchased?",
        answer: "Since PetShack is a comparison tool and not a retailer, all product-related issues (returns, refunds, damages) should be directed to the customer service of the store where you completed the purchase."
    },
    {
        question: "Why can't I find a specific product?",
        answer: "If a product doesn't appear, try checking the spelling or browsing by category. We are constantly adding new retailers and products, but if something is missing, feel free to contact us!"
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredFaqs = FAQS.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-primary/5 py-[60px] lg:py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                        <HelpCircle className="w-4 h-4" /> Help Center
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
                        Frequently Asked <span className="text-primary">Questions</span>
                    </h1>
                    <p className="text-muted font-medium text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
                        Everything you need to know about the PetShack platform and how to start saving on your pet essentials.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="Search for questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white border border-border rounded-2xl pl-16 pr-8 py-5 text-sm font-bold shadow-xl shadow-black/5 focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                        />
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-[60px] lg:py-24">
                <div className="container mx-auto px-4 max-w-3xl">
                    {filteredFaqs.length > 0 ? (
                        <div className="space-y-4">
                            {filteredFaqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className={`border border-border rounded-3xl transition-all duration-300 ${openIndex === index ? 'bg-surface border-primary/20 shadow-lg shadow-black/5' : 'bg-white hover:bg-surface'}`}
                                >
                                    <button
                                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                        className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 cursor-pointer"
                                    >
                                        <span className="font-black text-lg md:text-xl text-foreground leading-tight">{faq.question}</span>
                                        <div className={`p-2 rounded-full transition-all ${openIndex === index ? 'bg-primary text-white rotate-180' : 'bg-surface text-muted group-hover:bg-primary/10'}`}>
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </button>

                                    {openIndex === index && (
                                        <div className="px-6 md:px-8 pb-8 animate-in fade-in slide-in-from-top-4 duration-300">
                                            <p className="text-muted text-base md:text-lg font-medium leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-surface rounded-[3rem] border border-dashed border-border">
                            <Sparkles className="w-12 h-12 text-muted-light mx-auto mb-4" />
                            <h3 className="text-xl font-black mb-2">No matching questions found</h3>
                            <p className="text-gray-500 font-medium">Try different keywords or contact our support team.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Contact Section */}
            <section className="py-[60px] lg:py-24 bg-surface/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-black mb-12">Still have questions?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-10 rounded-[2.5rem] border border-border shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                <Mail className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-black mb-4">Email Support</h3>
                            <p className="text-muted font-medium mb-8 leading-relaxed">
                                Our support team typically responds within 24 hours.
                            </p>
                            <Link href="/contact" className="text-primary font-black hover:underline underline-offset-4 cursor-pointer">
                                support@petshack.au
                            </Link>
                        </div>

                        <div className="bg-white p-10 rounded-[2.5rem] border border-border shadow-sm flex flex-col items-center text-center group hover:shadow-xl transition-all">
                            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                                <MessageSquareText className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-black mb-4">Leave Feedback</h3>
                            <p className="text-muted font-medium mb-8 leading-relaxed">
                                Help us improve by sharing your thoughts or reporting issues.
                            </p>
                            <Link href="/feedback" className="text-primary font-black hover:underline underline-offset-4 cursor-pointer">
                                Open Feedback Form
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
