"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "@/context/StoreContext";

export default function WishlistPage() {
  const { wishlist, toggleWishlist, addToCart } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-2">
          <Heart className="w-10 h-10 text-red-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">Your Wishlist is Empty</h1>
        <p className="text-gray-500 text-sm text-center max-w-sm">Save products you love to your wishlist and come back later.</p>
        <Link href="/shop" className="flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-3.5 rounded-full hover:bg-blue-700 transition-all mt-2">
          Browse Products <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">My Wishlist</h1>
          <p className="text-gray-500 text-sm mt-1">{wishlist.length} saved item{wishlist.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {wishlist.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden group shadow-sm hover:shadow-lg transition-all">
            <div className="relative aspect-square bg-gray-50">
              <Link href={`/product/${product.id}`}>
                <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </Link>
              <button onClick={() => toggleWishlist(product)} className="absolute top-3 right-3 w-9 h-9 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <p className="text-xs text-blue-600 font-semibold mb-1">{product.brand}</p>
              <Link href={`/product/${product.id}`}>
                <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2">{product.name}</h3>
              </Link>
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-gray-900">${product.price.toLocaleString()}</span>
                {product.originalPrice > product.price && (
                  <span className="text-sm text-gray-400 line-through">${product.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <button
                onClick={() => addToCart(product)}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-xl text-sm transition-all active:scale-95"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
