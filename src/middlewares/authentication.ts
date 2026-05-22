import type { Request, Response, NextFunction } from "express";

export const authentication = (
    request: Request,
    response: Response,
    next: NextFunction,
) => {
    next();
};
