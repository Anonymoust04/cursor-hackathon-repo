import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email, password, fullName, role, organizationName } = await request.json();

    // Normalize role (accept both 'applier' and 'applicant' for backward compatibility)
    const normalizedRole = role === 'applier' ? 'applicant' : role;
    
    // Validate role
    if (normalizedRole !== 'applicant' && normalizedRole !== 'poster') {
      return NextResponse.json(
        { error: 'Invalid role. Must be either "applicant"/"applier" or "poster"' },
        { status: 400 }
      );
    }

    // Validate required fields based on role
    if (normalizedRole === 'poster' && !organizationName) {
      return NextResponse.json(
        { error: 'Organization name is required for poster accounts' },
        { status: 400 }
      );
    }

    // 1. Sign up the user with Supabase Auth
    // Note: By default, Supabase requires email confirmation.
    // For development/testing, you can disable "Confirm email" in Supabase Dashboard -> Authentication -> Providers -> Email.
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: normalizedRole,
        },
      },
    });

    if (authError) {
      console.error('Supabase Auth Error:', authError);
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'User creation failed' }, { status: 400 });
    }

    // 2. Insert into the appropriate profile table based on role
    let profileError;
    
    if (normalizedRole === 'applicant') {
      // Create applicant profile
      const { error } = await supabase
        .from('applicant_profiles')
        .insert([
          {
            auth_user_id: authData.user.id,
            full_name: fullName,
          },
        ]);
      profileError = error;
    } else if (normalizedRole === 'poster') {
      // Create poster profile
      const { error } = await supabase
        .from('poster_profiles')
        .insert([
          {
            auth_user_id: authData.user.id,
            organization_name: organizationName,
            full_name: fullName, // Contact person name
          },
        ]);
      profileError = error;
    }

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Attempt to delete the auth user if profile creation fails to maintain consistency
      // Note: This might not work with anon key, would need service role key
      return NextResponse.json(
        { 
          error: 'Failed to create user profile',
          details: profileError.message 
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Signup successful',
        user: authData.user,
        profileType: normalizedRole
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Signup error:', error);
    // Handle missing environment variables gracefully
    if (error.message?.includes('Missing NEXT_PUBLIC_SUPABASE')) {
      return NextResponse.json(
        { 
          error: 'Server configuration error: Missing Supabase credentials',
          details: error.message 
        },
        { status: 500 }
      );
    }
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
