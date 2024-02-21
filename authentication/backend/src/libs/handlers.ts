import { Request, Response, NextFunction, RequestHandler } from "express";

export const async_handler = (request_handler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(request_handler(req, res, next)).catch((err) => next(err));
  };
};

export class ApiError extends Error {
  statusCode: number;
  message: string;
  errors: any[]; // You can replace `any[]` with a specific type if your errors follow a particular structure
  success: boolean;
  data: any; // You can replace `any` with the specific type of your data

  constructor(
    statusCode: number,
    message: string,
    errors?: any[],
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.success = false;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}