import "dotenv/config";

export const DB_URI = process.env.DATABASE_URI as string;
export const DB_USER = process.env.DB_USER as string;
export const DB_PASSWORD = process.env.DB_PASSWORD as string;

export const PORT = process.env.PORT || 3000;
