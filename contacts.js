const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db/contacts.json");

// Вивести список усіх контактів
const getListContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
};

// Вивести один контакт за його id
const getContactById = async (contactId) => {
  const stringedId = String(contactId);
  const allContacts = await getListContacts();
  const foundContact = allContacts.find((contact) => contact.id === stringedId);
  return foundContact || null;
};

// Додати до списку новий контакт, створений на основі переданих даних
const addContact = async (name, email, phone) => {
  const stringedPhone = String(phone);
  const allContacts = await getListContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone: stringedPhone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

// Оновити один контакт за його id
const updateContact = async (contactId, name, email, phone) => {
  const stringedId = String(contactId);
  const stringedPhone = String(phone);
  const allContacts = await getListContacts();
  const index = allContacts.findIndex((contact) => contact.id === stringedId);
  if (index === -1) {
    return null;
  }
  allContacts[index] = {
    id: stringedId,
    name,
    email,
    phone: stringedPhone,
  };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return allContacts[index];
};

// Видалити один контакт за його id
const removeContact = async (contactId) => {
  const stringedId = String(contactId);
  const allContacts = await getListContacts();
  const foundContact = allContacts.find((contact) => contact.id === stringedId);
  if (foundContact) {
    const withoutRemovedContact = allContacts.filter(
      (contact) => contact.id !== stringedId
    );
    await fs.writeFile(
      contactsPath,
      JSON.stringify(withoutRemovedContact, null, 2)
    );
  }
  return foundContact || null;
};

module.exports = {
  getListContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
};
