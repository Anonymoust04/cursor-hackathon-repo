/**
 * Project helper functions for querying projects
 */

import { supabase } from './supabase';

export interface Project {
  id: string;
  poster_id: string;
  title: string;
  description: string;
  location: string | null;
  type: 'volunteer' | 'paid';
  cause_tags: string[] | null;
  status: 'draft' | 'open' | 'ongoing' | 'closed' | 'completed';
  compensation_amount: number | null;
  start_time: string | null;
  end_time: string | null;
  company_name: string | null;
  company_description: string | null;
  time_commitment: string | null;
  application_deadline: string | null;
  requirements: string | null;
  benefits: string | null;
  image_url: string | null;
  is_completed: boolean;
  is_ongoing: boolean;
  is_accepting_applications: boolean;
  qr_token: string | null;
  qr_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Get projects by their IDs
 */
export async function getProjectsByIds(projectIds: string[]): Promise<Project[]> {
  if (!projectIds || projectIds.length === 0) {
    return [];
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .in('id', projectIds);

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return data || [];
}

/**
 * Get all unique project IDs from profile arrays
 */
export function getAllProjectIdsFromProfiles(
  applicantProfile: { projects_completed: string[]; projects_ongoing: string[]; projects_applied_to: string[] } | null,
  posterProfile: { projects_completed: string[]; projects_ongoing: string[]; projects_inviting_applications: string[] } | null
): string[] {
  const allIds = new Set<string>();

  if (applicantProfile) {
    applicantProfile.projects_completed?.forEach(id => allIds.add(id));
    applicantProfile.projects_ongoing?.forEach(id => allIds.add(id));
    applicantProfile.projects_applied_to?.forEach(id => allIds.add(id));
  }

  if (posterProfile) {
    posterProfile.projects_completed?.forEach(id => allIds.add(id));
    posterProfile.projects_ongoing?.forEach(id => allIds.add(id));
    posterProfile.projects_inviting_applications?.forEach(id => allIds.add(id));
  }

  return Array.from(allIds);
}

