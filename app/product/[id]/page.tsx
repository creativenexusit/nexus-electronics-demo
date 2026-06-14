"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  Heart,
  ShoppingCart,
  Check,
  Package,
  Shield,
  RotateCcw,
} from "lucide-react";

import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/product/ProductCard";
import products from "@/data/products.json";
import { Product } from "@/types";

const allProducts = products as Product[];

export default function ProductPage() {
  const params = useParams();

  // ✅ SAFE PARAM HANDLING (Next.js 15 compatible)
  const productId = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id ?? "";

  const product = allProducts.find((p) => p.id === productId);

  const { addToCart, toggleWishlist, isInWishlist, isInCart } =
    useStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // ❌ Not found UI
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-5xl">😕</p>
        <h1 className="text-2xl font-bold text-gray-900">
          Product not found
        </h1>
        <Link
          href="/shop"
          className="text-blue-600 font-medium hover:underline"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const related = allProducts
    .filter(
      (p) => p.category === product.category && p.id !== product.id
    )
    .slice(0, 4);

  const inWishlist = isInWishlist(product.id);
  const inCart = isInCart(product.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>

        <span>/</span>

        <Link href="/shop" className="hover:text-blue-600">
          Shop
        </Link>

        <span>/</span>

        <Link
          href={`/shop?category=${product.category
            .toLowerCase()
            .replace(" ", "-")}`}
          className="hover:text-blue-600"
        >
          {product.category}
        </Link>

        <span>/</span>

        <span className="text-gray-900 font-medium line-clamp-1">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* LEFT: IMAGES */}
        <div>
          <div className="relative aspect-square bg-gray-50 rounded-3xl overflow-hidden mb-4">
            <Image
              src={product.images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />

            {product.discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                -{product.discount}%
              </div>
            )}
          </div>

          <div className="flex gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                  selectedImage === i
                    ? "border-blue-600"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} view ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT: INFO */}
        <div>
          {/* Badges */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-blue-600 font-semibold text-sm bg-blue-50 px-3 py-1 rounded-full">
              {product.brand}
            </span>

            {product.isNew && (
              <span className="bg-green-100 text-green-700 text-sm font-semibold px-3 py-1 rounded-full">
                New
              </span>
            )}

            {product.isBestSeller && (
              <span className="bg-orange-100 text-orange-700 text-sm font-semibold px-3 py-1 rounded-full">
                Best Seller
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-5 h-5 ${
                    s <= Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-200"
                  }`}
                />
              ))}
            </div>

            <span className="font-bold text-gray-900">
              {product.rating}
            </span>

            <span className="text-gray-400 text-sm">
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-extrabold text-gray-900">
              ${product.price.toLocaleString()}
            </span>

            {product.originalPrice > product.price && (
              <span className="text-xl text-gray-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3">
              Key Features
            </h3>

            <ul className="space-y-2">
              {product.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-gray-600"
                >
                  <Check className="w-4 h-4 text-blue-600 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Stock */}
          <div className="flex items-center gap-2 mb-6">
            <div
              className={`w-2 h-2 rounded-full ${
                product.stock > 10
                  ? "bg-green-500"
                  : product.stock > 0
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            />

            <span className="text-sm font-medium">
              {product.stock > 10
                ? "In Stock"
                : product.stock > 0
                ? `Only ${product.stock} left`
                : "Out of Stock"}
            </span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium">Quantity:</span>

            <div className="flex items-center border rounded-xl overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10"
              >
                −
              </button>

              <span className="w-12 text-center">{quantity}</span>

              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="w-10 h-10"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mb-8">
            <button
              onClick={() => addToCart(product, quantity)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-bold ${
                inCart
                  ? "bg-green-500 text-white"
                  : "bg-blue-600 text-white"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {inCart ? "Added to Cart ✓" : "Add to Cart"}
            </button>

            <button
              onClick={() => toggleWishlist(product)}
              className="w-14 h-14 rounded-2xl border flex items-center justify-center"
            >
              <Heart
                className={`w-6 h-6 ${
                  inWishlist ? "fill-current text-red-500" : ""
                }`}
              />
            </button>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-3 gap-3 border-t pt-6">
            {[
              { icon: Package, text: "Free Delivery" },
              { icon: Shield, text: "1 Year Warranty" },
              { icon: RotateCcw, text: "30-Day Returns" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex flex-col items-center text-center"
              >
                <Icon className="w-5 h-5 text-blue-600" />
                <span className="text-xs">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-extrabold mb-6">
            Related Products
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}