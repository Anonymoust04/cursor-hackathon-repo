import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful', session: data.session }, { status: 200 });
  } catch (error: any) {
    console.error('Login error:', error);
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
