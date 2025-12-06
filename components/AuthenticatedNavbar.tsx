"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import PostGigModal from './PostGigModal';
import { clearProjectsCache } from '@/app/actions/auth';

export default function AuthenticatedNavbar() {
  const [isPostGigModalOpen, setIsPostGigModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSignOut = async () => {
    await clearProjectsCache();
    await supabase.auth.signOut();
    // Clear any client-side caches if necessary
    router.refresh();
    router.push('/login');
  };

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
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 cursor-pointer hover:opacity-80 transition-opacity" 
                  data-alt="User avatar" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuASrFreYhsy6hvjXVNqzCaf6RyqYmLJD6nKRNneQTxQmTvHCxuz2zsRZ9JfXUFBByMW0g4lXtpwnADEtS2Wm9SB7ExNEH9pA2bWSi44L7huQVmlBWNMdmgXBNgOQl86FMMGHIQWrvLovib3alIms0Ix2gD3i31PAA0wAZLWe971S4cpSTHnwexrWFKYZ2E6bJJhz8bGb0ue9OJuHE6Dza1I7ki-d0G5w79oGaDMWYshYpQfEI85f596jl2FKOlm7nWcV07lK6WmlSE")' }}
                ></button>
                
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <button
                      onClick={handleSignOut}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
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
