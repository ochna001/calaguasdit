"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { Calendar, Users, Package, Mail, Phone, User, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const packages = [
    { id: "lite", name: "Lite Package", price: 2500, description: "Basic 2D1N tour with boat and essential meals." },
    { id: "standard", name: "Standard Package", price: 3500, description: "3D2N tour with glamping and full meal set." },
    { id: "premium", name: "Premium Experience", price: 5500, description: "VIP 3D2N tour, private boat, and souvenir kit." },
];

function BookingContent() {
    const searchParams = useSearchParams();
    const packageParam = searchParams.get("package");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        date: "",
        guests: "1",
        package: packageParam && packages.some(p => p.id === packageParam) ? packageParam : "standard",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const currentPackage = packages.find(p => p.id === formData.package);
    const total = currentPackage ? currentPackage.price * parseInt(formData.guests) : 0;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    if (isSuccess) {
        return (
            <div className="max-w-2xl mx-auto text-center py-20 glass rounded-3xl p-12 mt-32">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8"
                >
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                </motion.div>
                <h1 className="text-4xl font-bold font-outfit mb-4">Booking Received!</h1>
                <p className="text-foreground/60 text-lg mb-8">
                    Thank you, {formData.name}. We've sent a confirmation email to {formData.email}.
                    Our team will contact you shortly to finalize the details.
                </p>
                <button
                    onClick={() => window.location.href = "/"}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold"
                >
                    Return Home
                </button>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-start py-32">
            {/* Left Side: Info */}
            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <h1 className="text-5xl md:text-6xl font-black font-outfit mb-6">
                        Reserve Your <br />
                        <span className="text-gradient">Paradise</span>
                    </h1>
                    <p className="text-foreground/60 text-lg max-w-md">
                        Complete the form to secure your spot. Our premium tours are in high demand
                        and fill up quickly.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold">Instant Confirmation</h4>
                            <p className="text-sm text-foreground/40">Secure your dates immediately</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold">Flexible Cancellation</h4>
                            <p className="text-sm text-foreground/40">Easy booking management</p>
                        </div>
                    </div>
                </div>

                {/* Summary Card */}
                <motion.div
                    className="glass p-8 rounded-3xl space-y-4"
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 4, repeat: Infinity }}
                >
                    <h3 className="text-xl font-bold font-outfit">Booking Summary</h3>
                    <div className="flex justify-between text-foreground/60">
                        <span>{currentPackage?.name}</span>
                        <span>₱{currentPackage?.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-foreground/60">
                        <span>Guests (x{formData.guests})</span>
                        <span>₱{(currentPackage!.price * parseInt(formData.guests)).toLocaleString()}</span>
                    </div>
                    <div className="pt-4 border-t border-black/5 flex justify-between items-center text-2xl font-bold font-outfit">
                        <span>Total</span>
                        <span className="text-primary">₱{total.toLocaleString()}</span>
                    </div>
                </motion.div>
            </div>

            {/* Right Side: Form */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 md:p-12 rounded-[40px] relative"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/60 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                                <input
                                    required
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black/5 border border-black/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary/50 focus:outline-none transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/60 ml-1">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-black/5 border border-black/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary/50 focus:outline-none transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/60 ml-1">Phone</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                                <input
                                    required
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-black/5 border border-black/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary/50 focus:outline-none transition-all"
                                    placeholder="+63 9xx xxx xxxx"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/60 ml-1">Tour Date</label>
                            <div className="relative">
                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                                <input
                                    required
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full bg-black/5 border border-black/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary/50 focus:outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/60 ml-1">Guests</label>
                            <div className="relative">
                                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                                <select
                                    name="guests"
                                    value={formData.guests}
                                    onChange={handleChange}
                                    className="w-full bg-black/5 border border-black/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary/50 focus:outline-none transition-all appearance-none text-foreground"
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                        <option key={n} value={n} className="bg-white text-foreground">{n} Person{n > 1 ? 's' : ''}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-foreground/60 ml-1">Package</label>
                            <div className="relative">
                                <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                                <select
                                    name="package"
                                    value={formData.package}
                                    onChange={handleChange}
                                    className="w-full bg-black/5 border border-black/10 rounded-2xl py-4 pl-12 pr-4 focus:border-primary/50 focus:outline-none transition-all appearance-none text-foreground"
                                >
                                    {packages.map(p => (
                                        <option key={p.id} value={p.id} className="bg-white text-foreground">{p.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                Confirm Booking <ArrowRight className="w-6 h-6" />
                            </>
                        )}
                    </button>
                    <p className="text-center text-foreground/40 text-xs">
                        By confirming, you agree to our terms and conditions.
                    </p>
                </form>
            </motion.div>
        </div>
    );
}

export default function BookingPage() {
    return (
        <main className="min-h-screen px-6 relative overflow-hidden">
            <Navbar />
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
            }>
                <BookingContent />
            </Suspense>
        </main>
    );
}
