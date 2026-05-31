import { pool } from "@/db/db";
import { auth } from "@/lib/auth";
import { NextFunction, Request, Response } from "express";

async function signUp(req: Request, res: Response, next: NextFunction) {
	console.log("Received sign-up request with body:", req.body.email);
	console.log("url:", req.url);
	const users = await pool.query("SELECT * FROM users");
	try {
		const data = await auth.api.signUpEmail({
			body: {
				name: "John Doe", // required
				image: "https://example.com/image.png",
				callbackURL: "https://example.com/callback",
				...req.body,
			},
		});
		const {
			id,
			name,
			email,
			image,
			emailVerified: email_verified,
			createdAt: created_at,
			updatedAt: updated_at,
		} = data.user;

		await pool.query(
			"INSERT INTO users(id,name,email,image,email_verified,created_at,updated_at) VALUES($1,$2,$3,$4,$5,$6,$7)",
			[id, name, email, image, email_verified, created_at, updated_at],
		);

		res
			.status(201)
			.json({ message: "User signed up successfully", user: data });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: `An error occurred during sign up: ${error}` });
	}
}

async function signIn(req: Request, res: Response, next: NextFunction) {
	console.log(req.body);
	try {
		const data = await auth.api.signInEmail({
			body: req.body,
		});
		res.json({ message: "User signed in successfully", user: data });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: `An error occurred during sign in: ${error}` });
	}
}

async function signOut(req: Request, res: Response, next: NextFunction) {
	try {
		await auth.api.signOut();
		res.json({ message: "User signed out successfully" });
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: `An error occurred during sign out: ${error}` });
	}
}

async function getSession(req: Request, res: Response, next: NextFunction) {
	try {
		const session = await auth.api.getSession();
		res.json({ session });
		next();
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: `An error occurred while fetching session: ${error}` });
	}
}

export { signUp, signIn, signOut, getSession };
