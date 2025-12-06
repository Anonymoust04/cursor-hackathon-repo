import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requirePosterProfile } from '@/lib/auth-helpers';
// import { getJobs, createJob } from '@/lib/db/jobs';
// import { validateJobPayload } from '@/lib/validators/jobs';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    
    // Build query
    let query = supabase.from('jobs').select('*');
    
    if (type) {
      query = query.eq('type', type);
    }
    
    if (status) {
      query = query.eq('status', status);
    }
    
    // TODO: Add pagination when lib/db/jobs is implemented
    // const jobs = await getJobs(supabase, { type, status });
    
    const { data: jobs, error } = await query;
    
    if (error) {
      console.error('Get jobs error:', error);
      return NextResponse.json({ error: 'Failed to fetch jobs' }, { status: 500 });
    }
    
    return NextResponse.json(jobs || []);
  } catch (error: any) {
    console.error('GET /api/jobs error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Require user to have a poster profile
    const { posterProfile } = await requirePosterProfile(request);

    const body = await request.json();
    
    // Validate payload (if validator exists)
    // const validation = validateJobPayload(body);
    // if (!validation.valid) {
    //   return NextResponse.json({ error: 'Validation failed', details: validation.errors }, { status: 400 });
    // }

    // Use the poster profile id
    const poster_id = posterProfile.id;

    // TODO: Import and use createJob function when lib/db/jobs is implemented
    // For now, create job directly
    const { data: newJob, error: createError } = await supabase
      .from('jobs')
      .insert([{ ...body, poster_id }])
      .select()
      .single();

    if (createError) {
      console.error('Create job error:', createError);
      return NextResponse.json({ error: 'Failed to create job', details: createError.message }, { status: 500 });
    }

    return NextResponse.json(newJob, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/jobs error:', error);
    
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    if (error.message.includes('poster profile')) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }
    
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
