"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, ChevronDown } from "lucide-react";
import ProductCard from "@/components/product/ProductCard";
import products from "@/data/products.json";
import categories from "@/data/categories.json";
import { Product } from "@/types";

const allProducts = products as Product[];

function ShopContent() {
  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category") || "";
  const initialSearch = searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    let result = [...allProducts];

    // SEARCH
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    // CATEGORY (FIX: no unused setter needed)
    if (initialCategory) {
      result = result.filter(
        (p) =>
          p.category.toLowerCase().replace(" ", "-") === initialCategory ||
          p.category ===
            categories.find((c) => c.slug === initialCategory)?.name
      );
    }

    // SORT
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    }

    return result;
  }, [search, sort, initialCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
          Shop All Products
        </h1>
        <p className="text-gray-500 text-sm">
          {filtered.length} products found
        </p>
      </div>

      {/* SEARCH + SORT */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
        </div>

        {/* SORT */}
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

      {/* PRODUCTS */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}






// "use client";

// import { useState, useMemo, Suspense } from "react";
// import { useSearchParams } from "next/navigation";
// import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
// import ProductCard from "@/components/product/ProductCard";
// import products from "@/data/products.json";
// import categories from "@/data/categories.json";
// import { Product } from "@/types";

// type PriceRange = {
//   label: string;
//   min: number;
//   max: number;
// };

// const allProducts = products as Product[];
// // const brands = [...new Set(allProducts.map((p) => p.brand))];

// // const priceRanges: PriceRange[] = [
// //   { label: "All Prices", min: 0, max: Infinity },
// //   { label: "Under $100", min: 0, max: 100 },
// //   { label: "$100 - $500", min: 100, max: 500 },
// //   { label: "$500 - $1000", min: 500, max: 1000 },
// // ];

// function ShopContent() {
//   const searchParams = useSearchParams();
//   const initialCategory = searchParams.get("category") || "";
//   const initialSearch = searchParams.get("search") || "";

//   const [search, setSearch] = useState(initialSearch);
//   const [selectedCategory, setSelectedCategory] = useState(initialCategory);
//   const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

//   const [priceRange, setPriceRange] = useState<PriceRange | null>(null);
//   const [sort, setSort] = useState("newest");
//   const [filterOpen, setFilterOpen] = useState(false);

//   const filtered = useMemo(() => {
//     let result = [...allProducts];

//     if (search) {
//       const q = search.toLowerCase();
//       result = result.filter(
//         (p) =>
//           p.name.toLowerCase().includes(q) ||
//           p.brand.toLowerCase().includes(q)
//       );
//     }

//     if (selectedCategory) {
//       result = result.filter(
//         (p) =>
//           p.category.toLowerCase().replace(" ", "-") === selectedCategory ||
//           p.category ===
//             categories.find((c) => c.slug === selectedCategory)?.name
//       );
//     }

//     if (selectedBrands.length > 0) {
//       result = result.filter((p) => selectedBrands.includes(p.brand));
//     }

//     if (priceRange) {
//       result = result.filter(
//         (p) => p.price >= priceRange.min && p.price <= priceRange.max
//       );
//     }

//     switch (sort) {
//       case "price-asc":
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case "price-desc":
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case "rating":
//         result.sort((a, b) => b.rating - a.rating);
//         break;
//       case "popular":
//         result.sort((a, b) => b.reviewCount - a.reviewCount);
//         break;
//       default:
//         result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
//     }

//     return result;
//   }, [search, selectedCategory, selectedBrands, priceRange, sort]);

//   // const toggleBrand = (brand: string) => {
//   //   setSelectedBrands((prev) =>
//   //     prev.includes(brand)
//   //       ? prev.filter((b) => b !== brand)
//   //       : [...prev, brand]
//   //   );
//   // };

//   // const clearFilters = () => {
//   //   setSearch("");
//   //   setSelectedCategory("");
//   //   setSelectedBrands([]);
//   //   setPriceRange(null);
//   //   setSort("newest");
//   // };

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
//           Shop All Products
//         </h1>
//         <p className="text-gray-500 text-sm">
//           {filtered.length} products found
//         </p>
//       </div>

//       {/* Search & Sort */}
//       <div className="flex flex-col sm:flex-row gap-3 mb-6">
//         <div className="flex-1 relative">
//           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
//           <input
//             type="text"
//             placeholder="Search products..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           {search && (
//             <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
//               <X className="w-4 h-4 text-gray-400" />
//             </button>
//           )}
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={() => setFilterOpen(!filterOpen)}
//             className="lg:hidden flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50"
//           >
//             <SlidersHorizontal className="w-4 h-4" />
//             Filters
//           </button>

//           <div className="relative">
//             <select
//               value={sort}
//               onChange={(e) => setSort(e.target.value)}
//               className="appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
//             >
//               <option value="newest">Newest First</option>
//               <option value="popular">Most Popular</option>
//               <option value="price-asc">Price: Low to High</option>
//               <option value="price-desc">Price: High to Low</option>
//               <option value="rating">Highest Rated</option>
//             </select>

//             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//           </div>
//         </div>
//       </div>

//       {/* Products */}
//       <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
//         {filtered.map((p) => (
//           <ProductCard key={p.id} product={p} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function ShopPage() {
//   return (
//     <Suspense
//       fallback={
//         <div className="flex items-center justify-center py-20">
//           <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//         </div>
//       }
//     >
//       <ShopContent />
//     </Suspense>
//   );
// }