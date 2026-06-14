"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import products from "@/data/products.json";
import categories from "@/data/categories.json";
import { Product } from "@/types";

const allProducts = products as Product[];
const brands = [...new Set(allProducts.map((p) => p.brand))];
const priceRanges = [
  { label: "Under $100", min: 0, max: 100 },
  { label: "$100 – $500", min: 100, max: 500 },
  { label: "$500 – $1000", min: 500, max: 1000 },
  { label: "Over $1000", min: 1000, max: Infinity },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [sort, setSort] = useState("newest");
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = [...allProducts];
    if (search) result = result.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
    if (selectedCategory) result = result.filter((p) => p.category.toLowerCase().replace(" ", "-") === selectedCategory || p.category === categories.find((c) => c.slug === selectedCategory)?.name);
    if (selectedBrands.length > 0) result = result.filter((p) => selectedBrands.includes(p.brand));
    if (priceRange) result = result.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max);
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "popular": result.sort((a, b) => b.reviewCount - a.reviewCount); break;
      default: result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }
    return result;
  }, [search, selectedCategory, selectedBrands, priceRange, sort]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSelectedBrands([]);
    setPriceRange(null);
    setSort("newest");
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
        <div className="space-y-1.5">
          <button onClick={() => setSelectedCategory("")} className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${!selectedCategory ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
            All Categories
          </button>
          {categories.map((cat) => (
            <button key={cat.id} onClick={() => setSelectedCategory(cat.slug)} className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${selectedCategory === cat.slug ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
              {cat.name}
              <span className="text-xs text-gray-400">{cat.productCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Brand</h3>
        <div className="space-y-1.5">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm text-gray-600">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
        <div className="space-y-1.5">
          <button onClick={() => setPriceRange(null)} className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${!priceRange ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
            All Prices
          </button>
          {priceRanges.map((range) => (
            <button key={range.label} onClick={() => setPriceRange(range)} className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${priceRange?.label === range.label ? "bg-blue-50 text-blue-600 font-medium" : "text-gray-600 hover:bg-gray-50"}`}>
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <button onClick={clearFilters} className="w-full py-2 text-sm text-red-500 hover:text-red-600 font-medium border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Shop All Products</h1>
        <p className="text-gray-500 text-sm">{filtered.length} products found</p>
      </div>

      {/* Search & Sort bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>
        <div className="flex gap-3">
          <button onClick={() => setFilterOpen(!filterOpen)} className="lg:hidden flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="popular">Most Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
            <h2 className="font-bold text-gray-900 mb-5">Filters</h2>
            <FilterPanel />
          </div>
        </aside>

        {/* Mobile Filters */}
        {filterOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setFilterOpen(false)} />
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-white p-5 overflow-y-auto">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-gray-900">Filters</h2>
                <button onClick={() => setFilterOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <FilterPanel />
            </div>
          </div>
        )}

        {/* Products */}
        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-500 text-sm mb-4">Try adjusting your filters or search term.</p>
              <button onClick={clearFilters} className="text-blue-600 font-medium text-sm hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>}>
      <ShopContent />
    </Suspense>
  );
}
