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

async function test() {
  const email = 'keane.arazaan+test' + Date.now() + '@gmail.com';
  const password = 'Password123!';
  console.log('Testing signup with email:', email);
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: 'Test Keane',
        edu_level: 'smk'
      }
    }
  });

  if (error) {
    console.error('Signup error object:', error);
  } else {
    console.log('Signup success! User ID:', data.user.id);
    
    // Wait 2 seconds for trigger to execute and then check profiles table
    setTimeout(async () => {
      const { data: profile, error: profileErr } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', data.user.id);
      
      console.log('Profile created in database:', profile, 'Error:', profileErr);
    }, 2000);
  }
}

test();
