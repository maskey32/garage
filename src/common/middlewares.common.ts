import { Request, Response } from "express";

export const unhandledRoutes = (req: Request, res: Response) => {
    res.status(404).json({
      status: 'Fail',
      message: `Route ${req.originalUrl} not found on this server`
    });
}