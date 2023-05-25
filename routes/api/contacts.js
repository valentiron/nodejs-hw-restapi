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

const { validateBody, isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", validateBody(schemas.addSchema), addContact);

router.delete("/:contactId", isValidId, removeContactById);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  updateContactById
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

module.exports = router;
