import React from 'react';
import AuthenticatedNavbar from '@/components/AuthenticatedNavbar';

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light font-display text-text-light">
      <AuthenticatedNavbar />
      <div className="layout-container flex h-full grow flex-col">
        {children}
      </div>
    </div>
  );
}
