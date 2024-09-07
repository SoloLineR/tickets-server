import express from "express";
import "dotenv/config";
import cors from "cors";
import authRouter from "./routes/authRoute.js";
import cookieParser from "cookie-parser";
import ticketRouter from "./routes/ticketRoutes.js";

const app = express();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use("/api", authRouter);
app.use("/api", ticketRouter);
app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
