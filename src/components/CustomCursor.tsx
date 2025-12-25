"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleHover = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("button, a, select, input, [role='button']")) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseDown = () => setIsClicking(true);
        const handleMouseUp = () => setIsClicking(false);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseover", handleHover);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseover", handleHover);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, []);

    const cursorX = useSpring(mousePosition.x - 16, { damping: 25, stiffness: 300 });
    const cursorY = useSpring(mousePosition.y - 16, { damping: 25, stiffness: 300 });

    return (
        <>
            <motion.div
                className="custom-cursor hidden md:block"
                style={{
                    x: cursorX,
                    y: cursorY,
                    scale: isClicking ? 0.8 : (isHovering ? 2.5 : 1),
                    backgroundColor: isHovering ? "var(--color-accent)" : "var(--color-primary)",
                }}
            />
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full border border-primary/30 pointer-events-none z-[9998] hidden md:block"
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 3 : 1.5,
                    opacity: isHovering ? 0.5 : 0.2
                }}
                transition={{ type: "spring", damping: 30, stiffness: 200 }}
            />
        </>
    );
}
