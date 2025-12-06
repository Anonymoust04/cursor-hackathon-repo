'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function SearchForm() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get('q') || '';
  const initialDistance = searchParams.get('distance') || '50';
  
  const [distance, setDistance] = useState(initialDistance);
  const [q, setQ] = useState(initialQ);

  return (
    <form action="/opportunity-marketplace" method="get" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 items-center gap-4">
      <div className="relative lg:col-span-5">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
        <input 
          name="q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="w-full h-12 pl-10 pr-4 rounded-lg border border-slate-200 focus:ring-primary focus:border-primary" 
          placeholder="Job title or keyword" 
          type="text" 
        />
      </div>
      
      <div className="lg:col-span-4 flex flex-col justify-center px-2">
        <div className="flex justify-between items-center mb-1">
          <label htmlFor="distance" className="text-sm font-medium text-text-secondary">Distance</label>
          <span className="text-sm font-bold text-primary">{distance} km</span>
        </div>
        <input 
          id="distance"
          name="distance"
          type="range" 
          min="10" 
          max="100" 
          step="10"
          value={distance} 
          onChange={(e) => setDistance(e.target.value)}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
        />
      </div>

      <div className="flex items-center gap-2 lg:col-span-3 justify-end">
        <Link href="/opportunity-marketplace" className="text-sm font-medium text-text-secondary hover:text-primary px-3">Clear</Link>
        <button type="submit" className="flex-1 h-12 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 px-6">Search</button>
      </div>
    </form>
  );
}
