import { NextResponse } from 'next/server';
import { getUserProfiles } from '@/lib/profiles';
import { getAuthUser } from '@/lib/auth-helpers';

/**
 * GET /api/auth/me
 * Returns the current user's profiles (both applicant and poster if they exist)
 */
export async function GET(request: Request) {
  try {
    const user = await getAuthUser(request);
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get both profiles for the user
    const profiles = await getUserProfiles(user.id);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
      },
      profiles: {
        applicant: profiles.applicant,
        poster: profiles.poster,
      },
      hasApplicantProfile: profiles.applicant !== null,
      hasPosterProfile: profiles.poster !== null,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Get user profiles error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

