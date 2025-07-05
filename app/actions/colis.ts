export async function getMesColis() {
  // Exemple de données fictives, à remplacer par ta logique réelle (ex: requête DB)
  return {
    colis: [
      {
        id: 1,
        numero_suivi: "ABC123",
        statut: "en_transit",
        created_at: "2025-06-29",
        nom_destinataire: "Jean Dupont"
      }
    ]
  };
}