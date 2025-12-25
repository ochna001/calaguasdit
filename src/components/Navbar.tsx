"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Palmtree } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
    { name: "Home", href: "/#" },
    { name: "About Us", href: "/#about" },
    { name: "Experiences", href: "/#activities" },
    { name: "Packages", href: "/#packages" },
];

export function Navbar() {
    const pathname = usePathname();
    const isHomePage = pathname === "/";
    const [isScrolled, setIsScrolled] = useState(!isHomePage);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!isHomePage) {
            setIsScrolled(true);
            return;
        }
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isHomePage]);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                isScrolled ? "glass py-3" : "bg-transparent text-white"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <Palmtree className="w-10 h-10 md:w-12 md:h-12 text-primary" />
                    <span className={cn(
                        "text-2xl md:text-3xl font-black font-outfit tracking-tighter",
                        isScrolled ? "text-foreground" : "text-white drop-shadow-lg"
                    )}>
                        CALAGUAS<span className="text-primary font-light">DREAM</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className={cn(
                    "hidden md:flex items-center gap-10 text-base font-semibold",
                    isScrolled ? "text-foreground" : "text-white drop-shadow-md"
                )}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/booking"
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:scale-105 transition-all shadow-xl shadow-primary/30"
                    >
                        Book Now
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={cn(
                        "md:hidden p-3 rounded-xl transition-colors",
                        isScrolled ? "text-foreground hover:bg-black/5" : "text-white hover:bg-white/10 drop-shadow-lg"
                    )}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="absolute top-full left-4 right-4 bg-white/95 backdrop-blur-xl border border-black/5 p-8 md:hidden flex flex-col gap-6 text-foreground shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-[32px] mt-4"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl font-bold hover:text-primary transition-colors flex items-center justify-between"
                            >
                                {link.name}
                                <span className="text-primary/30">→</span>
                            </Link>
                        ))}
                        <Link
                            href="/booking"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full py-4 bg-primary text-primary-foreground rounded-2xl text-center font-black text-lg shadow-lg shadow-primary/20"
                        >
                            Book Now
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
