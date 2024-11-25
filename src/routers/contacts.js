import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  getContactsController,
  getContactController,
  createContactController,
  deleteContactController,
  updateContactController,
} from "../controllers/contacts.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", ctrlWrapper(getContactsController));
router.get("/:contactId", ctrlWrapper(getContactController));
router.post("/", jsonParser, ctrlWrapper(createContactController));
router.delete("/:contactId", ctrlWrapper(deleteContactController));
router.patch("/:contactId", jsonParser, ctrlWrapper(updateContactController));

export default router;
