'use client';

import { useState, useEffect } from 'react';

interface CompanyLogoProps {
  src: string;
  alt: string;
  className?: string;
}

export default function CompanyLogo({ src, alt, className }: CompanyLogoProps) {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      alt={alt}
      className={className}
      src={imgSrc}
      onError={() => {
        setImgSrc("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64'%3E%3Crect fill='%23e5e7eb' width='64' height='64'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='system-ui' font-size='12' fill='%236b7280'%3ELogo%3C/text%3E%3C/svg%3E");
      }}
    />
  );
}
