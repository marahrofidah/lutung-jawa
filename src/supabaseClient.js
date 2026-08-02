import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Helper to make a chainable dummy object for supabase mock calls
const makeMockClient = () => {
  const dummyData = {
    id: 999,
    class_code: "LTJ-MOCK",
    teacher_name: "Guru Demo",
    created_at: new Date().toISOString(),
    group_name: "Kelompok Demo",
    current_level: 1
  }

  const handler = {
    get: (target, prop) => {
      if (prop === 'then') {
        return (resolve) => resolve({ data: dummyData, error: null })
      }
      // Return a function that returns a proxy with the same handler for chainability
      return () => new Proxy({}, handler)
    }
  }
  return new Proxy({}, handler)
}

let client;
try {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Peringatan: Kunci Supabase tidak ditemukan. Aplikasi berjalan dalam mode offline/demo.");
    client = makeMockClient();
  } else {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
} catch (err) {
  console.error("Gagal menginisialisasi Supabase:", err);
  client = makeMockClient();
}

export const supabase = client;