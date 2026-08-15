import { supabase } from '../lib/supabase'

export async function getIncidents() {
  const { data, error } = await supabase
    .from('incidents')
    .select(`
      id,
      title,
      description,
      latitude,
      longitude,
      status,
      created_at,
      categories (
        name,
        icon
      )
    `)
    .eq('status', 'active')

  if (error) {
    throw error
  }

  return data
}