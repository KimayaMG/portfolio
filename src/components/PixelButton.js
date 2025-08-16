import React, { useEffect, useRef, useCallback } from "react";
import '../cssFiles/PixelButton.css';

class Pixel {
  constructor(canvas, context, x, y, color, speed, delay) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.ctx = context;
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = this.getRandomValue(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = Math.random() * 0.4;
    this.minSize = 0.5;
    this.maxSizeInteger = 2;
    this.maxSize = this.getRandomValue(this.minSize, this.maxSizeInteger);
    this.delay = delay;
    this.counter = 0;
    this.counterStep = Math.random() * 4 + (this.width + this.height) * 0.01;
    this.isIdle = false;
    this.isReverse = false;
    this.isShimmer = false;
  }

  getRandomValue(min, max) {
    return Math.random() * (max - min) + min;
  }

  draw() {
    const centerOffset = this.maxSizeInteger * 0.5 - this.size * 0.5;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(
      this.x + centerOffset,
      this.y + centerOffset,
      this.size,
      this.size
    );
  }

  appear() {
    this.isIdle = false;
    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }
    if (this.size >= this.maxSize) {
      this.isShimmer = true;
    }
    if (this.isShimmer) {
      this.shimmer();
    } else {
      this.size += this.sizeStep;
    }
    this.draw();
  }

  disappear() {
    this.isShimmer = false;
    this.counter = 0;
    if (this.size <= 0) {
      this.isIdle = true;
      return;
    } else {
      this.size -= 0.1;
    }
    this.draw();
  }

  shimmer() {
    if (this.size >= this.maxSize) {
      this.isReverse = true;
    } else if (this.size <= this.minSize) {
      this.isReverse = false;
    }
    if (this.isReverse) {
      this.size -= this.speed;
    } else {
      this.size += this.speed;
    }
  }
}

function getEffectiveSpeed(value, reducedMotion) {
  const min = 0;
  const max = 100;
  const throttle = 0.001;
  const parsed = parseInt(value, 10);

  if (parsed <= min || reducedMotion) {
    return min;
  } else if (parsed >= max) {
    return max * throttle;
  } else {
    return parsed * throttle;
  }
}

