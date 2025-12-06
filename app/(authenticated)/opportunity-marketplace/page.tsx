import Link from 'next/link';
import { getJobs } from '@/lib/db/jobs';
import { fallbackOpportunities } from '@/lib/mock-data';
import JobsMap from '@/components/JobsMap';

export default async function OpportunityMarketplace({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const jobs = await getJobs(undefined, { search: q }).catch(() => []);

  let opportunities = jobs?.map((job: any) => ({
    id: job.id,
    title: job.title,
    company: job.company_name || 'Unknown Company',
    description: job.description,
    tags: [...(job.cause_tags || []), job.type.charAt(0).toUpperCase() + job.type.slice(1)],
    icon: 'work', // Default icon
    iconFilled: false,
    location: job.location
  })) || [];

  if (opportunities.length === 0 && !q) {
    opportunities = fallbackOpportunities;
  }

  return (
    <main className="w-full">
      <div className="bg-slate-800 text-white py-16 px-4 sm:px-6 lg:px-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">Opportunity Marketplace</h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-300">Discover the best remote and work from home jobs at top remote companies.</p>
      </div>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 -mt-12">
        <div className="bg-white rounded-xl shadow-lg p-2 border border-slate-200">
          <form action="/opportunity-marketplace" method="get" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-center gap-2">
            <div className="relative lg:col-span-3">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input 
                name="q"
                defaultValue={q}
                className="w-full h-12 pl-10 pr-4 rounded-lg border-transparent focus:ring-primary focus:border-primary" 
                placeholder="Job title or keyword" 
                type="text" 
              />
            </div>
            <div className="flex items-center gap-4 lg:col-span-2 justify-end">
              <Link href="/opportunity-marketplace" className="text-sm font-medium text-text-secondary hover:text-primary px-4">Clear</Link>
              <button type="submit" className="flex-1 lg:flex-none h-12 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 px-8">Search</button>
            </div>
          </form>
        </div>
      </div>
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Recommended jobs <span className="text-text-secondary font-normal">{opportunities.length}</span></h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunities.map((opportunity) => (
                <div key={opportunity.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col">
                  <div className="h-40 bg-slate-200 rounded-t-xl flex items-center justify-center">
                    <span 
                      className="material-symbols-outlined text-5xl text-slate-400" 
                      style={opportunity.iconFilled ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      {opportunity.icon}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col grow">
                    <h3 className="font-bold text-text-primary text-lg leading-tight">{opportunity.title}</h3>
                    <p className="text-sm text-text-secondary mt-1">{opportunity.company}</p>
                    <p className="text-sm text-text-secondary mt-2 line-clamp-2 grow">{opportunity.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {opportunity.tags.map((tag, index) => (
                        <span 
                          key={index} 
                          className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            tag === 'Remote' 
                              ? 'bg-purple-100 text-purple-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <Link href={`/opportunity-details?id=${opportunity.id}`} className="w-full h-10 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 transition-colors text-sm flex items-center justify-center">View Opportunity</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden xl:block">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold text-text-primary mb-6">Jobs near you</h2>
              <JobsMap opportunities={opportunities} />
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
