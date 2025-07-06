import { NextResponse } from "next/server";
import { getMesColis } from "@/app/actions/colis";

export async function GET() {
  const result = await getMesColis();
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validation des données requises
    if (!body.nom_destinataire || !body.telephone_destinataire || !body.adresse_destinataire || !body.type_colis) {
      return NextResponse.json(
        { error: "Données manquantes" },
        { status: 400 }
      );
    }

    // Envoyer les données au backend
    const response = await fetch(`${process.env.BACKEND_URL || 'http://localhost:3001'}/api/colis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`Erreur backend: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result, { status: 201 });
    
  } catch (error) {
    console.error('Erreur lors de la création du colis:', error);
    return NextResponse.json(
      { error: "Erreur lors de la création du colis" },
      { status: 500 }
    );
  }
}