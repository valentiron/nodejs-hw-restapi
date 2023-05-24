const fs = require("fs/promises");

const path = require("path");

const contactPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();

  const neededContact = contactList.find((item) => item.id === contactId);
  return neededContact || null;
};

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  const index = contactList.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const result = contactList.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(contactList, null, 2));

  return result;
};

const addContact = async ({id, name, email, phone}) => {
  const contactList = await listContacts();
  const newContact = {
    id,
    name,
    email,
    phone,
  };
  contactList.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contactList, null, 2));
  return newContact;
};

const unpdateContact = async (contactId, data) => {
  const contactList = await listContacts();
  const index = contactList.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  contactList[index] = {
    id: contactId,
    ...data,
  };

  await fs.writeFile(contactPath, JSON.stringify(contactList, null, 2));
  return list[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  unpdateContact,
};
