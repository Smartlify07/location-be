import express from "express";
import eventsRouter from "./src/routes/events.route.ts";
import authRouter from "./src/routes/auth.route.js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: ["http://localhost:3000"] }));

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/events", eventsRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
