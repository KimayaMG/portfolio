import React, { useRef, useEffect, useState } from 'react';

const NetworkBackground = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const connectionDistanceRef = useRef(150);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const smoothedMouse = useRef({ x: 0, y: 0 });

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track mouse position via ref
  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize and animate particles
  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const particleCount = Math.min(
      Math.floor((dimensions.width * dimensions.height) / 15000),
      100
    );

    // Initialize particles
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * dimensions.width,
        y: Math.random() * dimensions.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        initialX: Math.random() * dimensions.width,
        initialY: Math.random() * dimensions.height,
      });
    }
    particlesRef.current = particles;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smoothly interpolate mouse position
      smoothedMouse.current.x +=
        (mousePositionRef.current.x - smoothedMouse.current.x) * 0.05;
      smoothedMouse.current.y +=
        (mousePositionRef.current.y - smoothedMouse.current.y) * 0.05;

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];

        const dx = smoothedMouse.current.x - p.x;
        const dy = smoothedMouse.current.y - p.y;
        const mouseDistance = Math.sqrt(dx * dx + dy * dy);
        const mouseForce = Math.min(1000 / (mouseDistance * mouseDistance), 0.15);

        if (mouseDistance < 200) {
          p.vx += (dx / mouseDistance) * mouseForce;
          p.vy += (dy / mouseDistance) * mouseForce;
        }

        // Pull back to original
        p.vx += (p.initialX - p.x) * 0.0004;
        p.vy += (p.initialY - p.y) * 0.0004;

        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Damping
        p.vx *= 0.97;
        p.vy *= 0.97;

        // Bounds
        if (p.x < 0 || p.x > dimensions.width) p.vx *= -1;
        if (p.y < 0 || p.y > dimensions.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const alpha = Math.floor((0.3 + Math.random() * 0.2) * 255);
        ctx.fillStyle = isDarkMode
          ? `#FFFFFF${alpha.toString(16).padStart(2, '0')}`
          : `#FFFFFF${alpha.toString(16).padStart(2, '0')}`;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p2 = particlesRef.current[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistanceRef.current) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            const opacity = Math.floor((1 - distance / connectionDistanceRef.current) * 0.15 * 255);
            const alphaHex = opacity.toString(16).padStart(2, '0');

            ctx.strokeStyle = isDarkMode
              ? `#FFFFFF${alphaHex}`   
              : `#FFFFFF${alphaHex}`;

            ctx.lineWidth = 0.5;
            ctx.stroke();
          }

        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, isDarkMode]);

  // Adjust connection distance on resize
  useEffect(() => {
    connectionDistanceRef.current = Math.min(
      Math.max(dimensions.width / 10, 100),
      200
    );
  }, [dimensions.width]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.8,
        background: 'transparent',
        transition: 'opacity 1s ease',
      }}
    />
  );
};

export default NetworkBackground;
