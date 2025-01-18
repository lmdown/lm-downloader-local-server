import { NextFunction, Request, Response } from "express";

export default function headers (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("X-Powered-By", 'lm-downloader')
  res.header("Content-Type", "application/json");
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Access-Control-Allow-Methods", "OPTIONS,HEAD,GET,PUT,POST,PATCH");
  res.header(
      "Content-Security-Policy",
      "default-src 'self'; base-uri: 'self'; strict-dynamic 'self'; manifest-src 'self'; script-src 'self'; style-src 'self'"
  );
  if(req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
}
