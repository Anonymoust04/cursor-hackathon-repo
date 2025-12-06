import { NextResponse } from 'next/server';
import { getJobs, createJob } from '@/lib/db/jobs';
import { validateJobPayload } from '@/lib/validators/jobs';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    
    const jobs = await getJobs(supabase, { type, status });
    return NextResponse.json(jobs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate payload
    const validation = validateJobPayload(body);
    if (!validation.valid) {
      return NextResponse.json({ error: 'Validation failed', details: validation.errors }, { status: 400 });
    }

    // TODO: Get user from session/token
    // For now, we require poster_id in the body for testing purposes if auth isn't fully set up
    // In production, this should come from the authenticated user's session
    const poster_id = body.poster_id; 
    
    if (!poster_id) {
       return NextResponse.json({ error: 'Unauthorized: Missing poster_id' }, { status: 401 });
    }

    const newJob = await createJob({ ...body, poster_id }, supabase);
    return NextResponse.json(newJob, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
