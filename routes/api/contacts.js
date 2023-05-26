const express = require("express");

const {
  getAllContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
  updateStatusContact,
} = require("../../controllers/contact");

const { schemas } = require("../../models/contact");

const {
  validateBody,
  isValidId,
  authentificate,
} = require("../../middlewares");

const router = express.Router();

router.get("/", authentificate, getAllContacts);

router.get("/:contactId", authentificate, isValidId, getContactById);

router.post("/", authentificate, validateBody(schemas.addSchema), addContact);

router.delete("/:contactId", authentificate, isValidId, removeContactById);

router.put(
  "/:contactId",
  authentificate,
  isValidId,
  validateBody(schemas.addSchema),
  updateContactById
);

router.patch(
  "/:contactId/favorite",
  authentificate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
