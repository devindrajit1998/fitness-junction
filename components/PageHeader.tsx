'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
}

export default function PageHeader({ title, subtitle, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="relative py-24 md:py-32 bg-[#0F1420] overflow-hidden border-b border-[#242424]">
      {/* Background Image with dark overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url('/images/real/3.jpg')" }}
      />
      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#101520] via-[#101520]/80 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {subtitle && (
          <span className="inline-block text-[#6EFF8F] font-['Rajdhani',sans-serif] font-bold text-sm sm:text-base tracking-widest uppercase mb-2">
            {subtitle}
          </span>
        )}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-['Rajdhani',sans-serif] text-white uppercase tracking-wide">
          {title}
        </h1>

        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mt-4 flex items-center justify-center gap-2 text-sm font-['Rajdhani',sans-serif] uppercase font-semibold text-[#A3A3A3]">
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <React.Fragment key={item.label + idx}>
                {item.href && !isLast ? (
                  <Link href={item.href} className="hover:text-[#6EFF8F] transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-[#6EFF8F]' : ''}>{item.label}</span>
                )}
                {!isLast && <ChevronRight className="w-3.5 h-3.5 text-gray-600" />}
              </React.Fragment>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
