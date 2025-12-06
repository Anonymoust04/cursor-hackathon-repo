import { getProjectById } from '@/lib/db/projects';
import { fallbackOpportunities } from '@/lib/mock-data';
import JobTabs from './JobTabs';
import GoogleMap from '@/components/GoogleMap';

export default async function OpportunityDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;
  
  let project = null;
  
  if (id) {
    // Try to find in mock data first if it looks like a mock ID
    if (id.startsWith('mock-')) {
      project = fallbackOpportunities.find(j => j.id === id) || null;
    } else {
      // Otherwise try to fetch from DB
      project = await getProjectById(id).catch(() => null);
    }
  }

  // Fallback data if project not found or ID is mock
  const fallbackJob = {
    title: "Community Garden Revitalization Project",
    company: "GreenCorp Initiative",
    description: "Join us in transforming an underused urban space into a vibrant community garden. This project aims to create a green oasis that provides fresh, local produce, fosters community engagement, and serves as an educational hub for sustainable urban agriculture. We believe in the power of green spaces to build stronger, healthier communities.",
    location: "Taman KLCC, Jalan Ampang, Kuala Lumpur City Centre, 50088 Kuala Lumpur",
    type: "Volunteer",
    start_time: "June 1",
    end_time: "August 31",
    cause_tags: ["Environment", "Community"],
    time_commitment: "5-10 hours / week",
    requirements: "No prior gardening experience required. Willingness to work outdoors and get hands dirty. Team player attitude.",
    benefits: "Learn about urban agriculture. Meet like-minded community members. Take home fresh produce.",
    company_description: "GreenCorp Initiative is a non-profit organization dedicated to creating sustainable urban green spaces.",
    image_url: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=1200&h=400&fit=crop",
    company_logo_url: "https://via.placeholder.com/64?text=GreenCorp"
  };

  const displayJob = project ? {
    title: project.title,
    company: (project as any).company_name || 'Unknown Company',
    description: project.description,
    location: project.location || 'Remote',
    type: project.type.charAt(0).toUpperCase() + project.type.slice(1),
    start_time: project.start_time ? new Date(project.start_time).toLocaleDateString() : 'TBD',
    end_time: project.end_time ? new Date(project.end_time).toLocaleDateString() : 'TBD',
    cause_tags: project.cause_tags || [],
    time_commitment: (project as any).time_commitment || 'TBD',
    requirements: (project as any).requirements,
    benefits: (project as any).benefits,
    company_description: (project as any).company_description,
    image_url: (project as any).image_url || fallbackJob.image_url,
    company_logo_url: (project as any).company_logo_url || fallbackJob.company_logo_url
  } : fallbackJob;

  return (
    <div className="flex flex-col min-h-screen bg-background-light light">
      <main className="flex flex-1 justify-center bg-background-light py-8 px-4">
        <div className="layout-content-container flex flex-col w-full max-w-7xl">
          <div className="flex flex-wrap gap-2 pb-6">
            <a className="text-muted text-sm font-medium leading-normal hover:text-primary" href="/opportunity-marketplace">Opportunities</a>
            <span className="text-muted text-sm font-medium leading-normal">/</span>
            <span className="text-foreground text-sm font-medium leading-normal">{displayJob.title}</span>
          </div>
          <div 
            className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-xl min-h-[280px]" 
            data-alt={displayJob.title}
            style={{ backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 40%), url("${displayJob.image_url}")` }}
          >
            <div className="flex items-end p-6 gap-4">
              <div>
                <h1 className="text-white tracking-tight text-3xl font-bold leading-tight">{displayJob.title}</h1>
                <p className="text-white/90 text-lg">{displayJob.company}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            <JobTabs 
              description={
                <>
                  <p>{displayJob.description}</p>
                  <div className="pt-4">
                    <h3 className="text-foreground text-lg font-bold mb-3">Location</h3>
                    <div className="aspect-video w-full rounded-lg overflow-hidden border border-border">
                      <GoogleMap location={displayJob.location} />
                    </div>
                  </div>
                </>
              }
              requirements={displayJob.requirements}
              benefits={displayJob.benefits}
              companyName={displayJob.company}
              companyDescription={displayJob.company_description}
            />
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
