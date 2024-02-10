import { Response } from "express";

export const end = (
  response: Response,
  statusCode: number,
  message: string | { [key: string]: string }
) => {
  return response.status(statusCode).end(message);
};
