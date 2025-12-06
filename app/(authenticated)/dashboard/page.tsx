'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { getUserProfiles, ApplicantProfile, PosterProfile } from '@/lib/profiles';
import { getProjectsByIds, getAllProjectIdsFromProfiles, Project } from '@/lib/projects';

interface DashboardData {
  user: {
    email: string | undefined;
  } | null;
  applicantProfile: ApplicantProfile | null;
  posterProfile: PosterProfile | null;
  projects: Project[];
  totalProjectsCompleted: number;
  totalHours: number;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>({
    user: null,
    applicantProfile: null,
    posterProfile: null,
    projects: [],
    totalProjectsCompleted: 0,
    totalHours: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'all' | 'projects' | 'badges' | 'skills'>('all');

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Get current user session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session?.user) {
          console.error('No session found');
          setIsLoading(false);
          return;
        }

        // Get user profiles
        const profiles = await getUserProfiles(session.user.id);

        // Calculate total projects completed (from both profiles)
        const applicantCompleted = profiles.applicant?.projects_completed?.length || 0;
        const posterCompleted = profiles.poster?.projects_completed?.length || 0;
        const totalProjectsCompleted = applicantCompleted + posterCompleted;

        // Get total hours (from applicant profile only)
        const totalHours = profiles.applicant?.impact_hours || 0;

        // Get all unique project IDs from both profiles
        const allProjectIds = getAllProjectIdsFromProfiles(
          profiles.applicant,
          profiles.poster
        );

        // Fetch all projects
        const projects = await getProjectsByIds(allProjectIds);

        setData({
          user: { email: session.user.email },
          applicantProfile: profiles.applicant,
          posterProfile: profiles.poster,
          projects,
          totalProjectsCompleted,
          totalHours,
        });
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <main className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </main>
    );
  }

  // Determine display name and bio
  const displayName = 
    data.applicantProfile?.full_name || 
    data.posterProfile?.full_name || 
    data.posterProfile?.organization_name || 
    'User';
  
  const displayBio = 
    data.applicantProfile?.characteristics?.bio || 
    data.posterProfile?.organization_description || 
    'No bio available.';

  // Get avatar URL
  const avatarUrl = 
    data.applicantProfile?.avatar_url || 
    data.posterProfile?.avatar_url || 
    '';

  // Filter projects based on active filter
  const displayedProjects = data.projects.filter(project => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'projects') return true; // Show all projects for now
    return false; // Badges and skills not implemented yet
  });

  return (
    <main className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col w-full max-w-7xl flex-1 gap-8">
        <section>
          <div className="flex p-4 @container">
            <div className="flex w-full flex-col gap-6 @[520px]:flex-row @[520px]:justify-between @[520px]:items-center">
              <div className="flex gap-6 items-center">
                <div 
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-full min-h-32 w-32 shrink-0 bg-gray-200" 
                  data-alt={`Profile picture of ${displayName}`}
                  style={avatarUrl ? { backgroundImage: `url("${avatarUrl}")` } : {}}
                ></div>
                <div className="flex flex-col justify-center">
                  <p className="text-text-light text-[28px] font-bold leading-tight tracking-[-0.015em]">{displayName}</p>
                  {data.posterProfile?.organization_name && data.applicantProfile && (
                    <p className="text-gray-400 text-sm mt-1">
                      {data.posterProfile.organization_name}
                    </p>
                  )}
                  <p className="text-gray-500 text-base font-normal leading-normal mt-1">{displayBio}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex flex-wrap gap-4 px-4 py-3">
            <div className="flex min-w-[140px] flex-1 basis-[fit-content] flex-col gap-2 rounded-xl border border-border-light bg-white p-4 items-start shadow-sm">
              <p className="text-text-light tracking-light text-3xl font-bold leading-tight">{data.totalProjectsCompleted}</p>
              <div className="flex items-center gap-2"><p className="text-gray-500 text-sm font-normal leading-normal">Projects Completed</p></div>
            </div>
            {data.applicantProfile && (
              <div className="flex min-w-[140px] flex-1 basis-[fit-content] flex-col gap-2 rounded-xl border border-border-light bg-white p-4 items-start shadow-sm">
                <p className="text-text-light tracking-light text-3xl font-bold leading-tight">{data.totalHours.toLocaleString()}</p>
                <div className="flex items-center gap-2"><p className="text-gray-500 text-sm font-normal leading-normal">Hours Volunteered</p></div>
              </div>
            )}
            {data.posterProfile && (
              <div className="flex min-w-[140px] flex-1 basis-[fit-content] flex-col gap-2 rounded-xl border border-border-light bg-white p-4 items-start shadow-sm">
                <p className="text-text-light tracking-light text-3xl font-bold leading-tight">{data.posterProfile.projects_inviting_applications?.length || 0}</p>
                <div className="flex items-center gap-2"><p className="text-gray-500 text-sm font-normal leading-normal">Active Projects</p></div>
              </div>
            )}
          </div>
        </section>
        <section className="border-t border-border-light pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4">
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg overflow-x-auto">
              <button 
                onClick={() => setActiveFilter('all')}
                className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-md px-4 transition-colors ${
                  activeFilter === 'all' 
                    ? 'bg-white shadow-sm' 
                    : 'hover:bg-white/60'
                }`}
              >
                <p className={`text-sm font-medium leading-normal ${
                  activeFilter === 'all' ? 'text-text-light' : 'text-gray-500'
                }`}>All</p>
              </button>
              <button 
                onClick={() => setActiveFilter('projects')}
                className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-md px-4 transition-colors ${
                  activeFilter === 'projects' 
                    ? 'bg-white shadow-sm' 
                    : 'hover:bg-white/60'
                }`}
              >
                <p className={`text-sm font-medium leading-normal ${
                  activeFilter === 'projects' ? 'text-text-light' : 'text-gray-500'
                }`}>Projects</p>
              </button>
              <button 
                onClick={() => setActiveFilter('badges')}
                className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-md px-4 transition-colors ${
                  activeFilter === 'badges' 
                    ? 'bg-white shadow-sm' 
                    : 'hover:bg-white/60'
                }`}
              >
                <p className={`text-sm font-medium leading-normal ${
                  activeFilter === 'badges' ? 'text-text-light' : 'text-gray-500'
                }`}>Badges</p>
              </button>
              <button 
                onClick={() => setActiveFilter('skills')}
                className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-md px-4 transition-colors ${
                  activeFilter === 'skills' 
                    ? 'bg-white shadow-sm' 
                    : 'hover:bg-white/60'
                }`}
              >
                <p className={`text-sm font-medium leading-normal ${
                  activeFilter === 'skills' ? 'text-text-light' : 'text-gray-500'
                }`}>Skills</p>
              </button>
            </div>
          </div>
        </section>
        <section className="p-4">
          {displayedProjects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-gray-500 text-base">No projects to display yet.</p>
              <p className="text-gray-400 text-sm mt-2">Start by applying to opportunities or posting your own projects!</p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {displayedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end p-4 aspect-[3/4] mb-4 break-inside-avoid-column relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform"
                  data-alt={project.title}
                  style={{
                    backgroundImage: project.image_url
                      ? `linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url("${project.image_url}")`
                      : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                  onClick={() => window.location.href = `/opportunities/${project.id}`}
                >
                  <p className="text-white text-base font-bold leading-tight line-clamp-3">{project.title}</p>
                  {project.company_name && (
                    <p className="text-white/80 text-sm line-clamp-1">{project.company_name}</p>
                  )}
                </div>
              ))}
              {/* Placeholder badges and skills - to be implemented later */}
              {activeFilter === 'all' && (
                <>
                  <div className="bg-white rounded-lg p-4 mb-4 break-inside-avoid-column flex flex-col items-center justify-center gap-3 text-center border border-border-light">
                    <span className="material-symbols-outlined text-primary text-6xl">workspace_premium</span>
                    <h3 className="font-bold text-text-light">Community Leader</h3>
                    <p className="text-xs text-gray-500">Awarded for organizing 3+ events.</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 mb-4 break-inside-avoid-column flex flex-col items-center justify-center gap-3 text-center border border-border-light">
                    <span className="material-symbols-outlined text-primary text-6xl">campaign</span>
                    <h3 className="font-bold text-text-light">Public Speaking</h3>
                    <p className="text-xs text-gray-500">Validated by 5 connections.</p>
                  </div>
                </>
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
