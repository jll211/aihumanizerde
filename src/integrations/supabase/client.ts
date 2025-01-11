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
      storage: {
        getItem: (key) => {
          const item = document.cookie
            .split('; ')
            .find((row) => row.startsWith(`${key}=`))
            ?.split('=')[1];
          return item ? JSON.parse(decodeURIComponent(item)) : null;
        },
        setItem: (key, value) => {
          document.cookie = `${key}=${encodeURIComponent(JSON.stringify(value))}; path=/; domain=.lovable.app; samesite=lax`;
        },
        removeItem: (key) => {
          document.cookie = `${key}=; path=/; domain=.lovable.app; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        },
      },
    },
  }
);