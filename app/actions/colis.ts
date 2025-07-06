import { apiService } from '@/lib/services/api'
import { Colis } from '@/lib/types/colis'
import { ColisValidator } from '@/lib/validation/colis'
import { ErrorHandler } from '@/lib/utils/errorHandler'

export async function getMesColis() {
  try {
    const response = await ErrorHandler.retryOperation(async () => {
      return await apiService.getColis()
    })
    
    if (response.error) {
      console.error('Erreur API:', response.error)
      // En cas d'erreur, retourner des données fictives pour le développement
      return {
        colis: [
          {
            id: 1,
            numero_suivi: "ABC123456789",
            expediteur_id: "user_001",
            nom_destinataire: "Jean Dupont",
            telephone_destinataire: "+223 76 12 34 56",
            adresse_destinataire: "123 Rue de la Paix, Bamako",
            type_colis: "Document",
            poids: 0.5,
            valeur: 25,
            photo_url: null,
            mode_livraison: "Express",
            date_livraison: null,
            agence_id: 1,
            statut: "en_transit",
            montant: 15000,
            moyen_paiement: "Espèces",
            date_envoi: "2025-01-15",
            date_livraison_estimee: "2025-01-18",
            created_at: "2025-01-15T10:30:00Z",
            updated_at: "2025-01-15T10:30:00Z"
          },
          {
            id: 2,
            numero_suivi: "DEF987654321",
            expediteur_id: "user_001",
            nom_destinataire: "Mariam Maïga",
            telephone_destinataire: "+223 77 98 76 54",
            adresse_destinataire: "456 Avenue Modibo Keita, Tombouctou",
            type_colis: "Électronique",
            poids: 2.5,
            valeur: 150,
            photo_url: null,
            mode_livraison: "Standard",
            date_livraison: null,
            agence_id: 2,
            statut: "en_attente",
            montant: 25000,
            moyen_paiement: "Mobile Money",
            date_envoi: "2025-01-16",
            date_livraison_estimee: "2025-01-20",
            created_at: "2025-01-16T14:20:00Z",
            updated_at: "2025-01-16T14:20:00Z"
          },
          {
            id: 3,
            numero_suivi: "GHI456789123",
            expediteur_id: "user_001",
            nom_destinataire: "Aly Konaté",
            telephone_destinataire: "+223 78 11 22 33",
            adresse_destinataire: "789 Boulevard de l'Indépendance, Kayes",
            type_colis: "Vêtements",
            poids: 1.8,
            valeur: 75,
            photo_url: null,
            mode_livraison: "Express",
            date_livraison: "2025-01-14",
            agence_id: 1,
            statut: "livre",
            montant: 18000,
            moyen_paiement: "Carte bancaire",
            date_envoi: "2025-01-10",
            date_livraison_estimee: "2025-01-13",
            created_at: "2025-01-10T09:15:00Z",
            updated_at: "2025-01-14T16:45:00Z"
          },
          {
            id: 4,
            numero_suivi: "JKL789123456",
            expediteur_id: "user_001",
            nom_destinataire: "Fatoumata Lah",
            telephone_destinataire: "+223 79 44 55 66",
            adresse_destinataire: "321 Rue des Artisans, Sévaré",
            type_colis: "Alimentation",
            poids: 3.2,
            valeur: 45,
            photo_url: null,
            mode_livraison: "Standard",
            date_livraison: null,
            agence_id: 3,
            statut: "en_cours_de_traitement",
            montant: 22000,
            moyen_paiement: "Espèces",
            date_envoi: "2025-01-17",
            date_livraison_estimee: "2025-01-22",
            created_at: "2025-01-17T11:45:00Z",
            updated_at: "2025-01-17T11:45:00Z"
          },
          {
            id: 5,
            numero_suivi: "MNO123456789",
            expediteur_id: "user_001",
            nom_destinataire: "Ibrahim Diallo",
            telephone_destinataire: "+223 76 88 99 00",
            adresse_destinataire: "654 Avenue de la République, Ségou",
            type_colis: "Livre",
            poids: 0.8,
            valeur: 30,
            photo_url: null,
            mode_livraison: "Express",
            date_livraison: null,
            agence_id: 2,
            statut: "pret_pour_expedition",
            montant: 12000,
            moyen_paiement: "Mobile Money",
            date_envoi: "2025-01-18",
            date_livraison_estimee: "2025-01-21",
            created_at: "2025-01-18T08:30:00Z",
            updated_at: "2025-01-18T08:30:00Z"
          }
        ]
      }
    }

    // Transformer les données du backend pour correspondre à notre interface
    const colisData = response.data?.map((item: any) => ({
      id: item.id,
      numero_suivi: item.numero_suivi,
      expediteur_id: item.utilisateur_id,
      nom_destinataire: item.nom_destinataire || 'Non spécifié',
      telephone_destinataire: item.telephone_destinataire || 'Non spécifié',
      adresse_destinataire: item.destination || 'Non spécifié',
      type_colis: item.description || 'Non spécifié',
      poids: item.poids || 0,
      valeur: item.valeur || 0,
      photo_url: item.photo_url,
      mode_livraison: item.mode_livraison,
      date_livraison: item.date_livraison,
      agence_id: item.agence_id,
      statut: item.statut || 'en_attente',
      montant: item.montant || 0,
      moyen_paiement: item.moyen_paiement,
      date_envoi: item.date_envoi,
      date_livraison_estimee: item.date_livraison_estimee,
      created_at: item.created_at,
      updated_at: item.updated_at
    })) || []

    return { colis: colisData }
  } catch (error) {
    const appError = ErrorHandler.handleApiError(error)
    ErrorHandler.logError(appError)
    return { error: ErrorHandler.getErrorMessage(appError) }
  }
}

