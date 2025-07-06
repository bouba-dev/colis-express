export interface Colis {
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

export const getStatusColor = (statut: string) => {
  switch (statut.toLowerCase()) {
    case "livre":
      return "bg-green-100 text-green-800"
    case "en_transit":
      return "bg-yellow-100 text-yellow-800"
    case "en_attente":
      return "bg-blue-100 text-blue-800"
    case "en_cours_de_traitement":
      return "bg-orange-100 text-orange-800"
    case "pret_pour_expedition":
      return "bg-purple-100 text-purple-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export const getStatusText = (statut: string) => {
  switch (statut.toLowerCase()) {
    case "livre":
      return "Livré"
    case "en_transit":
      return "En transit"
    case "en_attente":
      return "En attente"
    case "en_cours_de_traitement":
      return "En cours de traitement"
    case "pret_pour_expedition":
      return "Prêt pour l'expédition"
    default:
      return statut
  }
}

export const getStatusIcon = (statut: string) => {
  switch (statut.toLowerCase()) {
    case "livre":
      return "check-circle"
    case "en_transit":
      return "truck"
    case "en_attente":
      return "clock"
    case "en_cours_de_traitement":
      return "package"
    case "pret_pour_expedition":
      return "alert-circle"
    default:
      return "package"
  }
} 