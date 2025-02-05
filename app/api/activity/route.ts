import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Données reçues par l'API :", body); // 🔍 Vérifier les données envoyées

    const { name, description, latitude, longitude, image, categoryId } = body;

    // Vérifier que toutes les données requises sont bien envoyées
    if (!name || !description || !latitude || !longitude || !categoryId) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    // Ajouter l'activité à la base de données
    const newActivity = await db.activity.create({
      data: {
        name,
        description,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        image,
        categoryId,
      },
    });

    console.log("Nouvelle activité ajoutée :", newActivity);
    return NextResponse.json(newActivity, { status: 201 });

  } catch (error) {
    console.error("[POST /api/activity] Erreur :", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
