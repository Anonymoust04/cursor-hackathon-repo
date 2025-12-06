import { supabase } from '@/lib/supabase';
import { ProjectPayload } from '@/lib/validators/projects';
import { SupabaseClient } from '@supabase/supabase-js';
import { unstable_cache } from 'next/cache';

export async function getProjects(client: SupabaseClient = supabase, filters?: any) {
  let query = client
    .from('projects')
    .select(`
      *,
      poster_profiles (
        full_name,
        avatar_url,
        organization_name
      )
    `);

  if (filters?.type) {
    query = query.eq('type', filters.type);
  }

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  if (filters?.search) {
    // query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }
  
  // Add more filters as needed

  const { data, error } = await query;
  if (error) throw error;

  if (filters?.search) {
    const searchTerm = filters.search.toLowerCase();
    return data.filter(project => {
      const titleMatch = project.title?.toLowerCase().includes(searchTerm);
      const tagsMatch = project.cause_tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm));
      const typeMatch = project.type?.toLowerCase().includes(searchTerm);
      return titleMatch || tagsMatch || typeMatch;
    });
  }

  return data;
}

const getProjectsInternal = async (filtersString: string) => {
  const filters = JSON.parse(filtersString);
  return getProjects(undefined, filters);
};

export const getCachedProjects = async (filters?: any) => {
  const filtersString = JSON.stringify(filters || {});
  return unstable_cache(
    async () => getProjectsInternal(filtersString),
    ['projects-list', filtersString],
    { tags: ['projects'], revalidate: 3600 }
  )();
};

export async function getProjectById(id: string, client: SupabaseClient = supabase) {
  const { data, error } = await client
    .from('projects')
    .select(`
      *,
      poster_profiles (
        full_name,
        avatar_url,
        organization_name
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createProject(projectData: ProjectPayload & { poster_id: string }, client: SupabaseClient = supabase) {
  const { data, error } = await client
    .from('projects')
    .insert([projectData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProject(id: string, projectData: Partial<ProjectPayload>, client: SupabaseClient = supabase) {
  const { data, error } = await client
    .from('projects')
    .update(projectData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProject(id: string, client: SupabaseClient = supabase) {
  const { error } = await client
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}
