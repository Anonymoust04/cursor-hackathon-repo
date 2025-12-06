'use client';

import React, { useState } from 'react';

interface JobTabsProps {
  description: React.ReactNode;
  requirements?: string;
  benefits?: string;
  companyName: string;
  companyDescription?: string;
}

export default function JobTabs({ 
  description, 
  requirements, 
  benefits, 
  companyName, 
  companyDescription 
}: JobTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'requirements' | 'benefits' | 'about'>('description');

  return (
    <div className="lg:col-span-2">
      <div className="pb-3">
        <div className="flex border-b border-border gap-8 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('description')}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors whitespace-nowrap ${
              activeTab === 'description' 
                ? 'border-b-primary text-primary' 
                : 'border-b-transparent text-muted hover:text-foreground'
            }`}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Description</p>
          </button>
          <button 
            onClick={() => setActiveTab('requirements')}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors whitespace-nowrap ${
              activeTab === 'requirements' 
                ? 'border-b-primary text-primary' 
                : 'border-b-transparent text-muted hover:text-foreground'
            }`}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">Requirements</p>
          </button>
          <button 
            onClick={() => setActiveTab('benefits')}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors whitespace-nowrap ${
              activeTab === 'benefits' 
                ? 'border-b-primary text-primary' 
                : 'border-b-transparent text-muted hover:text-foreground'
            }`}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">What You&apos;ll Gain</p>
          </button>
          <button 
            onClick={() => setActiveTab('about')}
            className={`flex flex-col items-center justify-center border-b-[3px] pb-[13px] pt-4 transition-colors whitespace-nowrap ${
              activeTab === 'about' 
                ? 'border-b-primary text-primary' 
                : 'border-b-transparent text-muted hover:text-foreground'
            }`}
          >
            <p className="text-sm font-bold leading-normal tracking-[0.015em]">About {companyName}</p>
          </button>
        </div>
      </div>
      
      <div className="prose prose-base max-w-none text-foreground pt-4 space-y-4 min-h-[300px]">
        {activeTab === 'description' && (
          <div className="whitespace-pre-line">
            {description}
          </div>
        )}
        
        {activeTab === 'requirements' && (
          <div className="whitespace-pre-line">
            {requirements ? requirements : "No specific requirements listed."}
          </div>
        )}
        
        {activeTab === 'benefits' && (
          <div className="whitespace-pre-line">
            {benefits ? benefits : "No specific benefits listed."}
          </div>
        )}
        
        {activeTab === 'about' && (
          <div className="whitespace-pre-line">
            {companyDescription ? companyDescription : `About ${companyName}`}
          </div>
        )}
      </div>
    </div>
  );
}
