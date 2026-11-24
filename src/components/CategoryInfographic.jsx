import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { productCategories } from '../data/products';
import { Pause, Play } from 'lucide-react';

export default function CategoryInfographic() {
  const { tr } = useLanguage();
  const navigate = useNavigate();
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [selectedMobileIdx, setSelectedMobileIdx] = useState(0);
  const [isMobileAutoPlaying, setIsMobileAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isMobileAutoPlaying) return undefined;
    const timer = window.setInterval(() => {
      setSelectedMobileIdx((current) => (current + 1) % 5);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [isMobileAutoPlaying]);

  // 5 Authentic Website Categories mapped to the 5 infographic steps
  const categoriesList = productCategories.filter(c => c.id !== 'all');

  const steps = [
    {
      step: '01',
      id: categoriesList[0]?.id || 'business-essentials',
      name: categoriesList[0]?.name || 'Business Essentials',
      count: `${categoriesList[0]?.count || 6} Products Available`,
      description: categoriesList[0]?.description || 'Premium corporate stationery, visiting cards, presentation folders, and office essentials.',
      color: '#dc2626',
      gradId: 'chevronGrad1',
      fanGradId: 'fanGrad1',
      glowColor: 'rgba(220, 38, 38, 0.35)',
      fromColor: '#ef4444',
      toColor: '#b91c1c',
      iconType: 'home'
    },
    {
      step: '02',
      id: categoriesList[1]?.id || 'clothing-caps-bags',
      name: categoriesList[1]?.name || 'Clothing, Caps & Bags',
      count: `${categoriesList[1]?.count || 5} Products Available`,
      description: categoriesList[1]?.description || 'Premium corporate apparel, polo shirts, executive vests, caps, and heavy-duty organic tote bags.',
      color: '#ea580c',
      gradId: 'chevronGrad2',
      fanGradId: 'fanGrad2',
      glowColor: 'rgba(234, 88, 12, 0.35)',
      fromColor: '#f97316',
      toColor: '#c2410c',
      iconType: 'shirt'
    },
    {
      step: '03',
      id: categoriesList[2]?.id || 'made-by-you',
      name: categoriesList[2]?.name || 'Made by You & Stationery',
      count: `${categoriesList[2]?.count || 5} Products Available`,
      description: categoriesList[2]?.description || 'Customized desk organizers, fine diaries, engraved pens, photo calendars, and corporate keepsakes.',
      color: '#eab308',
      gradId: 'chevronGrad3',
      fanGradId: 'fanGrad3',
      glowColor: 'rgba(234, 179, 8, 0.38)',
      fromColor: '#facc15',
      toColor: '#ca8a04',
      iconType: 'gear'
    },
    {
      step: '04',
      id: categoriesList[3]?.id || 'home-and-gifts',
      name: categoriesList[3]?.name || 'Home, Drinkware & Gifts',
      count: `${categoriesList[3]?.count || 5} Products Available`,
      description: categoriesList[3]?.description || 'Luxury employee welcome hampers, insulated thermal drinkware, ceramic mugs, and curated festive boxes.',
      color: '#65a30d',
      gradId: 'chevronGrad4',
      fanGradId: 'fanGrad4',
      glowColor: 'rgba(101, 163, 13, 0.35)',
      fromColor: '#84cc16',
      toColor: '#4d7c0f',
      iconType: 'bulb'
    },
    {
      step: '05',
      id: categoriesList[4]?.id || 'signage-and-more',
      name: categoriesList[4]?.name || 'Signage, Awards & More',
      count: `${categoriesList[4]?.count || 3} Products Available`,
      description: categoriesList[4]?.description || 'Roll-up standees, acrylic prestige awards, wedding suites, and large-format architectural displays.',
      color: '#0284c7',
      gradId: 'chevronGrad5',
      fanGradId: 'fanGrad5',
      glowColor: 'rgba(2, 132, 199, 0.35)',
      fromColor: '#0ea5e9',
      toColor: '#0369a1',
      iconType: 'chart'
    }
  ];

  // Vector SVG icons matching the reference
  const renderIcon = (type) => {
    switch (type) {
      case 'home':
        return (
          <path
            d="M 12 3 L 2 12 L 5 12 L 5 21 L 10 21 L 10 15 L 14 15 L 14 21 L 19 21 L 19 12 L 22 12 Z"
            fill="#ffffff"
          />
        );
      case 'shirt':
        return (
          <path
            d="M 20.38 3.46 L 16 2 L 14 6 L 10 6 L 8 2 L 3.62 3.46 A 1 1 0 0 0 3 4.41 L 3 9 A 1 1 0 0 0 4.14 9.92 L 6 9.3 L 6 21 A 1 1 0 0 0 7 22 L 17 22 A 1 1 0 0 0 18 21 L 18 9.3 L 19.86 9.92 A 1 1 0 0 0 21 9 L 21 4.41 A 1 1 0 0 0 20.38 3.46 Z"
            fill="#ffffff"
          />
        );
      case 'gear':
        return (
          <path
            d="M 12 15 A 3 3 0 1 0 12 9 A 3 3 0 0 0 12 15 Z M 19.4 13 A 7.5 7.5 0 0 0 19.4 11 L 21.6 9.3 A 0.5 0.5 0 0 0 21.7 8.7 L 19.6 5.1 A 0.5 0.5 0 0 0 19 4.9 L 16.4 5.9 A 7.5 7.5 0 0 0 14.7 4.9 L 14.3 2.2 A 0.5 0.5 0 0 0 13.8 1.8 L 10.2 1.8 A 0.5 0.5 0 0 0 9.7 2.2 L 9.3 4.9 A 7.5 7.5 0 0 0 7.6 5.9 L 5 4.9 A 0.5 0.5 0 0 0 4.4 5.1 L 2.3 8.7 A 0.5 0.5 0 0 0 2.4 9.3 L 4.6 11 A 7.5 7.5 0 0 0 4.6 13 L 2.4 14.7 A 0.5 0.5 0 0 0 2.3 15.3 L 4.4 18.9 A 0.5 0.5 0 0 0 5 19.1 L 7.6 18.1 A 7.5 7.5 0 0 0 9.3 19.1 L 9.7 21.8 A 0.5 0.5 0 0 0 10.2 22.2 L 13.8 22.2 A 0.5 0.5 0 0 0 14.3 21.8 L 14.7 19.1 A 7.5 7.5 0 0 0 16.4 18.1 L 19 19.1 A 0.5 0.5 0 0 0 19.6 18.9 L 21.6 15.3 A 0.5 0.5 0 0 0 21.7 14.7 Z"
            fill="#ffffff"
          />
        );
      case 'bulb':
        return (
          <path
            d="M 9 21 A 1 1 0 0 0 10 22 L 14 22 A 1 1 0 0 0 15 21 L 15 20 L 9 20 Z M 12 2 A 7 7 0 0 0 5 9 C 5 12.08 6.64 14.45 8 16.27 L 8 18 A 1 1 0 0 0 9 19 L 15 19 A 1 1 0 0 0 16 18 L 16 16.27 C 17.36 14.45 19 12.08 19 9 A 7 7 0 0 0 12 2 Z"
            fill="#ffffff"
          />
        );
      case 'chart':
        return (
          <path
            d="M 3 3 L 3 21 L 21 21 L 21 19 L 5 19 L 5 3 Z M 7 14 L 11 10 L 15 14 L 21 8 L 21 12 L 23 12 L 23 5 L 16 5 L 16 7 L 19.6 7 L 15 11.6 L 11 7.6 L 7 11.6 Z"
            fill="#ffffff"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-7xl lg:max-w-[1360px] mx-auto py-2">
      {/* =========================================================
          DESKTOP 1:1 VECTOR REPLICA WITH EYE-CATCHY EFFECTS
          ========================================================= */}
      <div className="hidden md:block w-full overflow-hidden">
        <svg
          viewBox="0 0 1140 450"
          className="w-full h-auto drop-shadow-xl overflow-hidden select-none"
          style={{ maxHeight: '520px' }}
        >
          <defs>
            {/* Multi-tier Drop Shadows */}
            <filter id="hubElevation" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="-3" dy="10" stdDeviation="14" floodColor="#0f2a4a" floodOpacity="0.25" />
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000000" floodOpacity="0.12" />
            </filter>

            {/* Glowing Hover Drop Shadow for Active Row */}
            <filter id="rowHoverShadow" x="-10%" y="-20%" width="120%" height="150%">
              <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0f2a4a" floodOpacity="0.18" />
            </filter>

            {/* Fold Crease Shadows Between Strips */}
            <linearGradient id="creaseShadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f2a4a" stopOpacity="0.16" />
              <stop offset="50%" stopColor="#000000" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
            </linearGradient>

            {/* Grey Strip Gradient with Specular Sheen */}
            <linearGradient id="stripGreyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e2e7ec" />
              <stop offset="30%" stopColor="#edf1f5" />
              <stop offset="70%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#ffffff" />
            </linearGradient>

            {/* Top Gloss Edge Highlight on Every Strip */}
            <linearGradient id="glossEdge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
            </linearGradient>

            {/* Shimmer sweep gradient across the chevron arrow */}
            <linearGradient id="chevronShimmer" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* 5 Rich Gradients for the Colored Chevron Tips */}
            {steps.map((s) => (
              <linearGradient key={s.gradId} id={s.gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={s.fromColor} />
                <stop offset="100%" stopColor={s.toColor} />
              </linearGradient>
            ))}

            {/* 5 Shaded 3D Origami Bevel Gradients for Left Fan Planes */}
            <linearGradient id="fanGrad1" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="fanGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d5dde5" />
              <stop offset="100%" stopColor="#edf2f7" />
            </linearGradient>
            <linearGradient id="fanGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#f8fafc" />
            </linearGradient>
            <linearGradient id="fanGrad4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d5dde5" />
              <stop offset="100%" stopColor="#edf2f7" />
            </linearGradient>
            <linearGradient id="fanGrad5" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
          </defs>

          {/* =======================================================
              5 HORIZONTAL RIBBON TIERS
              ======================================================= */}
          {steps.map((item, idx) => {
            const isHovered = hoveredIdx === idx;
            const rowY = idx * 90;

            // Coordinates for geometry
            const fanPoints = [
              "185,205 250,195 360,0 360,90 250,207 185,215",
              "185,215 250,207 360,90 360,180 250,219 185,223",
              "185,223 250,219 360,180 360,270 250,231 185,227",
              "185,227 250,231 360,270 360,360 250,243 185,235",
              "185,235 250,243 360,360 360,450 250,255 185,245"
            ];

            const bodyPoints = [
              "360,0 820,0 900,90 360,90",
              "360,90 900,90 980,180 360,180",
              "360,180 980,180 1020,225 980,270 360,270",
              "360,270 980,270 900,360 360,360",
              "360,360 900,360 820,450 360,450"
            ];

            const chevronPoints = [
              "820,0 930,0 1010,90 900,90",
              "900,90 1010,90 1090,180 980,180",
              "980,180 1090,180 1130,225 1090,270 980,270 1020,225",
              "980,270 1090,270 1010,360 900,360",
              "900,360 1010,360 930,450 820,450"
            ];

            const iconCoords = [
              { x: 905, y: 33 },
              { x: 985, y: 123 },
              { x: 1045, y: 213 },
              { x: 985, y: 303 },
              { x: 905, y: 393 }
            ];

            const textWidths = [335, 415, 485, 415, 335];

            return (
              <g
                key={item.id}
                className="cursor-pointer transition-transform duration-300 ease-out"
                style={{
                  transform: isHovered ? 'translateX(4px)' : 'translateX(0px)',
                  filter: isHovered ? 'url(#rowHoverShadow)' : 'none'
                }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => navigate(`/products?category=${item.id}`)}
              >
                {/* 1. Shaded 3D Origami Fan-Out Connection */}
                <polygon
                  points={fanPoints[idx]}
                  fill={`url(#${item.fanGradId})`}
                  className="transition-colors duration-300"
                />

                {/* 2. Grey Ribbon Body */}
                <polygon
                  points={bodyPoints[idx]}
                  fill={isHovered ? '#ffffff' : 'url(#stripGreyGrad)'}
                  className="transition-all duration-300"
                />

                {/* Top Gloss Highlight Edge */}
                <line
                  x1="360"
                  y1={rowY + 1}
                  x2={idx === 2 ? "980" : idx === 1 || idx === 3 ? "900" : "820"}
                  y2={rowY + 1}
                  stroke="url(#glossEdge)"
                  strokeWidth="2"
                />

                {/* Left Colored Accent Bar on Row */}
                <rect
                  x="360"
                  y={rowY}
                  width="4"
                  height="90"
                  fill={item.color}
                  className="transition-all duration-300"
                />

                {/* Bottom Shadow Crease */}
                {idx < 4 && (
                  <rect
                    x="360"
                    y={rowY + 86}
                    width={idx === 1 || idx === 2 ? 620 : 540}
                    height="4"
                    fill="url(#creaseShadow)"
                  />
                )}

                {/* 3. Number: 01 to 05 */}
                <text
                  x="380"
                  y={rowY + 62}
                  fontSize="44"
                  fontWeight="300"
                  fontFamily="'Poppins', sans-serif"
                  fill={item.color}
                  letterSpacing="-1"
                  className="transition-all duration-300"
                  style={{
                    filter: isHovered ? `drop-shadow(0 2px 8px ${item.glowColor})` : 'none',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    transformOrigin: `380px ${rowY + 62}px`
                  }}
                >
                  {item.step}
                </text>

                {/* 4. Dual Chevrons >> with Pulse */}
                <text
                  x="445"
                  y={rowY + 57}
                  fontSize="26"
                  fontWeight="900"
                  fontFamily="'Poppins', sans-serif"
                  fill={item.color}
                  className="transition-transform duration-300"
                  style={{
                    transform: isHovered ? 'translateX(4px)' : 'translateX(0px)',
                    transformOrigin: `445px ${rowY + 57}px`
                  }}
                >
                  »
                </text>

                {/* 5. Category Details (ForeignObject - Guaranteed Boundary Safe) */}
                <foreignObject
                  x="475"
                  y={rowY + 12}
                  width={textWidths[idx]}
                  height="66"
                  className="overflow-hidden pointer-events-none"
                >
                  <div xmlns="http://www.w3.org/1999/xhtml" className="flex flex-col justify-center h-full pr-3 select-none">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h4
                        className="font-serif text-[15px] font-bold text-[#0f2a4a] leading-tight transition-colors duration-200"
                        style={{ color: isHovered ? item.color : '#0f2a4a' }}
                      >
                        {tr(item.name)}
                      </h4>
                      <span
                        className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full transition-all duration-300 flex items-center gap-1 shadow-2xs"
                        style={{
                          color: item.color,
                          backgroundColor: `${item.color}18`,
                          border: `1px solid ${item.color}35`
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color }} />
                        {item.count}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#56667a] leading-snug line-clamp-2">
                      {tr(item.description)}
                    </p>
                  </div>
                </foreignObject>

                {/* 6. Rich Gradient Chevron Tip */}
                <polygon
                  points={chevronPoints[idx]}
                  fill={`url(#${item.gradId})`}
                  className="transition-all duration-300"
                  style={{
                    filter: isHovered ? `brightness(1.1) drop-shadow(0 4px 14px ${item.glowColor})` : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                />

                {/* Shimmer line on Chevron */}
                {isHovered && (
                  <polygon
                    points={chevronPoints[idx]}
                    fill="url(#chevronShimmer)"
                    className="pointer-events-none animate-pulse"
                  />
                )}

                {/* 7. Centered White Icon with Micro-Bounce on Hover */}
                <g
                  transform={`translate(${iconCoords[idx].x}, ${iconCoords[idx].y}) scale(${isHovered ? 1.25 : 1.1})`}
                  className="transition-transform duration-300 drop-shadow-md"
                  style={{
                    transformOrigin: `${iconCoords[idx].x + 12}px ${iconCoords[idx].y + 12}px`
                  }}
                >
                  {renderIcon(item.iconType)}
                </g>
              </g>
            );
          })}

          {/* =======================================================
              CIRCULAR HUB NODE (ON LEFT)
              Luminous 3D Glass & Metal Bevel with Warm Bulb Aura
              ======================================================= */}
          <g transform="translate(125, 225)" filter="url(#hubElevation)">
            {/* Luminous Ambient Halo Glow */}
            <circle cx="0" cy="0" r="110" fill="#f8fafc" opacity="0.6" />

            {/* Outer Soft Bevel Ring */}
            <circle cx="0" cy="0" r="102" fill="#dce2e8" />
            <circle cx="0" cy="0" r="95" fill="#f8fafc" />

            {/* Inner Recessed Disc */}
            <circle
              cx="0"
              cy="0"
              r="82"
              fill="#ffffff"
              stroke="#e2e8f0"
              strokeWidth="2.5"
            />

            {/* Lightbulb Graphic with Luminous Radial Pulse */}
            <g transform="translate(0, -32) scale(0.9)">
              {/* Golden Ambient Glow Aura */}
              <circle cx="0" cy="-6" r="28" fill="#fef08a" opacity="0.45" className="animate-pulse" />
              <circle cx="0" cy="-6" r="18" fill="#fef9c3" opacity="0.6" />

              {/* Lightbulb Outline */}
              <path
                d="M -12 -12 C -18 -2 0 10 -4 16 L 4 16 C 0 10 18 -2 12 -12 C 9 -22 -9 -22 -12 -12 Z"
                fill="#ffffff"
                stroke="#64748b"
                strokeWidth="1.8"
              />
              <path d="M -4 16 L 4 16 M -3 19 L 3 19 M -2 22 L 2 22" stroke="#64748b" strokeWidth="1.8" />

              {/* Hand Holding It */}
              <path
                d="M -22 18 L -14 26 L -6 20 L 0 24 L 14 24 C 18 24 20 20 18 16 L 10 16"
                fill="#0f2a4a"
                stroke="#0f2a4a"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* "idea" Cursive Script */}
              <text x="0" y="-8" fontSize="8.5" fontStyle="italic" fontWeight="700" fontFamily="'Playfair Display', serif" fill="#d97706" textAnchor="middle">
                idea
              </text>
            </g>

            {/* Center Typography */}
            <text x="0" y="24" fontSize="17" fontWeight="900" fontFamily="'Poppins', sans-serif" fill="#0f2a4a" textAnchor="middle" letterSpacing="-0.5">
              5 DIVISIONS
            </text>
            <text x="0" y="38" fontSize="9" fontWeight="800" fontFamily="'Poppins', sans-serif" fill="#64748b" textAnchor="middle" letterSpacing="1.2">
              PRODUCT MATRIX
            </text>
            <text x="0" y="48" fontSize="6.5" fontWeight="700" fontFamily="'Inter', sans-serif" fill="#15b498" textAnchor="middle" letterSpacing="0.8">
              GANESHA ENTERPRISES
            </text>

            {/* 5 Color Swatches Pill Bar */}
            <g transform="translate(-32, 54)">
              <rect x="0" y="0" width="11" height="4.5" rx="1.5" fill="#dc2626" />
              <rect x="13" y="0" width="11" height="4.5" rx="1.5" fill="#ea580c" />
              <rect x="26" y="0" width="11" height="4.5" rx="1.5" fill="#eab308" />
              <rect x="39" y="0" width="11" height="4.5" rx="1.5" fill="#65a30d" />
              <rect x="52" y="0" width="11" height="4.5" rx="1.5" fill="#0284c7" />
            </g>
          </g>
        </svg>
      </div>

      {/* =========================================================
          MOBILE VIEW (Touch-Friendly Responsive Stacked Cards)
          ========================================================= */}
      <div className="md:hidden flex w-full flex-col items-center gap-4 py-2">
        <div className="relative h-[min(90vw,360px)] w-[min(90vw,360px)] rounded-full border-[12px] border-[#e2e8f0] bg-gradient-to-br from-white via-[#f8fafc] to-[#edf3f9] shadow-[0_22px_55px_rgba(15,42,74,0.22)]">
          <div className="absolute -inset-5 rounded-full bg-[#15b498]/10 blur-2xl animate-pulse" />
          <div className="absolute -inset-2 rounded-full border border-[#15b498]/30 animate-[spin_18s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border-2 border-[#dbe4ee] shadow-inner" />
          <button
            type="button"
            onClick={() => navigate(`/products?category=${steps[selectedMobileIdx].id}`)}
            aria-label={`Open ${steps[selectedMobileIdx].name} products`}
            className="group absolute inset-0 z-[1] flex cursor-pointer flex-col items-center justify-center border-0 bg-transparent px-10 text-center outline-none transition-transform duration-300 hover:scale-[1.02] focus-visible:ring-2 focus-visible:ring-[#15b498] focus-visible:ring-inset"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#15b498]">Product Matrix</span>
            <span className="mt-1 font-serif text-3xl font-bold drop-shadow-sm animate-[pulse_2.4s_ease-in-out_infinite]" style={{ color: steps[selectedMobileIdx].color }}>{steps[selectedMobileIdx].step}</span>
            <h3 className="mt-1 text-[13px] font-bold leading-tight text-[#0f2a4a]">{tr(steps[selectedMobileIdx].name)}</h3>
            <span className="mt-1 text-[9px] font-bold uppercase tracking-wider" style={{ color: steps[selectedMobileIdx].color }}>{steps[selectedMobileIdx].count}</span>
            <p className="mt-2 line-clamp-3 text-[10px] leading-snug text-[#64748b]">{tr(steps[selectedMobileIdx].description)}</p>
            <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-[#0f2a4a] px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-white shadow-sm transition-all duration-300 group-hover:scale-105">
              {tr('Learn More')} <span aria-hidden="true">→</span>
            </span>
          </button>

          {steps.map((item, idx) => {
            const positions = [
              'left-1/2 top-0 -translate-x-1/2 -translate-y-1/2',
              'right-0 top-[22%] translate-x-1/2 -translate-y-1/2',
              'right-0 bottom-[22%] translate-x-1/2 translate-y-1/2',
              'left-0 bottom-[22%] -translate-x-1/2 translate-y-1/2',
              'left-0 top-[22%] -translate-x-1/2 -translate-y-1/2'
            ];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedMobileIdx(idx)}
                aria-label={`Show ${item.name}`}
                className={`absolute z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white text-sm font-bold text-white shadow-[0_8px_18px_rgba(15,42,74,0.28)] transition-all duration-300 hover:scale-125 hover:shadow-[0_12px_26px_rgba(15,42,74,0.4)] active:scale-95 ${positions[idx]} ${selectedMobileIdx === idx ? 'scale-125 ring-4 ring-white/80 shadow-[0_12px_28px_rgba(15,42,74,0.42)] animate-[pulse_2s_ease-in-out_infinite]' : ''}`}
                style={{ background: `linear-gradient(135deg, ${item.fromColor}, ${item.toColor})` }}
              >
                {item.step}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => navigate(`/products?category=${steps[selectedMobileIdx].id}`)}
          className="inline-flex items-center justify-center rounded-full bg-[#0f2a4a] px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-md"
        >
          Explore {tr(steps[selectedMobileIdx].name)}
        </button>
        <button
          type="button"
          onClick={() => setIsMobileAutoPlaying((playing) => !playing)}
          aria-label={isMobileAutoPlaying ? 'Pause automatic category rotation' : 'Play automatic category rotation'}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#15b498]/30 bg-white/85 px-3 py-1.5 text-[9px] font-bold uppercase tracking-widest text-[#0f2a4a] shadow-sm backdrop-blur transition-all hover:scale-105"
        >
          {isMobileAutoPlaying ? <Pause className="h-3 w-3 text-[#15b498]" /> : <Play className="h-3 w-3 text-[#15b498]" />}
          {isMobileAutoPlaying ? 'Auto switch' : 'Play categories'}
        </button>
      </div>
    </div>
  );
}
