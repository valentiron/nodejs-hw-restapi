const getAllContacts = require("./getAllContacts")
const getContactById = require("./getContactById")
const addContact = require("./addContact")
const removeContactById = require("./removeContactById")
const updateContactById = require("./updateContactById")
const updateStatusContact = require("./updateStatusContact")

const { ctrlWrapper } = require("../../helpers");

module.exports = {
    getAllContacts: ctrlWrapper(getAllContacts),
    getContactById: ctrlWrapper(getContactById),
    addContact: ctrlWrapper(addContact),
    removeContactById: ctrlWrapper(removeContactById),
    updateContactById: ctrlWrapper(updateContactById),
    updateStatusContact: ctrlWrapper(updateStatusContact),
  };
  