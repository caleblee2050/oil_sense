
import { sql } from "drizzle-orm";
import { text, integer, sqliteTable, real } from "drizzle-orm/sqlite-core";

export const fuelData = sqliteTable("fuel_data", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    date: text("date").notNull().unique(), // YYYY-MM-DD
    gasolinePrice: real("gasoline_price"), // Domestic gasoline price
    dieselPrice: real("diesel_price"), // Domestic diesel price
    dubaiCrudePrice: real("dubai_crude_price"), // International Dubai crude price
    exchangeRate: real("exchange_rate"), // KRW/USD
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const predictions = sqliteTable("predictions", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    targetDate: text("target_date").notNull(), // The date being predicted
    predictedGasoline: real("predicted_gasoline"),
    predictedDiesel: real("predicted_diesel"),
    confidenceScore: real("confidence_score"),
    modelVersion: text("model_version"),
    createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});
