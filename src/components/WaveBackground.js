import React, { useEffect, useRef } from 'react';

const WaveBackground = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas to fill the window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Multiple waves with different properties
    const waves = [];
    const waveCount = 5;
    
    // Create waves with properties based on theme
    for (let i = 0; i < waveCount; i++) {
      waves.push({
        y: canvas.height * (0.2 + (i * 0.15)), // Distribute waves vertically
        length: canvas.width * (1.4 - (i * 0.1)), // Different wavelengths
        amplitude: 15 + (i * 5), // Different heights
        speed: 0.02 + (i * 0.005), // Different speeds
        offset: 0,
        color: isDarkMode 
          ? `rgba(116, 144, 209, ${0.07 + (i * 0.01)})` 
          : `rgba(78, 191, 213, ${0.07 + (i * 0.01)})`
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      
      if (isDarkMode) {
        gradient.addColorStop(0, 'rgba(0, 6, 19, 0.5)');
        gradient.addColorStop(1, 'rgba(8, 17, 36, 0.5)');
      } else {
        gradient.addColorStop(0, 'rgba(78, 191, 213, 0.1)');
        gradient.addColorStop(1, 'rgba(116, 144, 209, 0.1)');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw each wave
      waves.forEach((wave, index) => {
        ctx.beginPath();
        
        // Starting position
        ctx.moveTo(0, wave.y);
        
        // Draw wave path
        for (let x = 0; x < canvas.width; x++) {
          const dx = x / wave.length;
          const dy = Math.sin(dx * 2 * Math.PI + wave.offset) * wave.amplitude;
          ctx.lineTo(x, wave.y + dy);
        }
        
        // Close the path for filling
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Set fill style with gradient
        const waveGradient = ctx.createLinearGradient(0, wave.y - wave.amplitude, 0, canvas.height);
        
        if (isDarkMode) {
          waveGradient.addColorStop(0, `rgba(10, 3, 33, ${0.1 + index * 0.05})`);
          waveGradient.addColorStop(0.5, `rgba(8, 17, 36, ${0.15 + index * 0.05})`);
          waveGradient.addColorStop(1, 'rgba(0, 6, 19, 0)');
        } else {
          waveGradient.addColorStop(0, `rgba(78, 191, 213, ${0.1 + index * 0.05})`);
          waveGradient.addColorStop(0.5, `rgba(105, 163, 213, ${0.15 + index * 0.05})`);
          waveGradient.addColorStop(1, 'rgba(140, 143, 204, 0)');
        }
        
        ctx.fillStyle = waveGradient;
        ctx.fill();
        
        // Update wave offset for animation
        wave.offset += wave.speed;
      });
      
      // Create floating particles on the waves
      const particleCount = 30;
      const time = Date.now() / 1000;
      
      for (let i = 0; i < particleCount; i++) {
        // Position particles based on time and index
        const x = ((time * (20 + i * 5)) % canvas.width) + (i * canvas.width / particleCount);
        const waveIndex = i % waves.length;
        const wave = waves[waveIndex];
        
        // Calculate y-position on the wave
        const dx = x / wave.length;
        const dy = Math.sin(dx * 2 * Math.PI + wave.offset) * wave.amplitude;
        const y = wave.y + dy;
        
        // Draw the particle
        const radius = 1 + Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x % canvas.width, y, radius, 0, Math.PI * 2);
        
        if (isDarkMode) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + Math.random() * 0.4})`;
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.5 + Math.random() * 0.5})`;
        }
        
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDarkMode]); // Re-initialize when mode changes
  
  return (
    <canvas 
      ref={canvasRef} 
      className="wave-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 1,
        pointerEvents: 'none',
      }}
    />
  );
};

export default WaveBackground;