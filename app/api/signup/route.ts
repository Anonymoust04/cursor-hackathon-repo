import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email, password, fullName, role } = await request.json();

    // 1. Sign up the user with Supabase Auth
    // Note: By default, Supabase requires email confirmation.
    // For development/testing, you can disable "Confirm email" in Supabase Dashboard -> Authentication -> Providers -> Email.
    // Or, we can try to auto-confirm if using the service role key (not recommended for client-side, but okay for backend routes if we had it).
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (authError) {
      console.error('Supabase Auth Error:', authError); // Log the full error
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    if (!authData.user) {
      return NextResponse.json({ error: 'User creation failed' }, { status: 400 });
    }

    // 2. Insert into profiles table
    // Note: If you have a Trigger on auth.users to create a profile, this step might be redundant or fail.
    // However, based on the provided SQL, there is no trigger shown, so we insert manually.
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([
        {
          id: authData.user.id,
          role: role,
          full_name: fullName,
        },
      ]);

    if (profileError) {
      console.error('Profile creation error:', profileError);
      // Optional: Delete the auth user if profile creation fails to maintain consistency
      return NextResponse.json({ error: 'Failed to create user profile' }, { status: 500 });
    }

    return NextResponse.json({ message: 'Signup successful', user: authData.user }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
