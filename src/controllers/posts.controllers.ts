import { Request, Response } from "express";

import { ServiceWrapper } from "../services/index.services";

const postsControllers = {
    createPost: (req: Request, res: Response): void => {
        try {
          const data: IpostRequestBody = {
            title: req.body.title.trim().toUpperCase(),
            content: req.body.content.trim().toUpperCase(),
            author: req.body.author.trim().toUpperCase(),
          }
    
          ServiceWrapper.executeWithErrorHandling(res, () => {
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
          ServiceWrapper.executeWithErrorHandling(res, () => {
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
          ServiceWrapper.executeWithErrorHandling(res, () => {
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
    updatePost: (req: Request, res: Response): void => {
      try {   
        const data = { ...req.params, ...req.body };  
          
        ServiceWrapper.executeWithErrorHandling(res, () => {
          const updatedPost = ServiceWrapper
          .getPostService()
          .updatePost(data);

          res.status(200).json({
            message: "Post successfully updated",
            data: updatedPost
          });
        })
      } catch (e: any) {
        res.status(500).json({
          message: "Server error, failed to retrieve users",
          route: req.originalUrl,
        });
      }
  },
  deletePost: (req: Request, res: Response): void => {
    try {                                   
      ServiceWrapper.executeWithErrorHandling(res, () => {
        const deletedPost = ServiceWrapper
        .getPostService()
        .deletePost(req.params);

        res.status(204).json({
          message: "Post successfully deleted",
          data: deletedPost
        });
      })
    } catch (e: any) {
      res.status(500).json({
        message: "Server error, failed to retrieve users",
        route: req.originalUrl,
      });
    }
},
};

export default postsControllers;