"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Create liquid distortion
    float distortion = sin(uv.y * 10.0 + uTime) * 0.01;
    distortion += sin(uv.x * 8.0 - uTime * 0.8) * 0.01;
    
    // Mouse interaction
    float dist = distance(uv, uMouse);
    float mouseInfluence = smoothstep(0.2, 0.0, dist) * 0.05;
    
    vec2 distortedUv = uv + distortion + (uv - uMouse) * mouseInfluence;
    
    vec4 color = texture2D(uTexture, distortedUv);
    
    // Subtle chromatic aberration
    float r = texture2D(uTexture, distortedUv + vec2(0.002, 0.0)).r;
    float g = texture2D(uTexture, distortedUv).g;
    float b = texture2D(uTexture, distortedUv - vec2(0.002, 0.0)).b;
    
    gl_FragColor = vec4(r, g, b, color.a);
  }
`;

function Scene({ imageUrl }: { imageUrl: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();

    const texture = useMemo(() => new THREE.TextureLoader().load(imageUrl), [imageUrl]);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uTexture: { value: texture }
    }), [texture]);

    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.ShaderMaterial;
            material.uniforms.uTime.value = state.clock.getElapsedTime();

            // Smooth mouse follow
            const targetMouseX = (state.mouse.x + 1) / 2;
            const targetMouseY = (state.mouse.y + 1) / 2;
            material.uniforms.uMouse.value.x += (targetMouseX - material.uniforms.uMouse.value.x) * 0.1;
            material.uniforms.uMouse.value.y += (targetMouseY - material.uniforms.uMouse.value.y) * 0.1;
        }
    });

    return (
        <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 32, 32]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    );
}

export function LiquidDistortion({ imageUrl }: { imageUrl: string }) {
    return (
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Scene imageUrl={imageUrl} />
            </Canvas>
        </div>
    );
}
