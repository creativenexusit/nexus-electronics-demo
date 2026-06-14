"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Search,
  Menu,
  X,
  Zap,
  ChevronDown,
} from "lucide-react";
import { useStore } from "@/context/StoreContext";
import categories from "@/data/categories.json";

const navLinks = {
  en: [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  bn: [
    { label: "হোম", href: "/" },
    { label: "শপ", href: "/shop" },
    { label: "আমাদের সম্পর্কে", href: "/about" },
    { label: "যোগাযোগ", href: "/contact" },
  ],
};

export default function Header() {
  const { cartCount, wishlist, language, toggleLanguage } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const links = navLinks[language];

  return (
    <header className="sticky top-0 z-50 glass shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-blue-600">Nexus</span>
            <span className="text-gray-900">Electronic</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
                className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
              >
                {language === "en" ? "Categories" : "ক্যাটাগরি"}
                <ChevronDown className="w-4 h-4" />
              </button>
              {catOpen && (
                <div
                  onMouseEnter={() => setCatOpen(true)}
                  onMouseLeave={() => setCatOpen(false)}
                  className="absolute top-full left-0 mt-0 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                >
                  {categories.map((cat) => (
                    <Link
                      key={cat.id}
                      href={`/shop?category=${cat.slug}`}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                    >
                      {cat.name}
                      <span className="ml-auto text-xs text-gray-400">
                        {cat.productCount}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5">
                  <Search className="w-4 h-4 text-gray-400" />
                  <input
                    autoFocus
                    className="bg-transparent text-sm outline-none w-40 md:w-60"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && searchQuery) {
                        window.location.href = `/shop?search=${searchQuery}`;
                        setSearchOpen(false);
                      }
                      if (e.key === "Escape") setSearchOpen(false);
                    }}
                  />
                  <button onClick={() => setSearchOpen(false)}>
                    <X className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Search className="w-5 h-5 text-gray-700" />
                </button>
              )}
            </div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="hidden md:flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all"
            >
              {language === "en" ? "বাং" : "EN"}
            </button>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Heart className="w-5 h-5 text-gray-700" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {menuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white py-4 px-4 space-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors w-full"
            >
              Switch to {language === "en" ? "বাংলা" : "English"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
