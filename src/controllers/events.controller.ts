import { pool } from "@/db/db";
import { NextFunction, type Request, type Response } from "express";

export async function getEvents(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	// query the db
	try {
		console.log(req.method);
		const data = await pool.query("SELECT * FROM events");
		res.status(200).json(data.rows);
		return data.rows;
	} catch (error) {
		console.error(error);
	}
}
