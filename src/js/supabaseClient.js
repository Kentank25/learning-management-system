import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn(
    'Peringatan: VITE_SUPABASE_URL atau VITE_SUPABASE_ANON_KEY belum didefinisikan di berkas .env/setelan Vercel Anda.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
