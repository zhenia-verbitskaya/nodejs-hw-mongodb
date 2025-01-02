import express from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  getContactsController,
  getContactController,
  createContactController,
  deleteContactController,
  updateContactController,
} from "../controllers/contacts.js";

import { upload } from "../middlewares/upload.js";
import { isValidId } from "../middlewares/isValidId.js";
import { validateBody } from "../middlewares/validateBody.js";
import { contactSchema, replaceContactSchema } from "../validation/contact.js";

const router = express.Router();
const jsonParser = express.json();

router.get("/", ctrlWrapper(getContactsController));
router.get("/:contactId", isValidId, ctrlWrapper(getContactController));
router.post(
  "/",
  upload.single("photo"),
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContactController),
);
router.delete("/:contactId", isValidId, ctrlWrapper(deleteContactController));
router.patch(
  "/:contactId",
  upload.single("photo"),
  isValidId,
  jsonParser,
  validateBody(replaceContactSchema),
  ctrlWrapper(updateContactController),
);

export default router;