export async function createColis(colisData: Partial<Colis>) {
  try {
    // Validation des données
    const sanitizedData = ColisValidator.sanitizeData(colisData)
    const validation = ColisValidator.validateCreate(sanitizedData)
    
    if (!validation.isValid) {
      return { 
        error: 'Données invalides',
        validationErrors: validation.errors 
      }
    }

    const response = await ErrorHandler.retryOperation(async () => {
      return await apiService.createColis(sanitizedData)
    })
    
    if (response.error) {
      return { error: response.error }
    }

    return { success: true, data: response.data }
  } catch (error) {
    const appError = ErrorHandler.handleApiError(error)
    ErrorHandler.logError(appError)
    return { error: ErrorHandler.getErrorMessage(appError) }
  }
}

export async function updateColis(id: number, colisData: Partial<Colis>) {
  try {
    // Validation des données de mise à jour
    const sanitizedData = ColisValidator.sanitizeData(colisData)
    const validation = ColisValidator.validateUpdate(sanitizedData)
    
    if (!validation.isValid) {
      return { 
        error: 'Données invalides',
        validationErrors: validation.errors 
      }
    }

    const response = await ErrorHandler.retryOperation(async () => {
      return await apiService.updateColis(id, sanitizedData)
    })
    
    if (response.error) {
      return { error: response.error }
    }

    return { success: true, data: response.data }
  } catch (error) {
    const appError = ErrorHandler.handleApiError(error)
    ErrorHandler.logError(appError)
    return { error: ErrorHandler.getErrorMessage(appError) }
  }
}

export async function deleteColis(id: number) {
  try {
    const response = await ErrorHandler.retryOperation(async () => {
      return await apiService.deleteColis(id)
    })
    
    if (response.error) {
      return { error: response.error }
    }

    return { success: true }
  } catch (error) {
    const appError = ErrorHandler.handleApiError(error)
    ErrorHandler.logError(appError)
    return { error: ErrorHandler.getErrorMessage(appError) }
  }
}

export async function getColisById(id: number) {
  try {
    const response = await ErrorHandler.retryOperation(async () => {
      return await apiService.getColisById(id)
    })
    
    if (response.error) {
      return { error: response.error }
    }

    // Transformer les données pour correspondre à notre interface
    const colisData = {
      id: response.data.id,
      numero_suivi: response.data.numero_suivi,
      expediteur_id: response.data.utilisateur_id,
      nom_destinataire: response.data.nom_destinataire || 'Non spécifié',
      telephone_destinataire: response.data.telephone_destinataire || 'Non spécifié',
      adresse_destinataire: response.data.destination || 'Non spécifié',
      type_colis: response.data.description || 'Non spécifié',
      poids: response.data.poids || 0,
      valeur: response.data.valeur || 0,
      photo_url: response.data.photo_url,
      mode_livraison: response.data.mode_livraison,
      date_livraison: response.data.date_livraison,
      agence_id: response.data.agence_id,
      statut: response.data.statut || 'en_attente',
      montant: response.data.montant || 0,
      moyen_paiement: response.data.moyen_paiement,
      date_envoi: response.data.date_envoi,
      date_livraison_estimee: response.data.date_livraison_estimee,
      created_at: response.data.created_at,
      updated_at: response.data.updated_at
    }

    return { success: true, data: colisData }
  } catch (error) {
    const appError = ErrorHandler.handleApiError(error)
    ErrorHandler.logError(appError)
    return { error: ErrorHandler.getErrorMessage(appError) }
  }
}