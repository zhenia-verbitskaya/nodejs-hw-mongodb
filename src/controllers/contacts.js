import createHttpError from "http-errors";
import {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateContact,
} from "../services/contacts.js";

export async function getContactsController(req, res) {
  const contacts = await getContacts();

  res.send({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
}

export async function getContactController(req, res) {
  const { contactId } = req.params;
  const contact = await getContact(contactId);

  if (contact === null) {
    throw new createHttpError.NotFound("Contact not found");
  }

  res.send({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const newContact = await createContact(contact);

  res.send({
    status: 201,
    message: "Successfully created a contact!",
    data: newContact,
  });
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;
  const removedContact = await deleteContact(contactId);

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

  const updatedContact = await updateContact(contactId, contact);

  if (updatedContact === null) {
    throw new createHttpError.NotFound("Contact not found");
  }

  res.send({
    status: 200,
    message: "Successfully patched a contact!",
    data: updatedContact,
  });
}
