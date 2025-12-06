import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getApplicantProfile, getPosterProfile } from '@/lib/profiles';
import { requireAuth } from '@/lib/auth-helpers';

/**
 * POST /api/auth/create-profile
 * Creates a second profile type for a user who already has one profile
 * Body: { profileType: 'applicant' | 'poster', organizationName?: string, fullName?: string }
 */
export async function POST(request: Request) {
  try {
    // Require authentication
    const user = await requireAuth(request);

    const { profileType, organizationName, fullName } = await request.json();

    // Validate profile type
    if (profileType !== 'applicant' && profileType !== 'poster') {
      return NextResponse.json(
        { error: 'Invalid profile type. Must be "applicant" or "poster"' },
        { status: 400 }
      );
    }

    // Check if user already has this profile type
    if (profileType === 'applicant') {
      const existing = await getApplicantProfile(user.id);
      if (existing) {
        return NextResponse.json(
          { error: 'You already have an applicant profile' },
          { status: 400 }
        );
      }

      // Create applicant profile
      const { data, error } = await supabase
        .from('applicant_profiles')
        .insert([
          {
            auth_user_id: user.id,
            full_name: fullName || user.user_metadata?.full_name || null,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Create applicant profile error:', error);
        return NextResponse.json(
          { error: 'Failed to create applicant profile', details: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: 'Applicant profile created successfully', profile: data },
        { status: 201 }
      );
    } else {
      // profileType === 'poster'
      const existing = await getPosterProfile(user.id);
      if (existing) {
        return NextResponse.json(
          { error: 'You already have a poster profile' },
          { status: 400 }
        );
      }

      // Validate required field
      if (!organizationName) {
        return NextResponse.json(
          { error: 'Organization name is required for poster profiles' },
          { status: 400 }
        );
      }

      // Create poster profile
      const { data, error } = await supabase
        .from('poster_profiles')
        .insert([
          {
            auth_user_id: user.id,
            organization_name: organizationName,
            full_name: fullName || user.user_metadata?.full_name || null,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Create poster profile error:', error);
        return NextResponse.json(
          { error: 'Failed to create poster profile', details: error.message },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { message: 'Poster profile created successfully', profile: data },
        { status: 201 }
      );
    }
  } catch (error: any) {
    console.error('Create profile error:', error);
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    if (error.message?.includes('Missing NEXT_PUBLIC_SUPABASE')) {
      return NextResponse.json(
        { 
          error: 'Server configuration error: Missing Supabase credentials',
          details: error.message 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

