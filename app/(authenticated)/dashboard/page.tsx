'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { getUserProfiles, ApplicantProfile, PosterProfile } from '@/lib/profiles';
import { getProjectsByIds, getAllProjectIdsFromProfiles, Project } from '@/lib/projects';

interface DashboardData {
  applicantProfile: ApplicantProfile | null;
  posterProfile: PosterProfile | null;
  projects: Project[];
  completedProjects: Project[];
  totalProjectsCompleted: number;
  totalHours: number;
}

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [data, setData] = useState<DashboardData>({
    applicantProfile: null,
    posterProfile: null,
    projects: [],
    completedProjects: [],
    totalProjectsCompleted: 0,
    totalHours: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        // Get user ID from URL params, or use current logged-in user
        const userIdParam = searchParams?.get('userId');
        let targetUserId: string | null = null;

        if (userIdParam) {
          // Viewing another user's profile
          targetUserId = userIdParam;
        } else {
          // Viewing own profile - get current user session
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();
          
          if (sessionError || !session?.user) {
            setError('Please log in to view your profile');
            setIsLoading(false);
            return;
          }
          
          targetUserId = session.user.id;
        }

        if (!targetUserId) {
          setError('User ID not found');
          setIsLoading(false);
          return;
        }

        // Get user profiles for the target user
        const profiles = await getUserProfiles(targetUserId);
        
        if (!profiles.applicant && !profiles.poster) {
          setError('User profile not found');
          setIsLoading(false);
          return;
        }

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
        const allProjects = await getProjectsByIds(allProjectIds);
        
        // Filter completed projects (only show projects from projects_completed arrays)
        const completedProjectIds = new Set<string>();
        profiles.applicant?.projects_completed?.forEach(id => completedProjectIds.add(id));
        profiles.poster?.projects_completed?.forEach(id => completedProjectIds.add(id));
        
        const completedProjects = allProjects.filter(p => completedProjectIds.has(p.id));

        setData({
          applicantProfile: profiles.applicant,
          posterProfile: profiles.poster,
          projects: allProjects, // All projects (completed, ongoing, applied to, inviting applications)
          completedProjects, // Just completed projects for the "Projects Completed" section
          totalProjectsCompleted,
          totalHours,
        });
        setError(null);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
        setError('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboardData();
  }, [searchParams]);

  if (isLoading) {
    return (
      <main className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
        <div className="flex items-center justify-center h-64">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">{error}</p>
        </div>
      </main>
    );
  }

  // Determine display name and bio - prioritize applicant profile
  const displayName = 
    data.applicantProfile?.full_name || 
    data.posterProfile?.full_name || 
    data.posterProfile?.organization_name || 
    'User';
  
  const displayBio = 
    data.applicantProfile?.characteristics?.bio || 
    data.posterProfile?.organization_description || 
    'No bio available.';

  // Get avatar URL - prioritize applicant profile, fallback to poster
  const avatarUrl = 
    data.applicantProfile?.avatar_url || 
    data.posterProfile?.avatar_url || 
    '';

  // Get set of completed project IDs for filtering
  const completedProjectIds = new Set<string>();
  data.applicantProfile?.projects_completed?.forEach(id => completedProjectIds.add(id));
  data.posterProfile?.projects_completed?.forEach(id => completedProjectIds.add(id));

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
          </div>
        </section>
        <section className="border-t border-border-light pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-4">
            <h2 className="text-text-light text-xl font-bold leading-tight">Projects Completed</h2>
          </div>
        </section>
        <section className="p-4">
          {data.projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-gray-500 text-base">No projects to display yet.</p>
              <p className="text-gray-400 text-sm mt-2">Start by applying to opportunities or posting your own projects!</p>
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
              {data.projects.map((project) => {
                // Determine if project is completed (for visual indicator if needed)
                const isCompleted = completedProjectIds.has(project.id);
                
                return (
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
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
