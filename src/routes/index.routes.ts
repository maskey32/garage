import express from "express";

import RouteNames from "../common/config/route.config";
import postsRoutes from "./posts.routes";
import notFoundRoutes from "./notFound.routes";

const router = express.Router();

const routesV1Prefix = `${RouteNames.API_DEFAULT}/${RouteNames.API_V1}`;

router.use(`${routesV1Prefix}/${RouteNames.POST}`, postsRoutes);

router.use(notFoundRoutes);

export default router;