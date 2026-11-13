import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Horizontal scroll-snap carousel with arrow buttons.
// Children are each wrapped in a fixed-width slide (1 / 2 / 4 visible by breakpoint).
export default function Carousel({ children }) {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [update]);

  const scrollByPage = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth, behavior: 'smooth' });
  };

  const btn =
    'w-11 h-11 rounded-full border border-[#0f2a4a] flex items-center justify-center transition-all hover:bg-[#0f2a4a] hover:text-white disabled:opacity-30 disabled:pointer-events-none';

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={update}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {React.Children.map(children, (child) => (
          <div className="snap-start shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]">
            {child}
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-3 mt-8">
        <button type="button" aria-label="Previous" disabled={!canPrev} onClick={() => scrollByPage(-1)} className={btn}>
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button type="button" aria-label="Next" disabled={!canNext} onClick={() => scrollByPage(1)} className={btn}>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
