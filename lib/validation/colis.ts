import { Colis } from '@/lib/types/colis'

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

export class ColisValidator {
  static validateCreate(colisData: Partial<Colis>): ValidationResult {
    const errors: ValidationError[] = []

    // Validation du numéro de suivi
    if (!colisData.numero_suivi) {
      errors.push({ field: 'numero_suivi', message: 'Le numéro de suivi est requis' })
    } else if (colisData.numero_suivi.length < 5) {
      errors.push({ field: 'numero_suivi', message: 'Le numéro de suivi doit contenir au moins 5 caractères' })
    }

    // Validation du nom du destinataire
    if (!colisData.nom_destinataire) {
      errors.push({ field: 'nom_destinataire', message: 'Le nom du destinataire est requis' })
    } else if (colisData.nom_destinataire.length < 2) {
      errors.push({ field: 'nom_destinataire', message: 'Le nom du destinataire doit contenir au moins 2 caractères' })
    }

    // Validation du téléphone
    if (!colisData.telephone_destinataire) {
      errors.push({ field: 'telephone_destinataire', message: 'Le téléphone du destinataire est requis' })
    } else if (!this.isValidPhone(colisData.telephone_destinataire)) {
      errors.push({ field: 'telephone_destinataire', message: 'Format de téléphone invalide' })
    }

    // Validation de l'adresse
    if (!colisData.adresse_destinataire) {
      errors.push({ field: 'adresse_destinataire', message: 'L\'adresse du destinataire est requise' })
    } else if (colisData.adresse_destinataire.length < 10) {
      errors.push({ field: 'adresse_destinataire', message: 'L\'adresse doit contenir au moins 10 caractères' })
    }

    // Validation du type de colis
    if (!colisData.type_colis) {
      errors.push({ field: 'type_colis', message: 'Le type de colis est requis' })
    }

    // Validation du poids
    if (colisData.poids !== undefined) {
      if (colisData.poids <= 0) {
        errors.push({ field: 'poids', message: 'Le poids doit être supérieur à 0' })
      } else if (colisData.poids > 100) {
        errors.push({ field: 'poids', message: 'Le poids ne peut pas dépasser 100kg' })
      }
    }

    // Validation de la valeur
    if (colisData.valeur !== undefined) {
      if (colisData.valeur < 0) {
        errors.push({ field: 'valeur', message: 'La valeur ne peut pas être négative' })
      }
    }

    // Validation du montant
    if (colisData.montant !== undefined) {
      if (colisData.montant <= 0) {
        errors.push({ field: 'montant', message: 'Le montant doit être supérieur à 0' })
      }
    }

    // Validation de la date d'envoi
    if (colisData.date_envoi) {
      const dateEnvoi = new Date(colisData.date_envoi)
      const today = new Date()
      if (dateEnvoi > today) {
        errors.push({ field: 'date_envoi', message: 'La date d\'envoi ne peut pas être dans le futur' })
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  static validateUpdate(colisData: Partial<Colis>): ValidationResult {
    const errors: ValidationError[] = []

    // Validation du statut
    if (colisData.statut) {
      const validStatuts = ['en_attente', 'en_cours_de_traitement', 'pret_pour_expedition', 'en_transit', 'livre']
      if (!validStatuts.includes(colisData.statut)) {
        errors.push({ field: 'statut', message: 'Statut invalide' })
      }
    }

    // Validation du poids (si fourni)
    if (colisData.poids !== undefined) {
      if (colisData.poids <= 0) {
        errors.push({ field: 'poids', message: 'Le poids doit être supérieur à 0' })
      } else if (colisData.poids > 100) {
        errors.push({ field: 'poids', message: 'Le poids ne peut pas dépasser 100kg' })
      }
    }

    // Validation de la valeur (si fournie)
    if (colisData.valeur !== undefined) {
      if (colisData.valeur < 0) {
        errors.push({ field: 'valeur', message: 'La valeur ne peut pas être négative' })
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  private static isValidPhone(phone: string): boolean {
    // Validation pour les numéros de téléphone maliens
    const phoneRegex = /^(\+223|223)?[0-9]{8}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  }

  static sanitizeData(colisData: Partial<Colis>): Partial<Colis> {
    return {
      ...colisData,
      nom_destinataire: colisData.nom_destinataire?.trim(),
      adresse_destinataire: colisData.adresse_destinataire?.trim(),
      telephone_destinataire: colisData.telephone_destinataire?.replace(/\s/g, ''),
      type_colis: colisData.type_colis?.trim(),
      numero_suivi: colisData.numero_suivi?.toUpperCase().trim(),
    }
  }
} 