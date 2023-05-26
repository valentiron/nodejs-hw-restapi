const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

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
    updateStatusContact
  };