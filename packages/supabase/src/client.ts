import { createClient } from '@supabase/supabase-js';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { z } from 'zod';

import { Database } from './database.types';
import { LargeSecureStore } from './large-secure-store';

const storage = Platform.OS === 'web' ? AsyncStorage : new LargeSecureStore();

const { supabaseUrl: rawSupabaseUrl, supabaseAnonKey } = z
  .object({
    supabaseUrl: z.string(),
    supabaseAnonKey: z.string(),
  })
  .parse({
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_API_URL,
    supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  });

// Android emulator routes `localhost` to itself, not the host machine.
const supabaseUrl =
  Platform.OS === 'android'
    ? rawSupabaseUrl.replace(
        /^http:\/\/(localhost|127\.0\.0\.1)(:|\/|$)/,
        'http://10.0.2.2$2',
      )
    : rawSupabaseUrl;

export const getSupabaseBrowserClient = <GenericSchema = Database>() =>
  createClient<GenericSchema>(supabaseUrl, supabaseAnonKey, {
    auth: {
      storage,
      autoRefreshToken: true,
      persistSession: typeof document !== 'undefined',
      detectSessionInUrl: false,
    },
  });
