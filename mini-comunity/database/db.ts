import {Pool} from "pg";
import {drizzle} from "drizzle-orm/node-postgres";

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "admin",
    password: "1234",
    database: "postgres",
});

export const db = drizzle(pool);