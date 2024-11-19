import "dotenv/config";
import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";

async function bootstrap() {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.error(error);
  }
}

bootstrap();
