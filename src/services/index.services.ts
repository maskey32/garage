import { Response } from "express";
import { StatusCodes } from "http-status-codes";

import postsServices from "./posts.services";

class ServiceWrapper {
    static getPostService() {
        return postsServices;
    }

    static async executeWithErrorHandling(resp: Response, callback: Function) {
        try {
            await callback();
        } catch (e: any) {
        if (e instanceof BadRequestResponse) {
            return resp.status(StatusCodes.BAD_REQUEST).send(e.message);
        }
        if (e instanceof UnauthorizedResponse) {
            return resp.status(StatusCodes.UNAUTHORIZED).send(e.message);
        }
        if (Array.isArray(e)) {
            return resp.status(StatusCodes.BAD_REQUEST).send(e[0].message);
        }
        if (e instanceof InvalidDataResponse) {
            return resp
            .status(StatusCodes.UNPROCESSABLE_ENTITY)
            .send(e.message);
        }
        return resp.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Unknown error");
        }
    }
}

class BadRequestResponse extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestResponse.prototype);
    }
}

class UnauthorizedResponse extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedResponse.prototype);
    }
}

class InvalidDataResponse extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InvalidDataResponse.prototype);
    }
}

export { ServiceWrapper, BadRequestResponse, UnauthorizedResponse, InvalidDataResponse };