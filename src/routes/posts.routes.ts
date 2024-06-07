import express from 'express';

import postsControllers from "../controllers/posts.controllers";
import { validateRequest } from "../common/middlewares.common";
import { createPostSchema } from "../common/validation/posts.validation";

const postsRoutes = express.Router();

postsRoutes.post("/", validateRequest(createPostSchema), postsControllers.createPost);

export default postsRoutes;