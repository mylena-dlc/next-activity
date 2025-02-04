import { db } from "@/lib/db";
import {  NextResponse } from "next/server";


export async function GET() {
    try {
        const categories = await db.category.findMany({

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


export async function POST(request: Request) {
    try {
      const body = await request.json();
      const { nameCategory } = body;
  
      // Vérification des données
      if (!nameCategory) {
        return NextResponse.json(
            { error: "Le nom de la catégorie est manquant" },
            { status: 400 }
        );
      }
  
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



