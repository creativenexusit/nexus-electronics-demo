const brands = [
  { name: "Apple", color: "#000" },
  { name: "Samsung", color: "#1428A0" },
  { name: "Sony", color: "#003087" },
  { name: "Xiaomi", color: "#FF6900" },
  { name: "Asus", color: "#00539C" },
  { name: "Lenovo", color: "#E2231A" },
  { name: "Logitech", color: "#00B4D8" },
  { name: "JBL", color: "#F58120" },
  { name: "Anker", color: "#0070C0" },
];

export default function BrandShowcase() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-8">
          Official Brands We Carry
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group flex items-center justify-center px-5 py-3 rounded-xl border border-transparent hover:border-gray-200 hover:shadow-md transition-all cursor-pointer"
            >
              <span className="text-xl font-black text-gray-300 group-hover:text-gray-800 transition-colors duration-300 select-none tracking-tight">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
