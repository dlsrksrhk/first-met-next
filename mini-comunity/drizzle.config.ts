import {defineConfig} from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./database/schema.ts",
    out: "./database/migrations",
    dbCredentials: {
        url: "postgres://admin:1234@localhost:5432/postgres?sslmode=disable",
    },
});
