import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

let client;
try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Peringatan: Kunci Supabase tidak ditemukan. Aplikasi berjalan dalam mode offline/demo.");
    client = new Proxy({}, {
      get: () => () => Promise.resolve({ data: [], error: null })
    });
  } else {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (err) {
  console.error("Gagal menginisialisasi Supabase:", err);
  client = new Proxy({}, {
    get: () => () => Promise.resolve({ data: [], error: null })
  });
}

export const supabase = client;