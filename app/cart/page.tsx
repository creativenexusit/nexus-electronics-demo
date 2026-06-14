"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Trash2, ArrowRight, Tag, ArrowLeft } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useState } from "react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useStore();
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const shipping = cartTotal > 500 ? 0 : 15;
  const discount = couponApplied ? Math.round(cartTotal * 0.1) : 0;
  const total = cartTotal - discount + shipping;

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "nexus10") setCouponApplied(true);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-2">
          <ShoppingCart className="w-10 h-10 text-blue-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-gray-900">Your Cart is Empty</h1>
        <p className="text-gray-500 text-sm text-center max-w-sm">Add products to your cart and they will appear here.</p>
        <Link href="/shop" className="flex items-center gap-2 bg-blue-600 text-white font-bold px-8 py-3.5 rounded-full hover:bg-blue-700 transition-all mt-2">
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Link href="/shop" className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Link>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500 text-sm mt-0.5">{cartCount} item{cartCount !== 1 ? "s" : ""} in your cart</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white border border-gray-100 rounded-2xl p-4 flex gap-4 shadow-sm">
              <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-50">
                <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-blue-600 font-semibold mb-0.5">{item.brand}</p>
                <Link href={`/product/${item.id}`}>
                  <h3 className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2 mb-2">{item.name}</h3>
                </Link>
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-bold">−</button>
                    <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition-colors text-lg font-bold">+</button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-gray-900">${(item.price * item.quantity).toLocaleString()}</span>
                    <button onClick={() => removeFromCart(item.id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="font-extrabold text-gray-900 text-lg mb-6">Order Summary</h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-medium">${cartTotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>Coupon discount (10%)</span>
                  <span className="font-medium">-${discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span className={`font-medium ${shipping === 0 ? "text-green-600" : ""}`}>
                  {shipping === 0 ? "Free" : `$${shipping}`}
                </span>
              </div>
              {cartTotal <= 500 && (
                <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-3 py-2">
                  Add ${(500 - cartTotal).toFixed(0)} more for free shipping!
                </p>
              )}
              <div className="border-t border-gray-100 pt-3 flex justify-between font-extrabold text-gray-900">
                <span>Total</span>
                <span className="text-xl">${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Coupon */}
            <div className="mb-6">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">Have a coupon?</label>
              {couponApplied ? (
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                  <Tag className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">NEXUS10 applied! 10% off</span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code (try NEXUS10)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button onClick={applyCoupon} className="bg-gray-900 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors">
                    Apply
                  </button>
                </div>
              )}
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-base transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </button>
            <p className="text-center text-xs text-gray-400 mt-3">Demo only – no real checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
