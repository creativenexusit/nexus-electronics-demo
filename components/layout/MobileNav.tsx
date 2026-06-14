"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, Heart, ShoppingCart, User } from "lucide-react";
import { useStore } from "@/context/StoreContext";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Categories", href: "/shop", icon: Grid3X3 },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Cart", href: "/cart", icon: ShoppingCart },
  { label: "Account", href: "#", icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { cartCount, wishlist } = useStore();

  const getBadge = (href: string) => {
    if (href === "/cart" && cartCount > 0) return cartCount;
    if (href === "/wishlist" && wishlist.length > 0) return wishlist.length;
    return null;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-dark border-t border-white/10">
      <div className="flex items-center justify-around py-2">
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;
          const badge = getBadge(href);
          return (
            <Link
              key={label}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${
                active ? "text-blue-400" : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${active ? "text-blue-400" : ""}`} />
                {badge && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                    {badge > 9 ? "9+" : badge}
                  </span>
                )}
              </div>
              <span className="text-xs font-medium">{label}</span>
              {active && (
                <div className="w-1 h-1 bg-blue-400 rounded-full mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
