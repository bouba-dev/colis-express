-- Script de mise à jour de la table colis
-- Ajout des nouveaux champs nécessaires

-- Ajouter les nouvelles colonnes si elles n'existent pas
ALTER TABLE colis 
ADD COLUMN IF NOT EXISTS nom_destinataire VARCHAR(255) AFTER numero_suivi,
ADD COLUMN IF NOT EXISTS telephone_destinataire VARCHAR(20) AFTER nom_destinataire,
ADD COLUMN IF NOT EXISTS adresse_destinataire TEXT AFTER telephone_destinataire,
ADD COLUMN IF NOT EXISTS type_colis VARCHAR(100) AFTER adresse_destinataire,
ADD COLUMN IF NOT EXISTS valeur DECIMAL(10,2) DEFAULT 0 AFTER poids,
ADD COLUMN IF NOT EXISTS photo_url VARCHAR(500) AFTER valeur,
ADD COLUMN IF NOT EXISTS montant DECIMAL(10,2) DEFAULT 0 AFTER photo_url,
ADD COLUMN IF NOT EXISTS moyen_paiement VARCHAR(50) DEFAULT 'Espèces' AFTER montant,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER moyen_paiement,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

-- Mettre à jour les colonnes existantes si nécessaire
ALTER TABLE colis 
MODIFY COLUMN poids DECIMAL(8,2) NOT NULL DEFAULT 0,
MODIFY COLUMN date_envoi DATE NOT NULL DEFAULT CURRENT_DATE;

-- Créer un index sur le numéro de suivi pour les recherches rapides
CREATE INDEX IF NOT EXISTS idx_numero_suivi ON colis(numero_suivi);

-- Créer un index sur l'utilisateur_id pour les requêtes par utilisateur
CREATE INDEX IF NOT EXISTS idx_utilisateur_id ON colis(utilisateur_id);

-- Créer un index sur le statut pour les filtres
CREATE INDEX IF NOT EXISTS idx_statut_id ON colis(statut_id); 