# Intégration Frontend-Backend - ColiExpress

## 🎯 Objectif

Assurer une cohérence parfaite entre le frontend Next.js et le backend Node.js/MySQL pour l'application ColiExpress.

## ✅ Améliorations Réalisées

### 1. **Service API Centralisé** (`lib/services/api.ts`)
- **Gestion centralisée** des appels API
- **Configuration flexible** via variables d'environnement
- **Gestion d'erreurs** standardisée
- **Retry automatique** pour les erreurs réseau

```typescript
// Exemple d'utilisation
const response = await apiService.getColis()
if (response.error) {
  // Gestion d'erreur
}
```

### 2. **Validation des Données** (`lib/validation/colis.ts`)
- **Validation côté client** avant envoi au backend
- **Sanitisation** des données d'entrée
- **Règles métier** spécifiques au Mali
- **Messages d'erreur** en français

```typescript
// Validation lors de la création
const validation = ColisValidator.validateCreate(colisData)
if (!validation.isValid) {
  // Afficher les erreurs
}
```

### 3. **Gestion d'Erreurs Avancée** (`lib/utils/errorHandler.ts`)
- **Classification des erreurs** (réseau, serveur, validation)
- **Retry automatique** pour les erreurs temporaires
- **Logging centralisé** des erreurs
- **Messages utilisateur** appropriés

### 4. **Types TypeScript Cohérents** (`lib/types/colis.ts`)
- **Interface unique** pour tous les composants
- **Fonctions utilitaires** partagées
- **Cohérence** avec la base de données Supabase

### 5. **Actions Mises à Jour** (`app/actions/colis.ts`)
- **Connexion au vrai backend**
- **Validation intégrée**
- **Gestion d'erreurs robuste**
- **Fallback** vers données fictives en développement

## 🔧 Configuration

### Variables d'Environnement
Créer un fichier `.env.local` :

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NODE_ENV=development
```

### Démarrage du Backend
```bash
cd backend/mon-backend-app
npm install
npm start
```

### Démarrage du Frontend
```bash
npm run dev
```

## 🧪 Tests

### Tests de Validation
```bash
npm test lib/tests/colis.test.ts
```

### Tests de Cohérence
- Vérification des types
- Validation des statuts
- Test des champs requis

## 📊 Structure des Données

### Interface Colis
```typescript
interface Colis {
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
```

### Statuts Valides
- `en_attente` → "En attente"
- `en_cours_de_traitement` → "En cours de traitement"
- `pret_pour_expedition` → "Prêt pour l'expédition"
- `en_transit` → "En transit"
- `livre` → "Livré"

## 🚀 Fonctionnalités

### Gestion des Colis
- ✅ **Récupération** avec retry automatique
- ✅ **Création** avec validation
- ✅ **Mise à jour** avec validation
- ✅ **Suppression** sécurisée
- ✅ **Recherche** avancée

### Validation
- ✅ **Numéro de suivi** (5+ caractères)
- ✅ **Téléphone malien** (format +223)
- ✅ **Adresse** (10+ caractères)
- ✅ **Poids** (0-100kg)
- ✅ **Dates** (pas de dates futures)
- ✅ **Statuts** (valeurs autorisées)

### Gestion d'Erreurs
- ✅ **Erreurs réseau** (retry automatique)
- ✅ **Erreurs serveur** (messages appropriés)
- ✅ **Erreurs de validation** (détails par champ)
- ✅ **Logging** centralisé

## 🔄 Workflow de Développement

1. **Modification des données** → Validation automatique
2. **Appel API** → Retry automatique en cas d'échec
3. **Réponse** → Transformation vers interface TypeScript
4. **Erreur** → Gestion centralisée avec messages utilisateur

## 📈 Avantages

### Pour les Développeurs
- **Type safety** complète
- **Validation** automatique
- **Gestion d'erreurs** robuste
- **Code réutilisable**

### Pour les Utilisateurs
- **Messages d'erreur** clairs
- **Validation en temps réel**
- **Expérience fluide** même en cas d'erreur réseau
- **Interface cohérente**

### Pour la Maintenance
- **Code centralisé** et organisé
- **Tests** automatisés
- **Documentation** complète
- **Évolutivité** facilitée

## 🎉 Résultat

L'application ColiExpress dispose maintenant d'une **intégration frontend-backend robuste** avec :

- ✅ **Cohérence parfaite** des données
- ✅ **Validation stricte** côté client
- ✅ **Gestion d'erreurs** avancée
- ✅ **Retry automatique** pour la fiabilité
- ✅ **Type safety** complète
- ✅ **Tests** de cohérence

L'application est prête pour la production avec une architecture solide et maintenable ! 🚀 