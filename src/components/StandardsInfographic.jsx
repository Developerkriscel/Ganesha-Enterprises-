import React from 'react';
import { motion } from 'framer-motion';
import { Palette, ShieldCheck, Award, Clock, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function StandardsInfographic({ valueProps = [] }) {
  const { tr } = useLanguage();

  // Helper to generate SVG annular quadrant arc paths (viewBox 0 0 240 240, center 120, 120)
  const makeArc = (startAngle, endAngle, innerR = 64, outerR = 108, cx = 120, cy = 120) => {
    const rad = Math.PI / 180;
    const x1 = cx + outerR * Math.cos(startAngle * rad);
    const y1 = cy + outerR * Math.sin(startAngle * rad);
    const x2 = cx + outerR * Math.cos(endAngle * rad);
    const y2 = cy + outerR * Math.sin(endAngle * rad);
    const x3 = cx + innerR * Math.cos(endAngle * rad);
    const y3 = cy + innerR * Math.sin(endAngle * rad);
    const x4 = cx + innerR * Math.cos(startAngle * rad);
    const y4 = cy + innerR * Math.sin(startAngle * rad);

    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${outerR} ${outerR} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} L ${x3.toFixed(2)} ${y3.toFixed(2)} A ${innerR} ${innerR} 0 0 0 ${x4.toFixed(2)} ${y4.toFixed(2)} Z`;
  };

  const quadrantArcs = [
    {
      num: '01',
      path: makeArc(183, 267),
      textX: 58.5,
      textY: 58.5,
      gradId: 'stdGrad1',
      fromColor: '#f59e0b',
      toColor: '#d97706'
    },
    {
      num: '02',
      path: makeArc(273, 357),
      textX: 181.5,
      textY: 58.5,
      gradId: 'stdGrad2',
      fromColor: '#f97316',
      toColor: '#ea580c'
    },
    {
      num: '03',
      path: makeArc(3, 87),
      textX: 181.5,
      textY: 181.5,
      gradId: 'stdGrad3',
      fromColor: '#d946ef',
      toColor: '#c026d3'
    },
    {
      num: '04',
      path: makeArc(93, 177),
      textX: 58.5,
      textY: 181.5,
      gradId: 'stdGrad4',
      fromColor: '#06b6d4',
      toColor: '#0284c7'
    }
  ];

  // Compact, high-impact data model
  const standardsData = [
    {
      step: '01',
      title: valueProps[0]?.title || 'Customizable for Any Brand',
      desc: valueProps[0]?.description || 'Custom die-cuts, exact Pantone color matching, 3D embossing, and premium paper textures designed to match your brand requirements.',
      themeColor: '#f59e0b',
      themeGradient: 'from-amber-500 to-amber-600',
      bgGradient: 'bg-gradient-to-br from-white via-white to-amber-500/[0.04]',
      glowColor: 'bg-amber-400/10 group-hover:bg-amber-400/25',
      watermarkColor: 'group-hover:text-amber-500/10',
      iconBg: 'bg-amber-50 border border-amber-200/70',
      hoverBorder: 'hover:border-amber-400',
      hoverShadow: 'hover:shadow-[0_28px_60px_-10px_rgba(245,158,11,0.35),0_0_30px_rgba(245,158,11,0.2)]',
      chips: ['Custom Die-Cuts', 'Exact Color Matching', 'Gold & Silver Foiling'],
      icon: <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />,
      cornerClass: 'md:rounded-br-[3.5rem] lg:rounded-br-[4.5rem]',
      headerPadding: '',
      contentPadding: 'md:pr-14 lg:md:pr-18 md:pb-8',
      footerPadding: '',
      watermarkPos: 'top-3 right-5',
      orderClass: 'order-1'
    },
    {
      step: '02',
      title: valueProps[1]?.title || 'Value for Money',
      desc: valueProps[1]?.description || 'Clear estimates, efficient production, and durable finishes that deliver dependable quality at a practical cost.',
      themeColor: '#f97316',
      themeGradient: 'from-orange-500 to-orange-600',
      bgGradient: 'bg-gradient-to-br from-white via-white to-orange-500/[0.04]',
      glowColor: 'bg-orange-400/10 group-hover:bg-orange-400/25',
      watermarkColor: 'group-hover:text-orange-500/10',
      iconBg: 'bg-orange-50 border border-orange-200/70',
      hoverBorder: 'hover:border-orange-400',
      hoverShadow: 'hover:shadow-[0_28px_60px_-10px_rgba(249,115,22,0.35),0_0_30px_rgba(249,115,22,0.2)]',
      chips: ['Transparent Rate Cards', 'Bulk Run Efficiency', 'Zero Hidden Fees'],
      icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />,
      cornerClass: 'md:rounded-bl-[3.5rem] lg:rounded-bl-[4.5rem]',
      headerPadding: '',
      contentPadding: 'md:pl-14 lg:md:pl-18 md:pb-8',
      footerPadding: 'md:pl-18',
      watermarkPos: 'top-3 right-5',
      orderClass: 'order-2'
    },
    {
      step: '03',
      title: valueProps[2]?.title || 'Unmatched Print Quality',
      desc: valueProps[2]?.description || 'State-of-the-art Japanese UV flatbed, Heidelberg offset, and high-DPI digital presses ensure sharp, consistent results.',
      themeColor: '#d946ef',
      themeGradient: 'from-fuchsia-500 to-fuchsia-600',
      bgGradient: 'bg-gradient-to-br from-white via-white to-fuchsia-500/[0.04]',
      glowColor: 'bg-fuchsia-400/10 group-hover:bg-fuchsia-400/25',
      watermarkColor: 'group-hover:text-fuchsia-500/10',
      iconBg: 'bg-fuchsia-50 border border-fuchsia-200/70',
      hoverBorder: 'hover:border-fuchsia-400',
      hoverShadow: 'hover:shadow-[0_28px_60px_-10px_rgba(217,70,239,0.35),0_0_30px_rgba(217,70,239,0.2)]',
      chips: ['Heidelberg Multi-Color', '2400 DPI UV Flatbed', 'Material Quality Check'],
      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 text-fuchsia-600" />,
      cornerClass: 'md:rounded-tl-[3.5rem] lg:rounded-tl-[4.5rem]',
      headerPadding: 'md:pl-18',
      contentPadding: 'md:pl-14 lg:md:pl-18 md:pt-3',
      footerPadding: '',
      watermarkPos: 'bottom-3 right-5',
      orderClass: 'order-3 md:order-4'
    },
    {
      step: '04',
      title: valueProps[3]?.title || 'On-Time, Every Time',
      desc: valueProps[3]?.description || 'Rigorous quality check at every finishing station, insured industrial packing, and door-to-desk logistics throughout India.',
      themeColor: '#06b6d4',
      themeGradient: 'from-cyan-500 to-cyan-600',
      bgGradient: 'bg-gradient-to-br from-white via-white to-cyan-500/[0.04]',
      glowColor: 'bg-cyan-400/10 group-hover:bg-cyan-400/25',
      watermarkColor: 'group-hover:text-cyan-500/10',
      iconBg: 'bg-cyan-50 border border-cyan-200/70',
      hoverBorder: 'hover:border-cyan-400',
      hoverShadow: 'hover:shadow-[0_28px_60px_-10px_rgba(6,182,212,0.35),0_0_30px_rgba(6,182,212,0.2)]',
      chips: ['Guaranteed SLA Dispatch', 'Pan-India Freight', 'Insured Packing'],
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-600" />,
      cornerClass: 'md:rounded-tr-[3.5rem] lg:rounded-tr-[4.5rem]',
      headerPadding: '',
      contentPadding: 'md:pr-14 lg:md:pr-18 md:pt-3',
      footerPadding: '',
      watermarkPos: 'bottom-3 right-5',
      orderClass: 'order-4 md:order-3'
    }
  ];

  return (
    <div className="relative w-full max-w-6xl lg:max-w-7xl mx-auto py-3 sm:py-4">
      {/* 2x2 Grid with Enhanced Zoom-In Interactive Hover Effect */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 relative z-10">
        {standardsData.map((item) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.06, y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            className={`relative rounded-2xl p-4 sm:p-5 border border-[#dbe4ee] ${item.bgGradient} ${item.hoverBorder} ${item.hoverShadow} transition-[border-color,box-shadow,background-color] duration-300 overflow-hidden group ${item.cornerClass} ${item.orderClass} min-h-[195px] flex flex-col justify-between shadow-subtle z-10 hover:z-40 cursor-pointer will-change-transform`}
          >
            {/* Top Color Accent Line */}
            <div
              className={`absolute top-0 left-0 right-0 h-[3px] group-hover:h-[4.5px] bg-gradient-to-r ${item.themeGradient} transition-all duration-300`}
            />

            {/* Ambient Corner Glow Effect */}
            <div
              className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl pointer-events-none transition-all duration-500 ${item.glowColor}`}
            />

            {/* Large Translucent Background Watermark Number */}
            <span
              className={`absolute ${item.watermarkPos} text-5xl sm:text-6xl font-serif font-black text-slate-900/[0.03] select-none pointer-events-none transition-all duration-500 ${item.watermarkColor} group-hover:scale-125`}
            >
              {item.step}
            </span>

            {/* Content Top Body */}
            <div className={item.contentPadding}>
              {/* Header Row: STANDARD 0X and PRODUCTION STANDARD */}
              <div className={`flex items-center justify-between gap-3 mb-2 ${item.headerPadding}`}>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-white text-[9.5px] font-bold tracking-wider uppercase shadow-xs bg-gradient-to-r ${item.themeGradient}`}
                  >
                    STANDARD {item.step}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-[#56667a]">
                    {tr('Production Standard')}
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-lg ${item.iconBg} flex items-center justify-center shrink-0 shadow-xs group-hover:scale-120 group-hover:rotate-6 transition-transform duration-300`}>
                  {item.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="font-serif text-[15px] sm:text-base font-bold text-[#0f2a4a] leading-tight mb-1 group-hover:text-[#1f66a8] transition-colors">
                {tr(item.title)}
              </h3>

              {/* Description */}
              <p className="text-[11px] text-[#56667a] leading-snug mb-2">
                {item.desc}
              </p>

              {/* Feature Chips */}
              <div className="flex items-center gap-1.5 flex-wrap">
                {item.chips.map((chip, cIdx) => (
                  <span
                    key={cIdx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#edf3f9]/70 text-[#0f2a4a] text-[9px] font-medium border border-[#dbe4ee]/60 group-hover:border-[#15b498]/30 transition-colors"
                  >
                    <span className="w-1 h-1 rounded-full" style={{ backgroundColor: item.themeColor }} />
                    {chip}
                  </span>
                ))}
              </div>
            </div>

            {/* Quality Checked Footer Tag */}
            <div className={`pt-2 mt-1 border-t border-[#edf3f9] flex items-center gap-2 text-[10px] font-semibold text-[#0f2a4a] ${item.footerPadding}`}>
              <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: item.themeColor }} />
              <span>{tr('Quality checked')}</span>
              <span className="text-[#dbe4ee]">•</span>
              <span className="text-[#56667a] text-[10px] font-normal">ISO 9001:2015 Protocol</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Central 4-Quadrant Circular Wheel (Compact & Scaled to avoid any collision) */}
      <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none items-center justify-center">
        {/* Soft Ambient Radial Light */}
        <div className="absolute w-40 h-40 rounded-full bg-white/80 blur-md pointer-events-none" />

        <div className="relative w-34 h-34 lg:w-36 lg:h-36 flex items-center justify-center drop-shadow-lg">
          <svg
            viewBox="0 0 240 240"
            className="w-full h-full pointer-events-auto"
          >
            <defs>
              {quadrantArcs.map((q) => (
                <linearGradient key={q.gradId} id={q.gradId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={q.fromColor} />
                  <stop offset="100%" stopColor={q.toColor} />
                </linearGradient>
              ))}
              <filter id="hubShadowComp" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#0f2a4a" floodOpacity="0.18" />
              </filter>
            </defs>

            {/* Subtle Outer Boundary Guide */}
            <circle cx="120" cy="120" r="112" fill="none" stroke="#e2e8f0" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* 4 Quadrant Colored Donut Arcs */}
            {quadrantArcs.map((q) => (
              <g key={q.num} className="transition-transform duration-200 hover:scale-105 transform origin-center cursor-pointer">
                <path
                  d={q.path}
                  fill={`url(#${q.gradId})`}
                />
                <text
                  x={q.textX}
                  y={q.textY}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize="22"
                  fontWeight="800"
                  fontFamily="'Poppins', sans-serif"
                  fill="#ffffff"
                  letterSpacing="-0.5"
                >
                  {q.num}
                </text>
              </g>
            ))}

            {/* Central Elevated White Disc (Fixed upright) */}
            <circle
              cx="120"
              cy="120"
              r="56"
              fill="#ffffff"
              filter="url(#hubShadowComp)"
              stroke="#f1f5f9"
              strokeWidth="2.5"
            />

            {/* 4 Colored Indicator Bars */}
            <g transform="translate(101, 76)">
              <rect x="0" y="14" width="7" height="15" rx="2" fill="#f59e0b" />
              <rect x="11" y="9" width="7" height="20" rx="2" fill="#f97316" />
              <rect x="22" y="5" width="7" height="24" rx="2" fill="#d946ef" />
              <rect x="33" y="0" width="7" height="29" rx="2" fill="#06b6d4" />
            </g>

            {/* Upright Center Branding Text */}
            <text
              x="120"
              y="122"
              textAnchor="middle"
              fontSize="9"
              fontWeight="800"
              fontFamily="'Playfair Display', serif"
              fill="#0f2a4a"
              letterSpacing="0.8"
            >
              4 STANDARDS
            </text>
            <text
              x="120"
              y="132"
              textAnchor="middle"
              fontSize="6.5"
              fontWeight="700"
              fontFamily="'Poppins', sans-serif"
              fill="#56667a"
              letterSpacing="1.2"
            >
              PRECISION QA
            </text>
            <text
              x="120"
              y="141"
              textAnchor="middle"
              fontSize="5.5"
              fontWeight="600"
              fontFamily="'Poppins', sans-serif"
              fill="#15b498"
              letterSpacing="0.8"
            >
              GANESHA
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
