import Image from "next/image";
import { Star } from "lucide-react";
import testimonials from "@/data/testimonials.json";

export default function TestimonialsSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Happy Customers</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Customer Reviews</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
              <div className="flex mb-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`w-4 h-4 ${s <= t.rating ? "text-yellow-400 fill-current" : "text-gray-200"}`} />
                ))}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">{t.review}</p>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
