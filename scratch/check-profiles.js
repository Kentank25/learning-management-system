import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Read and parse .env manually
const envContent = fs.readFileSync('.env', 'utf-8');
const envConfig = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const value = parts.slice(1).join('=').trim();
    envConfig[key] = value;
  }
});

const supabase = createClient(envConfig.VITE_SUPABASE_URL, envConfig.VITE_SUPABASE_ANON_KEY);

async function check() {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, email, is_admin, edu_level');

  if (error) {
    console.error('Error fetching profiles:', error);
  } else {
    console.log('Profiles currently in database:');
    console.log(JSON.stringify(data, null, 2));
  }
}

check();
