import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/supabase/database.types"

// Créer un client Supabase côté client (singleton pattern)
export const createClient = () => {
  return createClientComponentClient<Database>()
}
