import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {

    try {
        // récupérer la liste des catégories
        const categories = await db.category.findMany({

        })

        console.log('categories:', categories);

        // retourne une réponse au format JSON 
        return NextResponse.json(categories)

    } catch (error) {
        console.log("[categories]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }

}