/**
 * Authentication helper functions for API routes
 */

import { supabase } from './supabase';
import { getPosterProfile, getApplicantProfile } from './profiles';

/**
 * Get the current authenticated user from request
 * Supports both Bearer token and session cookie
 */
export async function getAuthUser(request?: Request) {
  // If request is provided, try to get token from Authorization header
  if (request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const { data: { user }, error } = await supabase.auth.getUser(token);
      if (!error && user) {
        return user;
      }
    }
  }

  // Fall back to session from cookies
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session?.user) {
    return null;
  }

  return session.user;
}

/**
 * Require authentication - throws error if not authenticated
 */
export async function requireAuth(request?: Request) {
  const user = await getAuthUser(request);
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

/**
 * Require poster profile - throws error if user doesn't have a poster profile
 */
export async function requirePosterProfile(request?: Request) {
  const user = await requireAuth(request);
  const posterProfile = await getPosterProfile(user.id);
  
  if (!posterProfile) {
    throw new Error('You must have a poster profile to perform this action');
  }

  return { user, posterProfile };
}

/**
 * Require applicant profile - throws error if user doesn't have an applicant profile
 */
export async function requireApplicantProfile(request?: Request) {
  const user = await requireAuth(request);
  const applicantProfile = await getApplicantProfile(user.id);
  
  if (!applicantProfile) {
    throw new Error('You must have an applicant profile to perform this action');
  }

  return { user, applicantProfile };
}

