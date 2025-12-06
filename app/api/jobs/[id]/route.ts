import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
// import { getProjectById, updateProject, deleteProject } from '@/lib/db/projects';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    // TODO: Use getProjectById when lib/db/projects is implemented
    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // TODO: Validate payload and verify ownership
    // TODO: Use updateProject when lib/db/projects is implemented
    const { data: updatedProject, error } = await supabase
      .from('projects')
      .update(body)
      .eq('id', id)
      .select()
      .single();
    
    if (error || !updatedProject) {
      return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
    }
    
    return NextResponse.json(updatedProject);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    // TODO: Verify ownership before deletion
    // TODO: Use deleteProject when lib/db/projects is implemented
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);
    
    if (error) {
      return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
