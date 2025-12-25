"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 100 }) {
    const meshRef = useRef<THREE.Points>(null);

    const particles = useMemo(() => {
        const temp = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            temp[i * 3] = (Math.random() - 0.5) * 10;
            temp[i * 3 + 1] = (Math.random() - 0.5) * 10;
            temp[i * 3 + 2] = (Math.random() - 0.5) * 5;
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.001;
            meshRef.current.rotation.x += 0.0005;

            // Dynamic floating effect
            const time = state.clock.getElapsedTime();
            meshRef.current.position.y = Math.sin(time * 0.5) * 0.1;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={particles}
                    itemSize={3}
                    args={[particles, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#ffffff"
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export function FloatingParticles() {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-5">
            <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <ambientLight intensity={0.5} />
                <Particles count={250} />
            </Canvas>
        </div>
    );
}
