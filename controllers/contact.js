const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const { schemas } = require("../models/contact");

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find({}, "-createdAt -updatedAt");
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json(result);
};

const addContact = async (req, res, next) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }

  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

const removeContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true, //поверне оновлений об.єкт
  });

  if (!data) {
    throw HttpError(400, "missing fields");
  }
  res.status(200).json(data);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true, //поверне оновлений об`єкт
  });
  if (!data) {
    throw HttpError(400, "missing fields favorite");
  }
  res.status(200).json(data);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContactById: ctrlWrapper(removeContactById),
  updateContactById: ctrlWrapper(updateContactById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
