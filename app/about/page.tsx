import Image from "next/image";
import { Users, Package, Globe, Award } from "lucide-react";

const stats = [
  { icon: Users, label: "Happy Customers", value: "50,000+" },
  { icon: Package, label: "Products Available", value: "500+" },
  { icon: Globe, label: "Cities We Deliver", value: "64" },
  { icon: Award, label: "Brand Partners", value: "30+" },
];

const team = [
  { name: "Arman Hossain", role: "CEO & Founder", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80" },
  { name: "Nadia Islam", role: "Head of Operations", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80" },
  { name: "Rakib Ahmed", role: "CTO", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80" },
  { name: "Sara Khanam", role: "Head of Marketing", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80" },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1400&q=80" alt="About Nexus" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-gray-900/70" />
        <div className="absolute inset-0 flex items-center px-4">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">About Us</h1>
            <p className="text-blue-100 text-lg max-w-lg">Bangladesh's most trusted premium electronics destination since 2020.</p>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Our Story</p>
            <h2 className="text-3xl font-extrabold text-gray-900 mb-6">Built for Tech Enthusiasts, by Tech Enthusiasts</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>Nexus Electronic was founded in 2020 with a simple mission: make premium electronics accessible to everyone in Bangladesh without compromising on authenticity or service quality.</p>
              <p>Starting from a small shop in Dhaka's Elephant Road tech hub, we've grown into one of the country's most trusted online electronics retailers, serving over 50,000 satisfied customers nationwide.</p>
              <p>Every product we carry is 100% genuine, sourced directly from official brand distributors, and backed by full manufacturer warranties.</p>
            </div>
          </div>
          <div className="relative h-80 rounded-3xl overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80" alt="Our Story" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s) => (
              <div key={s.label} className="text-center text-white">
                <s.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <p className="text-3xl md:text-4xl font-extrabold mb-1">{s.value}</p>
                <p className="text-blue-200 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">To democratize access to premium technology by offering genuine electronics at competitive prices with exceptional customer service across Bangladesh.</p>
          </div>
          <div className="bg-white rounded-3xl p-8 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-2xl">🌟</span>
            </div>
            <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">To become South Asia's most trusted electronics marketplace, setting the gold standard for authenticity, service, and technology accessibility.</p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">The People Behind Nexus</p>
          <h2 className="text-3xl font-extrabold text-gray-900">Meet the Team</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {team.map((member) => (
            <div key={member.name} className="text-center">
              <div className="relative w-28 h-28 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-blue-100">
                <Image src={member.img} alt={member.name} fill className="object-cover" />
              </div>
              <h4 className="font-bold text-gray-900">{member.name}</h4>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
