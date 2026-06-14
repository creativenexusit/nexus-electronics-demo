"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <p className="text-blue-600 font-semibold text-sm uppercase tracking-widest mb-2">Get In Touch</p>
        <h1 className="text-4xl font-extrabold text-gray-900">Contact Us</h1>
        <p className="text-gray-500 mt-3 max-w-md mx-auto">Have a question? We re here to help. Reach out through any channel below.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Info */}
        <div className="lg:col-span-2 space-y-5">
          {[
            { icon: MapPin, title: "Visit Us", lines: ["Gulshan-1, Dhaka 1212", "Bangladesh"] },
            { icon: Phone, title: "Call Us", lines: ["+880 1700-000000", "+880 1800-000000"] },
            { icon: Mail, title: "Email Us", lines: ["support@nexuselectronic.com", "sales@nexuselectronic.com"] },
            { icon: Clock, title: "Working Hours", lines: ["Mon–Fri: 9 AM – 9 PM", "Sat–Sun: 10 AM – 7 PM"] },
          ].map((info) => (
            <div key={info.title} className="flex gap-4 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <info.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">{info.title}</h3>
                {info.lines.map((line) => (
                  <p key={line} className="text-sm text-gray-500">{line}</p>
                ))}
              </div>
            </div>
          ))}

          {/* Map placeholder */}
          <div className="h-48 bg-gray-100 rounded-2xl overflow-hidden border border-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-400">
              <MapPin className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-medium">Google Maps Placeholder</p>
              <p className="text-xs">Gulshan-1, Dhaka, Bangladesh</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
          {sent ? (
            <div className="flex flex-col items-center justify-center h-full py-12 gap-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl mb-2">✅</div>
              <h2 className="text-2xl font-extrabold text-gray-900">Message Sent!</h2>
              <p className="text-gray-500">Thanks for reaching out. We ll get back to you within 24 hours.</p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }} className="mt-2 text-blue-600 font-medium hover:underline">Send another message</button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Send a Message</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Your Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="How can we help?"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="mb-6">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5 block">Message *</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] shadow-lg shadow-blue-200"
              >
                <Send className="w-5 h-5" />
                Send Message
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
