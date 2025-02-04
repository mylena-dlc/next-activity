import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{ categoryId: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { categoryId } = await params;

        if (!categoryId) {
            return NextResponse.json(
                { error: "Category ID is required" },
                { status: 400 }
            );
        }

        const category = await db.category.findUnique({
            where: {
                id: categoryId
            },
        });

        if (!category) {
            return NextResponse.json(
                { error: "category not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(category);


    } catch (error) {
        console.log("[CATEGORY]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}



