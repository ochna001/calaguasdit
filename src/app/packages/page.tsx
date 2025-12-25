"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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

export default function PackagesPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6">
            <Navbar />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-primary font-bold tracking-widest uppercase text-sm"
                    >
                        Exclusive Offers
                    </motion.span>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
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
                            animate={{ opacity: 1, y: 0 }}
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
        </main>
    );
}
