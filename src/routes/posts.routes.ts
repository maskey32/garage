import express from 'express';

import postsControllers from "../controllers/posts.controllers";
import { validateRequest } from "../common/middlewares.common";
import { createPostSchema, updatePostSchema } from "../common/validation/posts.validation";

const postsRoutes = express.Router();

postsRoutes.post("/", validateRequest(createPostSchema), postsControllers.createPost);
postsRoutes.get("/", postsControllers.getPosts);
postsRoutes.get("/:postId", postsControllers.getPost);
postsRoutes.put("/:postId", validateRequest(updatePostSchema), postsControllers.updatePost);
postsRoutes.delete("/:postId", postsControllers.deletePost);

export default postsRoutes;