import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://akbfexwiejfddvjmeofn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrYmZleHdpZWpmZGR2am1lb2ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2MTYxNzgsImV4cCI6MjA1MjE5MjE3OH0.VOuc3tDgvGrhh76dS2_7gHV3TS6S7Nm8RlJPu5TPEIQ";

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      storageKey: 'auth-token',
      storage: {
        type: 'cookie',
        options: {
          path: '/',
          domain: '.lovable.app',
          sameSite: 'lax'
        }
      }
    }
  }
);