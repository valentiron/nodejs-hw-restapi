const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const { schemas } = require("../models/contact");

const getAllContacts = async (req, res) => {
  const {_id:owner} = req.user;
  const {page = 1, limit = 10} = req.query;
  const skip = (page - 1) * limit
  const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner","email");
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }

  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = schemas.addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }

  const{_id:owner} = req.user;

  const contact = await Contact.create({...req.body, owner});
  res.status(201).json(contact);
};

const removeContactById = async (req, res) => {

    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "Delete success",
    });
};

const updateContactById = async (req, res) => {
  const { contactId } = req.params;
  const data = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true, //поверне оновлений об.єкт
  });

  if (!data) {
    throw HttpError(400, "missing fields");
  }
  res.status(200).json(data);
};

const updateStatusContact = async (req, res) => {
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

