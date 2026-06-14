import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import HeroSlider from "@/components/sections/HeroSlider";
import FeaturedCategories from "@/components/sections/FeaturedCategories";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import BrandShowcase from "@/components/sections/BrandShowcase";
import ProductCard from "@/components/product/ProductCard";
import products from "@/data/products.json";
import { Product } from "@/types";

const allProducts = products as Product[];
const trending = allProducts.filter((p) => p.isTrending).slice(0, 4);
const newArrivals = allProducts.filter((p) => p.isNew).slice(0, 4);
const bestSellers = allProducts.filter((p) => p.isBestSeller).slice(0, 4);

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <HeroSlider />

      {/* Categories */}
      <FeaturedCategories />

      {/* Trending Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-1">Hot Right Now</p>
              <h2 className="text-3xl font-extrabold text-gray-900">Trending Products</h2>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {trending.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link href="/shop" className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="relative h-72 md:h-80 overflow-hidden mx-4 md:mx-8 lg:mx-16 rounded-3xl my-4">
        <Image
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80"
          alt="Summer Tech Sale"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-700/70" />
        <div className="absolute inset-0 flex items-center px-8 md:px-16">
          <div>
            <span className="inline-block bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
              Limited Time
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-2">Summer Tech Sale</h2>
            <p className="text-blue-100 text-lg mb-6">Up to 40% Off on Premium Electronics</p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-7 py-3 rounded-full hover:bg-blue-50 transition-all"
            >
              Shop The Sale <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-1">Fresh Stock</p>
              <h2 className="text-3xl font-extrabold text-gray-900">New Arrivals</h2>
            </div>
            <Link href="/shop?filter=new" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
              See All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {newArrivals.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs />

      {/* Best Sellers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-1">Top Picks</p>
              <h2 className="text-3xl font-extrabold text-gray-900">Best Sellers</h2>
            </div>
            <Link href="/shop?sort=popular" className="hidden sm:flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Brands */}
      <BrandShowcase />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Newsletter */}
      <NewsletterSection />

      {/* Final CTA */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
            Upgrade Your <span className="gradient-text">Digital Lifestyle</span>
          </h2>
          <p className="text-gray-500 text-lg mb-8">
            Discover the latest technology at Nexus Electronic. Premium gadgets, unbeatable prices.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-10 py-4 rounded-full hover:bg-blue-700 transition-all hover:scale-105 shadow-lg shadow-blue-200"
          >
            Shop Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
