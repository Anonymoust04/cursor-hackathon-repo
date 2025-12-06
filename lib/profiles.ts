/**
 * Profile helper functions for querying applicant and poster profiles
 */

import { supabase } from './supabase';

export interface ApplicantProfile {
  id: string;
  auth_user_id: string;
  full_name: string | null;
  avatar_url: string | null;
  impact_hours: number;
  characteristics: Record<string, any> | null;
  projects_completed: string[];
  projects_ongoing: string[];
  projects_applied_to: string[];
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface PosterProfile {
  id: string;
  auth_user_id: string;
  organization_name: string;
  full_name: string | null;
  avatar_url: string | null;
  organization_description: string | null;
  organization_data: Record<string, any> | null;
  projects_completed: string[];
  projects_ongoing: string[];
  projects_inviting_applications: string[];
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Get applicant profile by auth_user_id
 */
export async function getApplicantProfile(authUserId: string): Promise<ApplicantProfile | null> {
  const { data, error } = await supabase
    .from('applicant_profiles')
    .select('*')
    .eq('auth_user_id', authUserId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    throw error;
  }

  return data;
}

/**
 * Get poster profile by auth_user_id
 */
export async function getPosterProfile(authUserId: string): Promise<PosterProfile | null> {
  const { data, error } = await supabase
    .from('poster_profiles')
    .select('*')
    .eq('auth_user_id', authUserId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // No rows returned
      return null;
    }
    throw error;
  }

  return data;
}

/**
 * Get both profiles for a user (if they have both)
 */
export async function getUserProfiles(authUserId: string): Promise<{
  applicant: ApplicantProfile | null;
  poster: PosterProfile | null;
}> {
  const [applicant, poster] = await Promise.all([
    getApplicantProfile(authUserId),
    getPosterProfile(authUserId),
  ]);

  return { applicant, poster };
}

/**
 * Get applicant profile by profile id
 */
export async function getApplicantProfileById(profileId: string): Promise<ApplicantProfile | null> {
  const { data, error } = await supabase
    .from('applicant_profiles')
    .select('*')
    .eq('id', profileId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw error;
  }

  return data;
}

/**
 * Get poster profile by profile id
 */
export async function getPosterProfileById(profileId: string): Promise<PosterProfile | null> {
  const { data, error } = await supabase
    .from('poster_profiles')
    .select('*')
    .eq('id', profileId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      return null;
    }
    throw error;
  }

  return data;
}

