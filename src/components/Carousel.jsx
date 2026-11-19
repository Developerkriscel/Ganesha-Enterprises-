import React, { useRef, useState, useEffect, useCallback } from 'react';

/**
 * Clean Continuous Infinite Loop Carousel:
 * 1. Infinite continuous scrolling (never reverses, seamless wrapping).
 * 2. Pauses automatically when cursor hovers over any card or the track.
 * 3. Supports smooth mouse drag-to-scroll with grab/grabbing cursor.
 * 4. All buttons, links, and modals inside cards remain 100% responsive and clickable.
 * 5. Cards zoom in smoothly on hover with ample vertical space.
 */
export default function Carousel({
  children,
  speed = 40, // Pixels per second for elegant luxury scroll
}) {
  const trackRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasMovedRef = useRef(false);
  const animFrameRef = useRef(null);
  const lastTimeRef = useRef(null);

  const childArray = React.Children.toArray(children);
  // Duplicate children to ensure seamless infinite looping without gaps
  const infiniteItems = [...childArray, ...childArray];

  // Calculate the exact offset width of the first set of items
  const getLoopWidth = useCallback(() => {
    const el = trackRef.current;
    if (!el || !el.children || el.children.length <= childArray.length) {
      return el ? el.scrollWidth / 2 : 0;
    }
    const firstClone = el.children[childArray.length];
    if (firstClone && el.children[0]) {
      return firstClone.offsetLeft - el.children[0].offsetLeft;
    }
    return el.scrollWidth / 2;
  }, [childArray.length]);

  // CONTINUOUS ANIMATION LOOP via requestAnimationFrame
  useEffect(() => {
    lastTimeRef.current = performance.now();

    const loop = (currentTime) => {
      const delta = (currentTime - lastTimeRef.current) / 1000;
      lastTimeRef.current = currentTime;

      const el = trackRef.current;
      // Only advance if NOT hovered and NOT dragging
      if (el && !isHovered && !isDragging) {
        const loopWidth = getLoopWidth();
        if (loopWidth > 0) {
          el.scrollLeft += speed * delta;

          // Seamless loop: when first set completes, reset back by loopWidth
          if (el.scrollLeft >= loopWidth) {
            el.scrollLeft -= loopWidth;
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHovered, isDragging, speed, getLoopWidth]);

  // --- MOUSE DRAG CONTROLS ---
  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only primary left-click

    // If the click is on an interactive element (buttons, links, inputs), do NOT intercept
    if (e.target.closest('button, a, input, select, textarea')) {
      return;
    }

    const el = trackRef.current;
    if (!el) return;

    isDownRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX;
    scrollLeftRef.current = el.scrollLeft;
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (!isDownRef.current || !trackRef.current) return;
      const walk = e.pageX - startXRef.current;

      // Only initiate drag if cursor moved noticeably
      if (Math.abs(walk) > 6) {
        hasMovedRef.current = true;
        setIsDragging(true);
        e.preventDefault();

        const el = trackRef.current;
        let newScroll = scrollLeftRef.current - walk * 1.3;
        const loopWidth = getLoopWidth();

        if (loopWidth > 0) {
          if (newScroll >= loopWidth) newScroll -= loopWidth;
          if (newScroll < 0) newScroll += loopWidth;
        }

        el.scrollLeft = newScroll;
      }
    };

    const handleGlobalMouseUp = () => {
      if (!isDownRef.current) return;
      isDownRef.current = false;
      setIsDragging(false);

      // Brief grace period before clearing hasMovedRef
      setTimeout(() => {
        hasMovedRef.current = false;
      }, 80);
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [getLoopWidth]);

  // Suppress click on card link ONLY if the user actively dragged the mouse
  const handleClickCapture = (e) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!isDownRef.current) setIsDragging(false);
      }}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Infinite Continuous Track with ample vertical space for hover zoom */}
      <div
        ref={trackRef}
        onMouseDown={handleMouseDown}
        onClickCapture={handleClickCapture}
        onDragStart={(e) => {
          if (!e.target.closest('button, a')) {
            e.preventDefault();
          }
        }}
        className={`flex gap-6 overflow-x-auto py-8 px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${
          isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'
        }`}
      >
        {infiniteItems.map((child, idx) => (
          <div
            key={`carousel-item-${idx}`}
            className="shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] relative hover:z-30 transition-all duration-300"
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
