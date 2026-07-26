import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// If env vars aren't set (e.g. running locally without a .env yet), we still
// want the app to load and let someone click through the quiz — it just
// won't be able to save submissions or check unlock status until configured.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export async function saveSubmission(payload) {
  if (!supabase) {
    console.warn('Supabase not configured — submission not saved. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.');
    return { id: null, error: 'not_configured' };
  }
  const { data, error } = await supabase
    .from('pricing_leak_submissions')
    .insert([payload])
    .select('id')
    .single();
  if (error) {
    console.error('Failed to save submission:', error);
    return { id: null, error };
  }
  return { id: data.id, error: null };
}

export async function checkUnlocked(submissionId) {
  if (!supabase || !submissionId) return false;
  const { data, error } = await supabase
    .from('pricing_leak_submissions')
    .select('unlocked')
    .eq('id', submissionId)
    .single();
  if (error) {
    console.error('Failed to check unlock status:', error);
    return false;
  }
  return !!data?.unlocked;
}
