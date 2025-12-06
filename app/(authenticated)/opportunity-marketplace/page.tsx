import React from 'react';
import Link from 'next/link';

export default function OpportunityMarketplace() {
  return (
    <main className="w-full">
      <div className="bg-slate-800 text-white py-16 px-4 sm:px-6 lg:px-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight mb-4">Opportunity Marketplace</h1>
        <p className="max-w-2xl mx-auto text-lg text-slate-300">Discover the best remote and work from home jobs at top remote companies.</p>
      </div>
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 -mt-12">
        <div className="bg-white rounded-xl shadow-lg p-2 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-center gap-2">
            <div className="relative lg:col-span-2">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="w-full h-12 pl-10 pr-4 rounded-lg border-transparent focus:ring-primary focus:border-primary" placeholder="Job title or keyword" type="text" />
            </div>
            <div className="relative md:border-l md:border-slate-200">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">location_on</span>
              <input className="w-full h-12 pl-10 pr-4 rounded-lg border-transparent focus:ring-primary focus:border-primary" placeholder="Country or time zone" type="text" />
            </div>
            <div className="flex items-center gap-4 lg:col-span-2 justify-end">
              <button className="text-sm font-medium text-text-secondary hover:text-primary px-4">Clear</button>
              <button className="flex-1 lg:flex-none h-12 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 px-8">Search</button>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-6">
          <button className="flex items-center justify-center gap-x-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary border border-slate-200">
            <span>Experience Level</span>
            <span className="material-symbols-outlined text-base">expand_more</span>
          </button>
          <button className="flex items-center justify-center gap-x-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary border border-slate-200">
            <span>Company</span>
            <span className="material-symbols-outlined text-base">expand_more</span>
          </button>
          <button className="flex items-center justify-center gap-x-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary border border-slate-200">
            <span>Opportunity Type</span>
            <span className="material-symbols-outlined text-base">expand_more</span>
          </button>
          <button className="flex items-center justify-center gap-x-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary border border-slate-200">
            <span>Salary</span>
            <span className="material-symbols-outlined text-base">expand_more</span>
          </button>
          <button className="flex items-center justify-center gap-x-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-text-secondary hover:text-primary border border-slate-200">
            <span>Markets</span>
            <span className="material-symbols-outlined text-base">expand_more</span>
          </button>
        </div>
      </div>
      <main className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="xl:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-text-primary">Recommended jobs <span className="text-text-secondary font-normal">61,543</span></h2>
              <div className="flex items-center gap-2">
                <p className="text-sm text-text-secondary">Sort by:</p>
                <button className="text-sm font-semibold text-text-primary">Last updated</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col">
                <div className="h-40 bg-slate-200 rounded-t-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-slate-400" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-text-primary text-lg leading-tight">UX/UI Designer for Non-Profit</h3>
                  <p className="text-sm text-text-secondary mt-1">Tech for Good Inc.</p>
                  <p className="text-sm text-text-secondary mt-2 line-clamp-2 flex-grow">Design user-centric interfaces for our non-profit platform to enhance social impact.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Full Time</span>
                    <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-800 rounded-full">Remote</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <Link href="/opportunity-details" className="w-full h-10 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 transition-colors text-sm flex items-center justify-center">View Opportunity</Link>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col">
                <div className="h-40 bg-slate-200 rounded-t-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-slate-400">image</span>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-text-primary text-lg leading-tight">Social Media Manager</h3>
                  <p className="text-sm text-text-secondary mt-1">GreenFuture Org.</p>
                  <p className="text-sm text-text-secondary mt-2 line-clamp-2 flex-grow">Create engaging social media content to promote environmental awareness and initiatives.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Part Time</span>
                    <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-800 rounded-full">Remote</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <Link href="/opportunity-details" className="w-full h-10 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 transition-colors text-sm flex items-center justify-center">View Opportunity</Link>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col">
                <div className="h-40 bg-slate-200 rounded-t-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-slate-400">image</span>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-text-primary text-lg leading-tight">Community Garden Volunteer</h3>
                  <p className="text-sm text-text-secondary mt-1">Local Community Group</p>
                  <p className="text-sm text-text-secondary mt-2 line-clamp-2 flex-grow">Help cultivate a community garden, fostering local food security and green spaces.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Volunteer</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <Link href="/opportunity-details" className="w-full h-10 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 transition-colors text-sm flex items-center justify-center">View Opportunity</Link>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:border-primary transition-all duration-300 flex flex-col">
                <div className="h-40 bg-slate-200 rounded-t-xl flex items-center justify-center">
                  <span className="material-symbols-outlined text-5xl text-slate-400">image</span>
                </div>
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-bold text-text-primary text-lg leading-tight">Grant Writer</h3>
                  <p className="text-sm text-text-secondary mt-1">Education for All Foundation</p>
                  <p className="text-sm text-text-secondary mt-2 line-clamp-2 flex-grow">Secure funding for educational programs by writing compelling grant proposals.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-800 rounded-full">Contract</span>
                    <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-800 rounded-full">Remote</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200">
                    <Link href="/opportunity-details" className="w-full h-10 rounded-lg bg-primary text-white font-semibold hover:bg-opacity-90 transition-colors text-sm flex items-center justify-center">View Opportunity</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xl:block">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold text-text-primary mb-6">Jobs near you</h2>
              <div className="relative w-full h-[600px] bg-slate-200 rounded-xl border border-slate-200 overflow-hidden">
                <img alt="Geolocation map showing job locations" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7_jdWhpO7-qAPJXzb8Mmhyj083NIQlGXe2JilNvtmNJzcHIJZqizuBI-04I3zleJVITCJIx9GOD9tuIPkVXD19cvMLu_jB1dnDOqeCeT68Km7FOup3XDl0DumNqWDmS9thqdvKmSv3afelVUXkkVNWNJqUuBR9rr0j9TGEorqjkCXuKkXbrFnEhNa-OUc7iie95rj0r_mi0jaOV7GokO5pT04e8eRzN8hMAw7-gn37Vo7rEPBAlIrfI6o-J-ItuUrPQLBtCsI9Js" />
                <div className="absolute top-4 left-4 right-4 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-slate-200">
                  <p className="text-sm font-semibold text-text-primary">Showing opportunities within a <span className="text-primary">50km</span> radius.</p>
                </div>
                <div className="absolute" style={{ top: '25%', left: '40%' }}>
                  <div className="relative group">
                    <div className="w-12 h-12 bg-white rounded-full p-1 shadow-lg">
                      <div className="w-full h-full bg-primary rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 text-white">
                          <svg className="w-8 h-8" fill="none" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.0132 3.52686L10.3952 20.3529H20.254L18.9868 36.4731L29.6048 19.6471H19.746L21.0132 3.52686Z" fill="currentColor"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-full mb-2 w-48 bg-white p-3 rounded-lg shadow-lg border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none left-1/2 -translate-x-1/2">
                      <h4 className="font-bold text-sm text-text-primary">UX/UI Designer</h4>
                      <p className="text-xs text-text-secondary">Tech for Good Inc.</p>
                    </div>
                  </div>
                </div>
                <div className="absolute" style={{ top: '35%', left: '70%' }}>
                  <div className="relative group">
                    <div className="w-12 h-12 bg-white rounded-full p-1 shadow-lg">
                      <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-white" style={{ fontSize: '28px' }}>public</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute" style={{ top: '50%', left: '55%' }}>
                  <div className="relative group">
                    <div className="w-12 h-12 bg-white rounded-full p-1 shadow-lg">
                      <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-white" style={{ fontSize: '28px' }}>sync</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute" style={{ top: '70%', left: '45%' }}>
                  <div className="relative group">
                    <div className="w-12 h-12 bg-white rounded-full p-1 shadow-lg">
                      <div className="w-full h-full bg-slate-800 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-white" style={{ fontSize: '28px' }}>spa</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center gap-2">
                  <button className="size-10 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-200 hover:bg-slate-50">
                    <span className="material-symbols-outlined text-text-secondary">add</span>
                  </button>
                  <button className="size-10 rounded-full bg-white shadow-md flex items-center justify-center border border-slate-200 hover:bg-slate-50">
                    <span className="material-symbols-outlined text-text-secondary">remove</span>
                  </button>
                  <div className="flex-grow"></div>
                  <button className="h-10 px-4 rounded-full bg-white shadow-md flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50">
                    <span className="material-symbols-outlined text-text-secondary">my_location</span>
                    <span className="text-sm font-medium text-text-secondary">My location</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </main>
  );
}
