import { Truck, ShieldCheck, Lock, HeadphonesIcon } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Premium shipping experience with same-day delivery available in Dhaka.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    description: "100% authentic gadgets sourced directly from official brand distributors.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Lock,
    title: "Secure Shopping",
    description: "Your data is safe with SSL encryption and trusted payment gateways.",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description: "Expert customer support available round the clock via chat, call, or email.",
    color: "bg-orange-50 text-orange-600",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Promise</p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Why Choose Nexus?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="text-center p-6 rounded-2xl bg-gray-50 hover:shadow-lg transition-all duration-300">
              <div className={`w-14 h-14 rounded-2xl ${f.color} flex items-center justify-center mx-auto mb-4`}>
                <f.icon className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
