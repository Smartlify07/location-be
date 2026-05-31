import {
	getSession,
	signIn,
	signOut,
	signUp,
} from "@/controllers/auth.controller";
import { Router } from "express";

const authRouter = Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", signIn);
authRouter.post("/logout", signOut);
authRouter.get("/session", getSession);
export default authRouter;
