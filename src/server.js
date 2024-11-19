import express from "express";
import pino from "pino-http";
import cors from "cors";
import { Contact } from "./services/contacts.js";

const PORT = process.env.PORT || 3000;

export function setupServer() {
  const app = express();

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    }),
  );

  app.get("/contacts", async (req, res) => {
    const contacts = await Contact.find();
    res.send({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  });

  app.get("/contacts/:contactId", async (req, res) => {
    const { contactId } = req.params;

    const contact = await Contact.findById(contactId);

    if (contact === null) {
      return res
        .status(404)
        .send({ status: 404, message: "Contact not found" });
    }

    res.send({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  });

  // Handle 404
  app.use((req, res, next) => {
    res.status(404).send({ status: 404, message: "Not Found" });
  });

  // Handle Server Error
  app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send({ status: 500, message: "Internal Server Error" });
  });

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}