const PixelButton = ({
  gap = 5,
  speed = 35,
  colors,
  noFocus = false,
  className = "",
  children,
  href,
  onClick,
  download,
  isDarkMode
}) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const pixelsRef = useRef([]);
  const animationRef = useRef(null);
  const timePreviousRef = useRef(0);
  const isInitializedRef = useRef(false);
  const resizeTimeoutRef = useRef(null);
  const isHoveredRef = useRef(false);
  const isAnimatingRef = useRef(false);

  const reducedMotion = useRef(
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ).current;

  // Get colors based on mode
  const getColors = useCallback(() => {
    if (isDarkMode) {
      return "#7490d1,#A7B9E4,#6F8DD3";
    } else {
      return "#ffffff,#e0e0e0,#cccccc";
    }
  }, [isDarkMode]);

  const finalColors = colors ?? getColors();

  const initPixels = useCallback(() => {
    if (!containerRef.current || !canvasRef.current) return false;

    const rect = containerRef.current.getBoundingClientRect();
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height);

    if (width <= 0 || height <= 0) return false;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return false;

    // Set canvas dimensions with device pixel ratio for crisp rendering
    const dpr = window.devicePixelRatio || 1;
    canvasRef.current.width = width * dpr;
    canvasRef.current.height = height * dpr;
    canvasRef.current.style.width = `${width}px`;
    canvasRef.current.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    const colorsArray = finalColors.split(",").map(color => color.trim());
    const pxs = [];

    for (let x = 0; x < width; x += parseInt(gap, 10)) {
      for (let y = 0; y < height; y += parseInt(gap, 10)) {
        const color = colorsArray[Math.floor(Math.random() * colorsArray.length)];
        const dx = x - width / 2;
        const dy = y - height / 2;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const delay = reducedMotion ? 0 : distance;

        pxs.push(
          new Pixel(
            { width, height },
            ctx,
            x,
            y,
            color,
            getEffectiveSpeed(speed, reducedMotion),
            delay
          )
        );
      }
    }

    pixelsRef.current = pxs;
    isInitializedRef.current = true;
    return true;
  }, [gap, speed, finalColors, reducedMotion]);

  const doAnimate = useCallback((fnName) => {
    if (!canvasRef.current || !isInitializedRef.current || pixelsRef.current.length === 0) {
      return;
    }

    isAnimatingRef.current = true;
    const timeNow = performance.now();
    if (timePreviousRef.current === 0) {
      timePreviousRef.current = timeNow;
    }

    const timePassed = timeNow - timePreviousRef.current;
    const timeInterval = 1000 / 60;

    if (timePassed < timeInterval) {
      animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
      return;
    }

    timePreviousRef.current = timeNow - (timePassed % timeInterval);

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) {
      animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
      return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    let allIdle = true;
    for (let i = 0; i < pixelsRef.current.length; i++) {
      const pixel = pixelsRef.current[i];
      if (pixel && typeof pixel[fnName] === 'function') {
        pixel[fnName]();
        if (!pixel.isIdle) {
          allIdle = false;
        }
      }
    }

    if (!allIdle) {
      animationRef.current = requestAnimationFrame(() => doAnimate(fnName));
    } else {
      isAnimatingRef.current = false;
    }
  }, []);

  const handleAnimation = useCallback((name) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    timePreviousRef.current = 0;

    if (isInitializedRef.current && pixelsRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(() => doAnimate(name));
    }
  }, [doAnimate]);

  const onMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    handleAnimation("appear");
  }, [handleAnimation]);

  const onMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    handleAnimation("disappear");
  }, [handleAnimation]);

  const onFocus = useCallback((e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    isHoveredRef.current = true;
    handleAnimation("appear");
  }, [handleAnimation]);

  const onBlur = useCallback((e) => {
    if (e.currentTarget.contains(e.relatedTarget)) return;
    isHoveredRef.current = false;
    handleAnimation("disappear");
  }, [handleAnimation]);

  // Initialize pixels on mount and after mode changes
  useEffect(() => {
    const initialize = () => {
      // Cancel any ongoing animations
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }

      isInitializedRef.current = false;
      isAnimatingRef.current = false;

      if (containerRef.current && canvasRef.current) {
        const success = initPixels();
        if (success && !isHoveredRef.current) {
          // Only do initial demo if not hovered
          setTimeout(() => {
            if (!isHoveredRef.current) {
              handleAnimation("appear");
              setTimeout(() => {
                if (!isHoveredRef.current) {
                  handleAnimation("disappear");
                }
              }, 300);
            }
          }, 100);
        }
      }
    };

    const timer = setTimeout(initialize, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [isDarkMode, initPixels, handleAnimation]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      resizeTimeoutRef.current = setTimeout(() => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }

        isInitializedRef.current = false;
        const success = initPixels();

        if (success) {
          if (isHoveredRef.current) {
            handleAnimation("appear");
          } else {
            handleAnimation("appear");
            setTimeout(() => {
              if (!isHoveredRef.current) {
                handleAnimation("disappear");
              }
            }, 200);
          }
        }
      }, 100);
    };

    const observer = new ResizeObserver(handleResize);

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [initPixels, handleAnimation]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  const ButtonContent = () => (
    <>
      <canvas className="pixel-canvas" ref={canvasRef} />
      <span className="pixel-button-content">{children}</span>
    </>
  );

  const modeClass = isDarkMode ? 'dark-mode' : 'light-mode';

  if (href) {
    return (
      <a
        href={href}
        ref={containerRef}
        className={`pixel-card ${className} ${modeClass}`}
        target="_blank"
        rel="noopener noreferrer"
        download={download}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={noFocus ? undefined : onFocus}
        onBlur={noFocus ? undefined : onBlur}
        tabIndex={noFocus ? -1 : 0}
      >
        <ButtonContent />
      </a>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`pixel-card ${className} ${modeClass}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={noFocus ? undefined : onFocus}
      onBlur={noFocus ? undefined : onBlur}
      tabIndex={noFocus ? -1 : 0}
    >
      <ButtonContent />
    </div>
  );
};

export default PixelButton;