import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://akbfexwiejfddvjmeofn.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrYmZleHdpZWpmZGR2am1lb2ZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2MTYxNzgsImV4cCI6MjA1MjE5MjE3OH0.VOuc3tDgvGrhh76dS2_7gHV3TS6S7Nm8RlJPu5TPEIQ";

// Get the current domain for cookie storage
const getCurrentDomain = () => {
  if (typeof window === 'undefined') return '';
  const hostname = window.location.hostname;
  
  // Handle different environments
  if (hostname.includes('localhost')) return 'localhost';
  if (hostname.includes('preview--')) return hostname;
  return 'aihumanizerde.lovable.app';
};

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
      storage: {
        getItem: (key) => {
          const item = document.cookie.split('; ').find(row => row.startsWith(`${key}=`));
          return item ? item.split('=')[1] : null;
        },
        setItem: (key, value) => {
          document.cookie = `${key}=${value}; path=/; domain=${getCurrentDomain()}; secure; samesite=lax`;
        },
        removeItem: (key) => {
          document.cookie = `${key}=; path=/; domain=${getCurrentDomain()}; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
      }
    }
  }
);