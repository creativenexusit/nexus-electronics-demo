import Image from "next/image";
import Link from "next/link";
import categories from "@/data/categories.json";

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Browse By</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Featured Categories</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop?category=${cat.slug}`}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-sm">{cat.name}</h3>
                <p className="text-gray-300 text-xs">{cat.productCount} Products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
