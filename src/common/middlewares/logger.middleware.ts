import { NextFunction, Request, Response } from "express";

import { Injectable, Logger, NestMiddleware } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger("HTTP");

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const userAgent = request.get("user-agent") || "";

    const now = Date.now();

    response.on("finish", () => {
      const { statusCode } = response;
      const contentLength = response.get("content-length");
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip} / ${Date.now() - now}ms`,
      );
    });

    next();
  }
}
