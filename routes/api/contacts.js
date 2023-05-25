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

const { validateContact, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateContact(schemas.addSchema), addContact);

router.delete("/:contactId", isValidId, removeContactById);

router.put(
  "/:contactId",
  isValidId,
  validateContact(schemas.addSchema),
  updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateContact(schemas.updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
