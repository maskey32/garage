import { Request, Response } from "express";

import { ServiceWrapper } from "../services/index.services";

const postsControllers = {
    createPost: async (req: Request, res: Response): Promise<void> => {
        try {
          const data: IPosts = {
            title: req.body.title.trim().toUpperCase(),
            content: req.body.content.trim().toUpperCase(),
            author: req.body.author.trim().toUpperCase(),
          }
    
          ServiceWrapper.executeWithErrorHandling(res, async () => {
            const post = await ServiceWrapper
              .getPostService()
              .createPost(data);
    
            res.status(200).json({
              message: "Post successfully added",
              data: post
            });
          })
        } catch (e: any) {
          res.status(500).json({
            message: "Sever error, failed to create post",
            route: req.originalUrl,
          });
        }
    },
};

export default postsControllers;