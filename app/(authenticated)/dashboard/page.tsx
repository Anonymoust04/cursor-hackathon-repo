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
        // TODO: Replace hardcoded values with actual database values when data is available
        const totalProjectsCompleted = 6;

        // Get total hours (from applicant profile only)
        // TODO: Replace hardcoded value with actual database value when data is available
        const totalHours = 40;

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
    'Passionate about community service and making a positive impact. Currently associated with University of Malaya. Email: abel.chin@um.edu.my | Location: Kuala Lumpur, Malaysia';

  // Get avatar URL with fallback to placeholder (Chinese man)
  const avatarUrl = 
    data.applicantProfile?.avatar_url || 
    data.posterProfile?.avatar_url || 
    'https://i.pravatar.cc/300?img=68';

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
            <h2 className="text-text-light text-xl font-bold leading-tight">Projects Completed</h2>
          </div>
        </section>
        <section className="p-4">
          <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
            <div 
              className="bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end p-4 aspect-[3/4] mb-4 break-inside-avoid-column relative overflow-hidden group" 
              data-alt="People working in a community garden" 
              style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCQnGdY_HJTw6GGxnvH0wbbjMJkpoEDpEvwrE-TUCmfmXJG6WAuv0nx7Dt0TVo_MpLLGS5Vo_7hnRHX55dCfOo1qSQRLPeZKyQ0Ucy8k4D4ZzD1Sh5TT4xSzvnDaYSe8s4g9rm-LL6JZf7wDU2nKES2etkR8Z4EmKtipaN8ocytzWYEmc8y8lfmREybIx1DKdCD5virrYD7-JIcDhMSvIQKskz68Cqj9CfStGM10VbjN-FuPf5KL7APe91zpguLl_CMI1WOLaHsR7w")' }}
            >
              <p className="text-white text-base font-bold leading-tight line-clamp-3">Community Garden Initiative</p>
            </div>
            <div 
              className="bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end p-4 aspect-[3/4] mb-4 break-inside-avoid-column relative overflow-hidden group" 
              data-alt="Students at a hackathon event" 
              style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDwQMD2jo1-COfb2or7Vzfu-QlPfsnBPR_s8w0SGdgf6hD3ewL6r7eBCD4NcKSkcfLsmFL5nd2oPjNNwM9bWk3EEiE8IeB7ILqnQfL_OkAX6xEdMa-Pfo0kAuOHzgWC4hMjZBNLDbNYjzwK_ieCNwRdnOw_FCYbgP4gCeadTaz3mLFe9Mq9WHJX1NH-ph88jl5lfb0wP4ykvtSnk0lR8MVia_zGcNS6n43SaOdcLwSp1aaPg62qk1yxAbdAM334-RbuH8JegrkRpmo")' }}
            >
              <p className="text-white text-base font-bold leading-tight line-clamp-3">Tech for Good Hackathon</p>
            </div>
            <div 
              className="bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end p-4 aspect-square mb-4 break-inside-avoid-column relative overflow-hidden group" 
              data-alt="Person mentoring a student" 
              style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuB-VXiMe22Wl3Eo9nhLyeDGDWYgl73opCHilMcemVhlz3WmZ570Tx8KoJ1S_ETm2XwPsO-qTzl1vvIw_TjkuOnr3VvhrIg-VNCgDQ8B5pTMnMwEhizWNXInlcGhvrZZI9oHyNM4vazt3tXGGuZmbudIYnq3QgoTBAoqCE2lkiGbWGPfkbqUOoIW6Fh-_jlMBmh83eFTSZM10ikIgXqY8_CTcadxnQWVHRkrcdCDpYHWMhI40wW8v6zCj_aMMbsfdquSV5qWQ0ijVsI")' }}
            >
              <p className="text-white text-base font-bold leading-tight line-clamp-3">Mentorship Program Launch</p>
            </div>
            <div 
              className="bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end p-4 aspect-[4/3] mb-4 break-inside-avoid-column relative overflow-hidden group" 
              data-alt="Exhibition of sustainable fashion items" 
              style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAbIY3w09O1vevuF_9sqIG8SGNvutMkZrrHgaLoRcFTyjuygGjc0fchKQVlTA9W9rmwI_ZiuLHSejiMwZxA6aBA1-n0E8D9ZnVDabLdqGrABvXrC_eq9EZu1z_EHuH2jwLAGv3zkafT4bUF1kPD8e47eI6b155271maAhaGghD9GGmWpp-7zBZSx4UiXynk8kovfF3h8dYEgDneiNQ22SHjTsaNAbLm1_qwk5KUCx5BPET2GbWzWF1TMHqEFYnVELpNBzTfGGN4tI0")' }}
            >
              <p className="text-white text-base font-bold leading-tight line-clamp-3">Sustainable Fashion Expo</p>
            </div>
            <div 
              className="bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end p-4 aspect-[3/4] mb-4 break-inside-avoid-column relative overflow-hidden group" 
              data-alt="Clean water tap in a village" 
              style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDpbS09oQLIwDbGtmGDOjt-c75e6KsbeeocyoL5qXrqkE82Kt7Qu86QQL5CP677wFY4St-RUg4vMkasJurq9H8uQJSuq-joB0Usia2dGvw8KCZ6m2BErDSLSFAABGFnLq_qh5_GAGfwy5f8qe9GjPGIzwOJyLptwq5NBkIqAHnDjpF7lrnQb3B4q59OFr2AE5VxREedGv3SpdjAICiJIxJm5FMiBT0lm0Z2ixMxXKuxjArqzO9B7bo2-U-Y2Oz2BfJ9f85FTKrXJ-s")' }}
            >
              <p className="text-white text-base font-bold leading-tight line-clamp-3">Clean Water Project - Ghana</p>
            </div>
            <div 
              className="bg-cover bg-center flex flex-col gap-3 rounded-lg justify-end p-4 aspect-square mb-4 break-inside-avoid-column relative overflow-hidden group" 
              data-alt="People in a classroom for a workshop" 
              style={{ backgroundImage: 'linear-gradient(0deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0) 60%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuD36YtmhXmD68sRP8FiwOXQKaiAHfvacJPA-O7MM9Pesxf1mKmnn19hGuw9JhFuhk0y7qY4mQoNOZJDleMXZ3pA-xjHa9WpGqsmRxtccpCsC8oqp4ryTI4b3uyyAWG2nl5dXak5p4g3gJJ9QoNRB0KugzTaqMumYr5aOcfj49I2ompBYkBrqKgD2ElX6TLGQrBpK7YITwcPxFuUUBShn8LJtkLrAUFfQGjt167MOWDlGzOhe-ixoo_XVasWF-rGN4eYUGIMSV1AXwA")' }}
            >
              <p className="text-white text-base font-bold leading-tight line-clamp-3">Digital Literacy Workshop</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
