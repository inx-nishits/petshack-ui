import { Hero } from "@/components/home/Hero";
import { CategorySlider } from "@/components/home/CategorySlider";
import { HowItWorks } from "@/components/home/HowItWorks";
import { FeaturedDeals } from "@/components/home/FeaturedDeals";
import { Send } from "lucide-react";
import Link from "next/link";

import { BrandCarousel } from "@/components/home/BrandCarousel";
import { ContactForm } from "@/components/home/ContactForm";
import { TrendingProducts } from "@/components/home/TrendingProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { RetailerSlider } from "@/components/home/RetailerSlider";
import { MerchantShowcase } from "@/components/home/MerchantShowcase";


export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />

      {/* Centered Search Bar */}
      <div className="container mx-auto px-4 sm:px-6 -mt-6 sm:-mt-8 lg:-mt-10 relative z-20">
        <form action="#" className="max-w-7xl mx-auto bg-white rounded-full shadow-2xl border border-gray-100 p-1 sm:p-1.5 lg:p-2 flex items-center">
          <div className="pl-3 sm:pl-4 lg:pl-6 text-gray-400 shrink-0">
            <img src="/assets/search-icon.png" className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 opacity-30" alt="Search" />
          </div>
          <input
            name="q"
            type="text"
            placeholder="Search for pet products..."
            className="flex-1 px-2 sm:px-3 lg:px-4 py-2.5 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg focus:outline-none placeholder:text-gray-300 font-medium"
          />
          <button type="submit" className="hidden">Search</button>
        </form>
      </div>

      <WhyChooseUs />

      <RetailerSlider />

      <HowItWorks />

      <CategorySlider />

      <BrandCarousel />

      <div className="hidden">
        <TrendingProducts />
      </div>

      <MerchantShowcase />

      <FeaturedDeals />


      {/* Community CTA */}
      <section className="py-8 sm:py-12 lg:py-16 bg-surface relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center lg:text-left">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 sm:gap-12 lg:gap-16">
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-black mb-4 sm:mb-6 lg:mb-8 text-foreground">Join the PetShack Community</h2>
              <p className="text-gray-600 mb-6 sm:mb-8 lg:mb-10 leading-relaxed text-sm sm:text-base lg:text-lg font-medium">
                From Brissy to Perth, thousands of Aussie pet lovers are already digging up the best bargains and sniffing out hidden savings.
              </p>
              <button className="w-full sm:w-auto bg-foreground text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-2xl font-black text-sm sm:text-base lg:text-lg hover:bg-black transition-preset shadow-xl shadow-black/20 flex items-center justify-center gap-2 mx-auto lg:mx-0 min-h-[44px]">
                Subscribe Now <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src="/assets/promo-community.png"
                className="w-full max-w-[200px] sm:max-w-[280px] lg:max-w-sm h-auto"
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

