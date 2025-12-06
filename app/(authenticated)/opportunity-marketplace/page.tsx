import { getProjects } from '@/lib/db/projects';
import { fallbackOpportunities } from '@/lib/mock-data';
import SearchForm from '@/components/SearchForm';
import OpportunityMarketplaceContent from '@/components/OpportunityMarketplaceContent';

export default async function OpportunityMarketplace({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; distance?: string }>;
}) {
  const { q, distance } = await searchParams;
  const radius = distance ? parseInt(distance) : 50;
  const projects = await getProjects(undefined, { search: q }).catch(() => []);

  let opportunities = projects?.map((project: any) => ({
    id: project.id,
    title: project.title,
    company: project.company_name || 'Unknown Company',
    description: project.description,
    tags: [...(project.cause_tags || []), project.type.charAt(0).toUpperCase() + project.type.slice(1)],
    icon: 'work', // Default icon
    iconFilled: false,
    location: project.location,
    imageUrl: project.image_url || undefined
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
        <div className="bg-white rounded-xl shadow-lg p-4 border border-slate-200">
          <SearchForm />
        </div>
      </div>
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <OpportunityMarketplaceContent opportunities={opportunities} radius={radius} />
      </main>
    </main>
  );
}