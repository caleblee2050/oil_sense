
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { fuelData } from "@/db/schema";
import { subDays, format } from "date-fns";
import * as schema from "@/db/schema";
import { sql } from "drizzle-orm";
// Need dotenv to load env vars if we used them, but we hardcoded file:local.db in db/index.ts fallback
// so we can just reproduce the client creation here or import it if we could (but importing from @/db might fail if path aliases aren't set up in ts-node/tsx without config).
// safest to just copy minimal logic.

const url = process.env.TURSO_DATABASE_URL || "file:local.db";
const authToken = process.env.TURSO_AUTH_TOKEN;

const client = createClient({
    url,
    authToken,
});

const db = drizzle(client, { schema });

async function main() {
    console.log("Seeding data...");

    // Clear existing
    // @ts-ignore
    await db.run(sql`DELETE FROM fuel_data`);

    const data = [];
    let currentCrude = 80;
    let currentExchange = 1350;

    for (let i = 90; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const dateStr = format(date, "yyyy-MM-dd");

        currentCrude += (Math.random() - 0.5) * 2;
        currentExchange += (Math.random() - 0.5) * 10;

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
    console.log(`Seeded ${data.length} records.`);
}

main().catch(console.error);
