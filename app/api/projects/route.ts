import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { requirePosterProfile } from '@/lib/auth-helpers';
import { getProjects, createProject } from '@/lib/db/projects';
// import { validateProjectPayload } from '@/lib/validators/projects';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    
    // Build query - using projects table
    let query = supabase.from('projects').select('*');
    
    if (type) {
      query = query.eq('type', type);
    }
    
    if (status) {
      query = query.eq('status', status);
    }
    
    // TODO: Add pagination when lib/db/projects is implemented
    // const projects = await getProjects(supabase, { type, status });
    
    const { data: projects, error } = await query;
    
    if (error) {
      console.error('Get projects error:', error);
      return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
    }
    
    return NextResponse.json(projects || []);
  } catch (error: any) {
    console.error('GET /api/projects error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Require user to have a poster profile
    const { posterProfile } = await requirePosterProfile(request);

    const body = await request.json();
    
    // Validate payload (if validator exists)
    // const validation = validateProjectPayload(body);
    // if (!validation.valid) {
    //   return NextResponse.json({ error: 'Validation failed', details: validation.errors }, { status: 400 });
    // }

    // Use the poster profile id
    const poster_id = posterProfile.id;

    // Create project directly
    const { data: newProject, error: createError } = await supabase
      .from('projects')
      .insert([{ ...body, poster_id }])
      .select()
      .single();

    if (createError) {
      console.error('Create project error:', createError);
      return NextResponse.json({ error: 'Failed to create project', details: createError.message }, { status: 500 });
    }

    // Update poster profile's projects_inviting_applications array
    // Add the new project ID to the poster's projects_inviting_applications array
    const currentProjects = posterProfile.projects_inviting_applications || [];
    const updatedProjects = [...currentProjects, newProject.id];
    
    const { error: updateError } = await supabase
      .from('poster_profiles')
      .update({ projects_inviting_applications: updatedProjects })
      .eq('id', poster_id);

    if (updateError) {
      console.error('Update poster profile error:', updateError);
      // Don't fail the request, but log the error
      // The project was created successfully, just the profile update failed
    }

    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    console.error('POST /api/projects error:', error);
    
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
