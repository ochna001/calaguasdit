"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Users, ShieldCheck, Heart, Map } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-32 pb-24 px-6 overflow-hidden">
            <Navbar />

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
                        <h1 className="text-5xl md:text-7xl font-black font-outfit mb-8 leading-[1.1]">
                            Sharing the Magic of <span className="text-gradient">Calaguas</span>
                        </h1>
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
                        animate={{ opacity: 1, scale: 1 }}
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
                        {/* Decals */}
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10" />
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10" />
                    </motion.div>
                </div>

                {/* Stats/Values */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: Users, label: "Happy Travelers", value: "5,000+" },
                        { icon: ShieldCheck, label: "Safety Rating", value: "100%" },
                        { icon: Heart, label: "Local Support", value: "15+ Families" },
                        { icon: Map, label: "Preserved Spots", value: "12 Areas" },
                    ].map((item, index) => (
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
        </main>
    );
}
