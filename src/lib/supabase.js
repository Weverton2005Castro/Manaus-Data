import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

console.log('URL:', supabaseUrl)
console.log('KEY:', supabaseKey ? 'OK' : 'NÃO ENCONTRADA')

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
)