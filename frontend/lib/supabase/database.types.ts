export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          nom: string
          prenom: string | null
          adresse: string | null
          telephone: string | null
          role: string
          created_at: string
        }
        Insert: {
          id: string
          nom: string
          prenom?: string | null
          adresse?: string | null
          telephone?: string | null
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          nom?: string
          prenom?: string | null
          adresse?: string | null
          telephone?: string | null
          role?: string
          created_at?: string
        }
      }
      agences: {
        Row: {
          id: number
          nom: string
          adresse: string | null
          telephone: string | null
          created_at: string
        }
        Insert: {
          id?: number
          nom: string
          adresse?: string | null
          telephone?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          nom?: string
          adresse?: string | null
          telephone?: string | null
          created_at?: string
        }
      }
      tarifs: {
        Row: {
          id: number
          poids_min: number
          poids_max: number
          destination: string
          prix: number
          created_at: string
        }
        Insert: {
          id?: number
          poids_min: number
          poids_max: number
          destination: string
          prix: number
          created_at?: string
        }
        Update: {
          id?: number
          poids_min?: number
          poids_max?: number
          destination?: string
          prix?: number
          created_at?: string
        }
      }
      colis: {
        Row: {
          id: number
          numero_suivi: string
          expediteur_id: string | null
          nom_destinataire: string
          telephone_destinataire: string
          adresse_destinataire: string
          type_colis: string
          poids: number
          valeur: number
          photo_url: string | null
          mode_livraison: string | null
          date_livraison: string | null
          agence_id: number | null
          statut: string
          montant: number
          moyen_paiement: string | null
          date_envoi: string
          date_livraison_estimee: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          numero_suivi?: string
          expediteur_id?: string | null
          nom_destinataire: string
          telephone_destinataire: string
          adresse_destinataire: string
          type_colis: string
          poids: number
          valeur: number
          photo_url?: string | null
          mode_livraison?: string | null
          date_livraison?: string | null
          agence_id?: number | null
          statut?: string
          montant: number
          moyen_paiement?: string | null
          date_envoi?: string
          date_livraison_estimee?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          numero_suivi?: string
          expediteur_id?: string | null
          nom_destinataire?: string
          telephone_destinataire?: string
          adresse_destinataire?: string
          type_colis?: string
          poids?: number
          valeur?: number
          photo_url?: string | null
          mode_livraison?: string | null
          date_livraison?: string | null
          agence_id?: number | null
          statut?: string
          montant?: number
          moyen_paiement?: string | null
          date_envoi?: string
          date_livraison_estimee?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      historique_statuts: {
        Row: {
          id: number
          colis_id: number | null
          statut: string
          commentaire: string | null
          created_at: string
        }
        Insert: {
          id?: number
          colis_id?: number | null
          statut: string
          commentaire?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          colis_id?: number | null
          statut?: string
          commentaire?: string | null
          created_at?: string
        }
      }
    }
    Functions: {
      generate_tracking_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
  }
}
