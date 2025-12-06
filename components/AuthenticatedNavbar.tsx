"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import PostGigModal from './PostGigModal';

export default function AuthenticatedNavbar() {
  const [isPostGigModalOpen, setIsPostGigModalOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background-light/80 backdrop-blur-sm border-b border-solid border-border-light">
        <div className="flex justify-center px-4 sm:px-8 md:px-20 lg:px-40">
          <div className="flex w-full max-w-7xl items-center justify-between whitespace-nowrap px-4 md:px-10 py-3">
            <div className="flex items-center gap-4 text-text-light">
              <div className="size-8 text-primary">
                <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25.6 4.35 6.45 25.9h14.7L18 43.65 37.15 22.1H22.45L25.6 4.35Z"></path>
                </svg>
              </div>
              <h2 className="text-text-light text-lg font-bold leading-tight tracking-[-0.015em]">ImpactHub</h2>
            </div>
            <div className="hidden lg:flex flex-1 justify-end gap-8">
              <div className="flex items-center gap-9">
                <Link className="text-text-light text-sm font-medium leading-normal hover:text-primary" href="/dashboard">Dashboard</Link>
                <Link className="text-text-light text-sm font-medium leading-normal hover:text-primary" href="/opportunity-marketplace">Marketplace</Link>
              </div>
              <button 
                onClick={() => setIsPostGigModalOpen(true)}
                className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:opacity-90 transition-opacity"
              >
                <span className="truncate">Post a Gig</span>
              </button>
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
                data-alt="User avatar" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASrFreYhsy6hvjXVNqzCaf6RyqYmLJD6nKRNneQTxQmTvHCxuz2zsRZ9JfXUFBByMW0g4lXtpwnADEtS2Wm9SB7ExNEH9pA2bWSi44L7huQVmlBWNMdmgXBNgOQl86FMMGHIQWrvLovib3alIms0Ix2gD3i31PAA0wAZLWe971S4cpSTHnwexrWFKYZ2E6bJJhz8bGb0ue9OJuHE6Dza1I7ki-d0G5w79oGaDMWYshYpQfEI85f596jl2FKOlm7nWcV07lK6WmlSE")' }}
              ></div>
            </div>
            <button className="lg:hidden text-text-light">
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </div>
      </header>
      <PostGigModal isOpen={isPostGigModalOpen} onClose={() => setIsPostGigModalOpen(false)} />
    </>
  );
}
