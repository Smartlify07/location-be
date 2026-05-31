import { betterAuth } from "better-auth";
import { pool } from "../db/db";

export const auth = betterAuth({
	database: pool,
	baseURL: "http://localhost:8000/",
	emailAndPassword: { enabled: true },
});
