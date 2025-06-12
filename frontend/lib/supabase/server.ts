import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/supabase/database.types"

// Créer un client Supabase côté serveur
export const createClient = () => {
  return createServerComponentClient<Database>({ cookies })
}
