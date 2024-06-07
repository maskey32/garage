import { NextFunction, Request, Response } from "express";

import { InvalidDataResponse, ServiceWrapper } from "../services/index.services";

export const unhandledRoutes = (req: Request, res: Response) => {
    res.status(404).json({
      status: 'Fail',
      message: `Route ${req.originalUrl} not found on this server`
    });
}

export const validateRequest = (schema: any) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    let payload: any;

    switch (request.method) {
      case "GET":
      case "DELETE":
        payload = request.query;
        if (!Object.keys(payload).length) {
          payload = request.params;
        }
        break;
      case "PUT":
      case "PATCH":
        payload = request.body;
        break;
      default:
        payload = request.body;
    }

    const validationResult = schema.validate(payload, { abortEarly: true });
    if (validationResult.error) {
      return ServiceWrapper.executeWithErrorHandling(response, () => {
        throw new InvalidDataResponse(validationResult.error.details[0].message);
      });
    }

    next();
  };
};