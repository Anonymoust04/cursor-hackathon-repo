<<<<<<< Updated upstream
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
                  <p className="text-text-light text-[28px] font-bold leading-tight tracking-[-0.015em]">Alex Chen</p>
                  <p className="text-gray-500 text-base font-normal leading-normal mt-1">Connecting social impact with student innovation. Passionate about sustainable development and community building.</p>
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
            <div className="flex min-w-[140px] flex-1 basis-[fit-content] flex-col gap-2 rounded-xl border border-border-light bg-white p-4 items-start shadow-sm">
              <p className="text-text-light tracking-light text-3xl font-bold leading-tight">1,200</p>
              <div className="flex items-center gap-2"><p className="text-gray-500 text-sm font-normal leading-normal">Hours Volunteered</p></div>
            </div>
            <div className="flex min-w-[140px] flex-1 basis-[fit-content] flex-col gap-2 rounded-xl border border-border-light bg-white p-4 items-start shadow-sm">
              <p className="text-text-light tracking-light text-3xl font-bold leading-tight">58</p>
              <div className="flex items-center gap-2"><p className="text-gray-500 text-sm font-normal leading-normal">Connections Made</p></div>
            </div>
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
            <div className="bg-white rounded-lg p-4 mb-4 break-inside-avoid-column flex flex-col items-center justify-center gap-3 text-center border border-border-light" data-alt="Community Leader badge">
              <span className="material-symbols-outlined text-primary text-6xl">workspace_premium</span>
              <h3 className="font-bold text-text-light">Community Leader</h3>
              <p className="text-xs text-gray-500">Awarded for organizing 3+ events.</p>
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
=======
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
>>>>>>> Stashed changes
        </section>
      </div>
    </main>
  );
}
