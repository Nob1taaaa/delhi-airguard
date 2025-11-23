import React, { useEffect, useRef } from 'react';

interface ParticleBackgroundProps {
    aqi: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    alpha: number;
}

const ParticleBackground = ({ aqi }: ParticleBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle configuration based on AQI
        const getParticleConfig = (aqi: number) => {
            if (aqi <= 50) {
                return { count: 30, speed: 0.2, color: '255, 255, 255', sizeBase: 2, chaos: 0 }; // Clean: dust motes
            } else if (aqi <= 100) {
                return { count: 50, speed: 0.5, color: '200, 200, 200', sizeBase: 3, chaos: 0.1 }; // Moderate
            } else if (aqi <= 200) {
                return { count: 80, speed: 1.0, color: '255, 165, 0', sizeBase: 4, chaos: 0.3 }; // Poor: orange haze
            } else if (aqi <= 300) {
                return { count: 120, speed: 1.5, color: '255, 0, 0', sizeBase: 5, chaos: 0.5 }; // Very Poor: red smog
            } else {
                return { count: 200, speed: 2.5, color: '100, 0, 0', sizeBase: 6, chaos: 0.8 }; // Hazardous: dark chaotic
            }
        };

        const config = getParticleConfig(aqi);
        const particles: Particle[] = [];

        // Initialize particles
        for (let i = 0; i < config.count; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * config.speed,
                vy: (Math.random() - 0.5) * config.speed,
                size: Math.random() * config.sizeBase + 1,
                color: config.color,
                alpha: Math.random() * 0.5 + 0.1
            });
        }

        // Animation loop
        let animationFrameId: number;
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                // Update position
                p.x += p.vx + (Math.random() - 0.5) * config.chaos;
                p.y += p.vy + (Math.random() - 0.5) * config.chaos;

                // Wrap around screen
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };
        render();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, [aqi]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-0"
            style={{ background: 'transparent' }} // Let the gradient behind it show through
        />
    );
};

export default ParticleBackground;
