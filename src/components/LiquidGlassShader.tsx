"use client";

import React, { useEffect, useRef } from 'react';

interface LiquidGlassShaderProps {
    imageSrc: string;
    className?: string;
}

export const LiquidGlassShader: React.FC<LiquidGlassShaderProps> = ({ imageSrc, className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        // Vertex shader source
        const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

        // Fragment shader source (User provided with minor tweaks for React integration)
        const fsSource = `
      precision mediump float;

      uniform vec3 iResolution;
      uniform float iTime;
      uniform vec4 iMouse;
      uniform sampler2D iChannel0;

      void mainImage(out vec4 fragColor, in vec2 fragCoord)
      {
        const float NUM_ZERO = 0.0;
        const float NUM_ONE = 1.0;
        const float NUM_HALF = 0.5;
        const float NUM_TWO = 2.0;
        const float POWER_EXPONENT = 6.0;
        const float MASK_MULTIPLIER_1 = 10000.0;
        const float MASK_MULTIPLIER_2 = 9500.0;
        const float MASK_MULTIPLIER_3 = 11000.0;
        const float LENS_MULTIPLIER = 5000.0;
        const float MASK_STRENGTH_1 = 8.0;
        const float MASK_STRENGTH_2 = 16.0;
        const float MASK_STRENGTH_3 = 2.0;
        const float MASK_THRESHOLD_1 = 0.95;
        const float MASK_THRESHOLD_2 = 0.9;
        const float MASK_THRESHOLD_3 = 1.5;
        const float SAMPLE_RANGE = 4.0;
        const float SAMPLE_OFFSET = 0.5;
        const float GRADIENT_RANGE = 0.2;
        const float GRADIENT_OFFSET = 0.1;
        const float GRADIENT_EXTREME = -1000.0;
        const float LIGHTING_INTENSITY = 0.3;

        vec2 uv = fragCoord / iResolution.xy;
        
        // Background Blur sampling (Subtle blur for the whole background)
        vec4 bgTex = vec4(0.0);
        float bgTotal = 0.0;
        for(float x = -2.0; x <= 2.0; x++) {
          for(float y = -2.0; y <= 2.0; y++) {
            bgTex += texture2D(iChannel0, uv + vec2(x,y) * 1.5 / iResolution.xy);
            bgTotal += 1.0;
          }
        }
        bgTex /= bgTotal;

        vec2 mouse = iMouse.xy;
        if (length(mouse) < NUM_ONE) {
          mouse = iResolution.xy / NUM_TWO;
        }
        vec2 m2 = (uv - mouse / iResolution.xy);

        float roundedBox = pow(abs(m2.x * iResolution.x / iResolution.y), POWER_EXPONENT) + pow(abs(m2.y), POWER_EXPONENT);
        float rb1 = clamp((NUM_ONE - roundedBox * MASK_MULTIPLIER_1) * MASK_STRENGTH_1, NUM_ZERO, NUM_ONE);
        float rb2 = clamp((MASK_THRESHOLD_1 - roundedBox * MASK_MULTIPLIER_2) * MASK_STRENGTH_2, NUM_ZERO, NUM_ONE) -
          clamp(pow(MASK_THRESHOLD_2 - roundedBox * MASK_MULTIPLIER_2, NUM_ONE) * MASK_STRENGTH_2, NUM_ZERO, NUM_ONE);
        float rb3 = clamp((MASK_THRESHOLD_3 - roundedBox * MASK_MULTIPLIER_3) * MASK_STRENGTH_3, NUM_ZERO, NUM_ONE) -
          clamp(pow(NUM_ONE - roundedBox * MASK_MULTIPLIER_3, NUM_ONE) * MASK_STRENGTH_3, NUM_ZERO, NUM_ONE);

        fragColor = vec4(NUM_ZERO);
        float transition = smoothstep(NUM_ZERO, NUM_ONE, rb1 + rb2);

        if (transition > NUM_ZERO) {
          vec2 lens = ((uv - NUM_HALF) * NUM_ONE * (NUM_ONE - roundedBox * LENS_MULTIPLIER) + NUM_HALF);
          float total = NUM_ZERO;
          for (float x = -SAMPLE_RANGE; x <= SAMPLE_RANGE; x++) {
            for (float y = -SAMPLE_RANGE; y <= SAMPLE_RANGE; y++) {
              vec2 offset = vec2(x, y) * SAMPLE_OFFSET / iResolution.xy;
              fragColor += texture2D(iChannel0, offset + lens);
              total += NUM_ONE;
            }
          }
          fragColor /= total;

          float gradient = clamp((clamp(m2.y, NUM_ZERO, GRADIENT_RANGE) + GRADIENT_OFFSET) / NUM_TWO, NUM_ZERO, NUM_ONE) +
            clamp((clamp(-m2.y, GRADIENT_EXTREME, GRADIENT_RANGE) * rb3 + GRADIENT_OFFSET) / NUM_TWO, NUM_ZERO, NUM_ONE);
          vec4 lighting = clamp(fragColor + vec4(rb1) * gradient + vec4(rb2) * LIGHTING_INTENSITY, NUM_ZERO, NUM_ONE);

          fragColor = mix(bgTex, lighting, transition);
        } else {
          fragColor = bgTex;
        }
      }

      void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vs = createShader(gl.VERTEX_SHADER, vsSource);
        const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
        if (!vs || !fs) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        gl.useProgram(program);

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

        const position = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        const iResolution = gl.getUniformLocation(program, 'iResolution');
        const iTime = gl.getUniformLocation(program, 'iTime');
        const iMouse = gl.getUniformLocation(program, 'iMouse');
        const iChannel0 = gl.getUniformLocation(program, 'iChannel0');

        const texture = gl.createTexture();
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.src = imageSrc;
        image.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        };

        const startTime = performance.now();
        let animationFrameId: number;

        const render = (time: number) => {
            if (!canvas || !gl) return;

            const rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }

            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform3f(iResolution, canvas.width, canvas.height, 1.0);
            gl.uniform1f(iTime, (time - startTime) / 1000);
            gl.uniform4f(iMouse, mouseRef.current.x, canvas.height - mouseRef.current.y, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniform1i(iChannel0, 0);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            animationFrameId = requestAnimationFrame(render);
        };

        render(startTime);

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            };
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            gl.deleteProgram(program);
            gl.deleteShader(vs);
            gl.deleteShader(fs);
            gl.deleteTexture(texture);
            gl.deleteBuffer(buffer);
        };
    }, [imageSrc]);

    return <canvas ref={canvasRef} className={className} style={{ width: '100%', height: '100%' }} />;
};
