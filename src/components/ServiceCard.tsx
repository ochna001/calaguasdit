"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    image?: string;
    className?: string;
    index: number;
}

export function ServiceCard({ title, description, icon: Icon, image, className, index }: ServiceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className={cn(
                "glass rounded-3xl group relative overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5",
                className
            )}
        >
            {image && (
                <div className="relative h-64 w-full overflow-hidden">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        priority={index < 3}
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
                </div>
            )}

            <div className="p-10 flex flex-col flex-grow relative">
                <div className="absolute top-0 right-10 -translate-y-1/2 w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 z-10">
                    <Icon className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-3xl font-black font-outfit mb-4 text-foreground tracking-tight">{title}</h3>
                <p className="text-foreground/70 leading-relaxed mb-8 flex-grow text-lg">
                    {description}
                </p>

                <div className="pt-6 border-t border-black/5">
                    <button className="text-primary font-black flex items-center gap-2 group/btn tracking-wider uppercase text-sm">
                        Discover More <span className="transition-transform duration-300 group-hover/btn:translate-x-2 text-xl">→</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
