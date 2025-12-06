import { supabase } from '@/lib/supabase';
import { JobPayload } from '@/lib/validators/jobs';
import { SupabaseClient } from '@supabase/supabase-js';

export async function getJobs(client: SupabaseClient = supabase, filters?: any) {
  let query = client
    .from('jobs')
    .select(`
      *,
      profiles (
        full_name,
        avatar_url
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
    return data.filter(job => {
      const titleMatch = job.title?.toLowerCase().includes(searchTerm);
      const tagsMatch = job.cause_tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm));
      const typeMatch = job.type?.toLowerCase().includes(searchTerm);
      return titleMatch || tagsMatch || typeMatch;
    });
  }

  return data;
}

export async function getJobById(id: string, client: SupabaseClient = supabase) {
  const { data, error } = await client
    .from('jobs')
    .select(`
      *,
      profiles (
        full_name,
        avatar_url
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

export async function createJob(jobData: JobPayload & { poster_id: string }, client: SupabaseClient = supabase) {
  const { data, error } = await client
    .from('jobs')
    .insert([jobData])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateJob(id: string, jobData: Partial<JobPayload>, client: SupabaseClient = supabase) {
  const { data, error } = await client
    .from('jobs')
    .update(jobData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteJob(id: string, client: SupabaseClient = supabase) {
  const { error } = await client
    .from('jobs')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return true;
}
