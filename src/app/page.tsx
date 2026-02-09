import { Hero } from "@/components/home/Hero";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedDeals } from "@/components/home/FeaturedDeals";
import { Send } from "lucide-react";
import Link from "next/link";

import { BrandCarousel } from "@/components/home/BrandCarousel";
import { ContactForm } from "@/components/home/ContactForm";
import { TrendingProducts } from "@/components/home/TrendingProducts";


export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* Centered Search Bar */}
      <div className="container mx-auto px-4 -mt-8 lg:-mt-10 relative z-20">
        <form action="#" className="max-w-7xl mx-auto bg-white rounded-full shadow-2xl border border-gray-100 p-1.5 lg:p-2 flex items-center">
          <div className="pl-4 lg:pl-6 text-gray-400 shrink-0">
            <img src="/assets/search-icon.png" className="w-5 h-5 lg:w-6 lg:h-6 opacity-30" alt="Search" />
          </div>
          <input
            name="q"
            type="text"
            placeholder="Search for pet products..."
            className="flex-1 px-3 lg:px-4 py-3 lg:py-4 text-sm lg:text-lg focus:outline-none placeholder:text-gray-300 font-medium"
          />
          <button type="submit" className="hidden">Search</button>
        </form>
      </div>

      <HowItWorks />

      <CategoryGrid />

      <BrandCarousel />

      <TrendingProducts />

      <FeaturedDeals />


      {/* Community CTA */}
      <section className="py-[60px] lg:py-24 bg-surface relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-16">
            <div>
              <h2 className="text-2xl lg:text-4xl font-black mb-6 lg:mb-8 text-foreground">Join the PetShack Community</h2>
              <p className="text-gray-600 mb-8 lg:mb-10 leading-relaxed text-base lg:text-lg font-medium">
                From Brissy to Perth, thousands of Aussie pet lovers are already digging up the best bargains and sniffing out hidden savings.
              </p>
              <button className="bg-foreground text-white px-8 lg:px-10 py-4 lg:py-5 rounded-2xl font-black text-base lg:text-lg hover:bg-black transition-preset shadow-xl shadow-black/20 flex items-center gap-2 mx-auto lg:mx-0">
                Subscribe Now <Send className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src="/assets/promo-community.png"
                className="w-full max-w-[280px] lg:max-w-sm h-auto"
                alt="Community"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Contact Form */}
      <ContactForm />
    </div>
  );
}
