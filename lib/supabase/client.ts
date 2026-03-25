import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase environment variables are missing. Please check your .env file.');
    // Return a client with placeholder values to prevent startup crash
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder'
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
