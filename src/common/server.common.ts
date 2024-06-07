import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import hpp from "hpp";
import cookieParser from "cookie-parser";

import corsOptions from "./config/corsOptions.config";
import router from "../routes/index.routes";

dotenv.config();

const app: Application = express();

app.use(cors(corsOptions));
app.use(helmet());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
};

app.use(express.json());
app.use(hpp({
    whitelist: []
}));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

export default app;