import React from 'react';
import { getJobById } from '@/lib/db/jobs';
import { fallbackOpportunities } from '@/lib/mock-data';

export default async function OpportunityDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;
  
  let job = null;
  
  if (id) {
    // Try to find in mock data first if it looks like a mock ID
    if (id.startsWith('mock-')) {
      job = fallbackOpportunities.find(j => j.id === id) || null;
    } else {
      // Otherwise try to fetch from DB
      job = await getJobById(id).catch(() => null);
    }
  }

  // Fallback data if job not found or ID is mock
  const fallbackJob = {
    title: "Community Garden Revitalization Project",
    company: "GreenCorp Initiative",
    description: "Join us in transforming an underused urban space into a vibrant community garden. This project aims to create a green oasis that provides fresh, local produce, fosters community engagement, and serves as an educational hub for sustainable urban agriculture. We believe in the power of green spaces to build stronger, healthier communities.",
    location: "City Center Park",
    type: "Volunteer",
    start_time: "June 1",
    end_time: "August 31",
    cause_tags: ["Environment", "Community"],
    time_commitment: "5-10 hours / week"
  };

  const displayJob = job ? {
    title: job.title,
    company: (job as any).profiles?.full_name || (job as any).company || 'Unknown Company',
    description: job.description,
    location: job.location || 'Remote',
    type: job.type.charAt(0).toUpperCase() + job.type.slice(1),
    start_time: job.start_time ? new Date(job.start_time).toLocaleDateString() : 'TBD',
    end_time: job.end_time ? new Date(job.end_time).toLocaleDateString() : 'TBD',
    cause_tags: job.cause_tags || [],
    time_commitment: (job as any).time_commitment || 'TBD'
  } : fallbackJob;

  return (
    <div className="flex flex-col min-h-screen bg-background-light light">
      <main className="flex flex-1 justify-center bg-background-light py-8 px-4">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <div className="flex flex-wrap gap-2 pb-6">
            <a className="text-muted text-sm font-medium leading-normal hover:text-primary" href="/opportunity-marketplace">Opportunities</a>
            <span className="text-muted text-sm font-medium leading-normal">/</span>
            <a className="text-muted text-sm font-medium leading-normal hover:text-primary" href="#">Search Results</a>
            <span className="text-muted text-sm font-medium leading-normal">/</span>
            <span className="text-foreground text-sm font-medium leading-normal">{displayJob.title}</span>
          </div>
          <div 
            className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[280px]" 
            data-alt="Volunteers working in a lush community garden with sun shining through the trees." 
            style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDd4OaiLwt-dwls9l3FBP3KfgY0qr3t0B47TzgIyCW94tC6xPq61VTxE88l5VmH8YZjvoCLpAyjTr69l6LeHbd42i4nWum_n3NE4UImDn7hVVMmzaNoXsbElHUNKjY1Z_zZT6hEExY4YCwSf1p8ZjnIqfRrVOSAqtUe3T0jj58iTuhJJavkulT3RP2a2nL4kspNqXq20zSq7WFV0NxIXy2TKNGkPZyOeDUGyNd6GFOS3GKUG3ss8e0mT1el6SV1YM69nqJdwd1yfWI")' }}
          >
            <div className="flex items-end p-6 gap-4">
              <div className="flex items-center justify-center size-16 bg-white rounded-lg p-2">
                <img alt="GreenCorp Logo" className="h-full w-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHIjmR4iVrIhG0MyG4-9L4jfN3tck_djbgJqT7RBgym2fAxuRzhDI_yt6Z-g7LQiMUp4qhyF4DOeOTJcPe1x606xsobapA2SHTaoD3X_J0LDOCDo1oKmmqfUS1kxtpTW4loUpMvqT9QDkNFW4QjhPXbBRznIZF5-Fq_wQ81T1HNLq5YGBf-XfIgr_zuMc4kxCC7dAw6bsUGrpa-zu9Ba34L6th9njjksMlX78dmi2mGr4N9vMbAoq-jD9PIbg3TxGdpbBSCy69xV0"/>
              </div>
              <div>
                <h1 className="text-white tracking-tight text-3xl font-bold leading-tight">{displayJob.title}</h1>
                <p className="text-white/90 text-lg">{displayJob.company}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2">
              <div className="pb-3">
                <div className="flex border-b border-border gap-8">
                  <a className="flex flex-col items-center justify-center border-b-[3px] border-b-primary text-primary pb-[13px] pt-4" href="#">
                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">Description</p>
                  </a>
                  <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-muted hover:text-foreground pb-[13px] pt-4 transition-colors" href="#">
                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">Requirements</p>
                  </a>
                  <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-muted hover:text-foreground pb-[13px] pt-4 transition-colors" href="#">
                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">What You&apos;ll Gain</p>
                  </a>
                  <a className="flex flex-col items-center justify-center border-b-[3px] border-b-transparent text-muted hover:text-foreground pb-[13px] pt-4 transition-colors" href="#">
                    <p className="text-sm font-bold leading-normal tracking-[0.015em]">About GreenCorp</p>
                  </a>
                </div>
              </div>
              <div className="prose prose-base max-w-none text-foreground pt-4 space-y-4">
                <p>{displayJob.description}</p>
                <div className="pt-4">
                  <h3 className="text-foreground text-lg font-bold mb-3">Location</h3>
                  <div className="aspect-video w-full rounded-lg overflow-hidden border border-border">
                    <img className="w-full h-full object-cover" alt="A map showing the project location in downtown." data-location="City Center Park" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAftR3o1i10kUzKwnWzC4FUlNfaBKUkw9YsDi5VHgsXDdUFhILywvVkVLzWDRMnOq8e-fohkyQ7NPocGxNQn8zPV9n5UjN9Tr73w8OS80scVhsr79r2OwgPe-0Fy5OzIAOlgKDXgrqJblWSV2QVnhcr6SpG_WEA9TSpxB_8y9_edK7YGAhbHYYd_DDHPbGae9jWJ9i5C8B1ZkfaOQQZxgyPBOM8eORo9Ssx1IDx6YEhIFKdOOr7Rojwx6UcSUmm5VTO7hup9_UrK6U"/>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-28 space-y-4">
                <div className="bg-background border border-border rounded-xl p-6 space-y-5">
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary mt-1">calendar_today</span>
                      <div>
                        <p className="font-bold text-sm">Duration</p>
                        <p className="text-sm">{displayJob.start_time} - {displayJob.end_time}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary mt-1">schedule</span>
                      <div>
                        <p className="font-bold text-sm">Time Commitment</p>
                        <p className="text-sm">{displayJob.time_commitment}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary mt-1">location_on</span>
                      <div>
                        <p className="font-bold text-sm">Location</p>
                        <p className="text-sm">{displayJob.location}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <span className="material-symbols-outlined text-primary mt-1">work</span>
                      <div>
                        <p className="font-bold text-sm">Opportunity Type</p>
                        <p className="text-sm">{displayJob.type}</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-border pt-5">
                    <p className="text-center text-sm font-medium">Applications close in <span className="text-primary font-bold">12 days</span></p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary text-primary-content gap-2 text-base font-bold leading-normal tracking-wide hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30">Apply with your Impact Profile</button>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 bg-background text-foreground gap-2 text-sm font-bold leading-normal tracking-wide border border-border hover:bg-secondary transition-colors">
                      <span className="material-symbols-outlined text-xl">bookmark</span>
                      Save for Later
                    </button>
                    <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-11 bg-background text-foreground gap-2 text-sm font-bold leading-normal tracking-wide border border-border hover:bg-secondary transition-colors">
                      <span className="material-symbols-outlined text-xl">share</span>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-secondary mt-16 border-t border-border">
        <div className="w-full max-w-7xl mx-auto py-8 px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-muted">© 2024 ImpactHub. All rights reserved.</p>
          <div className="flex gap-6">
            <a className="text-sm font-medium text-foreground hover:underline" href="#">About Us</a>
            <a className="text-sm font-medium text-foreground hover:underline" href="#">FAQ</a>
            <a className="text-sm font-medium text-foreground hover:underline" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
