"use client";

import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { Mountain, Waves, Tent, Camera, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

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

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />

      {/* Activities Section */}
      <section id="activities" className="py-24 px-6 relative overflow-hidden">
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

      {/* Footer (Simplified for now) */}
      <footer className="py-12 border-t border-white/10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-8">
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
