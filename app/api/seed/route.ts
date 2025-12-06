
import { NextResponse } from "next/server";
import { db } from "@/db";
import { fuelData } from "@/db/schema";
import { subDays, format } from "date-fns";
import { sql } from "drizzle-orm";

export async function GET() {
    try {
        // Clear existing
        await db.run(sql`DELETE FROM fuel_data`);

        const data = [];
        let currentCrude = 80; // Start at $80
        let currentExchange = 1350; // Start at 1350 KRW

        // Generate 90 days of data
        for (let i = 90; i >= 0; i--) {
            const date = subDays(new Date(), i);
            const dateStr = format(date, "yyyy-MM-dd");

            // Random walk
            currentCrude += (Math.random() - 0.5) * 2; // +/- $1
            currentExchange += (Math.random() - 0.5) * 10; // +/- 5 KRW

            // Lagged effect simulation: Price follows crude from 14 days ago (approx)
            // Since we are generating sequentially, we just calculate "current" price based on "current" crude
            // but to be realistic, we should have stored history.
            // For simple mock:
            // Price = (Crude / 159 * Exchange) + Tax(820) + Margin(150)
            // We add some noise to margin
            const baseCost = (currentCrude / 158.9) * currentExchange;
            const gasoline = baseCost + 820 + 150 + (Math.random() * 20);
            const diesel = baseCost + 580 + 130 + (Math.random() * 20);

            data.push({
                date: dateStr,
                gasolinePrice: Math.round(gasoline),
                dieselPrice: Math.round(diesel),
                dubaiCrudePrice: Number(currentCrude.toFixed(2)),
                exchangeRate: Math.round(currentExchange)
            });
        }

        await db.insert(fuelData).values(data);

        return NextResponse.json({ message: "Seeded 90 days of fuel data", count: data.length });
    } catch (error) {
        return NextResponse.json({ error: String(error) }, { status: 500 });
    }
}
