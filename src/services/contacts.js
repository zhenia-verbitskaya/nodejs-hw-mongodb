import { Contact } from "../models/contacts.js";

export async function getContacts({ page, perPage, sortBy, sortOrder, userId }) {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const contactQuery = Contact.find({ userId });
  const [total, contacts] = await Promise.all([
    Contact.countDocuments(contactQuery),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages - page > 0,
  };
}

export function getContact(contactId) {
  return Contact.findById(contactId);
}

export function createContact(contact) {
  return Contact.create(contact);
}

export function deleteContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export function updateContact(contactId, contact) {
  return Contact.findByIdAndUpdate(contactId, contact, { new: true });
}
