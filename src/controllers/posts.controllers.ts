import { Request, Response } from "express";

import { ServiceWrapper } from "../services/index.services";

const postsControllers = {
    createPost: (req: Request, res: Response): void => {
        try {
          const data: IPosts = {
            title: req.body.title.trim().toUpperCase(),
            content: req.body.content.trim().toUpperCase(),
            author: req.body.author.trim().toUpperCase(),
          }
    
          ServiceWrapper.executeWithErrorHandling(res, async () => {
            const post = ServiceWrapper
              .getPostService()
              .createPost(data);
    
            res.status(200).json({
              message: "Post successfully added",
              data: post
            });
          })
        } catch (e: any) {
          res.status(500).json({
            message: "Server error, failed to create post",
            route: req.originalUrl,
          });
        }
    },
    getPosts: (req: Request, res: Response): void => {
        try {
          ServiceWrapper.executeWithErrorHandling(res, async () => {
            const allPosts = ServiceWrapper
              .getPostService()
              .getPosts();
    
            res.status(200).json({
              message: "Posts successfully retrieved",
              data: allPosts,
              totalNumberOfPosts: allPosts.length,
            });
          })
        } catch (e: any) {
          res.status(500).json({
            message: "Server error, failed to retrieve posts",
            route: req.originalUrl,
          });
        }
    },
    getPost: (req: Request, res: Response): void => {
        try {
          ServiceWrapper.executeWithErrorHandling(res, async () => {
            const post = ServiceWrapper
              .getPostService()
              .getPost(req.params);
    
            res.status(200).json({
              message: "Post successfully retrieved",
              data: post,
            });
          })
        } catch (e: any) {
          res.status(500).json({
            message: "Server error, failed to retrieve posts",
            route: req.originalUrl,
          });
        }
    },
};

export default postsControllers;