import path from "node:path";
import express from "express";
import pino from "pino-http";
import cors from "cors";
import cookieParser from "cookie-parser";
import contactRouter from "./routers/contacts.js";
import authRouter from "./routers/auth.js";

import { authenticate } from "./middlewares/authenticate.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = process.env.PORT || 3000;

export function setupServer() {
  const app = express();

  app.use("/photos", express.static(path.resolve("src/public/photos")));

  app.use(cors());
  app.use(cookieParser());

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    }),
  );

  app.use("/auth", authRouter);
  app.use("/contacts", authenticate, contactRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
