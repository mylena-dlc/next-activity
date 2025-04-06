import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { rateLimiter } from "@/lib/rateLimiter";
import { activitySchema } from "@/lib/validation"; 

type SessionClaims = {
  publicMetadata?: {
    role?: string;
  };
};

export async function POST(req: NextRequest) {
  try {
    const limitResponse = rateLimiter(req);
    if (limitResponse) return limitResponse;

    // Vérification de l'authentification avec Clerk
    const { userId, sessionClaims } = await auth() as { userId: string, sessionClaims?: SessionClaims };

    if (!userId) {
      return NextResponse.json(
          { error: "Accès non autorisé. Veuillez vous connecter." },
          { status: 401 }
      );
  }

    const role = sessionClaims?.publicMetadata?.role ?? "undefined";

    if (role !== "admin") {
        return NextResponse.json(
            { error: "Accès refusé. Vous devez être administrateur." },
            { status: 403 }
        );
    }

    const body = await req.json();
    console.log("Données reçues par l'API :", body); // Vérifier les données envoyées
    
    const parsedData = activitySchema.safeParse(body); 
    if (!parsedData.success) {
      return NextResponse.json({ error: JSON.stringify(parsedData.error.format()) }, { status: 400 });
    }

    const { name, description, latitude, longitude, image, categoryId } = parsedData.data;

    // // Vérifier que toutes les données requises sont bien envoyées
    // if (!name || !description || !latitude || !longitude || !categoryId) {
    //   return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    // }

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
