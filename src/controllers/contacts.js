import * as fs from "node:fs/promises";
import path from "node:path";
import createHttpError from "http-errors";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";

import {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
} from "../services/contacts.js";

export async function getContactsController(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const contacts = await getContacts({ page, perPage, sortBy, sortOrder, userId: req.user.id });

  res.send({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
}

export async function getContactController(req, res) {
  const { contactId } = req.params;
  const contact = await getContact(contactId, req.user.id);

  if (contact === null) {
    throw new createHttpError.NotFound("Contact not found");
  }

  if (contact.userId.toString() !== req.user.id.toString()) {
    throw new createHttpError.NotFound("Contact not found");
  }

  res.send({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  let photo = null;

  if (typeof req.file !== "undefined") {
    if (process.env.ENABLE_CLOUDINARY === "true") {
      const result = await uploadToCloudinary(req.file.path);
      await fs.unlink(req.file.path);

      photo = result.secure_url;
    } else {
      await fs.rename(req.file.path, path.resolve("src", "public", "photos", req.file.filename));

      photo = `http://localhost:3000/photos/${req.file.filename}`;
    }
  }

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user.id,
    photo,
  };

  const newContact = await createContact(contact);

  res.status(201).send({
    status: 201,
    message: "Successfully created a contact!",
    data: newContact,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;
  const removedContact = await deleteContact(contactId, req.user.id);

  if (removedContact === null) {
    throw new createHttpError.NotFound("Contact not found");
  }

  res.status(204).send();
}

export async function updateContactController(req, res) {
  const { contactId } = req.params;

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const updatedContact = await updateContact(contactId, req.user.id, contact);

  if (updatedContact === null) {
    throw new createHttpError.NotFound("Contact not found");
  }

  res.send({
    status: 200,
    message: "Successfully patched a contact!",
    data: updatedContact,
  });
}
