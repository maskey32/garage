import express from "express";
import { unhandledRoutes } from "../common/middlewares.common";

const notFoundRoutes = express.Router();

notFoundRoutes.all('*', unhandledRoutes);

export default notFoundRoutes;