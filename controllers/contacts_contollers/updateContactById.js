const { Contact } = require("../../models/contact");

const { HttpError } = require("../../helpers");

const updateContactById = async (req, res) => {
    const { contactId } = req.params;
    const data = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true, //поверне оновлений об`єкт
    });
  
    if (!data) {
      throw HttpError(400, "missing fields");
    }
    res.status(200).json(data);
  };

  
  module.exports = {
    updateContactById
  };