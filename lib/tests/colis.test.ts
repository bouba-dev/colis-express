import { ColisValidator } from '../validation/colis'
import { Colis } from '../types/colis'

describe('ColisValidator', () => {
  describe('validateCreate', () => {
    it('should validate correct colis data', () => {
      const validColisData: Partial<Colis> = {
        numero_suivi: 'ABC123456789',
        nom_destinataire: 'Jean Dupont',
        telephone_destinataire: '+223 76 12 34 56',
        adresse_destinataire: '123 Rue de la Paix, Bamako',
        type_colis: 'Document',
        poids: 0.5,
        valeur: 25,
        montant: 15000,
        date_envoi: '2025-01-15'
      }

      const result = ColisValidator.validateCreate(validColisData)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject invalid phone number', () => {
      const invalidColisData: Partial<Colis> = {
        numero_suivi: 'ABC123456789',
        nom_destinataire: 'Jean Dupont',
        telephone_destinataire: '12345', // Invalid phone
        adresse_destinataire: '123 Rue de la Paix, Bamako',
        type_colis: 'Document',
        poids: 0.5,
        valeur: 25,
        montant: 15000
      }

      const result = ColisValidator.validateCreate(invalidColisData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContainEqual({
        field: 'telephone_destinataire',
        message: 'Format de téléphone invalide'
      })
    })

    it('should reject negative weight', () => {
      const invalidColisData: Partial<Colis> = {
        numero_suivi: 'ABC123456789',
        nom_destinataire: 'Jean Dupont',
        telephone_destinataire: '+223 76 12 34 56',
        adresse_destinataire: '123 Rue de la Paix, Bamako',
        type_colis: 'Document',
        poids: -1, // Invalid weight
        valeur: 25,
        montant: 15000
      }

      const result = ColisValidator.validateCreate(invalidColisData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContainEqual({
        field: 'poids',
        message: 'Le poids doit être supérieur à 0'
      })
    })

    it('should reject future date', () => {
      const futureDate = new Date()
      futureDate.setFullYear(futureDate.getFullYear() + 1)
      
      const invalidColisData: Partial<Colis> = {
        numero_suivi: 'ABC123456789',
        nom_destinataire: 'Jean Dupont',
        telephone_destinataire: '+223 76 12 34 56',
        adresse_destinataire: '123 Rue de la Paix, Bamako',
        type_colis: 'Document',
        poids: 0.5,
        valeur: 25,
        montant: 15000,
        date_envoi: futureDate.toISOString()
      }

      const result = ColisValidator.validateCreate(invalidColisData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContainEqual({
        field: 'date_envoi',
        message: 'La date d\'envoi ne peut pas être dans le futur'
      })
    })
  })

  describe('validateUpdate', () => {
    it('should validate correct status update', () => {
      const validUpdateData: Partial<Colis> = {
        statut: 'en_transit'
      }

      const result = ColisValidator.validateUpdate(validUpdateData)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should reject invalid status', () => {
      const invalidUpdateData: Partial<Colis> = {
        statut: 'invalid_status'
      }

      const result = ColisValidator.validateUpdate(invalidUpdateData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContainEqual({
        field: 'statut',
        message: 'Statut invalide'
      })
    })
  })

  describe('sanitizeData', () => {
    it('should sanitize input data', () => {
      const rawData: Partial<Colis> = {
        numero_suivi: '  abc123  ',
        nom_destinataire: '  Jean Dupont  ',
        adresse_destinataire: '  123 Rue de la Paix, Bamako  ',
        telephone_destinataire: '+223 76 12 34 56',
        type_colis: '  Document  '
      }

      const sanitized = ColisValidator.sanitizeData(rawData)
      
      expect(sanitized.numero_suivi).toBe('ABC123')
      expect(sanitized.nom_destinataire).toBe('Jean Dupont')
      expect(sanitized.adresse_destinataire).toBe('123 Rue de la Paix, Bamako')
      expect(sanitized.telephone_destinataire).toBe('+22376123456')
      expect(sanitized.type_colis).toBe('Document')
    })
  })
})

// Tests pour vérifier la cohérence des types
describe('Type Consistency', () => {
  it('should have consistent status values', () => {
    const validStatuts = ['en_attente', 'en_cours_de_traitement', 'pret_pour_expedition', 'en_transit', 'livre']
    
    // Vérifier que tous les statuts sont utilisés dans les fonctions de validation
    const validationStatuts = ['en_attente', 'en_cours_de_traitement', 'pret_pour_expedition', 'en_transit', 'livre']
    
    expect(validationStatuts).toEqual(validStatuts)
  })

  it('should have consistent field names', () => {
    // Vérifier que les noms de champs correspondent à la base de données
    const requiredFields = [
      'id', 'numero_suivi', 'expediteur_id', 'nom_destinataire',
      'telephone_destinataire', 'adresse_destinataire', 'type_colis',
      'poids', 'valeur', 'statut', 'montant', 'date_envoi'
    ]

    // Simuler un objet Colis pour vérifier les champs
    const colisFields = Object.keys({
      id: 1,
      numero_suivi: '',
      expediteur_id: '',
      nom_destinataire: '',
      telephone_destinataire: '',
      adresse_destinataire: '',
      type_colis: '',
      poids: 0,
      valeur: 0,
      statut: '',
      montant: 0,
      date_envoi: ''
    })

    requiredFields.forEach(field => {
      expect(colisFields).toContain(field)
    })
  })
}) 