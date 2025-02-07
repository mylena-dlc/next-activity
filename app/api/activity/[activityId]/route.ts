import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

type Props = {
    params: Promise<{ activityId: string }>
}

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const { activityId } = await params;

        if (!activityId) {
            return NextResponse.json(
                { error: "activity ID is required" },
                { status: 400 }
            );
        }

        const activity = await db.activity.findUnique({
            where: {
                id: activityId
            },
        });

        if (!activity) {
            return NextResponse.json(
                { error: "activity not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(activity);


    } catch (error) {
        console.log("[activity]", error)
        return NextResponse.json({ error: "Internal Error" }, { status: 500 })
    }
}



