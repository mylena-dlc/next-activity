import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { categorySchema } from "@/lib/validation"; 
import { auth } from "@clerk/nextjs/server";
import { rateLimiter } from "@/lib/rateLimiter";

type SessionClaims = {
  publicMetadata?: {
    role?: string;
  };
};

export async function GET(req: NextRequest) {
    try {
        const limitResponse = rateLimiter(req);
        if (limitResponse) return limitResponse;

        const categories = await db.category.findMany({
          include: {
            activities: true,
          }
        });

        if (!categories) {
            return NextResponse.json(
                { error: "category not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(categories);


    } catch (error) {
        console.log("[CATEGORY]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}


export async function POST(req: NextRequest) {
    try {
      const limitResponse = rateLimiter(req);
      if (limitResponse) return limitResponse;

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

      const parsedData = categorySchema.safeParse(body); //  vérification du schéma Zod

      if (!parsedData.success) {
        return NextResponse.json({ error: JSON.stringify(parsedData.error.format()) }, { status: 400 });
      }

      const { nameCategory } = parsedData.data;

      // Ajouter la catégorie dans la base de données
      const newCategory = await db.category.create({
        data: {
          nameCategory,
        },
      });
  
      return NextResponse.json(newCategory, { status: 201 });
    } catch (error) {
      console.log("[CATEGORY_POST]", error);
      return NextResponse.json({ error: "Internal Error" }, { status: 500 });
    }
  }



