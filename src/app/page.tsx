"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { Mountain, Waves, Tent, Camera, MapPin, Phone, Users, ShieldCheck, Heart, Map, Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

const activities = [
  {
    title: "Trekking",
    description: "Experience hiking through the island's rolling hills. Mahabang Buhangin offers stunning panoramic views of the Pacific Ocean. Perfect for adventurers seeking a physical challenge with a rewarding vista.",
    icon: Mountain,
    image: "/images/trekking.jpg",
  },
  {
    title: "Island Hopping",
    description: "Explore the stunning beauty of Calaguas' neighboring islets. The island's main attraction is the long stretch of beach named Mahabang Buhangin (Long Beach) with crystal clear waters.",
    icon: Waves,
    image: "/images/island_hopping.jpg",
  },
  {
    title: "Kayaking",
    description: "Paddle through the serene turquoise waters of Calaguas Bay. Perfect for couples or solo travelers looking for a peaceful adventure across the calm seas.",
    icon: Waves,
    image: "/images/kayaking.jpg",
  },
];

const packages = [
  {
    id: "lite",
    name: "Lite Package",
    tagline: "Pure Essentials",
    price: "2,500",
    priceNum: 2500,
    description: "Perfect for budget-conscious travelers seeking a quick getaway.",
    features: ["2D1N Shared Boat", "Classic Beach Tent", "3 Basic Island Meals", "Environmental Fees", "Professional Tour Guide"],
    highlight: false,
    color: "bg-secondary/10 text-secondary-foreground"
  },
  {
    id: "standard",
    name: "Standard Package",
    tagline: "Most Popular",
    price: "3,500",
    priceNum: 3500,
    description: "Balanced comfort and adventure for the ideal island experience.",
    features: ["2D1N Roundtrip Boat", "Premium Glamping Tent", "5 Full Course Meals", "Snorkeling Gear", "Souvenir Photoshoot"],
    highlight: true,
    color: "bg-primary/10 text-primary"
  },
  {
    id: "premium",
    name: "Premium Experience",
    tagline: "Island Luxury",
    price: "5,500",
    priceNum: 5500,
    description: "The ultimate VIP treatment for a high-end Calaguas vacation.",
    features: ["3D2N Private Boat", "Luxury Glamping Suite", "Gourmet Dining Set", "Private Island Tour", "Welcome Adventure Kit"],
    highlight: false,
    color: "bg-accent/10 text-accent"
  }
];

const stats = [
  { icon: Users, label: "Happy Travelers", value: "5,000+" },
  { icon: ShieldCheck, label: "Safety Rating", value: "100%" },
  { icon: Heart, label: "Local Support", value: "15+ Families" },
  { icon: Map, label: "Preserved Spots", value: "12 Areas" },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* About Section */}
      <section id="about" className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
              <h2 className="text-5xl md:text-7xl font-black font-outfit mb-8 leading-[1.1]">
                Sharing the Magic of <span className="text-gradient">Calaguas</span>
              </h2>
              <div className="space-y-6 text-foreground/70 text-lg leading-relaxed">
                <p>
                  Founded by a group of passionate travelers, Calaguas Dream Tour was born from a simple desire:
                  to share the breathtaking, untouched beauty of Vinzons, Camarines Norte with the world—sustainably.
                </p>
                <p>
                  We believe that travel should be more than just a visit; it should be a soul-stirring experience.
                  Our team works closely with local communities to ensure that every tour preserves the island's
                  pristine environment while providing an unforgettable luxury adventure for our guests.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
                <img
                  src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1000"
                  alt="Our team and the island"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10" />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-8 rounded-3xl text-center hover:scale-105 transition-transform"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-3xl font-black font-outfit mb-1">{item.value}</h4>
                <p className="text-foreground/40 text-sm font-bold uppercase tracking-wider">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-24 px-6 relative overflow-hidden bg-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-black font-outfit mb-4"
            >
              Unforgettable <span className="text-gradient">Experiences</span>
            </motion.h2>
            <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
              Beyond the beach, Calaguas offers a world of adventure and serenity.
              Choose your own pace and create your perfect getaway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <ServiceCard
                key={activity.title}
                title={activity.title}
                description={activity.description}
                icon={activity.icon}
                image={activity.image}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-primary font-bold tracking-widest uppercase text-sm"
            >
              Exclusive Offers
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-black font-outfit mt-4 mb-6"
            >
              Choose Your <span className="text-gradient">Journey</span>
            </motion.h1>
            <p className="text-foreground/60 max-w-2xl mx-auto text-xl italic">
              "Your dream vacation is just one click away."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "glass p-10 rounded-[40px] relative overflow-hidden flex flex-col",
                  pkg.highlight ? "ring-2 ring-primary shadow-2xl shadow-primary/10 scale-105 z-10" : ""
                )}
              >
                <div className={cn("w-fit px-4 py-1.5 rounded-full text-xs font-bold mb-6", pkg.color)}>
                  {pkg.tagline}
                </div>
                <h2 className="text-3xl font-black font-outfit mb-2">{pkg.name}</h2>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-black font-outfit">₱{pkg.price}</span>
                  <span className="text-foreground/40 text-sm">/ person</span>
                </div>
                <p className="text-foreground/60 mb-8 leading-relaxed">
                  {pkg.description}
                </p>

                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map(feat => (
                    <li key={feat} className="flex gap-3 text-sm font-medium items-center">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/booking?package=${pkg.id}`}
                  className={cn(
                    "w-full py-4 rounded-2xl font-black text-center transition-all group",
                    pkg.highlight ? "bg-primary text-primary-foreground" : "bg-black/5 hover:bg-black/10"
                  )}
                >
                  Reserve Now <ArrowRight className="inline-block ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-xl font-bold font-outfit">
              CALAGUAS<span className="text-primary font-light">DREAM</span>
            </span>
            <p className="text-foreground/40 text-sm">© 2023 TEAM KAV. Redesigned for excellence.</p>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors text-sm font-medium">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors text-sm font-medium">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors text-sm font-medium">Contact Us</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
