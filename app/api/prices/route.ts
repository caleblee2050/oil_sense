
import { NextResponse } from "next/server";
import { db } from "@/db";
import { fuelData } from "@/db/schema";
import { desc } from "drizzle-orm";
import { predictNextWeekPrice } from "@/lib/analysis";

export async function GET() {
    try {
        // Fetch last 90 days of data
        const prices = await db.select().from(fuelData).orderBy(desc(fuelData.date)).limit(90);

        // Sort chronological for analysis
        const sortedPrices = [...prices].reverse();

        if (sortedPrices.length === 0) {
            return NextResponse.json({ prices: [], prediction: null });
        }

        const latest = sortedPrices[sortedPrices.length - 1];

        // Predict
        let prediction = null;
        try {
            prediction = predictNextWeekPrice(
                sortedPrices.map(p => ({
                    date: p.date,
                    dubaiCrudePrice: p.dubaiCrudePrice || 0,
                    exchangeRate: p.exchangeRate || 1350
                })),
                latest.gasolinePrice || 1600,
                latest.dieselPrice || 1400
            );
        } catch (e) {
            console.error("Prediction failed needed more data?", e);
        }

        return NextResponse.json({
            current: latest,
            prices: sortedPrices,
            prediction
        });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
