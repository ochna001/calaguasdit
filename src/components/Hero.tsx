"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { LiquidGlassShader } from "./LiquidGlassShader";

export function Hero() {
    const containerRef = useRef(null);
    const { scrollY } = useScroll();

    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const scale = useTransform(scrollY, [0, 500], [1.05, 1.2]);

    return (
        <section ref={containerRef} className="relative h-[110vh] w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with Parallax */}
            <motion.div
                style={{ y: y1, scale }}
                className="absolute inset-0 z-0"
            >
                <Image
                    src="/images/main_picture.jpeg"
                    alt="Calaguas Island Hero"
                    fill
                    priority
                    quality={100}
                    className="object-cover contrast-[1.1] brightness-[1.05] saturate-[1.1] scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-background/50" />
            </motion.div>

            {/* Liquid Glass Content Card */}
            <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative rounded-[64px] overflow-hidden"
                    style={{ minHeight: "500px" }}
                >
                    {/* WebGL Liquid Glass Shader Layer */}
                    <LiquidGlassShader
                        imageSrc="/images/main_picture.jpeg"
                        className="absolute inset-0 z-0"
                    />

                    {/* Inner Content - must be above the shader */}
                    <div className="relative z-10 p-8 md:p-16 rounded-[62px]">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-block px-4 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-bold tracking-widest uppercase mb-6"
                        >
                            The Ultimate Island Escape
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-9xl font-black font-outfit mb-6 tracking-tight leading-[0.9] text-white"
                        >
                            LIVE THE <br />
                            <span className="text-gradient drop-shadow-[0_0_40px_rgba(var(--color-primary),0.4)]">DREAM</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed font-medium"
                        >
                            Unveil the secrets of Calaguas. Elegance meets adventure
                            in the heart of the Pacific.
                        </motion.p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => window.location.href = "/#packages"}
                                className="px-10 py-5 bg-primary text-primary-foreground rounded-full text-xl font-black shadow-xl shadow-primary/20 transition-all"
                            >
                                Start Dreaming
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block"
            >
                <div className="w-8 h-14 border-2 border-white/30 rounded-full flex justify-center p-2">
                    <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-2 h-2 bg-white rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
}
