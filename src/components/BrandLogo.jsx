import React from 'react';

export default function BrandLogo({ className = '', compact = false }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className={`relative shrink-0 overflow-hidden ${compact ? 'h-6 w-9' : 'h-8 w-11'}`} aria-hidden="true">
        <img
          src="/logo.png"
          alt=""
          className={`absolute left-1/2 top-0 max-w-none -translate-x-1/2 ${compact ? 'w-[4.5rem]' : 'w-[5.5rem]'}`}
        />
      </span>
      <span className="flex flex-col leading-none whitespace-nowrap">
        <span className={`font-serif font-bold tracking-tight text-[#1f66a8] ${compact ? 'text-sm' : 'text-base'}`}>GANESHA</span>
        <span className={`font-serif font-semibold tracking-wide text-[#15a98f] ${compact ? 'text-[9px]' : 'text-[10px]'}`}>ENTERPRISES</span>
      </span>
    </span>
  );
}
